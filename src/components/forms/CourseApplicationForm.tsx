import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { sendCourseApplicationEmails, submitCourseApplication } from "@/lib/courseApplications";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Upload, X } from "lucide-react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(100),
  last_name: z.string().trim().min(2, "Введите фамилию").max(100),
  phone: z.string().trim().min(10, "Введите корректный телефон").max(20),
  city: z.string().trim().min(2, "Введите город").max(100),
  specialization: z.string().trim().min(2, "Введите специализацию").max(200),
  email: z.string().trim().email("Введите корректный email").max(255),
  organization: z.string().trim().min(2, "Введите название организации").max(200),
  comment: z.string().trim().max(1000).optional(),
  payment_type: z.enum(["private", "company"]),
});

interface CourseApplicationFormProps {
  courseName: string;
  courseDate?: string;
  coursePrice?: number;
  onSuccess?: () => void;
  buttonVariant?: "default" | "card";
  buttonLabel?: string;
  cityOptions?: string[];
  showTelegramField?: boolean;
}

const initialFormData = {
  name: "",
  last_name: "",
  phone: "",
  city: "",
  specialization: "",
  email: "",
  organization: "",
  comment: "",
  payment_type: "private" as "private" | "company",
  company_details: "",
};

const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];

export function CourseApplicationForm({
  courseName,
  courseDate: _courseDate,
  coursePrice,
  onSuccess,
  buttonVariant = "default",
  buttonLabel = "Записаться на курс",
  cityOptions,
  showTelegramField: _showTelegramField,
}: CourseApplicationFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [companyFile, setCompanyFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isAllowed = ALLOWED_FILE_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!isAllowed) {
      toast({ variant: "destructive", title: "Неподдерживаемый формат", description: "PDF, DOC, DOCX, JPG, PNG" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Файл слишком большой", description: "Максимум 5 МБ" });
      return;
    }
    setCompanyFile(file);
  };

  const uploadCompanyFile = async (applicationId: string): Promise<string | null> => {
    if (!companyFile) return null;
    const folder = user ? user.id : `guest-course-${applicationId}`;
    const filePath = `${folder}/${Date.now()}-${companyFile.name}`;
    const { data, error } = await supabase.storage
      .from("company-requisites")
      .upload(filePath, companyFile);
    if (error) {
      console.error("Course file upload error:", error);
      return null;
    }
    return data.path;
  };

  const updateField = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = applicationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const applicationPayload = {
        userId: user?.id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseName,
        courseDate: null,
        lastName: formData.last_name,
        telegram: null,
        city: formData.city,
        specialization: formData.specialization,
        organization: formData.organization,
        message: formData.comment || null,
        paymentType: formData.payment_type,
      };
      const { applicationId, inserted } = await submitCourseApplication(applicationPayload);
      if (inserted) sendCourseApplicationEmails({ ...applicationPayload, applicationId });

      setFormData(initialFormData);
      setOpen(false);

      // Онлайн-оплата через Т-Банк доступна для всех курсов с ценой
      // при оплате от частного лица. Сервер сам отклонит курсы без
      // актуальной даты или уже прошедшие.
      const canPayOnline =
        formData.payment_type === "private" &&
        !!applicationId &&
        !!coursePrice &&
        coursePrice > 0;

      if (canPayOnline) {
        try {
          const { data, error: payError } = await supabase.functions.invoke(
            "tbank-init-payment",
            {
              body: {
                courseApplicationId: applicationId,
                successUrl: `${window.location.origin}/education/payment-success`,
                failUrl: `${window.location.origin}/education/payment-failed`,
              },
            },
          );
          if (payError) throw payError;
          if (data?.paymentUrl) {
            window.location.href = data.paymentUrl;
            return;
          }
          // Если сервер вернул, что оплата недоступна — просто продолжаем
          // на страницу «Спасибо» без редиректа на оплату.
        } catch (err) {
          console.error("Payment init failed:", err);
          // Тихо проваливаемся на страницу «Спасибо» — пользователь
          // всё равно получит письмо с инструкциями.
        }
      }


      navigate("/education/thank-you", {
        state: {
          applicationId,
          courseName,
          coursePrice: coursePrice || 0,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerName: `${formData.last_name} ${formData.name}`.trim(),
          paymentType: formData.payment_type,
        },
      });
      onSuccess?.();
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь с нами по телефону",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {buttonVariant === "card" ? (
          <Button size="lg" className="w-full gradient-primary text-primary-foreground">
            {buttonLabel}
          </Button>
        ) : (
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {buttonLabel}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle>Запись на курс</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">{courseName}</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="app-name">Имя *</Label>
              <Input
                id="app-name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Иван"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="app-last-name">Фамилия *</Label>
              <Input
                id="app-last-name"
                value={formData.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                placeholder="Иванов"
                className={errors.last_name ? "border-destructive" : ""}
              />
              {errors.last_name && <p className="text-xs text-destructive">{errors.last_name}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-phone">Телефон *</Label>
            <Input
              id="app-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>


          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="app-city">Город *</Label>
              {cityOptions ? (
                <RadioGroup
                  value={formData.city}
                  onValueChange={(val) => updateField("city", val)}
                  className="flex flex-wrap gap-3"
                >
                  {cityOptions.map((city) => (
                    <div key={city} className="flex items-center space-x-2">
                      <RadioGroupItem value={city} id={`city-${city}`} />
                      <Label htmlFor={`city-${city}`} className="font-normal cursor-pointer">
                        {city}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Input
                  id="app-city"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="Москва"
                  className={errors.city ? "border-destructive" : ""}
                />
              )}
              {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="app-spec">Специализация *</Label>
              <Input
                id="app-spec"
                value={formData.specialization}
                onChange={(e) => updateField("specialization", e.target.value)}
                placeholder="Ортопед"
                className={errors.specialization ? "border-destructive" : ""}
              />
              {errors.specialization && (
                <p className="text-xs text-destructive">{errors.specialization}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-email">Email *</Label>
            <Input
              id="app-email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your@email.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-org">Организация *</Label>
            <Input
              id="app-org"
              value={formData.organization}
              onChange={(e) => updateField("organization", e.target.value)}
              placeholder="Название клиники или компании"
              className={errors.organization ? "border-destructive" : ""}
            />
            {errors.organization && (
              <p className="text-xs text-destructive">{errors.organization}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-comment">Комментарий</Label>
            <Textarea
              id="app-comment"
              value={formData.comment}
              onChange={(e) => updateField("comment", e.target.value)}
              placeholder="Дополнительная информация или вопросы"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Оплата *</Label>
            <RadioGroup
              value={formData.payment_type}
              onValueChange={(val) => updateField("payment_type", val)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="pay-private" />
                <Label htmlFor="pay-private" className="font-normal cursor-pointer">
                  От частного лица
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="pay-company" />
                <Label htmlFor="pay-company" className="font-normal cursor-pointer">
                  От компании
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full gradient-primary text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Записаться на курс
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, CheckCircle2 } from "lucide-react";
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
  telegram: z.string().trim().min(2, "Введите ник в Telegram").max(100),
  city: z.string().trim().min(2, "Введите город").max(100),
  specialization: z.string().trim().min(2, "Введите специализацию").max(200),
  email: z.string().trim().email("Введите корректный email").max(255).optional().or(z.literal("")),
  organization: z.string().trim().max(200).optional(),
  payment_type: z.enum(["private", "company"]),
});

interface CourseApplicationFormProps {
  courseName: string;
  courseDate?: string;
  onSuccess?: () => void;
  buttonVariant?: "default" | "card";
  buttonLabel?: string;
  cityOptions?: string[];
}

export function CourseApplicationForm({
  courseName,
  courseDate,
  onSuccess,
  buttonVariant = "default",
  buttonLabel = "Записаться на курс",
  cityOptions,
}: CourseApplicationFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    telegram: "",
    city: "",
    specialization: "",
    email: "",
    organization: "",
    payment_type: "private" as "private" | "company",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { error } = await supabase.from("course_applications").insert({
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone,
        course_name: courseName,
        course_date: null,
        message: null,
        last_name: formData.last_name,
        telegram: formData.telegram,
        city: formData.city,
        specialization: formData.specialization,
        organization: formData.organization || null,
        payment_type: formData.payment_type,
      } as any);

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-email-unisender", {
          body: {
            type: "course_application",
            courseData: {
              courseName,
              courseDate: courseDate || undefined,
              name: formData.name,
              lastName: formData.last_name,
              phone: formData.phone,
              telegram: formData.telegram,
              city: formData.city,
              specialization: formData.specialization,
              email: formData.email || undefined,
              organization: formData.organization || undefined,
              paymentType: formData.payment_type,
            },
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      setFormData({
        name: "",
        last_name: "",
        phone: "",
        telegram: "",
        city: "",
        specialization: "",
        email: "",
        organization: "",
        payment_type: "private",
      });
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error: any) {
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
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setIsSubmitted(false); }}>
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto" onOpenAutoFocus={(e) => { if (isSubmitted) e.preventDefault(); }}>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl mb-2">Спасибо, что выбрали Артикон!</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mb-2">
              Куратор Учебного центра свяжется с вами в ближайшее время!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Если вы не увидели письмо на почте, пожалуйста, проверьте папку СПАМ
            </p>
            <Button onClick={() => { setOpen(false); setIsSubmitted(false); }}>Закрыть</Button>
          </div>
        ) : (
        <>
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

          <div className="space-y-1.5">
            <Label htmlFor="app-telegram">Ник в Telegram *</Label>
            <Input
              id="app-telegram"
              value={formData.telegram}
              onChange={(e) => updateField("telegram", e.target.value)}
              placeholder="@username"
              className={errors.telegram ? "border-destructive" : ""}
            />
            {errors.telegram && <p className="text-xs text-destructive">{errors.telegram}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="app-city">Город *</Label>
              <Input
                id="app-city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Москва"
                className={errors.city ? "border-destructive" : ""}
              />
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
              {errors.specialization && <p className="text-xs text-destructive">{errors.specialization}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="app-email">Email</Label>
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
            <Label htmlFor="app-org">Организация</Label>
            <Input
              id="app-org"
              value={formData.organization}
              onChange={(e) => updateField("organization", e.target.value)}
              placeholder="Название клиники или компании"
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
                <Label htmlFor="pay-private" className="font-normal cursor-pointer">От частного лица</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="pay-company" />
                <Label htmlFor="pay-company" className="font-normal cursor-pointer">От компании</Label>
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
        </>
        )}
      </DialogContent>
    </Dialog>
  );
}

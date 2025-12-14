import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Send } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Имя должно содержать минимум 2 символа" })
    .max(100, { message: "Имя не должно превышать 100 символов" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Введите корректный номер телефона" })
    .max(20, { message: "Номер телефона слишком длинный" })
    .regex(/^[\d\s\+\-\(\)]+$/, { message: "Некорректный формат номера" }),
  email: z
    .string()
    .trim()
    .email({ message: "Введите корректный email" })
    .max(255, { message: "Email не должен превышать 255 символов" }),
  company: z
    .string()
    .trim()
    .max(200, { message: "Название компании не должно превышать 200 символов" })
    .optional(),
  comment: z
    .string()
    .trim()
    .max(1000, { message: "Комментарий не должен превышать 1000 символов" })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CourseEnrollmentFormProps {
  courseName: string;
  courseDate: string;
  coursePrice: number;
}

export const CourseEnrollmentForm = ({
  courseName,
  courseDate,
  coursePrice,
}: CourseEnrollmentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      comment: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Enrollment submitted:", {
        ...data,
        courseName,
        courseDate,
        coursePrice,
      });

      setIsSubmitted(true);
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsSubmitted(false);
      form.reset();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Записаться на курс
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Заявка отправлена!</DialogTitle>
            <DialogDescription className="mb-6">
              Спасибо за вашу заявку на курс «{courseName}». 
              Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.
            </DialogDescription>
            <Button onClick={() => handleOpenChange(false)}>Закрыть</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Запись на курс</DialogTitle>
              <DialogDescription>
                Заполните форму, и мы свяжемся с вами для подтверждения записи
              </DialogDescription>
            </DialogHeader>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="font-medium text-sm mb-1">{courseName}</p>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{courseDate}</span>
                <span className="font-medium text-foreground">
                  {formatPrice(coursePrice)}
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ваше имя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Телефон *</FormLabel>
                      <FormControl>
                        <Input placeholder="+7 (999) 123-45-67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Компания / Клиника</FormLabel>
                      <FormControl>
                        <Input placeholder="Название организации" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Комментарий</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Дополнительная информация или вопросы"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex-1"
                  >
                    {form.formState.isSubmitting ? (
                      "Отправка..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Отправить
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

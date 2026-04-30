import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, X, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { safeSessionStorage } from "@/lib/safeStorage";

const SPECIALIZATIONS = [
  "Врач ортопед",
  "Врач ортодонт",
  "Зубной техник",
  "Управляющий",
] as const;

const DIRECTIONS = [
  "Цифровое моделирование",
  "Мануальная практика",
  "Полный протокол",
  "Другое",
] as const;

const formSchema = z
  .object({
    name: z.string().trim().min(2, "Введите имя").max(100),
    phone: z
      .string()
      .trim()
      .min(10, "Введите корректный номер телефона")
      .max(20, "Номер телефона слишком длинный")
      .regex(/^[\d\s+\-()]+$/, "Некорректный формат номера"),
    city: z.string().trim().min(2, "Введите город").max(100),
    specializations: z
      .array(z.string())
      .min(1, "Выберите хотя бы одну специализацию"),
    direction: z.enum(DIRECTIONS, { required_error: "Выберите направление" }),
    directionOther: z.string().trim().max(200).optional(),
  })
  .refine(
    (data) =>
      data.direction !== "Другое" ||
      (data.directionOther && data.directionOther.length >= 2),
    {
      message: "Опишите ваш интерес",
      path: ["directionOther"],
    },
  );

type FormData = z.infer<typeof formSchema>;

const STORAGE_KEY = "edu_recommend_dismissed_v1";

export const CourseRecommendationPopup = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      specializations: [],
      direction: undefined as unknown as FormData["direction"],
      directionOther: "",
    },
  });

  const direction = form.watch("direction");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = safeSessionStorage.getItem(STORAGE_KEY);
    if (dismissed === "1") setHidden(true);
  }, []);

  // Only render on /education
  if (location.pathname !== "/education") return null;
  if (hidden) return null;

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHidden(true);
    safeSessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setSubmitted(false);
      form.reset();
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { data: inserted, error: insertError } = await supabase
        .from("course_recommendations")
        .insert([
          {
            name: data.name,
            phone: data.phone,
            city: data.city,
            specializations: data.specializations,
            direction: data.direction,
            direction_other:
              data.direction === "Другое" ? data.directionOther ?? null : null,
          },
        ])
        .select("id")
        .single();

      if (insertError || !inserted) throw insertError ?? new Error("Insert failed");

      // Fire-and-forget email notification (non-blocking for UX)
      supabase.functions
        .invoke("send-email-unisender", {
          body: {
            type: "course_recommendation",
            recommendationId: inserted.id,
          },
        })
        .catch((err) => console.error("Email notify failed", err));

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({
        title: "Не удалось отправить",
        description: "Попробуйте ещё раз или напишите нам в Telegram.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Floating teaser */}
      <div
        className={cn(
          "fixed z-40 bottom-4 left-4 sm:bottom-6 sm:left-6",
          "max-w-[280px] sm:max-w-[320px]",
          "animate-fade-in",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "group relative flex items-start gap-3 w-full",
            "bg-card/95 backdrop-blur-md border border-primary/30",
            "rounded-xl shadow-xl hover:shadow-2xl",
            "p-3 sm:p-4 pr-9",
            "text-left transition-all hover:border-primary/60 hover:-translate-y-0.5",
          )}
          aria-label="Подберём курс под ваш запрос"
        >
          <span className="shrink-0 w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-foreground leading-tight">
              Подберём курс под ваш запрос
            </span>
            <span className="block text-xs text-muted-foreground mt-0.5">
              Ответьте на 4 вопроса — куратор предложит программу
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={handleHide}
          aria-label="Скрыть"
          className={cn(
            "absolute top-1.5 right-1.5 w-6 h-6 rounded-full",
            "bg-background/90 border border-border text-muted-foreground",
            "hover:text-foreground hover:bg-background flex items-center justify-center",
            "transition-colors",
          )}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-xl mb-2">
                Спасибо за ваши ответы!
              </DialogTitle>
              <DialogDescription className="mb-6">
                Куратор свяжется с вами в ближайшее время и предложит
                подходящую программу.
              </DialogDescription>
              <Button onClick={() => handleOpenChange(false)}>Закрыть</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Подберём курс под ваш запрос</DialogTitle>
                <DialogDescription>
                  Пожалуйста, ответьте на несколько вопросов, чтобы мы подобрали
                  для вас идеальную программу.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 pt-2"
                >
                  <FormField
                    control={form.control}
                    name="specializations"
                    render={() => (
                      <FormItem>
                        <FormLabel>Ваша специализация *</FormLabel>
                        <div className="space-y-2 pt-1">
                          {SPECIALIZATIONS.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="specializations"
                              render={({ field }) => (
                                <FormItem className="flex items-center gap-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value ?? [];
                                        field.onChange(
                                          checked
                                            ? [...current, item]
                                            : current.filter((v) => v !== item),
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="direction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Какое направление вам сейчас наиболее интересно? *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="space-y-2 pt-1"
                          >
                            {DIRECTIONS.map((d) => (
                              <div key={d} className="flex items-center gap-2">
                                <RadioGroupItem value={d} id={`dir-${d}`} />
                                <Label
                                  htmlFor={`dir-${d}`}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {d}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {direction === "Другое" && (
                    <FormField
                      control={form.control}
                      name="directionOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Уточните направление *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Опишите, что вам интересно"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Из какого вы города? *</FormLabel>
                        <FormControl>
                          <Input placeholder="Например, Москва" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Как мы можем к вам обращаться? *</FormLabel>
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
                          <Input
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                    size="lg"
                  >
                    {form.formState.isSubmitting ? (
                      "Отправка..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Подобрать курс
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая «Подобрать курс», вы соглашаетесь с обработкой
                    персональных данных
                  </p>
                </form>
              </Form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "Работаем с Артикон уже более 5 лет. Качество работ всегда на высоте, сроки соблюдаются, а техническая поддержка всегда на связи. Рекомендуем!",
    author: "Иван Петров",
    role: "Владелец стоматологической клиники",
    location: "Москва",
    type: "Лаборатория",
    rating: 5,
  },
  {
    id: 2,
    text: "Купили интраоральный сканер Runyes 3DS V5 в Артикон. Очень довольны! Консультанты помогли с выбором, провели обучение, и теперь всегда на связи.",
    author: "Мария Смирнова",
    role: "Стоматолог-ортопед",
    location: "Санкт-Петербург",
    type: "Магазин",
    rating: 5,
  },
  {
    id: 3,
    text: "Прошёл курс по Exocad в учебном центре Артикон. Очень практичный курс, всё объясняли на реальных кейсах. Теперь уверенно работаю в программе!",
    author: "Алексей Кузнецов",
    role: "Зубной техник",
    location: "Казань",
    type: "Учебный центр",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Что говорят{" "}
            <span className="text-gradient-primary">наши клиенты</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Отзывы специалистов, которые уже работают с нами и доверяют
            Артикон своему бизнесу.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border hover-lift relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              {/* Type Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                {testimonial.type}
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

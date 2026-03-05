import { ContactForm } from "@/components/forms/ContactForm";

export function UpceraCTAForm() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Готовы внедрить стабильный цифровой процесс?
          </h2>
          <p className="text-muted-foreground">
            Оставьте заявку, и наш специалист свяжется с вами, чтобы подобрать оптимальное решение для вашей лаборатории.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm
            title="Запрос консультации по UPCERA"
            description="Расскажите о задачах вашей лаборатории — мы подберём подходящее решение"
            notifyEmail="info@articon.pro"
          />
        </div>
      </div>
    </section>
  );
}

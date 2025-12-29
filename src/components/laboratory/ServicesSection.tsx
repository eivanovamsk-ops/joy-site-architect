import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { serviceCategories } from "@/data/laboratoryServices";

// Get top 6 categories for display
const topServices = serviceCategories.slice(0, 6).map(category => {
  // Get first price from first subsection
  const firstPrice = category.subsections[0]?.services[0]?.price || "";
  
  // Get first 3 service names from subsections
  const items = category.subsections.slice(0, 3).map(sub => sub.name);
  
  return {
    title: category.name,
    slug: category.slug,
    price: `от ${firstPrice.replace(/\s*₽.*/, '')} ₽`,
    items,
  };
});

export function LaboratoryServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Топ направления
          </h2>
          <p className="text-lg text-muted-foreground">
            Полный спектр зуботехнических работ с использованием
            современных цифровых технологий
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topServices.map((service, index) => (
            <Link
              key={index}
              to={`/laboratory/services#${service.slug}`}
              className="bg-card border border-border rounded-2xl p-6 hover-lift group block"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <ul className="space-y-1 mb-4">
                {service.items.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-primary font-semibold">{service.price}</span>
                <Button variant="ghost" size="sm" className="text-primary">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/laboratory/services">
            <Button size="lg" className="gradient-primary text-primary-foreground">
              Все услуги и цены
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

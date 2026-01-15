import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serviceCategories } from "@/data/laboratoryServices";
import { cn } from "@/lib/utils";
import { Handshake } from "lucide-react";

const LaboratoryServices = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  const findCategoryBySlug = (slug: string | null) => {
    if (!slug) return null;
    return serviceCategories.find(c => c.id === slug || c.slug === slug);
  };
  
  const [activeCategory, setActiveCategory] = useState(() => {
    const found = findCategoryBySlug(categoryFromUrl);
    return found ? found.id : serviceCategories[0].id;
  });

  useEffect(() => {
    const found = findCategoryBySlug(categoryFromUrl);
    if (found) {
      setActiveCategory(found.id);
    }
  }, [categoryFromUrl]);

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Услуги и цены
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Полный спектр зуботехнических услуг с использованием современных цифровых технологий CAD/CAM
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 shrink-0"
            >
              <a href="https://t.me/articonrazvitie" target="_blank" rel="noopener noreferrer">
                <Handshake className="mr-2 h-5 w-5" />
                Начать сотрудничество
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Categories */}
            <aside className="lg:w-72 flex-shrink-0">
              <Card className="sticky top-24 p-4">
                <h2 className="font-semibold text-lg mb-4 px-2">Категории услуг</h2>
                <nav className="space-y-1">
                  {serviceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors",
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </Card>
            </aside>

            {/* Right Content - Services Tables */}
            <main className="flex-1 min-w-0 space-y-6">
              <h2 className="text-2xl font-bold">{currentCategory?.name}</h2>
              
              {currentCategory?.subsections.map((subsection) => (
                <Card key={subsection.id} className="overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold">{subsection.name}</h3>
                    {subsection.note && (
                      <p className="text-sm text-muted-foreground mt-1">{subsection.note}</p>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[60%]">Услуга</TableHead>
                          <TableHead className="text-right">Цена</TableHead>
                          {subsection.services.some(s => s.description) && (
                            <TableHead className="text-right">Сроки</TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subsection.services.map((service) => (
                          <TableRow key={service.id} className="group">
                            <TableCell className="font-medium">
                              {service.name}
                            </TableCell>
                            <TableCell className="text-right whitespace-nowrap">
                              <span className="font-semibold text-foreground">
                                {service.price}
                              </span>
                            </TableCell>
                            {subsection.services.some(s => s.description) && (
                              <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                                {service.description || "—"}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              ))}

              {/* Info Block */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Нужна консультация по услугам?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Свяжитесь с нами для получения индивидуального расчета стоимости
                    </p>
                  </div>
                  <a href="https://t.me/articon1" target="_blank" rel="noopener noreferrer">
                    <Button>
                      Связаться с нами
                    </Button>
                  </a>
                </div>
              </Card>
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LaboratoryServices;

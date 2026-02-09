import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import orthoLogo from "@/assets/ortho-logo.png";

export function EducationOrthoSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={orthoLogo}
              alt="Ortho by Articon"
              loading="lazy"
              decoding="async"
              className="h-16 mb-6"
            />
            <h2 className="text-3xl font-bold mb-6">
              Цифровая ортодонтия от Articon
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Специализированное направление по производству элайнеров,
              ретейнеров и ортодонтических аппаратов с использованием
              передовых цифровых технологий.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-ortho" />
                Полный цикл производства элайнеров
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-ortho" />
                Обучение цифровой ортодонтии
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-ortho" />
                Техническая поддержка на всех этапах
              </li>
            </ul>
            <Button className="gradient-ortho text-ortho-foreground">
              Узнать подробнее
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-ortho/10 flex items-center justify-center border border-ortho/20">
              <span className="text-ortho/40">Видео о направлении Ortho</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

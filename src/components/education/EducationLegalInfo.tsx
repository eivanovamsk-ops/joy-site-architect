import { Link } from "react-router-dom";
import { Building2, FileText, ShieldCheck } from "lucide-react";

interface EducationLegalInfoProps {
  variant?: "section" | "compact";
}

export function EducationLegalInfo({ variant = "section" }: EducationLegalInfoProps) {
  const content = (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      {/* Реквизиты */}
      <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Реквизиты Учебного центра</h3>
        </div>
        <dl className="space-y-2 text-sm text-muted-foreground">
          <div>
            <dt className="font-semibold text-foreground">
              ООО «АРТИКОН»
            </dt>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 pt-2">
            <dt>ИНН:</dt>
            <dd className="text-foreground">7735570899</dd>
            <dt>КПП:</dt>
            <dd className="text-foreground">772401001</dd>
            <dt>ОГРН:</dt>
            <dd className="text-foreground">1107746609134</dd>
            <dt>Адрес:</dt>
            <dd className="text-foreground">
              115230, г. Москва, Каширское ш., д. 3, к. 2, стр. 4, эт. 1, ком. 32
            </dd>
            <dt>Директор:</dt>
            <dd className="text-foreground">Артемов Виктор Юрьевич</dd>
          </div>
        </dl>
      </div>

      {/* Документы */}
      <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Юридические документы</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Оставляя заявку на курс или подписываясь на рассылку, вы принимаете условия
          обработки персональных данных.
        </p>
        <div className="space-y-3">
          <Link
            to="/education/privacy"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Политика конфиденциальности
            </span>
          </Link>
          <Link
            to="/education/terms"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
          >
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              Согласие на обработку персональных данных
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  if (variant === "compact") {
    return <div className="max-w-5xl mx-auto">{content}</div>;
  }

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">{content}</div>
      </div>
    </section>
  );
}

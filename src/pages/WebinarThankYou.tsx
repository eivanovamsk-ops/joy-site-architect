import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { CheckCircle2 } from "lucide-react";

const WebinarThankYou = () => {
  return (
    <Layout>
      <Helmet>
        <title>Спасибо за регистрацию | Артикон</title>
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-accent" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">Спасибо за регистрацию!</h1>

            <p className="text-lg text-muted-foreground mb-2">
              На почту вам придет ссылка на чат в Телеграм.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Добавляйтесь, и до встречи 8 апреля!
            </p>
            <p className="text-sm text-muted-foreground mb-12">
              (Если вы не увидели письмо во входящих, пожалуйста, проверьте папку «Спам»)
            </p>

            <div className="border-t border-border pt-8">
              <p className="text-lg font-semibold mb-4">
                Подписывайся и будь в курсе новостей Артикон!
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://t.me/articon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[hsl(200,80%,50%)] hover:bg-[hsl(200,80%,45%)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a
                  href="https://max.ru/id7725752561_biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[hsl(210,70%,50%)] hover:bg-[hsl(210,70%,45%)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="7" cy="12" r="3" />
                    <circle cx="17" cy="12" r="3" />
                  </svg>
                  Max
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebinarThankYou;

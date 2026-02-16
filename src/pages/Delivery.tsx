import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Phone, Mail, Send, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Delivery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Контакты | Артикон Магазин</title>
        <meta
          name="description"
          content="Контакты магазина Артикон. Адрес: Москва, Варшавское шоссе, 33с12. Телефон: +7 (964) 500-00-40. Доставка по Москве и России." />

        <link rel="canonical" href="https://articon.pro/shop/contacts" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Address */}
            <div className="flex gap-4 p-6 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Адрес</h3>
                <p className="text-muted-foreground text-sm">
                  115230, г. Москва, Варшавское шоссе, д. 33, стр. 12
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 p-6 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Телефон</h3>
                <a href="tel:+79645000020" className="text-muted-foreground text-sm hover:text-primary">+7 (964) 500-00-40

                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-6 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">E-mail</h3>
                <a href="mailto:moscow@articon.pro" className="text-muted-foreground text-sm hover:text-primary">
                  moscow@articon.pro
                </a>
              </div>
            </div>
          </div>

          {/* Manager CTA */}
          <div className="max-w-md mx-auto mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="gradient-primary text-primary-foreground">

              <a
                href="https://t.me/articon_zakaz"
                target="_blank"
                rel="noopener noreferrer">

                <Send className="mr-2 h-4 w-4" />
                Связаться с менеджером
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Map - Half Page */}
      <section className="h-[50vh] min-h-[400px] bg-secondary">
        <iframe
          src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=109957568237"
          width="100%"
          height="100%"
          frameBorder="0"
          title="Артикон на карте"
          className="w-full h-full" />

      </section>

      {/* Requisites */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Реквизиты компании</h2>
            
            <div className="bg-secondary/50 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4">ООО «Артикон Трейд»</h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <p><strong className="text-foreground">ИНН:</strong> <span className="text-muted-foreground">7725752561</span></p>
                  <p><strong className="text-foreground">ОГРН:</strong> <span className="text-muted-foreground">1127746237607</span></p>
                  <p><strong className="text-foreground">КПП:</strong> <span className="text-muted-foreground">772401001</span></p>
                </div>
                <div className="space-y-3">
                  <p><strong className="text-foreground">Р/с:</strong> <span className="text-muted-foreground">40702810602860000274</span></p>
                  <p><strong className="text-foreground">К/с:</strong> <span className="text-muted-foreground">30101810200000000593</span></p>
                  <p><strong className="text-foreground">БИК:</strong> <span className="text-muted-foreground">044525593</span></p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border text-sm">
                <p><strong className="text-foreground">Банк:</strong> <span className="text-muted-foreground">АО «АЛЬФА-БАНК»</span></p>
                <p className="mt-2"><strong className="text-foreground">Юридический адрес:</strong> <span className="text-muted-foreground">115230, г. Москва, Варшавское шоссе, дом 33, строение 12</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Payment Brief */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Доставка и оплата</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Delivery */}
              <div className="bg-background rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">Доставка</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Самовывоз из офиса в Москве</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Курьерская доставка по Москве</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Доставка по РФ транспортной компанией</span>
                  </li>
                </ul>
              </div>

              {/* Payment */}
              <div className="bg-background rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">Оплата</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Наличными (для физических лиц)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Безналичный расчёт картой</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Сплит-система Яндекс (рассрочка)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span>Безналичный расчёт для юридических лиц</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>);

};

export default Delivery;
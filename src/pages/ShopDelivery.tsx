import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Truck, CreditCard, Clock, Package, Shield, MapPin } from "lucide-react";

const ShopDelivery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Доставка и оплата | Артикон — Магазин стоматологического оборудования</title>
        <meta
          name="description"
          content="Условия доставки и способы оплаты стоматологического оборудования в Артикон. Самовывоз, курьерская доставка по Москве, доставка по РФ. Наличные, безналичный расчёт, рассрочка."
        />
        <link rel="canonical" href="https://articon.pro/shop/delivery" />
      </Helmet>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Доставка и оплата</h1>
            <p className="text-lg text-muted-foreground">
              Удобные способы получения и оплаты заказов
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Доставка</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Самовывоз</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Бесплатно из нашего офиса в Москве
                </p>
                <p className="text-sm text-muted-foreground">
                  г. Москва, Варшавское шоссе, д. 33, стр. 12
                </p>
                <p className="text-sm text-muted-foreground mt-1">Пн–Пт: 9:00–18:00</p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Курьером по Москве</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Доставка в пределах МКАД и ближайшего Подмосковья
                </p>
                <p className="text-sm text-muted-foreground">
                  Сроки: 1–2 рабочих дня
                </p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">По России</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Отправка транспортной компанией (СДЭК, Деловые Линии и др.)
                </p>
                <p className="text-sm text-muted-foreground">
                  Сроки зависят от региона
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Важно:</strong> Стоимость доставки рассчитывается индивидуально в зависимости от веса, габаритов и региона доставки. Уточняйте у менеджера.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Оплата</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Для физических лиц</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Наличными при получении</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Безналичный расчёт банковской картой</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Сплит-система Яндекс (рассрочка без переплат)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Для юридических лиц</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Безналичный расчёт по счёту</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Работаем с НДС и без НДС</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Полный пакет закрывающих документов</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 p-4 bg-background rounded-xl border border-primary/10">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Все товары сертифицированы и имеют гарантию производителя. При получении товара проверьте комплектность и целостность упаковки.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopDelivery;

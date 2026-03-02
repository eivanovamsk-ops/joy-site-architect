import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Truck, CreditCard, Clock, Package, MapPin, RotateCcw, AlertCircle } from "lucide-react";

const ShopDelivery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Доставка и оплата | Артикон — Магазин стоматологического оборудования</title>
        <meta
          name="description"
          content="Условия доставки и способы оплаты стоматологического оборудования в Артикон. Самовывоз, курьерская доставка по Москве, доставка по РФ. Наличные, безналичный расчёт."
        />
        <link rel="canonical" href="https://articon.pro/shop/delivery" />
      </Helmet>

      {/* Hero */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Доставка и оплата</h1>
            <p className="text-lg text-muted-foreground">
              Условия доставки, оплаты и возврата товаров
            </p>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Способы оплаты</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Наличными в офисе</h3>
                <p className="text-muted-foreground text-sm mb-2">Доступно при самовывозе</p>
                <p className="text-sm text-muted-foreground">
                  Адрес: Варшавское шоссе, 33, стр. 12.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Безналичный расчёт</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Банковский перевод по счёту для юридических лиц.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>Отгрузка осуществляется после поступления денежных средств на расчётный счёт.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Processing Section */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Передача заказа в доставку</h2>
            </div>

            <div className="bg-background rounded-2xl p-6 md:p-8 space-y-5">
              <p className="text-muted-foreground">
                Обработка и передача заказов осуществляется:<br />
                <strong className="text-foreground">понедельник–пятница с 10:00 до 18:00.</strong><br />
                Суббота и воскресенье — выходные дни. Заказы, оформленные в выходные, обрабатываются в ближайший рабочий день.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <h3 className="font-semibold mb-2">При наличной оплате</h3>
                  <p className="text-sm text-muted-foreground">
                    Доставка осуществляется на следующий рабочий день после подтверждения заказа, если не согласованы иные сроки.
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <h3 className="font-semibold mb-2">При безналичной оплате</h3>
                  <p className="text-sm text-muted-foreground">
                    Отгрузка производится на следующий рабочий день после поступления денежных средств на расчётный счёт.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Важно:</strong> Возможность срочной доставки уточняйте у вашего менеджера.
                </p>
              </div>
            </div>
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
              <h2 className="text-3xl font-bold">Способы доставки</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Москва (в пределах МКАД)</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Доставка осуществляется транспортом компании.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">При заказе до 30 000 руб. — <strong className="text-foreground">950 руб.</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">При заказе от 30 000 руб. — <strong className="text-foreground">бесплатно</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Самовывоз (Москва)</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Адрес: Варшавское шоссе, 33, стр. 12.
                </p>
                <p className="text-sm text-muted-foreground">
                  Самовывоз возможен после подтверждения готовности заказа менеджером.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Регионы России</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Доставка осуществляется транспортными компаниями СДЭК и Деловые Линии по нашим договорам. При наличии договора у заказчика — оформление на заказчика.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Стоимость услуг транспортной компании оплачивается покупателем.
                </p>
                <p className="text-sm text-muted-foreground">
                  Также вы можете самостоятельно оформить забор груза удобной для вас транспортной компанией.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy Section */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <RotateCcw className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Условия возврата</h2>
            </div>

            <div className="bg-background rounded-2xl p-6 md:p-8 space-y-5">
              <p className="text-muted-foreground">
                Качество поставляемого товара должно соответствовать требованиям, действующим на территории Российской Федерации, и обеспечивать его использование по назначению.
              </p>

              <div>
                <h3 className="font-semibold mb-3">При обнаружении недостатков покупатель обязан письменно уведомить поставщика. Уведомление должно содержать:</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>наименование и количество товара,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>описание выявленных недостатков,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>реквизиты товаросопроводительных документов,</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>иные необходимые сведения.</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-xl flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Претензия рассматривается в течение <strong className="text-foreground">10 рабочих дней</strong>. В случае подтверждения — замена товара в течение <strong className="text-foreground">5 рабочих дней</strong>.
                  </p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl flex gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Претензии по скрытым дефектам принимаются в течение гарантийного срока производителя. Если гарантийный срок не установлен — в течение <strong className="text-foreground">3 месяцев</strong> с момента получения товара.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopDelivery;

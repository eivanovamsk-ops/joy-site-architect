import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Truck, CreditCard, Clock, Package, MapPin, RotateCcw, AlertCircle, ShieldCheck } from "lucide-react";

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
      <section className="py-6 bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-1">Доставка и оплата</h1>
          <p className="text-sm text-muted-foreground">
            Условия доставки, оплаты и возврата товаров
          </p>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Способы оплаты</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Наличными в офисе</h3>
                <p className="text-muted-foreground text-sm mb-1">Доступно при самовывозе</p>
                <p className="text-xs text-muted-foreground">
                  Адрес: Варшавское шоссе, 33, стр. 12.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Безналичный расчёт</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Банковский перевод по счёту для юридических лиц.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>Отгрузка после поступления средств на расчётный счёт.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Processing Section */}
      <section className="py-6 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Передача заказа в доставку</h2>
            </div>

            <div className="bg-background rounded-xl p-4 md:p-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                Обработка и передача заказов: <strong className="text-foreground">пн–пт с 10:00 до 18:00.</strong> Заказы в выходные обрабатываются в ближайший рабочий день.
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">При наличной оплате</h3>
                  <p className="text-xs text-muted-foreground">
                    Доставка на следующий рабочий день после подтверждения заказа.
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">При безналичной оплате</h3>
                  <p className="text-xs text-muted-foreground">
                    Отгрузка на следующий рабочий день после поступления средств.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Важно:</strong> Возможность срочной доставки уточняйте у менеджера.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Способы доставки</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Москва (в пределах МКАД)</h3>
                <p className="text-muted-foreground text-xs mb-2">
                  Доставка транспортом компании.
                </p>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">До 30 000 руб. — <strong className="text-foreground">950 руб.</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-muted-foreground">От 30 000 руб. — <strong className="text-foreground">бесплатно</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Самовывоз (Москва)</h3>
                <p className="text-muted-foreground text-xs mb-2">
                  Варшавское шоссе, 33, стр. 12.
                </p>
                <p className="text-xs text-muted-foreground">
                  После подтверждения готовности заказа менеджером.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-bold mb-1">Регионы России</h3>
                <p className="text-muted-foreground text-xs mb-2">
                  СДЭК и Деловые Линии по нашим договорам. Стоимость оплачивается покупателем.
                </p>
                <p className="text-xs text-muted-foreground">
                  Также можно оформить забор груза своей ТК.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Policy Section */}
      <section className="py-6 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <RotateCcw className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Условия возврата</h2>
            </div>

            <div className="bg-background rounded-xl p-4 md:p-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                Качество товара должно соответствовать требованиям РФ и обеспечивать использование по назначению.
              </p>

              <div>
                <h3 className="font-semibold text-sm mb-2">При обнаружении недостатков уведомление должно содержать:</h3>
                <ul className="grid grid-cols-2 gap-1 text-muted-foreground text-xs">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>наименование и количество товара</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>описание выявленных недостатков</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>реквизиты документов</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>иные необходимые сведения</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-secondary/50 rounded-lg flex gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Претензия рассматривается <strong className="text-foreground">10 рабочих дней</strong>. Замена — в течение <strong className="text-foreground">5 рабочих дней</strong>.
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg flex gap-2">
                  <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Скрытые дефекты — в течение гарантийного срока или <strong className="text-foreground">3 месяцев</strong> с момента получения.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Гарантия</h2>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>
                Articon гарантирует 100% оригинальность продукции — поставки напрямую от производителей и дистрибьюторов.
              </p>
              <p>
                Все товары сертифицированы. По запросу предоставляем регистрационные удостоверения и сертификаты соответствия.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopDelivery;

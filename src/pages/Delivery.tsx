import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Truck, MapPin, CreditCard, Building2, User, Package, AlertCircle, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Delivery = () => {
  return (
    <Layout>
      <Helmet>
        <title>Доставка и оплата | Артикон</title>
        <meta
          name="description"
          content="Доставка оборудования и расходных материалов по Москве и России. Курьерская доставка, СДЭК, Boxberry, самовывоз. Оплата картой, наличными, безналичный расчёт."
        />
      </Helmet>

      

      {/* Hero Section */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Доставка и оплата
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы сделали всё, чтобы получение вашего заказа было максимально быстрым и удобным.
            <br />
            <span className="font-medium text-foreground">Работаем со всеми регионами России.</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Delivery Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Доставка</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Moscow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Москва и МО
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-foreground mb-3">Курьерская доставка</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Бесплатно</strong> – при заказе от 30 000 рублей.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">300 рублей</strong> – при заказе до 30 000 рублей.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Доставляем на следующий рабочий день после подтверждения заказа.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Russia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Россия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-foreground mb-3">СДЭК, Boxberry</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Стоимость и сроки рассчитываются автоматически при оформлении заказа.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Средний срок доставки – <strong className="text-foreground">от 2 до 7 рабочих дней</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Получение в пункте выдачи или курьером до двери.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pickup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Самовывоз
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-foreground mb-3">Москва</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Бесплатно.</strong> Заберите заказ с нашего склада по предварительному согласованию.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong className="text-foreground">Адрес:</strong> Москва, Варшавское шоссе, 33с12</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Turnkey */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  «Под ключ»
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Для крупногабаритного оборудования (фрезерные станки, печи) мы организуем доставку по России и проведем 
                  <strong className="text-foreground"> профессиональную установку и пусконаладку</strong>. Стоимость рассчитывается индивидуально.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Оплата</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Individual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Частное лицо
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Банковской картой онлайн</h4>
                  <p className="text-muted-foreground text-sm">
                    Visa, Mastercard, МИР. Оплата происходит через защищённый сервис. Мы не получаем данные вашей карты.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Наличными или картой курьеру</h4>
                  <p className="text-muted-foreground text-sm">
                    Вы можете оплатить заказ при получении. Просьба сообщить о таком способе оплаты заранее.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Legal Entity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Юридическое лицо
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold text-foreground mb-2">Безналичный расчёт</h4>
                <p className="text-muted-foreground text-sm">
                  Выставление счёта на оплату. Отгрузка товара производится после поступления денег на наш расчётный счёт. 
                  Укажите реквизиты вашей компании в комментарии к заказу.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Info Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Важная информация</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Отслеживание заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  После отправки мы вышлем вам трек-номер для отслеживания посылки.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Проверка при получении</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Внимательно осмотрите заказ при курьере. Если есть повреждения упаковки или несоответствие заказу – вы вправе отказаться от получения и составить акт.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Возврат</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Мы принимаем возврат товара надлежащего качества в течение 7 дней с момента получения.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Остались вопросы?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a 
              href="tel:+79645000040" 
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-medium">+7 (964) 500-00-40</span>
            </a>
            <a 
              href="mailto:moscow@articon.pro" 
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-medium">moscow@articon.pro</span>
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Москва, Варшавское шоссе, 33с12</span>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Наш офис на карте</h2>
          <div className="rounded-2xl overflow-hidden border border-border h-[400px]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=109957568237"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Артикон на карте"
              className="w-full h-full"
            />
          </div>
        </section>

        {/* Company Details Section */}
        <section className="mt-16 bg-muted/30 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Реквизиты организации</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">ООО «Артикон Трейд»</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Юридический адрес:</strong> 115230, г. Москва, Варшавское шоссе, дом 33, строение 12</li>
                <li><strong className="text-foreground">ИНН:</strong> 7725752561</li>
                <li><strong className="text-foreground">КПП:</strong> 772401001</li>
                <li><strong className="text-foreground">ОГРН:</strong> 1127746237607</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-lg">Банковские реквизиты</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Банк:</strong> АО «АЛЬФА-БАНК»</li>
                <li><strong className="text-foreground">Р/с:</strong> 40702810602860000274</li>
                <li><strong className="text-foreground">К/с:</strong> 30101810200000000593</li>
                <li><strong className="text-foreground">БИК:</strong> 044525593</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <ul className="space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Телефон:</strong> <a href="tel:+79645000040" className="text-primary hover:underline">+7 (964) 500-00-40</a></li>
              <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:moscow@articon.pro" className="text-primary hover:underline">moscow@articon.pro</a></li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Delivery;

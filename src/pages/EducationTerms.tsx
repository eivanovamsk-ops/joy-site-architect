import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EducationTerms = () => {
  return (
    <Layout>
      <Helmet>
        <title>Согласие на обработку персональных данных — Учебный центр Артикон</title>
        <meta
          name="description"
          content="Согласие на обработку персональных данных слушателей Учебного центра ООО «АРТИКОН». Условия и порядок обработки данных при регистрации на курсы."
        />
        <link rel="canonical" href="https://articon.pro/education/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/education"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться в Учебный центр
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Согласие на обработку персональных данных
            </h1>
            <p className="text-muted-foreground mb-8">
              Учебный центр ООО «АРТИКОН». Редакция от 20.04.2026
            </p>

            <article className="prose prose-slate max-w-none space-y-6 text-foreground">
              <section>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящим, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
                  «О персональных данных», я, как субъект персональных данных, свободно,
                  своей волей и в своем интересе даю согласие Обществу с ограниченной
                  ответственностью «АРТИКОН» на обработку моих персональных данных на
                  условиях, изложенных ниже.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">1. Оператор персональных данных</h2>
                <ul className="text-muted-foreground space-y-1 leading-relaxed">
                  <li>Полное наименование: ООО «АРТИКОН»</li>
                  <li>ИНН: 7735570899 / КПП: 772401001 / ОГРН: 1107746609134</li>
                  <li>
                    Адрес: 115230, г. Москва, Каширское шоссе, д. 3, к. 2, стр. 4,
                    этаж 1, ком. 32
                  </li>
                  <li>Контакты: +7 (906) 045-75-37, edu@articon.pro</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">2. Перечень персональных данных</h2>
                <p className="text-muted-foreground mb-2">
                  Согласие распространяется на обработку следующих персональных данных:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>фамилия, имя, отчество;</li>
                  <li>контактный телефон, адрес электронной почты;</li>
                  <li>город, наименование организации, должность, специализация;</li>
                  <li>аккаунт в мессенджере Telegram;</li>
                  <li>сведения о выбранном курсе, дате обучения и форме оплаты;</li>
                  <li>иные данные, добровольно предоставленные при заполнении форм на сайте.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">3. Цели обработки</h2>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>регистрация на образовательные курсы, мастер-классы, вебинары и конференции;</li>
                  <li>заключение и исполнение договоров на оказание образовательных услуг;</li>
                  <li>обработка оплаты и оформление кассовых документов;</li>
                  <li>выдача сертификатов и удостоверений по итогам обучения;</li>
                  <li>информирование о расписании, изменениях программ и анонсах;</li>
                  <li>направление информационных и рекламных сообщений;</li>
                  <li>обратная связь и улучшение качества образовательных услуг.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">4. Перечень действий с данными</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие предоставляется на совершение следующих действий: сбор,
                  запись, систематизация, накопление, хранение, уточнение (обновление,
                  изменение), извлечение, использование, передача (предоставление,
                  доступ), обезличивание, блокирование, удаление, уничтожение
                  персональных данных как с использованием средств автоматизации, так и
                  без таковых.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">5. Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие распространяется на передачу персональных данных следующим
                  категориям третьих лиц:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>АО «ТБанк» — для приема оплаты за образовательные услуги;</li>
                  <li>сервису Unisender — для отправки информационных и рекламных писем;</li>
                  <li>государственным органам — на основаниях, предусмотренных законодательством.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">6. Срок действия согласия</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Согласие действует с момента его предоставления и до момента его
                  отзыва. Согласие может быть отозвано путем направления письменного
                  заявления на электронный адрес{" "}
                  <a href="mailto:edu@articon.pro" className="text-primary hover:underline">
                    edu@articon.pro
                  </a>{" "}
                  или по почтовому адресу Оператора.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  После отзыва согласия Оператор прекращает обработку персональных
                  данных и уничтожает их в срок, не превышающий 30 дней, за исключением
                  данных, которые подлежат хранению в силу требований законодательства РФ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">7. Подтверждение согласия</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Подтверждением согласия является заполнение и отправка любой формы
                  обратной связи, формы записи на курс, формы подписки на рассылку или
                  иной формы на сайте{" "}
                  <a href="https://articon.pro/education" className="text-primary hover:underline">
                    articon.pro/education
                  </a>
                  . Совершение указанных действий означает безоговорочное принятие
                  условий настоящего Согласия и Политики конфиденциальности.
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EducationTerms;

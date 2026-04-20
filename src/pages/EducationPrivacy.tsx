import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EducationPrivacy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Политика конфиденциальности Учебного центра — Артикон</title>
        <meta
          name="description"
          content="Политика обработки и защиты персональных данных слушателей Учебного центра ООО «АРТИКОН»."
        />
        <link rel="canonical" href="https://articon.pro/education/privacy" />
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
              Политика конфиденциальности
            </h1>
            <p className="text-muted-foreground mb-8">
              Учебный центр ООО «АРТИКОН». Редакция от 20.04.2026
            </p>

            <article className="prose prose-slate max-w-none space-y-6 text-foreground">
              <section>
                <h2 className="text-xl font-bold mb-3">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящая Политика обработки персональных данных (далее — «Политика»)
                  разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
                  «О персональных данных» и определяет порядок обработки персональных
                  данных и меры по обеспечению их безопасности, предпринимаемые
                  Обществом с ограниченной ответственностью «АРТИКОН» (далее — «Оператор»)
                  при оказании образовательных услуг.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">2. Сведения об Операторе</h2>
                <ul className="text-muted-foreground space-y-1 leading-relaxed">
                  <li>Полное наименование: Общество с ограниченной ответственностью «АРТИКОН»</li>
                  <li>ИНН: 7735570899</li>
                  <li>КПП: 772401001</li>
                  <li>ОГРН: 1107746609134</li>
                  <li>
                    Юридический адрес: 115230, г. Москва, Каширское шоссе, д. 3, к. 2,
                    стр. 4, этаж 1, комната 32
                  </li>
                  <li>Телефон: +7 (906) 045-75-37</li>
                  <li>E-mail: edu@articon.pro</li>
                  <li>Директор: Артемов Виктор Юрьевич</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">3. Цели обработки персональных данных</h2>
                <p className="text-muted-foreground mb-2">Оператор обрабатывает персональные данные в следующих целях:</p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>организация и проведение образовательных курсов, мастер-классов, вебинаров и конференций;</li>
                  <li>заключение и исполнение договоров на оказание образовательных услуг;</li>
                  <li>оформление и выдача сертификатов и удостоверений о прохождении обучения;</li>
                  <li>информирование о расписании занятий, изменениях программ и анонсах новых курсов;</li>
                  <li>обработка платежей и возвратов денежных средств;</li>
                  <li>направление маркетинговых и информационных рассылок (при наличии согласия);</li>
                  <li>выполнение требований законодательства РФ, в том числе налогового и бухгалтерского учета.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">4. Категории обрабатываемых данных</h2>
                <p className="text-muted-foreground mb-2">Оператор обрабатывает следующие категории персональных данных:</p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>фамилия, имя, отчество;</li>
                  <li>контактный телефон;</li>
                  <li>адрес электронной почты;</li>
                  <li>город проживания;</li>
                  <li>наименование организации и должность (для слушателей от юридических лиц);</li>
                  <li>специализация и профессиональная квалификация;</li>
                  <li>аккаунт в мессенджере Telegram (при добровольном указании);</li>
                  <li>сведения о выбранном курсе и форме оплаты;</li>
                  <li>файлы cookie, IP-адрес, технические данные браузера.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">5. Правовые основания обработки</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Обработка персональных данных осуществляется на основании согласия
                  субъекта персональных данных, договора на оказание образовательных услуг,
                  а также в случаях, предусмотренных Федеральным законом № 152-ФЗ
                  «О персональных данных» и иными нормативными правовыми актами РФ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">6. Порядок и условия обработки</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Обработка персональных данных осуществляется с использованием средств
                  автоматизации и без таковых. Оператор принимает технические и
                  организационные меры для защиты данных от неправомерного доступа,
                  изменения, блокирования, копирования, распространения и иных
                  неправомерных действий, в том числе:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>использование защищенных каналов связи (HTTPS);</li>
                  <li>разграничение прав доступа сотрудников к персональным данным;</li>
                  <li>применение средств антивирусной защиты;</li>
                  <li>резервное копирование данных и контроль целостности.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">7. Передача персональных данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Оператор вправе передавать персональные данные третьим лицам исключительно
                  в целях, указанных в настоящей Политике, а именно:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>банковским организациям и платежным агрегаторам (АО «ТБанк») для приема оплаты;</li>
                  <li>сервисам email-рассылок (Unisender) при наличии согласия на маркетинговые коммуникации;</li>
                  <li>государственным органам по их законному запросу.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">8. Сроки обработки и хранения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Персональные данные обрабатываются в течение срока, необходимого для
                  достижения целей обработки, а также в течение сроков, установленных
                  законодательством РФ (включая требования к хранению бухгалтерской и
                  налоговой документации). По истечении сроков данные подлежат уничтожению
                  или обезличиванию.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">9. Права субъекта персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Субъект персональных данных имеет право:
                </p>
                <ul className="text-muted-foreground space-y-1 list-disc pl-6">
                  <li>получать информацию о факте, целях и способах обработки своих данных;</li>
                  <li>требовать уточнения, блокирования или уничтожения данных, если они неполны, устарели или неточны;</li>
                  <li>отозвать согласие на обработку персональных данных;</li>
                  <li>отказаться от получения рекламных и маркетинговых рассылок;</li>
                  <li>обжаловать действия Оператора в Роскомнадзоре или в суде.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">10. Использование файлов cookie</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Сайт использует файлы cookie и аналогичные технологии для обеспечения
                  работы сервисов, аналитики посещаемости и улучшения качества обслуживания.
                  Пользователь может отключить cookie в настройках браузера.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">11. Контактная информация</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Для отзыва согласия на обработку персональных данных, реализации иных
                  прав субъекта персональных данных или направления вопросов по настоящей
                  Политике, обращайтесь по адресу:{" "}
                  <a href="mailto:edu@articon.pro" className="text-primary hover:underline">
                    edu@articon.pro
                  </a>{" "}
                  или по телефону{" "}
                  <a href="tel:+79060457537" className="text-primary hover:underline">
                    +7 (906) 045-75-37
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3">12. Изменение Политики</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор вправе вносить изменения в настоящую Политику. Актуальная
                  редакция всегда доступна по адресу{" "}
                  <a href="https://articon.pro/education/privacy" className="text-primary hover:underline">
                    articon.pro/education/privacy
                  </a>
                  .
                </p>
              </section>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EducationPrivacy;

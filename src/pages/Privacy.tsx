import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Политика конфиденциальности | Артикон</title>
        <meta
          name="description"
          content="Политика конфиденциальности ООО «Артикон Трейд». Защита персональных данных в соответствии с законодательством РФ."
        />
        <link rel="canonical" href="https://articon.pro/privacy" />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">
            Редакция от 01 января 2026 года
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки 
              и защиты персональных данных физических лиц (далее — «Пользователи»), использующих 
              веб-сайт articon.pro (далее — «Сайт»), принадлежащий ООО «Артикон Трейд» 
              (ИНН 7725752561, ОГРН 1127746237607).
            </p>
            <p>
              Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ 
              «О персональных данных» и иными нормативными правовыми актами Российской Федерации 
              в области защиты персональных данных.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. Оператор персональных данных</h2>
            <p>
              <strong className="text-foreground">Оператор:</strong> Общество с ограниченной ответственностью «Артикон Трейд»
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Юридический адрес:</strong> 115230, г. Москва, Варшавское шоссе, дом 33, строение 12</li>
              <li><strong className="text-foreground">ИНН:</strong> 7725752561</li>
              <li><strong className="text-foreground">ОГРН:</strong> 1127746237607</li>
              <li><strong className="text-foreground">E-mail:</strong> moscow@articon.pro</li>
              <li><strong className="text-foreground">Телефон:</strong> +7 (964) 500-00-40</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. Цели обработки персональных данных</h2>
            <p>Оператор обрабатывает персональные данные в следующих целях:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Исполнение договорных обязательств перед Пользователем (оформление и доставка заказов)</li>
              <li>Обработка входящих запросов и обратная связь</li>
              <li>Регистрация на курсы и образовательные мероприятия</li>
              <li>Направление информационных и рекламных материалов (при наличии согласия)</li>
              <li>Улучшение качества обслуживания и работы Сайта</li>
              <li>Соблюдение требований законодательства РФ</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Категории обрабатываемых данных</h2>
            <p>Оператор может обрабатывать следующие персональные данные:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Фамилия, имя, отчество</li>
              <li>Контактный телефон</li>
              <li>Адрес электронной почты (e-mail)</li>
              <li>Адрес доставки</li>
              <li>Реквизиты организации (для юридических лиц)</li>
              <li>Данные о заказах и обращениях</li>
              <li>Файлы cookie и данные об использовании Сайта</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Правовые основания обработки</h2>
            <p>Обработка персональных данных осуществляется на основании:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Согласия субъекта персональных данных (ст. 6 ч. 1 п. 1 ФЗ-152)</li>
              <li>Исполнения договора, стороной которого является субъект (ст. 6 ч. 1 п. 5 ФЗ-152)</li>
              <li>Законных интересов Оператора (ст. 6 ч. 1 п. 7 ФЗ-152)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Защита персональных данных</h2>
            <p>
              Оператор принимает необходимые и достаточные организационные и технические меры 
              для защиты персональных данных от неправомерного или случайного доступа, уничтожения, 
              изменения, блокирования, копирования, распространения, а также от иных неправомерных 
              действий с ними третьих лиц.
            </p>
            <p>Меры защиты включают:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Использование защищённого протокола HTTPS</li>
              <li>Ограничение доступа к персональным данным</li>
              <li>Регулярное обновление средств защиты</li>
              <li>Обучение сотрудников правилам работы с персональными данными</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Права субъекта персональных данных</h2>
            <p>Пользователь имеет право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получить информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения своих данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать действия Оператора в Роскомнадзор или в суд</li>
            </ul>
            <p>
              Для реализации своих прав Пользователь может направить запрос на адрес: 
              <a href="mailto:moscow@articon.pro" className="text-primary hover:underline"> moscow@articon.pro</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">8. Передача данных третьим лицам</h2>
            <p>
              Оператор может передавать персональные данные третьим лицам только в случаях, 
              предусмотренных законодательством РФ, а также:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Службам доставки для исполнения заказа (СДЭК, Boxberry, курьерские службы)</li>
              <li>Платёжным системам для обработки оплаты</li>
              <li>По запросу уполномоченных государственных органов</li>
            </ul>
            <p>
              Трансграничная передача персональных данных не осуществляется.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">9. Файлы cookie</h2>
            <p>
              Сайт использует файлы cookie для обеспечения корректной работы, анализа трафика 
              и персонализации контента. Пользователь может отключить cookie в настройках браузера, 
              однако это может повлиять на функциональность Сайта.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">10. Сроки хранения данных</h2>
            <p>
              Персональные данные хранятся не дольше, чем этого требуют цели обработки, 
              если иной срок не установлен законодательством РФ. По достижении целей обработки 
              или по требованию субъекта персональные данные уничтожаются.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">11. Изменение Политики</h2>
            <p>
              Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция 
              размещается на Сайте. Продолжение использования Сайта после внесения изменений 
              означает согласие с обновлённой Политикой.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t">
            <h2 className="text-xl font-semibold text-foreground">Контактная информация</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:
            </p>
            <ul className="list-none space-y-2">
              <li><strong className="text-foreground">ООО «Артикон Трейд»</strong></li>
              <li>115230, г. Москва, Варшавское шоссе, дом 33, строение 12</li>
              <li>Телефон: <a href="tel:+79645000040" className="text-primary hover:underline">+7 (964) 500-00-40</a></li>
              <li>E-mail: <a href="mailto:moscow@articon.pro" className="text-primary hover:underline">moscow@articon.pro</a></li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

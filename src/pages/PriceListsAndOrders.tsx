import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Handshake } from "lucide-react";

const priceListFiles = [
  {
    id: "ortho-standard",
    name: "Ортопедический стандарт прайс-лист",
    image: "https://static.wixstatic.com/media/526e65_939eed1db8e44ee8ab1ae85164236976~mv2.jpg/v1/crop/x_0,y_204,w_2482,h_3100/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9F%D1%80%D0%B0%D0%B9%D1%81%20%D0%BE%D1%80%D1%82%D0%BE%D0%BF%D0%B5%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82.jpg",
    url: "https://www.articondental.ru/_files/ugd/526e65_712057c4739349c2936e7224195b7e77.pdf",
  },
  {
    id: "orthodontic-price",
    name: "Ортодонтический прайс-лист",
    image: "https://static.wixstatic.com/media/526e65_d49c233e32e849a7a97799cee65a3f87~mv2.jpg/v1/crop/x_0,y_204,w_2482,h_3100/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9E%D1%80%D1%82%D0%BE%D0%B4%D0%BE%D0%BD%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%20%D0%BF%D1%80%D0%B0%D0%B9%D1%81%2027_04_2020.jpg",
    url: "https://www.articondental.ru/_files/ugd/526e65_32dd5ace765f4538b47fe49537c69f0b.pdf",
  },
  {
    id: "ortho-master",
    name: "Ортопедический мастер прайс-лист",
    image: "https://static.wixstatic.com/media/526e65_6fa5fb02ef924e3e97b1f6aa7afd42f7~mv2.jpg/v1/crop/x_0,y_204,w_2482,h_3100/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9F%D1%80%D0%B0%D0%B9%D1%81%20%D0%BE%D1%80%D1%82%D0%BE%D0%BF%D0%B5%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BC%D0%B0%D1%81%D1%82%D0%B5%D1%80.jpg",
    url: "https://www.articondental.ru/_files/ugd/526e65_28d6676ad3f94f9aa4410a704bf321df.pdf",
  },
  {
    id: "milling-stl",
    name: "Фрезерный центр прайс-лист с STL файла",
    image: "https://static.wixstatic.com/media/e92af1_e67e6adc66cb45a9a94fd92c62c86df0~mv2.jpg/v1/crop/x_0,y_208,w_2482,h_3093/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%A4%D1%80%D0%B5%D0%B7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%D1%81%20STL.jpg",
    url: "https://www.articondental.ru/_files/ugd/99c926_24fc31edc50d47a08580af9d1e7019c8.pdf",
  },
  {
    id: "surgical-templates",
    name: "Хирургические шаблоны прайс-лист",
    image: "https://static.wixstatic.com/media/e92af1_727aa5b40b7a454682f8d041b275f1d0~mv2.jpg/v1/crop/x_0,y_208,w_2482,h_3093/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%A5%D0%B8%D1%80%20%D1%88%D0%B0%D0%B1.jpg",
    url: "https://www.articondental.ru/_files/ugd/526e65_6418d39f455a4471ae13f635fa34ebee.pdf",
  },
  {
    id: "milling-model",
    name: "Фрезерный центр прайс-лист с уровня модели",
    image: "https://static.wixstatic.com/media/e92af1_c7ae0f154bf8418ba7965604a46a6f9b~mv2.jpg/v1/crop/x_0,y_208,w_2482,h_3093/fill/w_244,h_306,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%A4%D1%80%D0%B5%D0%B7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20%D1%81%20%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D1%8F%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D0%B8.jpg",
    url: "https://www.articondental.ru/_files/ugd/99c926_7f6f801859a84b3897a30e9e692a1e93.pdf",
  },
];

const orderFormFiles = [
  {
    id: "lab-order",
    name: "Лабораторный заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_e9356e5c9e0a458ea8a7fc0ee0b4e2f1~mv2.png/v1/crop/x_11,y_0,w_729,h_910/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9E%D1%80%D1%82%D0%BE%D0%B4%D0%BE%D0%BD%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7-%D0%BD%D0%B0%D1%80%D1%8F%D0%B4%2007_05_2020-0.png",
    url: "https://www.articondental.ru/_files/ugd/99c926_488ee19a0e424933bc94418556982c06.pdf",
  },
  {
    id: "surgical-order",
    name: "Хирургические шаблоны заказ-наряд",
    image: "https://static.wixstatic.com/media/e92af1_fa02bc1063ae4f989de629e1d4c1bb28~mv2.png/v1/crop/x_0,y_12,w_2931,h_3661/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%20%D0%90%D1%80%D1%82%D0%B8%D0%BA%D0%BE%D0%BD%20%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%20%D0%BD%D0%B0%D1%80%D1%8F%D0%B4%20%D0%B4%D0%BB%D1%8F%20%D1%85%D0%B8%D1%80_%D1%88%D0%B0%D0%B1_%20.png",
    url: "https://www.articondental.ru/_files/ugd/99c926_c3c2cbd356764123b45d37eca5930d2e.pdf",
  },
  {
    id: "removable-order",
    name: "Съемные аппараты заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_c53916e50d0b4f2eb5f46d71877dfc05~mv2.png/v1/crop/x_0,y_12,w_3584,h_4477/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%20%D0%BD%D0%B0%D1%80%D1%8F%D0%B4_%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%201%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%202.png",
    url: "https://www.articondental.ru/_files/ugd/99c926_88fc2f1ccf6c4ca584c2bf7b907792ce.pdf",
  },
  {
    id: "esthetics-smilecloud",
    name: "Эстетика & SmileCloud заказ-наряд | Мастер прайс",
    image: "https://static.wixstatic.com/media/99c926_1b9d707cbcd0485abba116dbeff133c1~mv2.jpg/v1/crop/x_9,y_0,w_760,h_949/fill/w_261,h_326,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7-%D0%BD%D0%B0%D1%80%D1%8F%D0%B4%20%D0%AD%D1%81%D1%82%D0%B5%D1%82%D0%B8%D0%BA%D0%B0%20%D0%B8%20SmileCloud%2010_07_2025_333.jpg",
    url: "https://www.articondental.ru/_files/ugd/99c926_f59d33c2016b48258bce9e1b4f6898be.pdf",
  },
  {
    id: "tmj-order",
    name: "ВНЧС заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_5f734623f3af454889705c65047abe6b~mv2.png/v1/crop/x_28,y_0,w_2424,h_3028/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%91%D0%B5%D0%B7%20%D0%B8%D0%BC%D0%B5%D0%BD%D0%B8-1.png",
    url: "https://www.articondental.ru/_files/ugd/526e65_ca425528f787431a89ccca5f2777ed2f.pdf",
  },
  {
    id: "fixed-order-1",
    name: "Несъемные аппараты заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_4cd50b6fa6a643679b1098cab78f3abd~mv2.png/v1/crop/x_45,y_0,w_3039,h_3796/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0%202.png",
    url: "https://www.articondental.ru/_files/ugd/526e65_21ebe595bedb423bb7cbcabe20f76f27.pdf",
  },
  {
    id: "easycrown-order",
    name: "EasyCROWN заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_b9cf3e113317471ba5f69a2b376a6191~mv2.jpg/v1/crop/x_45,y_0,w_3039,h_3796/fill/w_261,h_326,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%20%D0%BD%D0%B0%D1%80%D1%8F%D0%B4%20EasyCROWN%2016_06_2023.jpg",
    url: "https://www.articondental.ru/_files/ugd/99c926_2f5902d347004ad4ac745b07c4ed12c3.pdf",
  },
  {
    id: "aligners-order",
    name: "Элайнеры заказ-наряд",
    image: "https://static.wixstatic.com/media/526e65_907f169a623649a4a1ecd861c416ca2d~mv2.png/v1/crop/x_0,y_12,w_3584,h_4477/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%20%D0%BD%D0%B0%D1%80%D1%8F%D0%B4_%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%201.png",
    url: "https://www.articondental.ru/_files/ugd/99c926_84b802ad4a0d4f92b1b093ba92c78513.pdf",
  },
  {
    id: "fixed-order-2",
    name: "Несъемные аппараты заказ-наряд (2)",
    image: "https://static.wixstatic.com/media/526e65_510cd9ca19984889bae3877ca0284523~mv2.png/v1/crop/x_45,y_0,w_3039,h_3796/fill/w_261,h_326,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0%201.png",
    url: "https://www.articondental.ru/_files/ugd/526e65_1227287d75244ab8b3b3f1532e24e5f0.pdf",
  },
];

interface FileCardProps {
  name: string;
  image: string;
  url: string;
}

const FileCard = ({ name, image, url }: FileCardProps) => (
  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
    <div className="aspect-[3/4] overflow-hidden bg-muted">
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="text-sm font-medium text-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
        {name}
      </h3>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Скачать
        </Button>
      </a>
    </div>
  </Card>
);

const PriceListsAndOrders = () => {
  return (
    <Layout>
      <Helmet>
        <title>Прайс-листы и заказ-наряды | Артикон Лаборатория</title>
        <meta name="description" content="Скачайте актуальные прайс-листы и бланки заказ-нарядов зуботехнической лаборатории Артикон. Ортопедические, ортодонтические, фрезерные прайсы." />
        <link rel="canonical" href="https://articon.pro/laboratory/documents" />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Прайс-листы и заказ-наряды
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Скачайте актуальные прайс-листы и бланки заказ-нарядов для оформления заказов в нашей лаборатории
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 shrink-0"
            >
              <a href="https://t.me/articonrazvitie" target="_blank" rel="noopener noreferrer">
                <Handshake className="mr-2 h-5 w-5" />
                Начать сотрудничество
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Price Lists Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Прайс-листы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {priceListFiles.map((file) => (
              <FileCard key={file.id} {...file} />
            ))}
          </div>
        </div>
      </section>

      {/* Order Forms Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Заказ-наряды</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {orderFormFiles.map((file) => (
              <FileCard key={file.id} {...file} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PriceListsAndOrders;

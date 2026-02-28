import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Handshake } from "lucide-react";

const priceListFiles = [
  {
    id: "ortho-standard",
    name: "Ортопедический стандарт прайс-лист",
    image: "/images/docs/price-ortho-standard.jpg",
    url: "/docs/price-ortho-standard.pdf",
  },
  {
    id: "orthodontic-price",
    name: "Ортодонтический прайс-лист",
    image: "/images/docs/price-orthodontic.jpg",
    url: "/docs/price-orthodontic.pdf",
  },
  {
    id: "ortho-master",
    name: "Ортопедический мастер прайс-лист",
    image: "/images/docs/price-ortho-master.jpg",
    url: "/docs/price-ortho-master.pdf",
  },
  {
    id: "milling-stl",
    name: "Фрезерный центр прайс-лист с STL файла",
    image: "/images/docs/price-milling-stl.jpg",
    url: "/docs/price-milling-stl.pdf",
  },
  {
    id: "surgical-templates",
    name: "Хирургические шаблоны прайс-лист",
    image: "/images/docs/price-surgical-templates.jpg",
    url: "/docs/price-surgical-templates.pdf",
  },
  {
    id: "milling-model",
    name: "Фрезерный центр прайс-лист с уровня модели",
    image: "/images/docs/price-milling-model.jpg",
    url: "/docs/price-milling-model.pdf",
  },
];

const orderFormFiles = [
  {
    id: "lab-order",
    name: "Лабораторный заказ-наряд",
    image: "/images/docs/order-lab.jpg",
    url: "/docs/order-lab.pdf",
  },
  {
    id: "surgical-order",
    name: "Хирургические шаблоны заказ-наряд",
    image: "/images/docs/order-surgical.jpg",
    url: "/docs/order-surgical.pdf",
  },
  {
    id: "removable-order",
    name: "Съемные аппараты заказ-наряд",
    image: "/images/docs/order-removable.jpg",
    url: "/docs/order-removable.pdf",
  },
  {
    id: "esthetics-smilecloud",
    name: "Эстетика & SmileCloud заказ-наряд",
    image: "/images/docs/order-esthetics-smilecloud.jpg",
    url: "/docs/order-esthetics-smilecloud.pdf",
  },
  {
    id: "tmj-order",
    name: "ВНЧС заказ-наряд",
    image: "/images/docs/order-tmj.jpg",
    url: "/docs/order-tmj.pdf",
  },
  {
    id: "fixed-order",
    name: "Несъемные аппараты заказ-наряд",
    image: "/images/docs/order-fixed.jpg",
    url: "/docs/order-fixed.pdf",
  },
  {
    id: "fixed-cortical-order",
    name: "Несъемные аппараты с кортикальной опорой заказ-наряд",
    image: "/images/docs/order-fixed-cortical.jpg",
    url: "/docs/order-fixed-cortical.pdf",
  },
  {
    id: "aligners-order",
    name: "Элайнеры заказ-наряд",
    image: "/images/docs/order-aligners.jpg",
    url: "/docs/order-aligners.pdf",
  },
];

interface FileCardProps {
  name: string;
  image?: string;
  url: string;
}

const FileCard = ({ name, image, url }: FileCardProps) => (
  <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
    {image ? (
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ) : (
      <div className="aspect-[3/4] flex items-center justify-center bg-muted/50">
        <Download className="h-12 w-12 text-muted-foreground/40" />
      </div>
    )}
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

import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const intraoralScanners: Product[] = [
  {
    id: "ios-1",
    name: "Интраоральный сканер Runyes 3DS V3",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 390000,
    image: "https://articon.pro/wp-content/uploads/2024/01/Runyes-3DS-300x300.jpg",
    brand: "Runyes",
    inStock: true,
  },
  {
    id: "ios-2",
    name: "Интраоральный сканер Runyes 3DS V5",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 450000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-58-300x300.jpg",
    brand: "Runyes",
    inStock: true,
  },
  {
    id: "ios-3",
    name: "Интраоральный сканер Runyes 3DS V6",
    category: "3d-scanners",
    subcategory: "clinical",
    price: 600000,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-62-300x300.jpg",
    brand: "Runyes",
    inStock: true,
    isNew: true,
  },
];

const accessories: Product[] = [
  {
    id: "acc-1",
    name: "Антибликовый спрей 3D – Helling – 400 мл",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 2850,
    image: "https://articon.pro/wp-content/uploads/2024/01/%D0%90%D0%BD%D1%82%D0%B8%D0%B1%D0%BB%D0%B8%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9-%D1%81%D0%BF%D1%80%D0%B5%D0%B9-300x300.png",
    brand: "Helling",
    inStock: true,
  },
  {
    id: "acc-2",
    name: "Стойка мобильная для работы с интраоральным сканером",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 390000,
    image: "https://articon.pro/wp-content/uploads/2024/07/CDM-3S-300x300.jpg",
    brand: "Articon",
    inStock: true,
  },
  {
    id: "acc-3",
    name: "Шаблон Screw jig для сканера Medit T310/T510",
    category: "3d-scanners",
    subcategory: "accessories",
    price: 35000,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-Medit-Screw-Jig-T310-T510-T710-300x300.jpg",
    brand: "Medit",
    inStock: true,
  },
];

const IntraoralScanners = () => {
  return (
    <Layout>
      <Helmet>
        <title>Интраоральные сканеры | Артикон</title>
        <meta 
          name="description" 
          content="Интраоральные 3D сканеры для стоматологии. Runyes 3DS, Medit T310, T510, T710. Высокое качество сканирования, удобство использования. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Интраоральные 3D-сканеры
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Интраоральные сканеры для клинического применения — точная цифровая диагностика 
              и планирование лечения. Лабораторные сканеры для высокоточного сканирования 
              моделей и оттисков.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <CatalogSidebar />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Intraoral Scanners Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Врачебные (интраоральные)</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {intraoralScanners.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Accessories Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Аксессуары для сканеров</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {accessories.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntraoralScanners;

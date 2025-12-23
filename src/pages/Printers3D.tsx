import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const printers: Product[] = [
  {
    id: "printer-1",
    name: "3D принтер Asiga PRO 4K",
    category: "3d-printing",
    subcategory: "printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-PN04634-3D-printer-Asiga-PRO-4K-UV-300x300.jpg",
    brand: "Asiga",
    inStock: true,
  },
  {
    id: "printer-2",
    name: "3D принтер Uniformation GK3",
    category: "3d-printing",
    subcategory: "printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-285-24-300x300.jpg",
    brand: "Uniformation",
    inStock: true,
    isNew: true,
  },
  {
    id: "printer-3",
    name: "3D принтер Uniformation GK3 Ultra",
    category: "3d-printing",
    subcategory: "printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/02/Uniformation-GK3-Ultra-1-300x300.jpg",
    brand: "Uniformation",
    inStock: true,
    isNew: true,
  },
  {
    id: "printer-4",
    name: "3D-принтер Asiga MAX UV",
    category: "3d-printing",
    subcategory: "printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-PN02391-3D-printer-Asiga-Max-UV-300x300.jpg",
    brand: "Asiga",
    inStock: true,
  },
  {
    id: "printer-5",
    name: "3D-принтер UltraCraft A2D HD от HeyGears",
    category: "3d-printing",
    subcategory: "printers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-2-300x300.png",
    brand: "HeyGears",
    inStock: true,
    isNew: true,
  },
];

const accessories: Product[] = [
  {
    id: "acc-printer-1",
    name: "Полимеризационная камера Uniformation Cure 3 Ultra",
    category: "3d-printing",
    subcategory: "accessories",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/02/Frame-285-27-300x300.jpg",
    brand: "Uniformation",
    inStock: true,
    isNew: true,
  },
  {
    id: "acc-printer-2",
    name: "Ультразвуковая ванна UltraSonic Resin Cleaner W230",
    category: "3d-printing",
    subcategory: "accessories",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-811546-300x300.png",
    brand: "UltraSonic",
    inStock: true,
  },
];

const Printers3D = () => {
  return (
    <Layout>
      <Helmet>
        <title>3D-принтеры | Артикон</title>
        <meta 
          name="description" 
          content="3D-принтеры для стоматологии: Asiga PRO 4K, Uniformation GK3, HeyGears UltraCraft. Высокоточная печать моделей, капп, хирургических шаблонов. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            3D-принтеры
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные 3D-принтеры для стоматологических клиник и лабораторий. 
            Высокоточная печать моделей, капп, хирургических шаблонов и временных реставраций.
          </p>
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
            {/* Printers Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">3D-принтеры</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {printers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Accessories Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Оборудование для постобработки</h2>
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

export default Printers3D;

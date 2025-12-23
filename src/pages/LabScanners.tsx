import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const laboratoryScanners: Product[] = [
  {
    id: "lab-1",
    name: "Medit T310 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 655000,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-Medit-T310-Scanner-300x300.jpg",
    brand: "Medit",
    inStock: true,
    isSale: true,
  },
  {
    id: "lab-2",
    name: "Medit T510 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-Medit-T510-Scanner-300x300.jpg",
    brand: "Medit",
    inStock: true,
  },
  {
    id: "lab-3",
    name: "Medit T710 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-Medit-T710-Scanner-300x300.jpg",
    brand: "Medit",
    inStock: true,
  },
];

const LabScanners = () => {
  return (
    <Layout>
      <Helmet>
        <title>Лабораторные 3D сканеры | Артикон</title>
        <meta 
          name="description" 
          content="Лабораторные 3D сканеры Medit T310, T510, T710 для зуботехнических лабораторий. Высокоточное сканирование моделей и оттисков. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Лабораторные 3D-сканеры
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Лабораторные сканеры Medit для высокоточного сканирования моделей, оттисков 
              и артикуляторов. Идеальное решение для зуботехнических лабораторий.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Сканеры Medit</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {laboratoryScanners.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LabScanners;

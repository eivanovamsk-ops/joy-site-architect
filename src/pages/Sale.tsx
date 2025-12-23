import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";
import { Tag } from "lucide-react";

const saleProducts: Product[] = [
  {
    id: "sale-1",
    name: "Лоток встраиваемый Build Tray – Asiga – 10L – MAX",
    category: "3d-printing",
    subcategory: "accessories",
    price: 30700,
    image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-15-300x300.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
  },
  {
    id: "sale-2",
    name: "Лоток встраиваемый Build Tray – Asiga – 5L – MAX",
    category: "3d-printing",
    subcategory: "accessories",
    price: 18700,
    image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-15-300x300.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
  },
  {
    id: "sale-3",
    name: "Лоток встраиваемый Build Tray – Asiga – 2L – MAX",
    category: "3d-printing",
    subcategory: "accessories",
    price: 13600,
    image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-15-300x300.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
  },
  {
    id: "sale-4",
    name: "Лоток встраиваемый Build Tray – Asiga – 1L – MAX",
    category: "3d-printing",
    subcategory: "accessories",
    price: 9500,
    image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-15-300x300.jpg",
    brand: "Asiga",
    inStock: true,
    isSale: true,
  },
  {
    id: "sale-5",
    name: "Фотополимер TOPCORE Model Pro",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 6500,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Model-Pro-300x300.png",
    brand: "TOPCORE",
    inStock: true,
    isSale: true,
  },
  {
    id: "sale-6",
    name: "Medit T310 Лабораторный 3D сканер",
    category: "3d-scanners",
    subcategory: "laboratory",
    price: 655000,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-Medit-T310-Scanner-300x300.jpg",
    brand: "Medit",
    inStock: true,
    isSale: true,
  },
];

const Sale = () => {
  return (
    <Layout>
      <Helmet>
        <title>Распродажа | Артикон</title>
        <meta 
          name="description" 
          content="Покупайте товары по выгодной цене! Скидки на 3D-сканеры, принтеры, фотополимеры и аксессуары для стоматологических лабораторий." 
        />
      </Helmet>

      <div className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <Tag className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Покупайте товары по выгодной цене!
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Специальные предложения и скидки на оборудование и расходные материалы 
            для стоматологических клиник и лабораторий.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Sale;

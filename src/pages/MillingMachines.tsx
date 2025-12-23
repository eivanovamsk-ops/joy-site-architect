import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const millingMachines: Product[] = [
  {
    id: "mill-1",
    name: "Фрезерный Станок CAD CAM Upcera A52",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/06/CAD-CAM-Upcera-A52-300x300.jpg",
    brand: "UPCERA",
    inStock: true,
  },
  {
    id: "mill-2",
    name: "Фрезерный станок CORiTEC 150i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-511007-20150-Imes-Icore-CORiTEC-150i-PRO-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "mill-3",
    name: "Фрезерный станок CORiTEC 350i",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-511004-0351-Imes-Icore-CORiTEC-350i-PRO-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "mill-4",
    name: "Фрезерный станок UPCERA A52DW",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/09/Frame-285-69-300x300.jpg",
    brand: "UPCERA",
    inStock: true,
  },
  {
    id: "mill-5",
    name: "Фрезерный станок UPCERA B52",
    category: "milling",
    subcategory: "machines",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/06/Frame-811546-5-300x300.png",
    brand: "UPCERA",
    inStock: true,
  },
];

const accessories: Product[] = [
  {
    id: "mill-acc-1",
    name: "Remeza КМ-50.OLD20 безмасляный компрессор для 2 установок, с ресивером 50 л, 160 л/мин",
    category: "milling",
    subcategory: "accessories",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2024/05/Remeza-%D0%9A%D0%9C-50.OLD20-300x300.jpg",
    brand: "Remeza",
    inStock: true,
  },
  {
    id: "mill-acc-2",
    name: "Пылесос для фрезерных станков сухой обработки",
    category: "milling",
    subcategory: "accessories",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/01/Frame-285-19-300x300.jpg",
    brand: "Articon",
    inStock: true,
  },
];

const MillingMachines = () => {
  return (
    <Layout>
      <Helmet>
        <title>Фрезерные станки CAD/CAM | Артикон</title>
        <meta 
          name="description" 
          content="Фрезерные станки CAD/CAM для зуботехнических лабораторий: CORiTEC, UPCERA. Профессиональное оборудование для фрезерования циркония, PMMA, воска. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фрезерные станки
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные CAD/CAM фрезерные станки для зуботехнических лабораторий. 
            Высокоточное оборудование для обработки циркония, титана, PMMA и других материалов.
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
            {/* Milling Machines Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Станки</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {millingMachines.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Accessories Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">Аксессуары и комплектующие</h2>
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

export default MillingMachines;

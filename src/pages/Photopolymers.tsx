import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogSidebar } from "@/components/shop/CatalogSidebar";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const harzLabsProducts: Product[] = [
  {
    id: "photo-1",
    name: "Фотополимер HARZ Labs Dental Cast Cherry (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: null,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-44-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "photo-2",
    name: "Фотополимер HARZ Labs Dental Model Light Grey (1 кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 9700,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-35-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "photo-3",
    name: "Фотополимер HARZ Labs Dental Sand A1-A2 (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 17900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-41-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "photo-4",
    name: "Фотополимер HARZ Labs Dental Tray V2 (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 9900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-51-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
  {
    id: "photo-5",
    name: "Фотополимер HARZ Labs Dental Yellow Clear PRO (1кг)",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 13900,
    image: "https://articon.pro/wp-content/uploads/2025/04/Frame-285-36-300x300.jpg",
    brand: "HARZ Labs",
    inStock: true,
  },
];

const topcoreProducts: Product[] = [
  {
    id: "photo-6",
    name: "Фотополимер TOPCORE Composite A1",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 11300,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Composite-A1-300x300.png",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "photo-7",
    name: "Фотополимер TOPCORE Composite A2",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 11300,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Composite-A2-300x300.png",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "photo-8",
    name: "Фотополимер TOPCORE Composite A3",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 11300,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Composite-%D0%903-300x300.png",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "photo-9",
    name: "Фотополимер TOPCORE Composite Bleach",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 11300,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Composite-Bleach-300x300.png",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "photo-10",
    name: "Фотополимер TOPCORE Model",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 11300,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Model-300x300.png",
    brand: "TOPCORE",
    inStock: true,
  },
  {
    id: "photo-11",
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
    id: "photo-12",
    name: "Фотополимер TOPCORE Pink",
    category: "3d-printing",
    subcategory: "photopolymers",
    price: 12500,
    image: "https://articon.pro/wp-content/uploads/2024/04/%D0%A4%D0%BE%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80-TOPCORE-Pink-300x300.jpg",
    brand: "TOPCORE",
    inStock: true,
  },
];

const Photopolymers = () => {
  return (
    <Layout>
      <Helmet>
        <title>Фотополимеры для 3D-печати | Артикон</title>
        <meta 
          name="description" 
          content="Фотополимеры для стоматологической 3D-печати: HARZ Labs, TOPCORE. Смолы для моделей, капп, временных коронок, хирургических шаблонов. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фотополимеры
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные фотополимерные смолы для стоматологической 3D-печати. 
            Широкий выбор материалов для моделей, капп, временных реставраций и хирургических шаблонов.
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
            {/* TOPCORE Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">TOPCORE</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {topcoreProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* HARZ Labs Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">HARZ Labs</h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {harzLabsProducts.map((product) => (
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

export default Photopolymers;

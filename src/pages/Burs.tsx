import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

const bursProducts: Product[] = [
  {
    id: "bur-1",
    name: "0,3 мм шаровая концевая фреза (коническая, алмазная), цирконий, ПММА, воск, агломерат, композит (T33, T43, T53)",
    category: "milling",
    subcategory: "burs",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2024/03/w6-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-2",
    name: "0,6 мм шаровая концевая фреза (коническая, алмазная), цирконий, ПММА, воск, металлокерамика, композит (T15, T42, T52)",
    category: "milling",
    subcategory: "burs",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2024/03/w4-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-3",
    name: "1,0 мм шаровая концевая фреза (алмазная), цирконий, ПММА, воск (T12, T14)",
    category: "milling",
    subcategory: "burs",
    price: 6348,
    image: "https://articon.pro/wp-content/uploads/2024/03/w3-1-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-4",
    name: "1,0 мм шаровая концевая фреза (алмазное покрытие), цирконий, металлокерамика, композит (T14, T41, T51)",
    category: "milling",
    subcategory: "burs",
    price: 7590,
    image: "https://articon.pro/wp-content/uploads/2024/03/w7-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-5",
    name: "1,0 мм шаровая концевая фреза (короткая), Ti, CoCr (T4, T9)",
    category: "milling",
    subcategory: "burs",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2024/03/c11-1-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-6",
    name: "1,0 мм шаровая концевая фреза (с алмазным покрытием), Zr, Sint, Comp (T14, T41, T51)",
    category: "milling",
    subcategory: "burs",
    price: 10120,
    image: "https://articon.pro/wp-content/uploads/2024/03/c14-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-7",
    name: "1,0 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T12)",
    category: "milling",
    subcategory: "burs",
    price: 4767,
    image: "https://articon.pro/wp-content/uploads/2024/01/Articon-530004-1003-Imes-Icore-Bur-T12-1.0mm-3mm-shank-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-8",
    name: "1,0 мм шаровая концевая фреза (скользящее покрытие), ПММА, воск, ПЭЭК (T12)",
    category: "milling",
    subcategory: "burs",
    price: 5405,
    image: "https://articon.pro/wp-content/uploads/2024/03/c3-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-9",
    name: "1,0 мм шаровая концевая фреза, цирконий, ПММА, воск (T12, T14)",
    category: "milling",
    subcategory: "burs",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2024/03/c18-1-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-10",
    name: "1,5 мм плоская концевая фреза, универсальная (T5, T10, T17)",
    category: "milling",
    subcategory: "burs",
    price: 5011,
    image: "https://articon.pro/wp-content/uploads/2024/03/w5-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-11",
    name: "1,5 мм Торическая концевая фреза R0.08, (l = 15 мм), Ti, CoCr (T64)",
    category: "milling",
    subcategory: "burs",
    price: 6210,
    image: "https://articon.pro/wp-content/uploads/2024/03/c19-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
  {
    id: "bur-12",
    name: "1,5 мм шаровая концевая фреза (короткая), Ti, CoCr (T3, T8)",
    category: "milling",
    subcategory: "burs",
    price: 6613,
    image: "https://articon.pro/wp-content/uploads/2024/03/c10-300x300.jpg",
    brand: "imes-icore",
    inStock: true,
  },
];

const Burs = () => {
  return (
    <Layout>
      <Helmet>
        <title>Фрезы для CAD/CAM станков | Артикон</title>
        <meta 
          name="description" 
          content="Фрезы для стоматологических CAD/CAM станков imes-icore. Шаровые, плоские, торические фрезы для обработки циркония, титана, ПММА, воска. Доставка по России." 
        />
      </Helmet>

      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Фрезы
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Профессиональные фрезы для CAD/CAM станков. Шаровые, плоские и торические концевые фрезы 
            для обработки циркония, титана, кобальт-хрома, ПММА и других материалов.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground">Концевые фрезы imes-icore</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bursProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Burs;

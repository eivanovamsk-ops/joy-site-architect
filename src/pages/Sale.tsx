import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/shop/ProductCard";
import { Helmet } from "react-helmet-async";
import { products } from "@/data/products";
import { Tag } from "lucide-react";
import { BundleSection } from "@/components/shop/BundleSection";

const Sale = () => {
  // Фильтруем товары со скидкой из общего каталога
  const saleProducts = products.filter((p) => p.isSale === true);

  return (
    <Layout>
      <Helmet>
        <title>Акции и скидки на стоматологическое оборудование | Артикон</title>
        <meta
          name="description"
          content="Акции и скидки на стоматологическое оборудование и материалы: 3D-сканеры, принтеры, фотополимеры, циркониевые диски. Выгодные цены для зубных техников и клиник. Доставка по России."
        />
        <meta
          name="keywords"
          content="скидки стоматологическое оборудование, акции CAD CAM, распродажа стоматология, дешевое стоматологическое оборудование, выгодно купить 3D принтер стоматологический, скидки циркониевые диски"
        />
        <link rel="canonical" href="https://articon.pro/shop/catalog/sale" />
      </Helmet>

      <div className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-background py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-destructive/10 rounded-full">
              <Tag className="h-6 w-6 text-destructive" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Покупайте товары по выгодной цене!
            </h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Специальные предложения и скидки на оборудование и расходные материалы 
            для стоматологических клиник и лабораторий.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <BundleSection />
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            В данный момент нет товаров со скидкой
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sale;

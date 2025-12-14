import { Layout } from "@/components/layout/Layout";
import { ShopHeroBanner } from "@/components/shop/HeroBanner";
import { ShopQuickLinks } from "@/components/shop/QuickLinks";
import { ProductCatalog } from "@/components/shop/ProductCatalog";
import { ShopAdvantages } from "@/components/shop/Advantages";
import { ShopBrands } from "@/components/shop/Brands";

const Shop = () => {
  return (
    <Layout>
      <ShopHeroBanner />
      <ShopQuickLinks />
      <ProductCatalog />
      <ShopAdvantages />
      <ShopBrands />
    </Layout>
  );
};

export default Shop;

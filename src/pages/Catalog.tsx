import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ShopQuickLinks } from "@/components/shop/QuickLinks";

const Catalog = () => {
  return (
    <Layout>
      <Helmet>
        <title>Каталог оборудования и материалов | Артикон</title>
        <meta name="description" content="Каталог стоматологического оборудования и материалов: 3D-принтеры, сканеры, фрезерные станки, циркониевые диски, фотополимеры. Доставка по России." />
        <link rel="canonical" href="https://articon.pro/shop/catalog" />
      </Helmet>
      
      <ShopQuickLinks />
    </Layout>
  );
};

export default Catalog;

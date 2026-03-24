import { Link } from "react-router-dom";
import { products, type Product } from "@/data/products";
import { getRelatedProductIds } from "@/data/relatedProducts";

interface RelatedProductsProps {
  productId: string;
}

export const RelatedProducts = ({ productId }: RelatedProductsProps) => {
  const relatedIds = getRelatedProductIds(productId);
  if (relatedIds.length === 0) return null;

  const relatedItems = relatedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p)
    .slice(0, 8);

  if (relatedItems.length === 0) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₽";

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Сопутствующие товары</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedItems.map((product) => (
          <Link
            key={product.id}
            to={`/shop/product/${product.id}`}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="aspect-square bg-muted/30 p-4">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
              <div className="text-sm font-medium line-clamp-2 text-foreground">{product.name}</div>
              <div className="text-primary font-bold mt-2">
                {product.price ? formatPrice(product.price) : "По запросу"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

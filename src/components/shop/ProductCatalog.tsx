import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "./ProductCard";
import { CategoryFilter } from "./CategoryFilter";
import { products, categories } from "@/data/products";

export const ProductCatalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(true);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.price || 999999999) - (b.price || 999999999));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategory, sortBy]);

  const currentCategoryName = useMemo(() => {
    if (!selectedCategory) return "Все товары";
    const category = categories.find((c) => c.id === selectedCategory);
    if (!category) return "Все товары";
    
    if (selectedSubcategory) {
      const sub = category.subcategories?.find((s) => s.id === selectedSubcategory);
      return sub ? `${category.name} / ${sub.name}` : category.name;
    }
    
    return category.name;
  }, [selectedCategory, selectedSubcategory]);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentCategoryName}</h1>
            <p className="text-muted-foreground text-sm">
              Найдено {filteredProducts.length} товаров
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">По умолчанию</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                <SelectItem value="name-asc">Название: А-Я</SelectItem>
                <SelectItem value="name-desc">Название: Я-А</SelectItem>
              </SelectContent>
            </Select>

            {/* Toggle filters */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`w-64 flex-shrink-0 ${
              showFilters ? "block" : "hidden"
            } md:block`}
          >
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategoryChange={(cat, sub) => {
                setSelectedCategory(cat);
                setSelectedSubcategory(sub);
              }}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Товары не найдены
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

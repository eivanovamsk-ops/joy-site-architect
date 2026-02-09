import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Package, GraduationCap, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "product" | "course";
  title: string;
  subtitle?: string;
  image?: string;
  href: string;
  price?: number | null;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const productResults: SearchResult[] = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q)
      )
      .slice(0, 8)
      .map((p) => ({
        type: "product",
        title: p.name,
        subtitle: p.brand,
        image: p.image,
        href: `/shop/product/${p.id}`,
        price: p.price,
      }));

    const courseResults: SearchResult[] = courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6)
      .map((c) => ({
        type: "course",
        title: c.title,
        subtitle: `${c.date} • ${c.format}`,
        image: c.coverImage,
        href: `/education/course/${c.id}`,
        price: c.price,
      }));

    return [...productResults, ...courseResults];
  }, [query]);

  const handleSelect = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-2xl px-4">
        <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск товаров, курсов..."
              className="flex-1 h-14 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.length >= 2 && results.length === 0 && (
              <div className="px-5 py-10 text-center text-muted-foreground">
                По запросу «{query}» ничего не найдено
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {/* Product results */}
                {results.some((r) => r.type === "product") && (
                  <div>
                    <div className="px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                      <Package className="h-3.5 w-3.5" />
                      Товары
                    </div>
                    {results
                      .filter((r) => r.type === "product")
                      .map((result) => (
                        <button
                          key={result.href}
                          onClick={() => handleSelect(result.href)}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-muted/50 transition-colors text-left group"
                        >
                          {result.image && (
                            <img
                              src={result.image}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover bg-muted flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                              {result.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.subtitle}
                            </div>
                          </div>
                          {result.price != null && (
                            <div className="text-sm font-semibold text-primary flex-shrink-0">
                              {result.price.toLocaleString("ru-RU")} ₽
                            </div>
                          )}
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                      ))}
                  </div>
                )}

                {/* Course results */}
                {results.some((r) => r.type === "course") && (
                  <div>
                    <div className={cn(
                      "px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2",
                      results.some((r) => r.type === "product") && "border-t border-border mt-1 pt-3"
                    )}>
                      <GraduationCap className="h-3.5 w-3.5" />
                      Курсы
                    </div>
                    {results
                      .filter((r) => r.type === "course")
                      .map((result) => (
                        <button
                          key={result.href}
                          onClick={() => handleSelect(result.href)}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-muted/50 transition-colors text-left group"
                        >
                          {result.image && (
                            <img
                              src={result.image}
                              alt=""
                              className="w-12 h-12 rounded-lg object-cover bg-muted flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                              {result.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.subtitle}
                            </div>
                          </div>
                          {result.price != null && (
                            <div className="text-sm font-semibold text-primary flex-shrink-0">
                              {result.price.toLocaleString("ru-RU")} ₽
                            </div>
                          )}
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}

            {query.length < 2 && (
              <div className="px-5 py-8 text-center text-muted-foreground text-sm">
                Введите минимум 2 символа для поиска
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 border-t border-border bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
            <span>Esc — закрыть</span>
            {results.length > 0 && (
              <span>Найдено: {results.length}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, Category } from "@/data/products";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null, subcategory: string | null) => void;
}

export const CategoryFilter = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories) {
      toggleCategory(category.id);
    }
    onCategoryChange(category.id, null);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string, href?: string) => {
    if (href) {
      navigate(href);
    } else {
      onCategoryChange(categoryId, subcategoryId);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-semibold text-foreground mb-4 text-lg">Категории</h3>
      
      <div className="space-y-1">
        <button
          onClick={() => onCategoryChange(null, null)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          )}
        >
          Все товары
        </button>

        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between",
                selectedCategory === category.id && !selectedSubcategory
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <span>{category.name}</span>
              {category.subcategories && (
                expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </button>

            {category.subcategories && expandedCategories.includes(category.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryClick(category.id, sub.id, sub.href)}
                    className={cn(
                      "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                      selectedSubcategory === sub.id
                        ? "bg-primary/80 text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

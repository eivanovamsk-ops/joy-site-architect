import upceraExploreFunctional from "@/assets/products/upcera-explore-functional.jpg";

export interface ProductVariant {
  diameter: number;
  height: number;
  shade: string;
  price: number;
  sku: string;
}

export interface VariantProduct {
  id: string;
  name: string;
  subtitle?: string;
  brand: string;
  category: string;
  subcategory: string;
  image: string;
  basePrice: number; // min price to show in catalog
  description?: string;
  specifications?: Record<string, string>;
  variants: ProductVariant[];
}

// Price map by height (from provided table data)
const exploreFunctionalPrices: Record<number, number> = {
  12: 8395,
  14: 9200,
  16: 10120,
  18: 10695,
  20: 11385,
  22: 12075,
  25: 13225,
};

// All shades from the Excel table
const allShades = [
  "A1", "A2", "A3", "A3.5", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D2", "D3", "D4",
  "BL1", "BL2", "BL3", "BL4",
];

// Heights available per product
const heights = [12, 14, 16, 18, 20, 22, 25];
const diameters = [98];

// Generate all variants
function generateExploreFunctionalVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const diameter of diameters) {
    for (const height of heights) {
      const price = exploreFunctionalPrices[height];
      for (const shade of allShades) {
        const shadeSku = shade.replace(".", ",");
        variants.push({
          diameter,
          height,
          shade,
          price,
          sku: `Explore ML ${shadeSku} D${diameter}-${height} F`,
        });
      }
    }
  }
  return variants;
}

export const variantProducts: VariantProduct[] = [
  {
    id: "upcera-explore-functional",
    name: "Upcera Explore Functional (GT ML)",
    subtitle: "Многослойный циркониевый диск с градиентной прозрачностью",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: upceraExploreFunctional,
    basePrice: 8395,
    description: `Upcera Explore Functional (GT ML) — профессиональный многослойный циркониевый диск с градиентной прозрачностью для изготовления эстетичных реставраций.

Технология GT ML (Gradient Translucency Multilayer) обеспечивает плавный переход от непрозрачного пришеечного слоя к полупрозрачному режущему краю, имитируя натуральный зуб.

Преимущества:
• Полный диапазон оттенков VITA (20 цветов включая BL)
• 7 вариантов толщины от 12 до 25 мм
• Совместимость со всеми популярными фрезерными системами (диаметр 98 мм)
• Высокая прочность при изгибе ≥ 800 МПа
• Прозрачность 45–51%`,
    specifications: {
      "Система": "98 мм",
      "Технология": "GT ML (Gradient Translucency)",
      "Прочность при изгибе": "≥ 800 МПа",
      "Прозрачность": "45–51%",
      "Плотность": "6.02 г/см³",
      "Количество оттенков": "20 (VITA + BL)",
    },
    variants: generateExploreFunctionalVariants(),
  },
];

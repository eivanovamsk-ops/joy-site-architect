import upceraExploreFunctional from "@/assets/products/upcera-explore-functional.jpg";
import upceraExploreEsthetic from "@/assets/products/upcera-explore-esthetic.jpg";
import upceraStMl from "@/assets/products/upcera-st-ml.jpg";
import upceraDuo from "@/assets/products/upcera-duo.png";
import upceraStColor from "@/assets/products/upcera-st-color.jpg";
import upceraHtWhite from "@/assets/products/upcera-ht-white.jpg";

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
  basePrice: number;
  description?: string;
  specifications?: Record<string, string>;
  variants: ProductVariant[];
  noShade?: boolean; // for products without shade selection (e.g. HT White)
}

// ==========================================
// EXPLORE FUNCTIONAL (GT ML)
// ==========================================
const exploreFunctionalPrices: Record<number, number> = {
  12: 8395,
  14: 9200,
  16: 10120,
  18: 10695,
  20: 11385,
  22: 12075,
  25: 13225,
};

const allShades = [
  "A1", "A2", "A3", "A3.5", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D2", "D3", "D4",
  "BL1", "BL2", "BL3", "BL4",
];

function generateExploreFunctionalVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const height of [12, 14, 16, 18, 20, 22, 25]) {
    const price = exploreFunctionalPrices[height];
    for (const shade of allShades) {
      const shadeSku = shade.replace(".", ",");
      variants.push({
        diameter: 98,
        height,
        shade,
        price,
        sku: `Explore ML ${shadeSku} D98-${height} F`,
      });
    }
  }
  return variants;
}

// ==========================================
// EXPLORE ESTHETIC (GT ML)
// Shades: A1,A2,A3,A3.5 (base price), B1,BL1,BL2 (premium)
// Heights: 12,14,16,18,20
// ==========================================
const estheticBaseShades = ["A1", "A2", "A3", "A3.5"];
const estheticPremiumShades = ["B1", "BL1", "BL2"];

const estheticBasePrices: Record<number, number> = {
  12: 6390,
  14: 7500,
  16: 8580,
  18: 8800,
  20: 9100,
};
const estheticPremiumPrices: Record<number, number> = {
  12: 7348, // approximated from data (12 not in data for premium, using 14 base)
  14: 8625,
  16: 9867,
  18: 10120,
  20: 10465,
};

function generateExploreEstheticVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const height of [12, 14, 16, 18, 20]) {
    for (const shade of estheticBaseShades) {
      const shadeSku = shade.replace(".", ",");
      variants.push({
        diameter: 98,
        height,
        shade,
        price: estheticBasePrices[height],
        sku: `Explore ML ${shadeSku} D98-${height} E`,
      });
    }
    for (const shade of estheticPremiumShades) {
      variants.push({
        diameter: 98,
        height,
        shade,
        price: estheticPremiumPrices[height],
        sku: `Explore ML ${shade} D98-${height} E`,
      });
    }
  }
  return variants;
}

// ==========================================
// ST ML (Multi-layer)
// Shades: A1, A2, A3, A3.5
// Heights: 14, 16, 18, 20, 22
// ==========================================
const stMlPrices: Record<number, number> = {
  14: 4390,
  16: 6685,
  18: 7365,
  20: 7900,
  22: 8500,
};

function generateStMlVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const shades = ["A1", "A2", "A3", "A3.5"];
  for (const height of [14, 16, 18, 20, 22]) {
    for (const shade of shades) {
      const shadeSku = shade.replace(".", ",");
      variants.push({
        diameter: 98,
        height,
        shade,
        price: stMlPrices[height],
        sku: `ST ML А${shadeSku} D98-${height}`,
      });
    }
  }
  return variants;
}

// ==========================================
// UPCERA DUO
// Shades: A1, A2, A3, B2 (not all heights have all shades)
// Heights: 14, 16, 18, 20, 22, 25
// ==========================================
const duoPrices: Record<number, number> = {
  14: 11040,
  16: 12144,
  18: 12834,
  20: 13662,
  22: 14490,
  25: 15870,
};

function generateDuoVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const shadesByHeight: Record<number, string[]> = {
    14: ["A1", "A2", "A3"],
    16: ["A1", "A2", "A3"],
    18: ["A1", "A3"],
    20: ["A1", "A2"],
    22: ["A1", "A2"],
    25: ["A1", "A3", "B2"],
  };
  for (const [heightStr, shades] of Object.entries(shadesByHeight)) {
    const height = Number(heightStr);
    for (const shade of shades) {
      variants.push({
        diameter: 98,
        height,
        shade,
        price: duoPrices[height],
        sku: `DUO ML ${shade} D98-${height} F`,
      });
    }
  }
  return variants;
}

// ==========================================
// ST COLOR (Каркасный / Окрашенный)
// Shades: A1, A2, A3, A3.5
// Heights: 10, 12, 14, 16, 18, 20, 22, 25
// Prices vary slightly per height (using min price)
// ==========================================
const stColorPrices: Record<number, number> = {
  10: 4025,
  12: 4715,
  14: 5290,
  16: 5980,
  18: 6320,
  20: 6775,
  22: 6900,
  25: 7550,
};

function generateStColorVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const shades = ["A1", "A2", "A3", "A3.5"];
  for (const height of [10, 12, 14, 16, 18, 20, 22, 25]) {
    for (const shade of shades) {
      const shadeSku = shade.replace(".", ",");
      variants.push({
        diameter: 98,
        height,
        shade,
        price: stColorPrices[height],
        sku: `ST Color ${shadeSku} 98-${height}`,
      });
    }
  }
  return variants;
}

// ==========================================
// HT WHITE (Белый / без оттенков)
// Heights: 10, 12, 14, 16, 18, 20, 22, 25
// ==========================================
const htWhitePrices: Record<number, number> = {
  10: 2855,
  12: 3395,
  14: 3995,
  16: 4565,
  18: 4715,
  20: 5046,
  22: 5555,
  25: 6065,
};

function generateHtWhiteVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const height of [10, 12, 14, 16, 18, 20, 22, 25]) {
    variants.push({
      diameter: 98,
      height,
      shade: "Белый",
      price: htWhitePrices[height],
      sku: `HT White D98-${height}`,
    });
  }
  return variants;
}

export const variantProducts: VariantProduct[] = [
  // === КАРКАСНЫЙ ===
  {
    id: "upcera-st-color",
    name: "Upcera ST Color",
    subtitle: "Окрашенный циркониевый диск для каркасов",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-framework",
    image: upceraStColor,
    basePrice: 4025,
    description: `Upcera ST Color — профессиональный окрашенный циркониевый диск для изготовления полноанатомических коронок и мостовидных протезов.

Высокая прозрачность 43% и прочность ≥ 1300 МПа обеспечивают надёжность и эстетику реставрации. Совместим со всеми популярными CAD/CAM системами.

Преимущества:
• Полноанатомические коронки без нанесения керамики
• 4 базовых оттенка VITA (A1, A2, A3, A3.5)
• 8 вариантов толщины от 10 до 25 мм
• Высокая прочность ≥ 1300 МПа
• Прозрачность 43%`,
    specifications: {
      "Система": "98 мм",
      "Прочность при изгибе": "≥ 1300 МПа",
      "Прозрачность": "43%",
      "Количество оттенков": "4 (VITA A/B)",
    },
    variants: generateStColorVariants(),
  },

  // === БЕЛЫЙ ===
  {
    id: "upcera-ht-white",
    name: "Upcera HT White",
    subtitle: "Белый высокопрочный циркониевый диск",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-white",
    image: upceraHtWhite,
    basePrice: 2855,
    noShade: true,
    description: `Upcera HT White — высокопрочный белый циркониевый диск для изготовления каркасов с последующим нанесением керамики.

Рекомендуется для изготовления каркасов коронок и мостовидных протезов, требующих облицовки керамикой.

Преимущества:
• Высокая прочность для надёжных каркасов
• 8 вариантов толщины от 10 до 25 мм
• Совместим со всеми CAD/CAM системами
• Стабильность размеров при спекании`,
    specifications: {
      "Система": "98 мм",
      "Цвет": "Белый",
      "Применение": "Каркасы с нанесением керамики",
    },
    variants: generateHtWhiteVariants(),
  },

  // === МУЛЬТИСЛОЙ ===
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
  {
    id: "upcera-explore-esthetic",
    name: "Upcera Explore Esthetic",
    subtitle: "Высокоэстетичный многослойный циркониевый диск",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: upceraExploreEsthetic,
    basePrice: 6390,
    description: `Upcera Explore Esthetic — многослойный циркониевый диск с максимальной эстетикой для передних реставраций.

Идеально подходит для изготовления эстетичных реставраций передних зубов, где важны высокая прозрачность и точная передача цвета.

Преимущества:
• Высокая прозрачность для передних реставраций
• Оттенки A/B серии и BL (отбелённые)
• 5 вариантов толщины от 12 до 20 мм
• Многослойная структура для естественного вида`,
    specifications: {
      "Система": "98 мм",
      "Применение": "Передние реставрации",
      "Оттенки": "A1, A2, A3, A3.5, B1, BL1, BL2",
    },
    variants: generateExploreEstheticVariants(),
  },
  {
    id: "upcera-st-ml",
    name: "Upcera ST ML",
    subtitle: "Многослойный диск с прозрачностью 43%",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: upceraStMl,
    basePrice: 4390,
    description: `Upcera ST ML — многослойный циркониевый диск для CAD/CAM фрезерования с градиентной послойной окраской.

Прозрачность 43% обеспечивает оптимальный баланс между прочностью и эстетикой. Подходит для боковых и передних реставраций.

Преимущества:
• Послойная окраска Multi-layer
• 4 оттенка VITA (A1, A2, A3, A3.5)
• 5 вариантов толщины от 14 до 22 мм
• Прозрачность 43%`,
    specifications: {
      "Система": "98 мм",
      "Технология": "Multi-layer",
      "Прозрачность": "43%",
      "Оттенки": "A1, A2, A3, A3.5",
    },
    variants: generateStMlVariants(),
  },
  {
    id: "upcera-duo",
    name: "UPCERA DUO",
    subtitle: "Сочетание прочности (800–1200 МПа) и эстетики",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: upceraDuo,
    basePrice: 11040,
    description: `UPCERA DUO — многослойный циркониевый диск, объединяющий высокую прочность 800–1200 МПа с превосходной эстетикой.

Идеальный выбор для длинных мостовидных конструкций, требующих как надёжности, так и эстетики.

Преимущества:
• Уникальное сочетание прочности и прозрачности 45–48%
• Температура спекания 1480 °C
• 6 вариантов толщины от 14 до 25 мм
• Совместим со всеми CAD/CAM системами`,
    specifications: {
      "Система": "98 мм",
      "Прочность": "800–1200 МПа",
      "Прозрачность": "45–48%",
      "Температура спекания": "1480 °C",
    },
    variants: generateDuoVariants(),
  },
];

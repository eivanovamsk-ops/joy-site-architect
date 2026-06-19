import upceraExploreFunctional from "@/assets/products/upcera-explore-functional.webp";
import upceraPmma from "@/assets/products/upcera-pmma-flnt.webp";
import upceraPmmaMilled from "@/assets/products/upcera-pmma-milled.webp";
import upceraPmmaShades from "@/assets/products/upcera-pmma-shades.webp";
import upceraPmmaSpecs from "@/assets/products/upcera-pmma-specs.webp";
import upceraPmmaB1 from "@/assets/products/upcera-pmma-b1.webp";
import pmmaLima from "@/assets/products/pmma-lima.webp";
import articonPmmaMono from "@/assets/products/articon-pmma-mono.jpg.asset.json";
import stDentalPmmaMono from "@/assets/products/st-dental-pmma-mono.webp";
import dentalDirektProviPhiMono from "@/assets/products/dental-direkt-provi-phi-mono.webp";
import dentalDirektTempMedMono from "@/assets/products/dental-direkt-temp-med-mono.webp";
import dentalDirektPolyBaseMono from "@/assets/products/dental-direkt-poly-base-mono.webp";
import dentalDirektPolymedML from "@/assets/products/dental-direkt-polymed-ml.webp";
import dentalDirektBioSplintPHI from "@/assets/products/dental-direkt-bio-splint-p-hi.webp";
import honchonSmilePmmaML from "@/assets/products/honchon-smile-pmma-ml.webp";
import honchonSmilePmmaMono from "@/assets/products/honchon-smile-pmma-mono.webp";
import honchonSmilePmmaFlexible from "@/assets/products/honchon-smile-pmma-flexible.webp";
import audentalPmmaML from "@/assets/products/audental-pmma-ml.webp";
import audentalPmmaMono from "@/assets/products/audental-pmma-mono.webp";
import aevraMLd98 from "@/assets/products/aevra-ml-d98.webp";
import aevraMLHero from "@/assets/products/aevra-ml-hero.webp";
import aevraMLShades from "@/assets/products/aevra-ml-shades.webp";
import aevraMLSpecs from "@/assets/products/aevra-ml-specs.webp";
import aevraMLSinteringCurve from "@/assets/products/aevra-ml-sintering-curve.webp";
import aevraMLIndications from "@/assets/products/aevra-ml-indications.webp";
import aevraMLWorkflow from "@/assets/products/aevra-ml-workflow.webp";
import aevraMLPhysical from "@/assets/products/aevra-ml-physical.webp";
import aevraMLDimensions from "@/assets/products/aevra-ml-dimensions.webp";
import aevraMLSinteringProgram from "@/assets/products/aevra-ml-sintering-program.webp";
import aevraMLStructure from "@/assets/products/aevra-ml-structure.webp";
import upceraExploreFunctional1 from "@/assets/products/upcera-explore-functional-1.webp";
import upceraExploreFunctional2 from "@/assets/products/upcera-explore-functional-2.webp";
import upceraExploreFunctional3 from "@/assets/products/upcera-explore-functional-3.webp";
import upceraExploreEsthetic from "@/assets/products/upcera-explore-esthetic.webp";
import upceraStMl from "@/assets/products/upcera-st-ml.webp";
import upceraDuo from "@/assets/products/upcera-duo.webp";
import upceraStColor from "@/assets/products/upcera-st-color.jpg";
import upceraHtWhite from "@/assets/products/upcera-ht-white.jpg";
import honchonTitan from "@/assets/products/honchon-titan.png";

export interface ProductVariant {
  diameter: number;
  height: number;
  shade: string;
  price: number;
  sku: string;
}

export interface DownloadFile {
  name: string;
  url: string;
  size?: string;
}

export interface VariantProduct {
  id: string;
  name: string;
  subtitle?: string;
  brand: string;
  category: string;
  subcategory: string;
  image: string;
  gallery?: string[];
  basePrice: number;
  description?: string;
  metaDescription?: string;
  specifications?: Record<string, string>;
  variants: ProductVariant[];
  noShade?: boolean;
  downloadFiles?: DownloadFile[];
  outOfStock?: boolean;
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

// ==========================================
// HONCHON TITAN (Заготовки из титана)
// Heights: 12, 14, 16, 18, 20
// ==========================================
const honchonTitanPrices: Record<number, number> = {
  12: 5000,
  14: 4900,
  16: 5250,
  18: 5650,
  20: 6100,
};

function generateHonchonTitanVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const height of [12, 14, 16, 18, 20]) {
    variants.push({
      diameter: 98,
      height,
      shade: "Ti",
      price: honchonTitanPrices[height],
      sku: `Honchon Titan 98×${height}`,
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
    name: "Циркониевый диск Explore Functional D98",
    subtitle: "Многослойный циркониевый диск с градиентной прозрачностью",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: upceraExploreFunctional,
    gallery: [upceraExploreFunctional, upceraExploreFunctional1, upceraExploreFunctional2, upceraExploreFunctional3],
    basePrice: 8395,
    description: `UPCERA Explore Functional (GT ML) — это многослойный циркониевый диск для CAD/CAM фрезеровки, разработанный для зуботехнических лабораторий, которым важны прочность, эстетика и предсказуемый результат при изготовлении реставраций любой сложности.

Диск из диоксида циркония Upcera Explore Functional сочетает функциональный градиент прочности и прозрачности, благодаря чему может использоваться как универсальный цирконий для коронок, мостов и полноанатомических работ. Это современный стоматологический материал для цифровых лабораторий, работающих в системах Open CAD/CAM.

Функциональный градиент — реальное преимущество в работе

В основе серии Explore Functional лежит сочетание 4Y-TZP и 5Y-TZP, что позволяет получить:
• повышенную прочность в пришеечной зоне (до 1300 МПа),
• оптимальную транслюцентность в режущей части,
• плавный переход прочности и прозрачности по высоте реставрации,
• стабильную усадку при спекании.

Для зубного техника это означает меньше корректировок после обжига, минимальный риск микротрещин и предсказуемую посадку конструкции. Многослойный цирконий Upcera позволяет создавать долговечные конструкции даже при изготовлении протяжённых мостовидных протезов.

Универсальный цирконий для CAD/CAM лаборатории

Циркониевый диск диаметром 98 мм подходит для большинства фрезерных станков открытого типа. Материал совместим с популярными CAD/CAM системами и программами моделирования, что делает его удобным в ежедневной лабораторной практике.

UPCERA Explore Functional применяется для:
• полноанатомических коронок,
• мостовидных протезов большой протяженности,
• каркасов под облицовку,
• реставраций на имплантатах,
• вкладок и накладок.

Использование одного универсального диска циркония позволяет оптимизировать склад лаборатории и сократить расходы на закупку разных типов материала.

Эстетика и естественность

Благодаря бесшовной многослойной структуре материал демонстрирует плавный градиент цвета и прозрачности без выраженных переходов. Это позволяет имитировать анатомию натурального зуба и создавать реставрации с «живым» эффектом без избыточной индивидуализации.

Оптимальный уровень прозрачности обеспечивает гармоничную интеграцию реставрации в зубной ряд пациента и естественную светопередачу.

Оттенки и цветовая стабильность

Циркониевые диски UPCERA Explore Functional выпускаются в широкой цветовой линейке по классической шкале VITA — от светлых до более насыщенных естественных оттенков (A1–D4). Это позволяет зуботехнической лаборатории подобрать оптимальный вариант под клинический случай без необходимости сложной индивидуальной тонировки.

Преимущества цветовой палитры:
• Широкий диапазон оттенков — возможность точного подбора под цвет зубов пациента
• Равномерное прокрашивание по всему объёму диска — цвет сохраняется после фрезеровки и спекания
• Стабильность оттенка при обжиге — минимальные изменения цвета после спекания
• Естественный градиент прозрачности — плавный переход от пришеечной зоны к режущему краю
• Снижение времени на индивидуализацию — меньше необходимости в дополнительном окрашивании

Благодаря многослойной технологии окрашивания, цирконий для CAD/CAM Explore Functional демонстрирует естественную глубину цвета и гармоничную интеграцию реставрации в зубной ряд. Это особенно важно при изготовлении фронтальных коронок и протяжённых мостовидных конструкций.

Использование готовых оттенков в линейке UPCERA позволяет лаборатории повысить скорость производства и сохранить высокую эстетическую предсказуемость результата.

Технологическая стабильность и точность

Материал производится методом холодного изостатического прессования, что обеспечивает однородную плотность по всему объему диска. В результате зубной техник получает:
• точное краевое прилегание,
• равномерную усадку при температуре спекания,
• стабильные физико-механические свойства,
• долговечность реставраций.

Высокая прочность на изгиб и контролируемая транслюцентность делают UPCERA Explore Functional надежным решением как для жевательной группы, так и для фронтальной зоны.

Купить циркониевый диск UPCERA Explore Functional для CAD/CAM можно в компании Articon (Артикон). Articon — поставщик зуботехнических материалов в Москве с доставкой по всей России. Мы обеспечиваем стабильное наличие циркония на складе, профессиональную консультацию и оперативную отгрузку для зуботехнических лабораторий и стоматологических клиник.`,
    specifications: {
      "Наименование": "UPCERA Explore Functional (GT ML)",
      "Тип товара": "Циркониевый диск для CAD/CAM фрезеровки",
      "Материал": "Многослойный диоксид циркония (4Y-TZP / 5Y-TZP)",
      "Назначение": "Коронки, мостовидные протезы, каркасы под облицовку, реставрации на имплантатах, вкладки и накладки",
      "Диаметр диска": "98 мм (Open System)",
      "Многослойность": "Да (градиент прочности и прозрачности)",
      "Прочность на изгиб": "800–1300 МПа (функциональное распределение по слоям)",
      "Транслюцентность": "43–46%",
      "Класс материала": "4Y-TZP / 5Y-TZP",
      "Температура спекания": "до 1500 °C",
      "Метод производства": "Холодное изостатическое прессование (CIP)",
      "Совместимость": "Open CAD/CAM, Exocad, DentalCAM и др.",
      "Наличие уступа": "Да",
      "Комплектация": "1 диск",
      "Страна производства": "Китай",
      "Условия хранения": "В оригинальной упаковке, в сухом помещении при комнатной температуре",
      "Поставщик в России": "Articon (Артикон), Москва, доставка по всей России",
    },
    variants: generateExploreFunctionalVariants(),
  },
  {
    id: "upcera-explore-esthetic",
    name: "Циркониевый диск Upcera Explore Esthetic D98",
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
    name: "Циркониевый диск Upcera ST ML D98",
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
    name: "Циркониевый диск UPCERA DUO D98",
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

  // === AEVRA ML D98 ===
  {
    id: "aevra-ml-d98",
    name: "Циркониевый диск Upcera Aevra ML D98",
    subtitle: "Многослойный циркониевый диск с оттенками VITA",
    brand: "Aevra",
    category: "cad-cam-discs",
    subcategory: "zirconia-multilayer",
    image: aevraMLd98,
    gallery: [aevraMLd98, aevraMLHero, aevraMLStructure, aevraMLShades, aevraMLIndications, aevraMLWorkflow, aevraMLDimensions, aevraMLSpecs, aevraMLPhysical, aevraMLSinteringCurve, aevraMLSinteringProgram],
    basePrice: 0,
    metaDescription: "Заготовка из циркония Aevra ML D98 для CAD/CAM — многослойный циркониевый диск 98 мм с прочностью 800–1050 МПа и высокой транслюцентностью. Articon, Москва, доставка по России.",
    downloadFiles: [],
    description: `Заготовка из циркония Aevra ML D98 — это многослойный циркониевый диск для CAD/CAM фрезеровки, разработанный для цифровых зуботехнических лабораторий, которым необходим баланс прочности, эстетики и предсказуемого результата.

Aevra ML сочетает в себе технологии 4Y–5Y диоксида циркония и обеспечивает высокую механическую устойчивость при сохранении естественной прозрачности. Прочность на изгиб 800–1050 МПа позволяет использовать данный циркониевый диск для изготовления как одиночных коронок, так и мостовидных протезов различной протяженности.

Благодаря повышенной транслюцентности (46–50%) материал демонстрирует «живую» светопередачу и естественный внешний вид реставраций, что особенно важно при работе во фронтальной зоне.

Универсальный цирконий для CAD/CAM лаборатории

Заготовка из диоксида циркония Aevra ML D98 предназначена для работы в большинстве фрезерных станков открытого типа (Open System). Диск диаметром 98 мм совместим с популярными CAD/CAM системами и программами моделирования, что делает его удобным в ежедневной лабораторной практике.

Материал подходит для изготовления:
• винир
• коронок
• каркасов мостов и коронок
• монолитных мостов
• конструкций на имплантатах
• полных съемных и несъемных протезов на имплантатах

Использование одного универсального многослойного циркония позволяет лаборатории сократить номенклатуру материалов и оптимизировать склад.

Стабильность структуры и точность посадки

Aevra ML производится с использованием технологии однородного распределения порошка, что обеспечивает стабильные физико-механические свойства по всему объему диска.

Материал обладает:
• высокой плотностью после спекания
• устойчивостью к развитию трещин (>4 МПа·м½)
• низкой химической растворимостью
• стабильной цветопередачей после обжига

Температура стандартного спекания 1510°C обеспечивает оптимальное уплотнение структуры и прогнозируемую усадку, что важно для точного краевого прилегания реставрации.

Эстетика без компромиссов

Многослойная структура Aevra ML обеспечивает плавный переход прозрачности и насыщенности цвета по высоте реставрации.

При увеличении толщины керамики возрастает насыщенность цвета, а прозрачность уменьшается — это позволяет зубному технику контролировать финальный визуальный результат за счёт правильного позиционирования в диске.

Материал подходит для техник окрашивания, cut-back и микролэйеринга, что делает его универсальным решением как для монолитных, так и для индивидуализированных работ.

Купить заготовку из циркония Aevra ML D98 для CAD/CAM можно в компании Articon (Артикон). Articon — поставщик зуботехнических материалов в Москве с доставкой по всей России.

Мы обеспечиваем стабильное наличие циркониевых дисков, профессиональную консультацию и оперативную отгрузку для зуботехнических лабораторий и стоматологических клиник.

Aevra ML — это современный многослойный цирконий для CAD/CAM, сочетающий прочность, эстетику и технологическую предсказуемость в ежедневной лабораторной практике.`,
    specifications: {
      "Тип": "Многослойный циркониевый диск для CAD/CAM",
      "Материал": "Диоксид циркония (4Y–5Y)",
      "Диаметр": "98 мм",
      "Толщина": "14 / 16 / 18 / 20 / 22 / 25 мм",
      "Оттенки": "A1 / A2 / A3 / B1 / BL1 / BL2 / BL3 / BL4",
      "Прочность на изгиб": "800–1050 МПа",
      "Прозрачность (1 мм)": "46–50%",
      "Сопротивление развитию трещин": "> 4 МПа·м½",
      "Плотность после спекания": "≥ 6.0 г/см³",
      "КТР (25–500°C)": "(10.5 ± 0.5) × 10⁻⁶ K⁻¹",
      "Моноклинная фаза после старения": "< 5%",
      "Химическая растворимость": "< 100 µg/cm²",
      "Радиоактивность": "≤ 1.0 Bq/g",
      "Температура спекания": "1510 °C",
      "ZrO₂ + HfO₂": "86.3–95.5%",
      "Y₂O₃": "7–9.7%",
      "Fe₂O₃": "< 0.2%",
      "Er₂O₃": "< 1%",
      "Прочие оксиды": "< 0.5%",
    },
    variants: (() => {
      const result: ProductVariant[] = [];
      const fullHeights = [14, 16, 18, 20, 22, 25];
      const blHeights = [14, 18, 20, 25];
      const standardShades = ["A1", "A2", "A3", "B1"];
      const blShades = ["BL1", "BL2", "BL3", "BL4"];

      for (const shade of standardShades) {
        for (const height of fullHeights) {
          result.push({
            diameter: 98,
            height,
            shade,
            price: 0,
            sku: `AEVRA-ML-D98-${height}-${shade}`,
          });
        }
      }
      for (const shade of blShades) {
        for (const height of blHeights) {
          result.push({
            diameter: 98,
            height,
            shade,
            price: 0,
            sku: `AEVRA-ML-D98-${height}-${shade}`,
          });
        }
      }
      return result;
    })(),
  },

  // === PMMA Upcera FLNT Temp ===
  {
    id: "upcera-pmma-flnt",
    name: "Диск Upcera PMMA FLNT Temp D98",
    subtitle: "PMMA диск для временных коронок и мостов",
    brand: "Upcera",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: upceraPmma,
    gallery: [upceraPmma, upceraPmmaB1, upceraPmmaMilled, upceraPmmaShades, upceraPmmaSpecs],
    basePrice: 0,
    outOfStock: true,
    metaDescription: "Диск Upcera PMMA для CAD/CAM — однотонный PMMA 14–20 мм (A1–B1, Clear). Прочный материал для временных конструкций. Articon, Москва, доставка по России",
    description: `UPCERA PMMA диск для CAD/CAM — это высококачественная заготовка из полиметилметакрилата, предназначенная для изготовления временных реставраций и базисов зубных протезов в цифровых зуботехнических лабораториях. Материал отличается высокой устойчивостью к истиранию и деформации, что делает его надежным решением для повседневной лабораторной работы.

UPCERA PMMA диск для CAD/CAM фрезеровки обеспечивает стабильность формы, точность посадки и комфорт пациента в период временного протезирования. Материал поставляется в однотонном (Monochrome) и многослойном (Multilayer) исполнении, что позволяет подобрать оптимальное решение под клиническую задачу — от временных коронок до полноценных временных мостов и съемных протезов.

Преимущества UPCERA PMMA дисков:
• Высокая прочность на изгиб ≥100 МПа
• Низкая абсорбция воды (≤40 μg/cm³)
• Минимальное выделение веществ в раствор (≤7.5 μg/cm³)
• Стабильность геометрии после фрезеровки
• Простота обработки и полировки
• Совместимость с большинством CAD/CAM систем

Благодаря химическому составу на основе methacrylic acid polymer (~99%), материал демонстрирует однородную структуру и прогнозируемые физико-механические свойства. Это особенно важно при изготовлении временных конструкций длительного ношения.

Область применения:
• Временные коронки
• Временные мосты
• Диагностические конструкции
• Базисы зубных протезов
• Полные съемные протезы
• Временные работы на имплантатах

UPCERA PMMA диски доступны в широкой палитре оттенков VITA (A1–D4, BL и др.), а также в вариантах для протезных базисов (V-Розовый A, B, C).

Купить UPCERA PMMA диск для CAD/CAM можно в компании Articon (Артикон) — поставщик зуботехнических материалов в Москве с доставкой по всей России. Мы обеспечиваем стабильное наличие, профессиональную консультацию и быструю отгрузку для зуботехнических лабораторий и стоматологических клиник.`,
    specifications: {
      "Тип материала": "UPCERA PMMA (полиметилметакрилат)",
      "Формат": "CAD/CAM диск",
      "Исполнение": "S (Monochrome) / M (Multilayer)",
      "Прочность на изгиб": "≥100 МПа",
      "Абсорбция воды": "≤40 μg/cm³",
      "Выделение веществ в раствор": "≤7.5 μg/cm³",
      "Methacrylic acid polymer": "≈99%",
      "Pigment": "≤1%",
      "Оттенки S (Monochrome)": "A1–A4, B1–B4, C1–C4, D2–D4, A0, BL1–BL3",
      "Оттенки M (Multilayer)": "A1–A4, B1–B4, C1–C4, D2–D4, A0, BL1–BL3",
      "Базис протезов": "V-Розовый A, V-Розовый B, V-Розовый C",
    },
    variants: (() => {
      const shades = ["A1", "A2", "A3", "A3.5", "B1"];
      const heights = [14, 16, 18, 20];
      const result: ProductVariant[] = [];
      for (const shade of shades) {
        for (const height of heights) {
          result.push({
            diameter: 98,
            height,
            shade,
            price: 0,
            sku: `UPCERA-PMMA-${height}-${shade.replace(".", "")}`,
          });
        }
      }
      // Clear only 16 and 20
      for (const height of [16, 20]) {
        result.push({
          diameter: 98,
          height,
          shade: "Clear",
          price: 0,
          sku: `UPCERA-PMMA-${height}-CLEAR`,
        });
      }
      return result;
    })(),
  },

  // === PMMA Lima Mono ===
  {
    id: "lima-pmma-mono-d98",
    name: "Диск LIMA PMMA MONO",
    subtitle: "Однослойный PMMA диск для временных конструкций",
    brand: "Lima",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: pmmaLima,
    basePrice: 700,
    description: `Диск LIMA PMMA MONO — однослойная, предокрашенная блок-заготовка из полиметилакрилата (ПММА) диаметром 98 мм, предназначенная для изготовления временных конструкций длительного ношения при помощи открытых CAD/CAM систем.

Lima — турецкий производитель, успешно прошедший тестирования в нашей лаборатории. Рекомендуем как качественный материал по отличной цене.

Свойства и преимущества:
• Биосовместим
• Низкое содержание остаточного мономера
• Высокая трещиностойкость к постоянной изгибной нагрузке
• Низкое водопоглощение и плотная структура
• Стойкий к налёту
• Легко полируется

Область применения:
• Временные коронки и мосты
• Диагностические конструкции
• Временные работы на имплантатах

Купить диски LIMA PMMA MONO можно в компании Articon (Артикон) — поставщик зуботехнических материалов в Москве с доставкой по всей России.`,
    metaDescription: "Диск LIMA PMMA MONO для CAD/CAM — однослойный PMMA 15–20 мм (A1, A2, BL). Качественный турецкий материал для временных конструкций. Articon, Москва, доставка по России",
    specifications: {
      "Производитель": "Lima",
      "Страна производства": "Турция",
      "Материал": "PMMA",
      "Тип": "Диски PMMA — MO",
      "Серия": "Monolayer",
      "Система": "98 мм",
    },
    variants: [
      { diameter: 98, height: 15, shade: "A1", price: 700, sku: "LIMA-PMMA-MONO-15-A1" },
      { diameter: 98, height: 15, shade: "A2", price: 700, sku: "LIMA-PMMA-MONO-15-A2" },
      { diameter: 98, height: 20, shade: "A2", price: 750, sku: "LIMA-PMMA-MONO-20-A2" },
      { diameter: 98, height: 15, shade: "BL", price: 700, sku: "LIMA-PMMA-MONO-15-BL" },
      { diameter: 98, height: 20, shade: "BL", price: 750, sku: "LIMA-PMMA-MONO-20-BL" },
    ],
  },
  // === PMMA Articon Mono ===
  {
    id: "articon-pmma-mono-d98",
    name: "Диск ARTICON PMMA MONO 98x16",
    subtitle: "Однослойный PMMA-диск для временных конструкций",
    brand: "Articon",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: articonPmmaMono,
    basePrice: 700,
    description: `Диск PMMA Articon Mono — это однослойная блок-заготовка из полиметилметакрилата для изготовления временных коронок, мостов и диагностических/примерочных конструкций. Материал подходит для лабораторий, которым нужен доступный расходный материал для регулярной CAD/CAM-работы.

Назначение: временные коронки и мосты, примерочные конструкции.

Преимущества:
• экономичное решение для ежедневной работы
• монослойная структура
• простая фрезеровка и полировка
• совместимость с открытыми системами`,
    metaDescription: "Диск ARTICON PMMA MONO 98x16 мм — однослойный PMMA для временных конструкций. Оттенки A2, A3. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Articon",
      "Страна": "—",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "Monolayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "16 мм",
      "Цвета": "A2, A3",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 16, shade: "A2", price: 700, sku: "ARTICON-PMMA-MONO-98-16-A2" },
      { diameter: 98, height: 16, shade: "A3", price: 700, sku: "ARTICON-PMMA-MONO-98-16-A3" },
    ],
  },
  // === PMMA ST Dental Mono ===
  {
    id: "st-dental-pmma-mono-d98",
    name: "Диск ST DENTAL PMMA MONO",
    subtitle: "Однослойный PMMA-диск для временных ортопедических конструкций",
    brand: "ST Dental",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: stDentalPmmaMono,
    basePrice: 750,
    description: `ST Dental PMMA Mono — монослойная PMMA-заготовка для фрезерования временных коронок и мостов. Материал рассчитан на стандартные лабораторные задачи, хорошо подходит для экономичных временных конструкций и примерочных работ.

Назначение: временные коронки, мосты и примерочные работы.

Преимущества:
• монослойная структура
• универсальное применение
• доступная стоимость
• обработка в открытых CAD/CAM-системах`,
    metaDescription: "Диск ST DENTAL PMMA MONO 98x20 мм — однослойный PMMA для временных конструкций. Оттенок A3. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "ST Dental",
      "Страна": "—",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "Monolayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "A3",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A3", price: 750, sku: "ST-DENTAL-PMMA-MONO-98-20-A3" },
    ],
  },
  // === PMMA Dental Direkt DD Provi PHI Mono ===
  {
    id: "dental-direkt-provi-phi-mono-d98",
    name: "Диск DENTAL DIREKT DD PROVI PHI MONO",
    subtitle: "Предокрашенная PMMA-заготовка для временных реставраций",
    brand: "Dental Direkt",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: dentalDirektProviPhiMono,
    basePrice: 750,
    description: `DD Provi PHI — PMMA-диск для CAD/CAM-фрезерования временных реставраций. Материал подходит для изготовления временных коронок и мостов, отличается хорошей полируемостью, стабильностью и удобной обработкой на фрезерном оборудовании.

Назначение: временные реставрации, коронки и мосты.

Преимущества:
• медицинский термопластичный полимер
• низкий остаточный мономер
• прочность на изгиб
• хорошая фрезеруемость`,
    metaDescription: "Диск DENTAL DIREKT DD PROVI PHI MONO 98x20 мм — предокрашенный PMMA для временных коронок и мостов. Оттенок A1. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Dental Direkt",
      "Страна": "Германия",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "DD Provi CAM / PHI",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "A1",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A1", price: 750, sku: "DD-PROVI-PHI-MONO-98-20-A1" },
    ],
  },
  // === PMMA Dental Direkt DD temp MED Mono ===
  {
    id: "dental-direkt-temp-med-mono-d98",
    name: "Диск DENTAL DIREKT DD TEMP MED MONO",
    subtitle: "Высокопрозрачный PMMA-диск для эстетичных временных конструкций",
    brand: "Dental Direkt",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: dentalDirektTempMedMono,
    basePrice: 700,
    description: `DD temp MED — предокрашенная PMMA-заготовка для изготовления временных коронок, мостов и других ортопедических конструкций. Материал имеет высокую прозрачность, хорошую полируемость, низкое водопоглощение и устойчивость к образованию налета.

Назначение: эстетичные временные коронки и мосты.

Преимущества:
• высокая прозрачность
• биосовместимость
• низкое водопоглощение
• CAM-оптимизированная твердость`,
    metaDescription: "Диск DENTAL DIREKT DD TEMP MED MONO 98x16 мм — высокопрозрачный PMMA для эстетичных временных конструкций. Оттенок Bleach. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Dental Direkt",
      "Страна": "Германия",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "DD temp MED",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "16 мм",
      "Цвета": "Bleach",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 16, shade: "Bleach", price: 700, sku: "DD-TEMP-MED-MONO-98-16-BLEACH" },
    ],
  },
  // === PMMA Dental Direkt DD poly base MONO ===
  {
    id: "dental-direkt-poly-base-mono-d98",
    name: "Диск DENTAL DIREKT DD POLY BASE MONO",
    subtitle: "PMMA-диски для изготовления базисов протезов и розовых элементов",
    brand: "Dental Direkt",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: dentalDirektPolyBaseMono,
    basePrice: 1200,
    description: `DD poly base — PMMA-заготовка розового цвета для CAD/CAM-изготовления базисов съемных протезов, временных протезных конструкций и участков имитации десны. Вариант Pink Veined визуально имитирует прожилки естественной слизистой.

Назначение: базисы протезов, розовые элементы, временные протезные конструкции.

Преимущества:
• розовые оттенки для базисов
• вариант с прожилками
• стабильная геометрия
• легкая обработка`,
    metaDescription: "Диск DENTAL DIREKT DD POLY BASE MONO 98x25 мм — PMMA для базисов протезов и розовых элементов. Оттенки Pink, Pink Veined. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Dental Direkt",
      "Страна": "Германия",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "DD poly base",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "25 мм",
      "Цвета": "Pink, Pink Veined",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 25, shade: "Pink", price: 1200, sku: "DD-POLY-BASE-MONO-98-25-PINK" },
      { diameter: 98, height: 25, shade: "Pink Veined", price: 1200, sku: "DD-POLY-BASE-MONO-98-25-PINK-VEINED" },
    ],
  },
  // === PMMA Dental Direkt DD polyMED ML ===
  {
    id: "dental-direkt-polymed-ml-d98",
    name: "Диск DENTAL DIREKT DD POLYMED ML",
    subtitle: "Многослойный PMMA-диск для эстетичных временных конструкций",
    brand: "Dental Direkt",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: dentalDirektPolymedML,
    basePrice: 1350,
    description: `DD polyMED ML — многослойная PMMA-заготовка для временных реставраций, где важны плавный переход оттенка и более естественная эстетика. Подходит для коронок, мостов и временных ортопедических конструкций длительного ношения.

Назначение: эстетичные временные коронки и мосты.

Преимущества:
• многослойная эстетика
• градиент оттенка
• стабильность цвета
• хорошая полировка`,
    metaDescription: "Диск DENTAL DIREKT DD POLYMED ML 98x20 мм — многослойный PMMA для эстетичных временных конструкций. Оттенок B0. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Dental Direkt",
      "Страна": "Германия",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — ML",
      "Серия": "DD polyMED ML",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "B0",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "B0", price: 1350, sku: "DD-POLYMED-ML-98-20-B0" },
    ],
  },
  // === PMMA Dental Direkt Bio splint P HI ===
  {
    id: "dental-direkt-bio-splint-p-hi-d98",
    name: "Диск пластиковый Bio splint P HI",
    subtitle: "PMMA-диск для изготовления шин и капп",
    brand: "Dental Direkt",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: dentalDirektBioSplintPHI,
    basePrice: 1000,
    outOfStock: true,
    description: `Bio splint P HI — PMMA-заготовка для CAD/CAM-фрезерования шин, капп и ортопедических конструкций. Материал подходит для изготовления защитных капп, шин при бруксизме и временных ортопедических аппаратов.

Назначение: шины, каппы, временные ортопедические конструкции.

Преимущества:
• медицинский PMMA
• удобная фрезеруемость
• стабильная геометрия диска
• совместимость с открытыми CAD/CAM-системами`,
    metaDescription: "Диск пластиковый Bio splint P HI Dental Direkt 98×20 мм — PMMA для шин и капп. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Dental Direkt",
      "Страна": "Германия",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "Bio splint P HI",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "Transparent",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "Transparent", price: 1000, sku: "DD-BIO-SPLINT-PHI-98-20-TR" },
    ],
  },
  // === PMMA Honchon Smile Multilayer ===
  {
    id: "honchon-smile-pmma-ml-d98",
    name: "Диск HONCHON SMILE PMMA ML",
    subtitle: "Многослойная PMMA-заготовка для временных коронок и мостов",
    brand: "Honchon Smile",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: honchonSmilePmmaML,
    basePrice: 1350,
    description: `Honchon Smile PMMA ML — многослойный диск из полиметилметакрилата для эстетичных временных коронок и мостов. Градиентная окраска помогает получить более естественный переход оттенка, а высокая стойкость к истиранию и стабильность цвета делают материал удобным для временных конструкций длительного ношения.

Назначение: временные коронки и мосты длительного ношения.

Преимущества:
• повышенная прозрачность
• градиентная окраска
• высокая эстетичность
• стойкость к истиранию`,
    metaDescription: "Диск HONCHON SMILE PMMA ML 98×20 мм — многослойный PMMA для эстетичных временных коронок и мостов. Оттенки A1, A2, A3, A3.5, B1, BL1. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Honchon Smile",
      "Страна": "Китай",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — ML",
      "Серия": "Multilayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "A1, A2, A3, A3.5, B1, BL1",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A1", price: 1350, sku: "HONCHON-PMMA-ML-98-20-A1" },
      { diameter: 98, height: 20, shade: "A2", price: 1350, sku: "HONCHON-PMMA-ML-98-20-A2" },
      { diameter: 98, height: 20, shade: "A3", price: 1350, sku: "HONCHON-PMMA-ML-98-20-A3" },
      { diameter: 98, height: 20, shade: "A3.5", price: 1350, sku: "HONCHON-PMMA-ML-98-20-A3.5" },
      { diameter: 98, height: 20, shade: "B1", price: 1350, sku: "HONCHON-PMMA-ML-98-20-B1" },
      { diameter: 98, height: 20, shade: "BL1", price: 1350, sku: "HONCHON-PMMA-ML-98-20-BL1" },
    ],
  },
  // === PMMA Honchon Smile Monolayer ===
  {
    id: "honchon-smile-pmma-mono-d98",
    name: "Диск HONCHON SMILE PMMA MONO",
    subtitle: "Монослойные PMMA-диски для временных реставраций и протезных конструкций",
    brand: "Honchon Smile",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: honchonSmilePmmaMono,
    basePrice: 750,
    description: `Honchon Smile PMMA MO — монослойная заготовка из PMMA для изготовления временных реставраций краткосрочного или долгосрочного ношения, а также протезов с винтовой или цементной фиксацией. Доступны оттенки A3, Pink и Clear под разные задачи лаборатории.

Назначение: временные реставрации, протезные конструкции, розовые и прозрачные элементы.

Преимущества:
• монослойная структура
• цвета Pink и Clear
• простая фрезеровка
• стабильность оттенка`,
    metaDescription: "Диск HONCHON SMILE PMMA MONO 98 мм — монослойный PMMA для временных реставраций и протезных конструкций. Оттенки A3, Pink, Clear. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Honchon Smile",
      "Страна": "Китай",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "Monolayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм, 30 мм",
      "Цвета": "A3, Pink, Clear",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A3", price: 750, sku: "HONCHON-PMMA-MO-98-20-A3" },
      { diameter: 98, height: 20, shade: "Pink", price: 750, sku: "HONCHON-PMMA-MO-98-20-PINK" },
      { diameter: 98, height: 30, shade: "Pink", price: 850, sku: "HONCHON-PMMA-MO-98-30-PINK" },
      { diameter: 98, height: 20, shade: "Clear", price: 1000, sku: "HONCHON-PMMA-MO-98-20-CLEAR" },
    ],
  },
  // === PMMA Honchon Smile Flexible ===
  {
    id: "honchon-smile-pmma-flexible-d98",
    name: "Диск HONCHON SMILE PMMA FLEXIBLE",
    subtitle: "Гибкие PMMA-диски для конструкций с упругостью и точной CAD/CAM-обработкой",
    brand: "Honchon Smile",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: honchonSmilePmmaFlexible,
    basePrice: 1000,
    description: `Honchon Smile PMMA Flexible — полимерные заготовки для изготовления гибких временных и вспомогательных конструкций. В наличии зубные оттенки, розовые варианты для протезирования и прозрачный Clear для капп/шинных задач.

Назначение: гибкие временные конструкции, каппы/шины, розовые элементы.

Преимущества:
• гибкость материала
• широкий выбор цветов
• варианты 20 и 25 мм
• подходит для открытых CAD/CAM-систем`,
    metaDescription: "Диск HONCHON SMILE PMMA FLEXIBLE 98 мм — гибкие PMMA-диски для временных конструкций. Оттенки A1, A2, Pink, Clear. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Honchon Smile",
      "Страна": "Китай",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — Flexible",
      "Серия": "Flexible",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм, 25 мм",
      "Цвета": "A1, A2, Pink, Clear",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A1", price: 1000, sku: "HONCHON-PMMA-FLEX-98-20-A1" },
      { diameter: 98, height: 20, shade: "A2", price: 1000, sku: "HONCHON-PMMA-FLEX-98-20-A2" },
      { diameter: 98, height: 25, shade: "A2", price: 1000, sku: "HONCHON-PMMA-FLEX-98-25-A2" },
      { diameter: 98, height: 20, shade: "Pink", price: 1000, sku: "HONCHON-PMMA-FLEX-98-20-PINK" },
      { diameter: 98, height: 25, shade: "Pink", price: 1000, sku: "HONCHON-PMMA-FLEX-98-25-PINK" },
      { diameter: 98, height: 20, shade: "Clear", price: 1000, sku: "HONCHON-PMMA-FLEX-98-20-CLEAR" },
    ],
  },
  // === PMMA Audental Multilayer ===
  {
    id: "audental-pmma-ml-d98",
    name: "Диск AUDENTAL PMMA MULTILAYER",
    subtitle: "Многослойный предокрашенный PMMA-диск для эстетичных временных конструкций",
    brand: "Audental",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: audentalPmmaML,
    basePrice: 1350,
    description: `Audental PMMA Multilayer — многослойная блок-заготовка из PMMA для временных конструкций длительного ношения. Материал отличается прочностью, биосовместимостью, легкой обработкой и стойкостью к истиранию. Доступны оттенки A1, A2, A3 и BL3.

Назначение: эстетичные временные конструкции длительного ношения.

Преимущества:
• многослойная структура
• высокая биосовместимость
• легкая обработка
• стойкость к истиранию`,
    metaDescription: "Диск AUDENTAL PMMA MULTILAYER 98×20 мм — многослойный PMMA для эстетичных временных конструкций. Оттенки A1, A2, A3, BL3. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Audental",
      "Страна": "Китай",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — ML",
      "Серия": "Multilayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "20 мм",
      "Цвета": "A1, A2, A3, BL3",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 20, shade: "A1", price: 1350, sku: "AUDENTAL-PMMA-ML-98-20-A1" },
      { diameter: 98, height: 20, shade: "A2", price: 1350, sku: "AUDENTAL-PMMA-ML-98-20-A2" },
      { diameter: 98, height: 20, shade: "A3", price: 1350, sku: "AUDENTAL-PMMA-ML-98-20-A3" },
      { diameter: 98, height: 20, shade: "BL3", price: 1350, sku: "AUDENTAL-PMMA-ML-98-20-BL3" },
    ],
  },
  // === PMMA Audental Monolayer ===
  {
    id: "audental-pmma-mono-d98",
    name: "Диск AUDENTAL PMMA MONO",
    subtitle: "Однослойные PMMA-диски для временных коронок, мостов и примерочных конструкций",
    brand: "Audental",
    category: "cad-cam-discs",
    subcategory: "pmma-discs",
    image: audentalPmmaMono,
    basePrice: 700,
    description: `Audental PMMA Mono — монослойный PMMA-диск для изготовления временных конструкций при помощи открытых CAD/CAM-систем. Материал подходит для повседневных лабораторных задач, отличается легкой обработкой и стабильной геометрией после фрезерования.

Назначение: временные коронки, мосты и примерочные конструкции.

Преимущества:
• монослойная структура
• 4 ходовых оттенка
• легкая обработка
• совместимость с CAD/CAM`,
    metaDescription: "Диск AUDENTAL PMMA MONO 98×16 мм — однослойный PMMA для временных конструкций. Оттенки A1, A2, A3, BL3. Купить в Articon, доставка по России.",
    specifications: {
      "Производитель": "Audental",
      "Страна": "Китай",
      "Категория": "CAD/CAM диски и блоки",
      "Тип": "Диски PMMA — MO",
      "Серия": "Monolayer",
      "Материал": "PMMA",
      "Диаметр": "98 мм",
      "Высота": "16 мм",
      "Цвета": "A1, A2, A3, BL3",
      "Упаковка": "1 шт.",
      "Совместимость": "открытые CAD/CAM-системы",
    },
    variants: [
      { diameter: 98, height: 16, shade: "A1", price: 700, sku: "AUDENTAL-PMMA-MO-98-16-A1" },
      { diameter: 98, height: 16, shade: "A2", price: 700, sku: "AUDENTAL-PMMA-MO-98-16-A2" },
      { diameter: 98, height: 16, shade: "A3", price: 700, sku: "AUDENTAL-PMMA-MO-98-16-A3" },
      { diameter: 98, height: 16, shade: "BL3", price: 700, sku: "AUDENTAL-PMMA-MO-98-16-BL3" },
    ],
  },
  // === ТИТАНОВЫЕ ДИСКИ ===
  {
    id: "honchon-titan-d98",
    name: "Заготовка из титана Honchon Titan",
    subtitle: "Титановый диск для CAD/CAM фрезерования каркасов",
    brand: "Honchon Smile",
    category: "cad-cam-discs",
    subcategory: "metal-discs",
    image: honchonTitan,
    basePrice: 4900,
    noShade: true,
    description: `Заготовка из титана Honchon Titan — диск 98 мм для CAD/CAM фрезерования каркасов коронок, мостовидных протезов и индивидуальных абатментов.

Биосовместимый материал с высокой устойчивостью к коррозии. Совместим со всеми популярными открытыми CAD/CAM системами.

Преимущества:
• Биосовместимость
• Высокая устойчивость к коррозии
• 5 вариантов толщины: 12, 14, 16, 18, 20 мм
• Диаметр 98 мм`,
    specifications: {
      "Производитель": "Honchon Smile",
      "Материал": "Ti (титан)",
      "Диаметр (мм)": "98",
      "Свойства": "Биосовместимость, высокая устойчивость к коррозии",
    },
    variants: generateHonchonTitanVariants(),
  },
];

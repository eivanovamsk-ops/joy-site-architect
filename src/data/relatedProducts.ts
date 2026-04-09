/**
 * Mapping of product IDs to their related/cross-sell product IDs.
 * Used for "Сопутствующие товары" blocks on product detail pages.
 */

const TOPCORE_IDS = [
  "topcore-composite-a1",
  "topcore-composite-a2",
  "topcore-composite-a3",
  "topcore-composite-bleach",
  "topcore-model",
  "topcore-model-pro",
  "topcore-pink",
  "topcore-pink-base",
  "topcore-sg",
];

const UPCERA_BURS = [
  "burs-upcera-a51-a52-pmma",
  "burs-upcera-a52w-glass-ceramic",
  "burs-upcera-a52w-metal",
  "burs-upcera-a52-zircon",
  "burs-upcera-b41-b42-glass-ceramic",
  "burs-upcera-b51-b52-metal",
];

const IMES_BURS = [
  "burs-imes-150i-250i-pmma",
  "burs-imes-350i-metal",
  "burs-imes-350i-zircon",
  "burs-imes-150i-250i-zircon",
  "burs-imes-350i-650i-glass-ceramic",
  "burs-imes-150i-250i-glass-ceramic",
];

/** Direct mappings: product ID → array of related product IDs */
const directMap: Record<string, string[]> = {
  // HeyGears printer → HeyGears photopolymer
  "ultracraft-a2d-hd": ["heygears-model-gp-caramel"],

  // Uniformation printers → TOPCORE photopolymers
  "uniformation-gk3-ultra": TOPCORE_IDS,
  "uniformation-gk3-pro": TOPCORE_IDS,

  // UPCERA milling machines → UPCERA burs
  "upcera-a52": UPCERA_BURS,
  "upcera-a52dw": UPCERA_BURS,
  "upcera-e52-hybrid": UPCERA_BURS,
  "upcera-b52": UPCERA_BURS,
  "upcera-b42": UPCERA_BURS,

  // Bundle page → zirconia discs
  "bundle-upcera-cadcam-kit": [
    "upcera-explore-98x14-a1",
    "upcera-explore-98x14-a2",
    "upcera-explore-98x16-a1",
    "upcera-explore-98x16-a2",
    "upcera-explore-98x18-a1",
    "upcera-explore-98x18-a2",
    "upcera-explore-98x12-a2",
    "upcera-explore-98x14-a35",
  ],
};

/**
 * Returns related product IDs for a given product.
 * Falls back to empty array if no explicit mapping exists.
 */
export function getRelatedProductIds(productId: string): string[] {
  return directMap[productId] ?? [];
}

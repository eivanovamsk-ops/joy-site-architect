import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ShoppingCart, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Disc {
  id: string;
  name: string;
  price: number | null;
  priceRange?: string;
  image: string;
  brand: string;
  material: string;
  size: string;
  color?: string;
}

const discs: Disc[] = [
  // UPCERA DUO (pages 1-2)
  { id: "upcera-duo-98x14-a1", name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A1", price: 11040, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A1" },
  { id: "upcera-duo-98x14-a2", name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A2", price: 11040, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A2" },
  { id: "upcera-duo-98x14-a3", name: "UPCERA DUO циркониевые диски 98 x 14 мм, цвет A3", price: 11040, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A3" },
  { id: "upcera-duo-98x16-a1", name: "UPCERA DUO циркониевые диски 98 x 16 мм, цвет A1", price: 12144, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A1" },
  { id: "upcera-duo-98x16-a2", name: "UPCERA DUO циркониевые диски 98 x 16 мм, цвет A2", price: 12144, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A2" },
  { id: "upcera-duo-98x16-a3", name: "UPCERA DUO циркониевые диски 98 x 16 мм, цвет A3", price: 12144, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A3" },
  { id: "upcera-duo-98x18-a1", name: "UPCERA DUO циркониевые диски 98 x 18 мм, цвет A1", price: 13248, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "A1" },
  { id: "upcera-duo-98x18-a2", name: "UPCERA DUO циркониевые диски 98 x 18 мм, цвет A2", price: 13248, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "A2" },
  { id: "upcera-duo-98x18-a3", name: "UPCERA DUO циркониевые диски 98 x 18 мм, цвет A3", price: 13248, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "A3" },
  { id: "upcera-duo-98x20-a1", name: "UPCERA DUO циркониевые диски 98 x 20 мм, цвет A1", price: 13869, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A1" },
  { id: "upcera-duo-98x22-a1", name: "UPCERA DUO циркониевые диски 98 x 22 мм, цвет A1", price: 14490, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A1" },
  { id: "upcera-duo-98x22-a2", name: "UPCERA DUO циркониевые диски 98 x 22 мм, цвет A2", price: 14490, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A2" },
  { id: "upcera-duo-98x25-a1", name: "UPCERA DUO циркониевые диски 98 x 25 мм, цвет A1", price: 15870, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x25", color: "A1" },
  { id: "upcera-duo-98x25-a3", name: "UPCERA DUO циркониевые диски 98 x 25 мм, цвет A3", price: 15870, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x25", color: "A3" },
  { id: "upcera-duo-98x25-b2", name: "UPCERA DUO циркониевые диски 98 x 25 мм, цвет B2", price: 15870, image: "https://articon.pro/wp-content/uploads/2025/07/Frame-811546-7-300x300.png", brand: "UPCERA", material: "Цирконий", size: "98x25", color: "B2" },
  
  // Upcera Explore Esthetic (pages 3-4)
  { id: "upcera-esthetic-98x14-bl2", name: "Upcera Explore Esthetic циркониевые диски, 98 x 14 мм, цвет BL2", price: 8625, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "BL2" },
  { id: "upcera-esthetic-98x16-a2", name: "Upcera Explore Esthetic циркониевые диски, 98 x 16 мм, цвет A2", price: 8580, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A2" },
  { id: "upcera-esthetic-98x16-a3", name: "Upcera Explore Esthetic циркониевые диски, 98 x 16 мм, цвет A3", price: 8580, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A3" },
  { id: "upcera-esthetic-98x16-a35", name: "Upcera Explore Esthetic циркониевые диски, 98 x 16 мм, цвет A3,5", price: 8580, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A3,5" },
  { id: "upcera-esthetic-98x18-bl1", name: "Upcera Explore Esthetic циркониевые диски, 98 x 18 мм, цвет BL1", price: 10120, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "BL1" },
  { id: "upcera-esthetic-98x18-bl2", name: "Upcera Explore Esthetic циркониевые диски, 98 x 18 мм, цвет BL2", price: 10120, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "BL2" },
  { id: "upcera-esthetic-98x20-a1", name: "Upcera Explore Esthetic циркониевые диски, 98 x 20 мм, цвет A1", price: 9100, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A1" },
  { id: "upcera-esthetic-98x20-a2", name: "Upcera Explore Esthetic циркониевые диски, 98 x 20 мм, цвет A2", price: 9100, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-Explore-Esthetic-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A2" },

  // Upcera Explore Functional (pages 5-8)
  { id: "upcera-func-98x16-a1", name: "Upcera Explore Functional циркониевые диски, 98 x 16, цвет A1", price: 10120, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A1" },
  { id: "upcera-func-98x16-a2", name: "Upcera Explore Functional циркониевые диски, 98 x 16, цвет A2", price: 10120, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A2" },
  { id: "upcera-func-98x16-a3", name: "Upcera Explore Functional циркониевые диски, 98 x 16, цвет A3", price: 10120, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A3" },
  { id: "upcera-func-98x18-bl2", name: "Upcera Explore Functional циркониевые диски, 98 x 18, цвет BL2", price: 10695, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "BL2" },
  { id: "upcera-func-98x18-bl3", name: "Upcera Explore Functional циркониевые диски, 98 x 18, цвет BL3", price: 10695, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x18", color: "BL3" },
  { id: "upcera-func-98x20-a2", name: "Upcera Explore Functional циркониевые диски, 98 x 20 мм, цвет A2", price: 11385, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A2" },
  { id: "upcera-func-98x22-a2", name: "Upcera Explore Functional циркониевые диски, 98 x 22, цвет A2", price: 12075, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A2" },
  { id: "upcera-func-98x22-a3", name: "Upcera Explore Functional циркониевые диски, 98 x 22, цвет A3", price: 12075, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A3" },
  { id: "upcera-func-98x25-bl2", name: "Upcera Explore Functional циркониевые диски, 98 x 25, цвет BL2", price: 13225, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x25", color: "BL2" },
  { id: "upcera-func-98x25-bl3", name: "Upcera Explore Functional циркониевые диски, 98 x 25, цвет BL3", price: 13225, image: "https://articon.pro/wp-content/uploads/2024/07/Upcera-1-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x25", color: "BL3" },

  // Upcera ST Color (pages 8-10)
  { id: "upcera-st-98x10-a1", name: "Upcera ST Color циркониевые диски, 98 x 10 мм, цвет A1", price: 4025, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x10", color: "A1" },
  { id: "upcera-st-98x14-a2", name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A2", price: 5290, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A2" },
  { id: "upcera-st-98x14-a3", name: "Upcera ST Color циркониевые диски, 98 x 14 мм, цвет A3", price: 5290, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A3" },
  { id: "upcera-st-98x16-a1", name: "Upcera ST Color циркониевые диски, 98 x 16 мм, цвет A1", price: 5980, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A1" },
  { id: "upcera-st-98x20-a2", name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A2", price: 7792, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A2" },
  { id: "upcera-st-98x20-a3", name: "Upcera ST Color циркониевые диски, 98 x 20 мм, цвет A3", price: 6775, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A3" },
  { id: "upcera-st-98x22-a1", name: "Upcera ST Color циркониевые диски, 98 x 22 мм, цвет A1", price: 7935, image: "https://articon.pro/wp-content/uploads/2024/08/Upcera-ST-Color-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A1" },

  // Upcera ST ML (pages 11-12)
  { id: "upcera-stml-98x14-a3", name: "Upcera ST ML циркониевые диски, 98 x 14 мм, цвет A3", price: 4390, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x14", color: "A3" },
  { id: "upcera-stml-98x16-a1", name: "Upcera ST ML циркониевые диски, 98 x 16 мм, цвет A1", price: 6685, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A1" },
  { id: "upcera-stml-98x16-a2", name: "Upcera ST ML циркониевые диски, 98 x 16 мм, цвет A2", price: 6685, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x16", color: "A2" },
  { id: "upcera-stml-98x20-a3", name: "Upcera ST ML циркониевые диски, 98 x 20 мм, цвет A3", price: 7900, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x20", color: "A3" },
  { id: "upcera-stml-98x22-a1", name: "Upcera ST ML циркониевые диски, 98 x 22 мм, цвет A1", price: 8500, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A1" },
  { id: "upcera-stml-98x22-a2", name: "Upcera ST ML циркониевые диски, 98 x 22 мм, цвет A2", price: 8500, image: "https://articon.pro/wp-content/uploads/2024/11/Upcera-ST-ML-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x22", color: "A2" },

  // PMMA Lima (page 13)
  { id: "pmma-lima-98x15-a1", name: "Диск PMMA – Lima – 98×15, A1", price: null, image: "https://articon.pro/wp-content/uploads/2024/07/Диск-PMMA-Lima-300x300.jpg", brand: "Lima", material: "PMMA", size: "98x15", color: "A1" },
  { id: "pmma-lima-98x15-a2", name: "Диск PMMA – Lima – 98×15, A2", price: null, image: "https://articon.pro/wp-content/uploads/2024/07/Диск-PMMA-Lima-300x300.jpg", brand: "Lima", material: "PMMA", size: "98x15", color: "A2" },
  { id: "pmma-lima-98x15-a3", name: "Диск PMMA – Lima – 98×15, A3", price: null, image: "https://articon.pro/wp-content/uploads/2024/07/Диск-PMMA-Lima-300x300.jpg", brand: "Lima", material: "PMMA", size: "98x15", color: "A3" },
  { id: "pmma-lima-98x15-w3", name: "Диск PMMA – Lima – 98×15, W3", price: null, image: "https://articon.pro/wp-content/uploads/2024/07/Диск-PMMA-Lima-300x300.jpg", brand: "Lima", material: "PMMA", size: "98x15", color: "W3" },

  // Dental Direkt (pages 14, 17-20)
  { id: "dd-biosplint-98x15", name: "Диск пластиковый Bio splint P HI – Dental Direkt – 98×15", price: 2150, image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-13-300x300.jpg", brand: "Dental Direkt", material: "Пластик", size: "98x15" },
  { id: "dd-biosplint-98x20", name: "Диск пластиковый Bio splint P HI – Dental Direkt – 98×20", price: 2350, image: "https://articon.pro/wp-content/uploads/2024/08/Frame-285-13-300x300.jpg", brand: "Dental Direkt", material: "Пластик", size: "98x20" },
  { id: "dd-cubeone-98x18-a2", name: "Циркониевый диск Cube ONE ML – Dental Direkt – 98×18, A2", price: 22575, image: "https://articon.pro/wp-content/uploads/2024/06/DD-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x18", color: "A2" },
  { id: "dd-cubex2-98x14-b2", name: "Циркониевый диск cubeX² ML – Dental Direkt – 98×14, B2", price: 17220, image: "https://articon.pro/wp-content/uploads/2024/06/Циркониевый-диск-Артикон-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x14", color: "B2" },
  { id: "dd-cubex2-98x14-c2", name: "Циркониевый диск cubeX² ML – Dental Direkt – 98×14, C2", price: 17220, image: "https://articon.pro/wp-content/uploads/2024/06/Dental-Direkt-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x14", color: "C2" },
  { id: "dd-cubex2-98x22-d3", name: "Циркониевый диск cubeX² ML – Dental Direkt – 98×22, D3", price: 28035, image: "https://articon.pro/wp-content/uploads/2024/06/Циркониевый-диск-Артикон-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x22", color: "D3" },
  { id: "dd-biozw-98x14", name: "Циркониевый диск DD Bio ZW iso – Dental Direkt – 98×14, white", price: 9030, image: "https://articon.pro/wp-content/uploads/2024/06/DD-cube-ONE-Dental-Direkt-98х10-white-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x14", color: "white" },
  { id: "dd-biozx2-98x14-a4", name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×14, А4", price: 10185, image: "https://articon.pro/wp-content/uploads/2024/06/g-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x14", color: "A4" },
  { id: "dd-biozx2-98x18-b2", name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×18, B2", price: 13230, image: "https://articon.pro/wp-content/uploads/2024/06/g-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x18", color: "B2" },
  { id: "dd-biozx2-98x18-c1", name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×18, C1", price: 13230, image: "https://articon.pro/wp-content/uploads/2024/06/g-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x18", color: "C1" },
  { id: "dd-biozx2-98x25-b3", name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×25, B3", price: 19110, image: "https://articon.pro/wp-content/uploads/2024/06/g-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x25", color: "B3" },
  { id: "dd-biozx2-98x25-d3", name: "Циркониевый диск DD Bio ZX² color – Dental Direkt – 98×25, D3", price: 19110, image: "https://articon.pro/wp-content/uploads/2024/06/g-300x300.jpg", brand: "Dental Direkt", material: "Цирконий", size: "98x25", color: "D3" },

  // Honchon Smile 4D plus ML (page 14)
  { id: "honchon-4dml-98x12", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×12", price: 7500, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x12" },
  { id: "honchon-4dml-98x14", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×14", price: 8000, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x14" },
  { id: "honchon-4dml-98x16", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×16", price: 8500, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x16" },
  { id: "honchon-4dml-98x18", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×18", price: 9000, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x18" },
  { id: "honchon-4dml-98x20", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×20", price: 9500, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x20" },
  { id: "honchon-4dml-98x22", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×22", price: 10000, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x22" },
  { id: "honchon-4dml-98x25", name: "Диск циркониевый 4D plus ML – Honchon Smile – 98×25", price: 10500, image: "https://articon.pro/wp-content/uploads/2024/03/Диск-циркониевый-4D-plus-ML-—-Honchon-Smile-300x300.jpg", brand: "Honchon Smile", material: "Цирконий", size: "98x25" },

  // Honchon Titan (page 15)
  { id: "honchon-titan-98x18", name: "Заготовка из титана — Honchon Titan — 98×18", price: 5650, image: "https://articon.pro/wp-content/uploads/2024/01/Фрезерная-заготовка-из-сплава-титана-300x300.png", brand: "Honchon", material: "Титан", size: "98x18" },
  { id: "honchon-titan-98x20", name: "Заготовка из титана — Honchon Titan — 98×20", price: 6100, image: "https://articon.pro/wp-content/uploads/2024/01/Фрезерная-заготовка-из-сплава-титана-300x300.png", brand: "Honchon", material: "Титан", size: "98x20" },

  // Upcera HT (page 15)
  { id: "upcera-ht-98x10", name: "Заготовка из циркония Upcera HT D98-10", price: 2855, image: "https://articon.pro/wp-content/uploads/2025/01/UPCERA-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x10" },
  { id: "upcera-ht-98x12", name: "Заготовка из циркония Upcera HT D98-12", price: 3250, image: "https://articon.pro/wp-content/uploads/2025/01/UPCERA-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x12" },
  { id: "upcera-ht-98x14", name: "Заготовка из циркония Upcera HT D98-14", price: 3650, image: "https://articon.pro/wp-content/uploads/2025/01/UPCERA-300x300.jpg", brand: "UPCERA", material: "Цирконий", size: "98x14" },

  // Accessories (page 16)
  { id: "upcera-realism-set", name: "Набор красок Upcera Realism (7 цветов)", price: 26105, image: "https://articon.pro/wp-content/uploads/2024/11/Глазурь-Upcera-Realism-для-керамики-и-циркония--300x300.jpg", brand: "UPCERA", material: "Расходники", size: "-" },
  { id: "upcera-glaze-liquid", name: "Разбавитель Upcera Realism Glaze Liquid для керамики и циркония", price: 3680, image: "https://articon.pro/wp-content/uploads/2024/11/Разбавитель-Upcera-Realism-Glaze-Liquid-для-керамики-и-циркония-300x300.jpg", brand: "UPCERA", material: "Расходники", size: "-" },
  { id: "dd-cubex2-super", name: "Суперпрозрачный диоксид циркония CubeX²", price: null, priceRange: "9 975 ₽ – 21 210 ₽", image: "https://articon.pro/wp-content/uploads/2024/03/Articon-LPSZ30B2-DentalDirekt-Coloring-Liquid-Pro-Shade-Z-768x768-1-300x300.png", brand: "Dental Direkt", material: "Цирконий", size: "98" },
];

const ZirconiaDiscs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => [...new Set(discs.map(d => d.brand))].sort(), []);
  const materials = useMemo(() => [...new Set(discs.map(d => d.material))].sort(), []);
  const sizes = useMemo(() => [...new Set(discs.map(d => d.size))].filter(s => s !== "-").sort(), []);

  const filteredDiscs = useMemo(() => {
    return discs.filter(disc => {
      const matchesSearch = disc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           disc.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(disc.brand);
      const matchesMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(disc.material);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(disc.size);
      return matchesSearch && matchesBrand && matchesMaterial && matchesSize;
    });
  }, [searchQuery, selectedBrands, selectedMaterials, selectedSizes]);

  const toggleFilter = (value: string, selected: string[], setSelected: (v: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedMaterials([]);
    setSelectedSizes([]);
    setSearchQuery("");
  };

  const activeFiltersCount = selectedBrands.length + selectedMaterials.length + selectedSizes.length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const breadcrumbItems = [
    { label: "Главная", href: "/" },
    { label: "Магазин", href: "/shop" },
    { label: "Диски CAD/CAM" },
  ];

  return (
    <Layout>
      <div className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Диски CAD/CAM
              </h1>
              <p className="text-muted-foreground">
                {filteredDiscs.length} товаров
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по каталогу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Фильтры</h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Сбросить
                    </Button>
                  )}
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Бренд</h4>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                        />
                        <span className="text-sm text-foreground">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Материал</h4>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <label key={material} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
                        />
                        <span className="text-sm text-foreground">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Размер</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {sizes.map(size => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                        />
                        <span className="text-sm text-foreground">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredDiscs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredDiscs.map((disc) => (
                    <Card key={disc.id} className="group overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="relative aspect-square overflow-hidden bg-muted/30">
                        <img
                          src={disc.image}
                          alt={disc.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link to={`/shop/product/${disc.id}`}>
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                          {disc.brand}
                        </div>
                        <h3 className="font-medium text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5rem] text-foreground">
                          {disc.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-lg text-foreground">
                            {disc.price ? formatPrice(disc.price) : disc.priceRange || "По запросу"}
                          </div>
                          <Button size="sm" className="h-9 px-3 bg-primary hover:bg-primary/90">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {disc.price ? "В корзину" : "Запросить"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">Товары не найдены</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ZirconiaDiscs;

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CadcamFilterState {
  heights: number[];
  shades: string[];
  translucency: string[];
  material: string[];
}

export const EMPTY_FILTERS: CadcamFilterState = {
  heights: [],
  shades: [],
  translucency: [],
  material: [],
};

const HEIGHT_OPTIONS = [12, 14, 16, 18, 20, 22, 25];

const SHADE_OPTIONS = [
  "A1", "A2", "A3", "A3.5", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D2", "D3", "D4",
  "BL1", "BL2", "BL3", "BL4",
  "ML", "0M1", "Sun",
];

const TRANSLUCENCY_OPTIONS = [
  { id: "ST", label: "ST (Super Translucent)" },
  { id: "HT", label: "HT (High Translucent)" },
  { id: "MT", label: "MT (Medium Translucent)" },
];

const MATERIAL_OPTIONS = [
  { id: "zirconia", label: "Циркония диоксид" },
  { id: "titanium", label: "Титан" },
  { id: "multilayer", label: "Многослойный" },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
};

interface CadcamFiltersProps {
  filters: CadcamFilterState;
  onChange: (filters: CadcamFilterState) => void;
}

export const CadcamFilters = ({ filters, onChange }: CadcamFiltersProps) => {
  const toggleValue = <K extends keyof CadcamFilterState>(
    key: K,
    value: CadcamFilterState[K][number]
  ) => {
    const current = filters[key] as any[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.heights.length +
    filters.shades.length +
    filters.translucency.length +
    filters.material.length;

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground text-lg">Фильтры</h3>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground gap-1 h-7"
            onClick={() => onChange(EMPTY_FILTERS)}
          >
            <X className="h-3 w-3" />
            Сбросить ({activeCount})
          </Button>
        )}
      </div>

      {/* Diameter — fixed 98mm */}
      <FilterSection title="Диаметр (мм)">
        <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
          <Checkbox checked disabled className="opacity-60" />
          <span>98</span>
        </div>
      </FilterSection>

      {/* Height */}
      <FilterSection title="Толщина / высота (мм)">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {HEIGHT_OPTIONS.map((h) => (
            <label key={h} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={filters.heights.includes(h)}
                onCheckedChange={() => toggleValue("heights", h)}
              />
              <span>{h}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Shade */}
      <FilterSection title="Цвет / Оттенок" defaultOpen={false}>
        <div className="grid grid-cols-3 gap-y-2 gap-x-2">
          {SHADE_OPTIONS.map((s) => (
            <label key={s} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <Checkbox
                checked={filters.shades.includes(s)}
                onCheckedChange={() => toggleValue("shades", s)}
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Translucency */}
      <FilterSection title="Прозрачность">
        {TRANSLUCENCY_OPTIONS.map((t) => (
          <label key={t.id} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={filters.translucency.includes(t.id)}
              onCheckedChange={() => toggleValue("translucency", t.id)}
            />
            <span>{t.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Material */}
      <FilterSection title="Материал">
        {MATERIAL_OPTIONS.map((m) => (
          <label key={m.id} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={filters.material.includes(m.id)}
              onCheckedChange={() => toggleValue("material", m.id)}
            />
            <span>{m.label}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
};

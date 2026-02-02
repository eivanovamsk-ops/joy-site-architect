import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CatalogSidebar } from "./CatalogSidebar";

export const MobileCatalogDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Menu className="h-4 w-4" />
            Категории
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Категории</SheetTitle>
          </SheetHeader>
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]" onClick={() => setOpen(false)}>
            <CatalogSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

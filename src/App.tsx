import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Laboratory from "./pages/Laboratory";
import LaboratoryServices from "./pages/LaboratoryServices";
import PriceListsAndOrders from "./pages/PriceListsAndOrders";
import Shop from "./pages/Shop";
import Education from "./pages/Education";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import ProductDetail from "./pages/ProductDetail";
import CourseDetail from "./pages/CourseDetail";
import CourseCalendar from "./pages/CourseCalendar";
import IntraoralScanners from "./pages/IntraoralScanners";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/laboratory" element={<Laboratory />} />
          <Route path="/laboratory/services" element={<LaboratoryServices />} />
          <Route path="/laboratory/documents" element={<PriceListsAndOrders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path="/shop/catalog/intraoral-scanners" element={<IntraoralScanners />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/calendar" element={<CourseCalendar />} />
          <Route path="/education/course/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

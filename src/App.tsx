import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import Laboratory from "./pages/Laboratory";
import LaboratoryServices from "./pages/LaboratoryServices";
import PriceListsAndOrders from "./pages/PriceListsAndOrders";
import Shop from "./pages/Shop";
import Education from "./pages/Education";
import EducationContacts from "./pages/EducationContacts";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import GeneralContacts from "./pages/GeneralContacts";
import ProductDetail from "./pages/ProductDetail";
import ProductDetailVariant from "./pages/ProductDetailVariant";
import CourseDetail from "./pages/CourseDetail";
import CourseCalendar from "./pages/CourseCalendar";
import IntraoralScanners from "./pages/IntraoralScanners";
import LabScanners from "./pages/LabScanners";
import Sale from "./pages/Sale";
import Printers3D from "./pages/Printers3D";
import Photopolymers from "./pages/Photopolymers";
import MillingMachines from "./pages/MillingMachines";
import Burs from "./pages/Burs";
import ZirconiaDiscs from "./pages/ZirconiaDiscs";
import PaintsGlaze from "./pages/PaintsGlaze";
import Furnaces from "./pages/Furnaces";
import Compressors from "./pages/Compressors";
import Vacuums from "./pages/Vacuums";
import MetalDiscs from "./pages/MetalDiscs";
import PressCeramic from "./pages/PressCeramic";
import PmmaDiscs from "./pages/PmmaDiscs";
import CadcamDiscs from "./pages/CadcamDiscs";
import Catalog from "./pages/Catalog";
import Delivery from "./pages/Delivery";
import ShopDelivery from "./pages/ShopDelivery";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import EducationSection from "./pages/EducationSection";
import WebinarBrackets from "./pages/WebinarBrackets";
import WebinarZirconMarch2026 from "./pages/WebinarZirconMarch2026";
import BundleUpceraKit from "./pages/BundleUpceraKit";
import BrandUpcera from "./pages/BrandUpcera";
import Workshop16Shades from "./pages/Workshop16Shades";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/laboratory" element={<Laboratory />} />
              <Route path="/laboratory/services" element={<LaboratoryServices />} />
              <Route path="/laboratory/documents" element={<PriceListsAndOrders />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/catalog" element={<Catalog />} />
              <Route path="/shop/product/:id" element={<ProductDetail />} />
              <Route path="/shop/variant/:id" element={<ProductDetailVariant />} />
              <Route path="/shop/catalog/intraoral-scanners" element={<IntraoralScanners />} />
              <Route path="/shop/catalog/lab-scanners" element={<LabScanners />} />
              <Route path="/shop/catalog/sale" element={<Sale />} />
              <Route path="/shop/catalog/3d-printers" element={<Printers3D />} />
              <Route path="/shop/catalog/printers" element={<Printers3D />} />
              <Route path="/shop/catalog/photopolymers" element={<Photopolymers />} />
              <Route path="/shop/catalog/milling-machines" element={<MillingMachines />} />
              <Route path="/shop/catalog/burs" element={<Burs />} />
              <Route path="/shop/catalog/zirconia-discs" element={<ZirconiaDiscs />} />
              <Route path="/shop/catalog/paints-glaze" element={<PaintsGlaze />} />
              <Route path="/shop/catalog/furnaces" element={<Furnaces />} />
              <Route path="/shop/catalog/compressors" element={<Compressors />} />
              <Route path="/shop/catalog/vacuums" element={<Vacuums />} />
              <Route path="/shop/catalog/metal-discs" element={<MetalDiscs />} />
              <Route path="/shop/catalog/press-ceramic" element={<PressCeramic />} />
              <Route path="/shop/catalog/pmma-discs" element={<PmmaDiscs />} />
              <Route path="/shop/catalog/cadcam-discs" element={<CadcamDiscs />} />
              <Route path="/shop/delivery" element={<ShopDelivery />} />
              <Route path="/shop/bundle/upcera-cadcam-kit" element={<BundleUpceraKit />} />
              <Route path="/shop/contacts" element={<Delivery />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education/contacts" element={<EducationContacts />} />
              <Route path="/education/calendar" element={<CourseCalendar />} />
              <Route path="/education/course/18" element={<Workshop16Shades />} />
              <Route path="/education/course/:id" element={<CourseDetail />} />
              <Route path="/education/webinar/brackets-march-2026" element={<WebinarBrackets />} />
              <Route path="/education/webinar/zircon-march-2026" element={<WebinarZirconMarch2026 />} />
              <Route path="/education/:section" element={<EducationSection />} />
              <Route path="/shop/brands/upcera" element={<BrandUpcera />} />
              <Route path="/about" element={<About />} />
              <Route path="/contacts" element={<GeneralContacts />} />
              <Route path="/laboratory/contacts" element={<Contacts />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

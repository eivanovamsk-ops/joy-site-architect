import { Component, ErrorInfo, ReactNode, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { CookieConsent } from "@/components/CookieConsent";
import { DeferredThirdPartyScripts } from "@/components/DeferredThirdPartyScripts";
import Index from "./pages/Index";

const Laboratory = lazy(() => import("./pages/Laboratory"));
const LaboratoryServices = lazy(() => import("./pages/LaboratoryServices"));
const PriceListsAndOrders = lazy(() => import("./pages/PriceListsAndOrders"));
const Shop = lazy(() => import("./pages/Shop"));
const Education = lazy(() => import("./pages/Education"));
const EducationContacts = lazy(() => import("./pages/EducationContacts"));
const EducationPrivacy = lazy(() => import("./pages/EducationPrivacy"));
const EducationTerms = lazy(() => import("./pages/EducationTerms"));
const About = lazy(() => import("./pages/About"));
const Contacts = lazy(() => import("./pages/Contacts"));
const GeneralContacts = lazy(() => import("./pages/GeneralContacts"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductDetailVariant = lazy(() => import("./pages/ProductDetailVariant"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CourseCalendar = lazy(() => import("./pages/CourseCalendar"));
const IntraoralScanners = lazy(() => import("./pages/IntraoralScanners"));
const LabScanners = lazy(() => import("./pages/LabScanners"));
const Sale = lazy(() => import("./pages/Sale"));
const Printers3D = lazy(() => import("./pages/Printers3D"));
const Photopolymers = lazy(() => import("./pages/Photopolymers"));
const MillingMachines = lazy(() => import("./pages/MillingMachines"));
const Burs = lazy(() => import("./pages/Burs"));
const ZirconiaDiscs = lazy(() => import("./pages/ZirconiaDiscs"));
const PaintsGlaze = lazy(() => import("./pages/PaintsGlaze"));
const Furnaces = lazy(() => import("./pages/Furnaces"));
const Compressors = lazy(() => import("./pages/Compressors"));
const Vacuums = lazy(() => import("./pages/Vacuums"));
const MetalDiscs = lazy(() => import("./pages/MetalDiscs"));
const PressCeramic = lazy(() => import("./pages/PressCeramic"));
const PmmaDiscs = lazy(() => import("./pages/PmmaDiscs"));
const CadcamDiscs = lazy(() => import("./pages/CadcamDiscs"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Delivery = lazy(() => import("./pages/Delivery"));
const ShopDelivery = lazy(() => import("./pages/ShopDelivery"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const EducationSection = lazy(() => import("./pages/EducationSection"));
const WebinarBrackets = lazy(() => import("./pages/WebinarBrackets"));
const WebinarZirconMarch2026 = lazy(() => import("./pages/WebinarZirconMarch2026"));
const WebinarAlignersMay2026 = lazy(() => import("./pages/WebinarAlignersMay2026"));
const WebinarThankYou = lazy(() => import("./pages/WebinarThankYou"));
const BundleUpceraKit = lazy(() => import("./pages/BundleUpceraKit"));
const BrandUpcera = lazy(() => import("./pages/BrandUpcera"));
const Workshop16Shades = lazy(() => import("./pages/Workshop16Shades"));
const DentalPhotoProtocol = lazy(() => import("./pages/DentalPhotoProtocol"));
const OrthoConference = lazy(() => import("./pages/OrthoConference"));
const ImplantProtocol = lazy(() => import("./pages/ImplantProtocol"));
const DigitalOrthoConference = lazy(() => import("./pages/DigitalOrthoConference"));
const LabManagementCourse = lazy(() => import("./pages/LabManagementCourse"));
const ZirconiaEvent2026 = lazy(() => import("./pages/ZirconiaEvent2026"));
const Webinars = lazy(() => import("./pages/Webinars"));
const CourseThankYou = lazy(() => import("./pages/CourseThankYou"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));

const queryClient = new QueryClient();

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App render failed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-2xl font-bold">Не удалось загрузить страницу</h1>
            <p className="text-muted-foreground">Обновите страницу или попробуйте открыть сайт чуть позже.</p>
            <button className="px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium" onClick={() => window.location.reload()}>
              Обновить
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={
                <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
                  <div className="text-center space-y-3">
                    <div className="mx-auto h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Загружаем страницу…</p>
                  </div>
                </div>
              }>
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
                <Route path="/education/privacy" element={<EducationPrivacy />} />
                <Route path="/education/terms" element={<EducationTerms />} />
                <Route path="/education/calendar" element={<CourseCalendar />} />
                <Route path="/education/course/18" element={<Workshop16Shades />} />
                <Route path="/education/workshop/archive/16-shades-10-04-2026" element={<Workshop16Shades />} />
                <Route path="/education/course/19" element={<OrthoConference />} />
                <Route path="/education/course/20" element={<DentalPhotoProtocol />} />
                <Route path="/education/course/23" element={<ImplantProtocol />} />
                <Route path="/education/course/22" element={<DigitalOrthoConference />} />
                <Route path="/education/course/24" element={<LabManagementCourse />} />
                <Route path="/education/course/37" element={<ZirconiaEvent2026 />} />
                <Route path="/education/course/:id" element={<CourseDetail />} />
                <Route path="/education/webinars" element={<Webinars />} />
                <Route path="/education/webinar/brackets-march-2026" element={<WebinarBrackets />} />
                <Route path="/education/webinar/brackets-march-2026/thank-you" element={<WebinarThankYou />} />
                <Route path="/education/webinar/zircon-march-2026" element={<WebinarZirconMarch2026 />} />
                <Route path="/education/webinar/zircon-march-2026/thank-you" element={<WebinarThankYou />} />
                <Route path="/education/webinar/aligners-maestro-may-2026" element={<WebinarAlignersMay2026 />} />
                <Route path="/education/webinar/aligners-maestro-may-2026/thank-you" element={<WebinarThankYou />} />
                <Route path="/education/thank-you" element={<CourseThankYou />} />
                <Route path="/education/payment-success" element={<PaymentSuccess />} />
                <Route path="/education/payment-failed" element={<PaymentFailed />} />
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
                <Route path="/unsubscribe" element={<Unsubscribe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
              <CookieConsent />
              <DeferredThirdPartyScripts />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;

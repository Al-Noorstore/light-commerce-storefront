
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { FormSubmissionProvider } from "@/contexts/FormSubmissionContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import TestAdmin from "./pages/TestAdmin";
import Contact from "./pages/Contact";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/FAQs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <ProductProvider>
          <CartProvider>
            <FormSubmissionProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/test-admin" element={<TestAdmin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </FormSubmissionProvider>
          </CartProvider>
        </ProductProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

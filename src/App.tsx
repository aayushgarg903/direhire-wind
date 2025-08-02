import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import WorkerDashboard from "./pages/WorkerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import BoothServices from "./pages/BoothServices";
import FindLocalServices from "./pages/FindLocalServices";
import Memberships from "./pages/Memberships";
import Support from "./pages/Support";
import Rating from "./pages/Rating";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/support" element={<Support />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/booth-services" element={<BoothServices />} />
          <Route path="/find-local-services" element={<FindLocalServices />} />
          <Route path="/rating" element={<Rating />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

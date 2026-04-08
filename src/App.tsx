import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import LoginPage from "@/pages/LoginPage";
import DiscountManagement from "@/pages/DiscountManagement";
import ProductsPage from "@/pages/ProductsPage";
import MLRecommendations from "@/pages/MLRecommendations";
import DiscountTester from "@/pages/DiscountTester";
import UploadPage from "@/pages/UploadPage";
import ReportsPage from "@/pages/ReportsPage";
import SupportPage from "@/pages/SupportPage";
import PresentationPage from "@/pages/PresentationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/discount-management" replace /> : <LoginPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/discount-management" : "/login"} replace />} />
      <Route path="/discount-management" element={<ProtectedRoute><DiscountManagement /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
      <Route path="/ml-recommendations" element={<ProtectedRoute><MLRecommendations /></ProtectedRoute>} />
      <Route path="/discount-tester" element={<ProtectedRoute><DiscountTester /></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
      <Route path="/presentation" element={<ProtectedRoute><PresentationPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
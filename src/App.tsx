
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AIPrediction from "@/pages/AIPrediction";
import HealthMonitoring from "@/pages/HealthMonitoring";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="predictions" element={<AIPrediction />} />
              <Route path="health-monitoring" element={<HealthMonitoring />} />
              <Route path="patients" element={<Dashboard />} />
              <Route path="appointments" element={<Dashboard />} />
              <Route path="records" element={<Dashboard />} />
              <Route path="users" element={<Dashboard />} />
              <Route path="alerts" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

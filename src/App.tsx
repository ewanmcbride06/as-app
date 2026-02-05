import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pipeline from "./pages/Pipeline";
import Campaigns from "./pages/Campaigns";
import Infrastructure from "./pages/Infrastructure";
import Engagement from "./pages/Engagement";
import Personas from "./pages/Personas";
import Leads from "./pages/Leads";
import Settings from "./pages/Settings";
import SettingsTeam from "./pages/SettingsTeam";
import SettingsIntegrations from "./pages/SettingsIntegrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/team" element={<SettingsTeam />} />
          <Route path="/settings/integrations" element={<SettingsIntegrations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

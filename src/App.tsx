import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConversationPanelProvider } from "@/contexts/ConversationPanelContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pipeline from "./pages/Pipeline";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Infrastructure from "./pages/Infrastructure";
import Engagement from "./pages/Engagement";

import Settings from "./pages/Settings";
import SettingsTeam from "./pages/SettingsTeam";
import SettingsIntegrations from "./pages/SettingsIntegrations";

// LeadVault pages
import LeadVaultDatabase from "./pages/leadvault/LeadVaultDatabase";
import LeadVaultLists from "./pages/leadvault/LeadVaultLists";
import LeadVaultListDetail from "./pages/leadvault/LeadVaultListDetail";
import LeadVaultCompanyDetail from "./pages/leadvault/LeadVaultCompanyDetail";
import LeadVaultContactDetail from "./pages/leadvault/LeadVaultContactDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ConversationPanelProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/engagement" element={<Engagement />} />
            
            
            {/* LeadVault Routes */}
            <Route path="/leads" element={<LeadVaultDatabase />} />
            <Route path="/leads/companies/:id" element={<LeadVaultCompanyDetail />} />
            <Route path="/leads/contacts/:id" element={<LeadVaultContactDetail />} />
            <Route path="/leads/lists" element={<LeadVaultLists />} />
            <Route path="/leads/lists/:id" element={<LeadVaultListDetail />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/team" element={<SettingsTeam />} />
            <Route path="/settings/integrations" element={<SettingsIntegrations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ConversationPanelProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

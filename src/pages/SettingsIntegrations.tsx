import SettingsLayout from "@/components/layout/SettingsLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, Plus } from "lucide-react";

const integrations = [
  {
    id: 1,
    name: "Leadmagic.io",
    description: "Real-time B2B data enrichment and lead intelligence platform.",
    category: "Data Enrichment",
    connected: true,
    logo: "LM",
  },
  {
    id: 2,
    name: "Prospeo.io",
    description: "Email finder and verification tool for sales prospecting.",
    category: "Email Finding",
    connected: false,
    logo: "PR",
  },
  {
    id: 3,
    name: "Calendly",
    description: "Automated scheduling for meetings and appointments.",
    category: "Scheduling",
    connected: true,
    logo: "CA",
  },
  {
    id: 4,
    name: "Close.com",
    description: "All-in-one CRM built for sales teams.",
    category: "CRM",
    connected: false,
    logo: "CL",
  },
  {
    id: 5,
    name: "MillionVerifier",
    description: "Bulk email verification and list cleaning service.",
    category: "Email Verification",
    connected: false,
    logo: "MV",
  },
  {
    id: 6,
    name: "Findymail",
    description: "Email finder with built-in verification.",
    category: "Email Finding",
    connected: true,
    logo: "FM",
  },
];

const SettingsIntegrations = () => {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your favorite tools and services to enhance your workflow.
          </p>
        </div>

        <Separator />

        {/* Integrations Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="rounded-[10px] border border-border bg-card p-5 flex items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="h-12 w-12 rounded-[10px] bg-foreground flex items-center justify-center text-sm font-bold text-background shrink-0">
                {integration.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
                  <Badge variant="secondary" className="text-xs rounded-[6px]">
                    {integration.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {integration.description}
                </p>
                <div className="flex items-center gap-2">
                  {integration.connected ? (
                    <>
                      <Badge variant="secondary" className="rounded-[6px]">
                        <Check className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-7 text-xs rounded-[6px]">
                        Configure
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="h-7 text-xs rounded-[10px]">
                      <Plus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[6px] shrink-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsIntegrations;

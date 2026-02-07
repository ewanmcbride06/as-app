import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { BarChart3, Replace, AlertTriangle } from "lucide-react";
import InfraStatCards from "@/components/infrastructure/InfraStatCards";
import DomainGroupedTable from "@/components/infrastructure/DomainGroupedTable";
import { infrastructureDomains, getGlobalStats } from "@/components/infrastructure/mockData";

type InfraTab = "overview" | "replacements" | "action-items";

const Infrastructure = () => {
  const [activeTab, setActiveTab] = useState<InfraTab>("overview");
  const stats = getGlobalStats(infrastructureDomains);

  const statCards = [
    {
      label: "Active Emails / Domains",
      value: `${stats.totalAccounts} Accounts`,
      valueSuffix: `${stats.totalDomains} Domains`,
    },
    {
      label: "Daily Sending Capacity",
      value: stats.dailyCapacity.toLocaleString(),
    },
    {
      label: "ESP Split (Outlook / Google)",
      value: `${stats.outlookPct}% | ${stats.googlePct}%`,
      showMenu: true,
    },
    {
      label: "Total Sent",
      value: stats.totalSent.toLocaleString(),
      showMenu: true,
    },
    {
      label: "Avg. Reply Rate",
      value: `${stats.avgReplyRate}%`,
      showMenu: true,
    },
    {
      label: "Avg. Bounce Rate",
      value: `${stats.avgBounceRate}%`,
      showMenu: true,
    },
  ];

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "replacements" as const, label: "Domain Replacements", icon: Replace },
    { key: "action-items" as const, label: "Action Items", icon: AlertTriangle },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Infrastructure</h1>
            <p className="text-muted-foreground">
              View all of your infrastructure stats, fed directly from your sending platform.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 border-b mb-5">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="flex flex-col flex-1 min-h-0 gap-5 overflow-hidden">
            {/* Stat Cards */}
            <div className="shrink-0">
              <InfraStatCards stats={statCards} />
            </div>

            {/* Domain Table */}
            <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
              <DomainGroupedTable domains={infrastructureDomains} />
            </div>
          </div>
        )}

        {activeTab === "replacements" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Replace className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="font-medium">Domain Replacements</p>
              <p className="text-sm mt-1">No domain replacements scheduled.</p>
            </div>
          </div>
        )}

        {activeTab === "action-items" && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="font-medium">Action Items</p>
              <p className="text-sm mt-1">No action items require attention.</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Infrastructure;

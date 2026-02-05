import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CampaignStatus = "Active" | "Completed" | "Paused" | "Archived";

interface Campaign {
  id: number;
  name: string;
  createdDate: string;
  status: CampaignStatus;
  sent: number;
  replied: number;
  repliedPercent: number;
  positive: number;
  positivePercent: number;
  bookings: number;
  bookingsPercent: number;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Podcast Production Companies | 430",
    createdDate: "28 December 2025",
    status: "Completed",
    sent: 808,
    replied: 22,
    repliedPercent: 5.12,
    positive: 9,
    positivePercent: 40.91,
    bookings: 5,
    bookingsPercent: 55.56,
  },
  {
    id: 2,
    name: "Podcast Production Companies V2",
    createdDate: "03 February 2026",
    status: "Active",
    sent: 1894,
    replied: 42,
    repliedPercent: 2.7,
    positive: 13,
    positivePercent: 30.95,
    bookings: 3,
    bookingsPercent: 23.08,
  },
];

const filterTabs = ["Active", "Completed", "Paused", "Archived", "All"] as const;

const StatusBadge = ({ status }: { status: CampaignStatus }) => {
  const styles: Record<CampaignStatus, string> = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Paused: "bg-amber-50 text-amber-600 border-amber-100",
    Archived: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

const InfoIcon = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Info className="h-3.5 w-3.5 text-muted-foreground inline ml-1 cursor-help" />
    </TooltipTrigger>
    <TooltipContent>
      <p>Click for more info</p>
    </TooltipContent>
  </Tooltip>
);

const Campaigns = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter = activeFilter === "All" || campaign.status === activeFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Email Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            View all of your campaign data, fed directly from your sending platform.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between p-2.5 border-b border-border">
            <div className="flex items-center gap-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeFilter === tab
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Start typing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                    Sent <InfoIcon />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                    Replied <InfoIcon />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                    Positive <InfoIcon />
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                    Bookings <InfoIcon />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCampaigns.map((campaign) => (
                  <tr 
                    key={campaign.id} 
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">Created on the {campaign.createdDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={campaign.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-foreground">
                        {campaign.sent.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-foreground">{campaign.replied}</span>
                      <span className="text-sm text-muted-foreground ml-2">{campaign.repliedPercent}%</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-foreground">{campaign.positive}</span>
                      <span className="text-sm text-muted-foreground ml-2">{campaign.positivePercent}%</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-medium text-foreground">{campaign.bookings}</span>
                      <span className="text-sm text-muted-foreground ml-2">{campaign.bookingsPercent}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;

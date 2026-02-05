import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Search, Plus, ChevronDown, MoreHorizontal, Mail, Phone, Calendar,
  DollarSign, Building2, User, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Stage = "Lead" | "Qualified" | "Meeting" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";

interface Deal {
  id: string;
  name: string;
  company: string;
  companyLogo: string;
  value: number;
  stage: Stage;
  owner: string;
  ownerAvatar: string;
  nextStep: string;
  lastActivity: string;
  probability: number;
}

const stages: { name: Stage; color: string }[] = [
  { name: "Lead", color: "bg-slate-100 text-slate-700" },
  { name: "Qualified", color: "bg-blue-100 text-blue-700" },
  { name: "Meeting", color: "bg-purple-100 text-purple-700" },
  { name: "Proposal", color: "bg-amber-100 text-amber-700" },
  { name: "Negotiation", color: "bg-orange-100 text-orange-700" },
  { name: "Closed Won", color: "bg-emerald-100 text-emerald-700" },
  { name: "Closed Lost", color: "bg-red-100 text-red-700" },
];

const deals: Deal[] = [
  { id: "1", name: "Enterprise License", company: "Acme Corp", companyLogo: "https://logo.clearbit.com/acme.com", value: 125000, stage: "Negotiation", owner: "Sarah Chen", ownerAvatar: "SC", nextStep: "Contract review", lastActivity: "2h ago", probability: 75 },
  { id: "2", name: "Annual Subscription", company: "TechFlow", companyLogo: "https://logo.clearbit.com/techflow.com", value: 48000, stage: "Proposal", owner: "Michael Brown", ownerAvatar: "MB", nextStep: "Send proposal", lastActivity: "4h ago", probability: 60 },
  { id: "3", name: "Platform Integration", company: "DataSync", companyLogo: "https://logo.clearbit.com/datasync.com", value: 89000, stage: "Meeting", owner: "Sarah Chen", ownerAvatar: "SC", nextStep: "Demo call", lastActivity: "1d ago", probability: 40 },
  { id: "4", name: "Team License", company: "CloudNine", companyLogo: "https://logo.clearbit.com/cloudnine.com", value: 32000, stage: "Qualified", owner: "James Wilson", ownerAvatar: "JW", nextStep: "Discovery call", lastActivity: "1d ago", probability: 25 },
  { id: "5", name: "Enterprise Suite", company: "Innovex", companyLogo: "https://logo.clearbit.com/innovex.com", value: 210000, stage: "Proposal", owner: "Emily Davis", ownerAvatar: "ED", nextStep: "Stakeholder meeting", lastActivity: "3h ago", probability: 55 },
  { id: "6", name: "Starter Package", company: "Nextera", companyLogo: "https://logo.clearbit.com/nextera.com", value: 15000, stage: "Lead", owner: "Michael Brown", ownerAvatar: "MB", nextStep: "Initial outreach", lastActivity: "5h ago", probability: 10 },
  { id: "7", name: "Professional Plan", company: "Quantum Labs", companyLogo: "https://logo.clearbit.com/quantumlabs.com", value: 67000, stage: "Meeting", owner: "Sarah Chen", ownerAvatar: "SC", nextStep: "Technical review", lastActivity: "6h ago", probability: 45 },
  { id: "8", name: "Custom Solution", company: "Velocity", companyLogo: "https://logo.clearbit.com/velocity.com", value: 156000, stage: "Closed Won", owner: "James Wilson", ownerAvatar: "JW", nextStep: "Implementation", lastActivity: "1w ago", probability: 100 },
];

const Pipeline = () => {
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeals = deals.filter(deal => {
    const matchesStage = stageFilter === "All" || deal.stage === stageFilter;
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  const toggleSelect = (id: string) => {
    if (selectedDeals.includes(id)) {
      setSelectedDeals(selectedDeals.filter(d => d !== id));
    } else {
      setSelectedDeals([...selectedDeals, id]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
            <p className="text-muted-foreground">Manage your sales opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search deals..." 
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Deal
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center gap-6 p-4 rounded-lg border bg-muted/30">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Total Pipeline</p>
            <p className="text-xl font-semibold">${totalValue.toLocaleString()}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Weighted Value</p>
            <p className="text-xl font-semibold">${Math.round(weightedValue).toLocaleString()}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Open Deals</p>
            <p className="text-xl font-semibold">{filteredDeals.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost").length}</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">Avg Deal Size</p>
            <p className="text-xl font-semibold">${Math.round(totalValue / filteredDeals.length).toLocaleString()}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b">
          <button
            onClick={() => setStageFilter("All")}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              stageFilter === "All" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            All Stages
          </button>
          {stages.slice(0, -2).map((stage) => (
            <button
              key={stage.name}
              onClick={() => setStageFilter(stage.name)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                stageFilter === stage.name ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedDeals.length > 0 && (
          <div className="p-3 bg-primary/5 rounded-lg flex items-center gap-3">
            <span className="text-sm font-medium">{selectedDeals.length} selected</span>
            <Button size="sm" variant="outline">Update Stage</Button>
            <Button size="sm" variant="outline">Assign Owner</Button>
            <Button size="sm" variant="outline">Export</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedDeals([])}>Clear</Button>
          </div>
        )}

        {/* Deals Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-3 w-10">
                  <Checkbox 
                    checked={selectedDeals.length === filteredDeals.length && filteredDeals.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) setSelectedDeals(filteredDeals.map(d => d.id));
                      else setSelectedDeals([]);
                    }}
                  />
                </th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Deal</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Company</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Value</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Stage</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Probability</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Owner</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Next Step</th>
                <th className="p-3 text-xs font-medium uppercase text-muted-foreground">Activity</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredDeals.map((deal) => {
                const stageStyle = stages.find(s => s.name === deal.stage)?.color || "";
                return (
                  <tr key={deal.id} className="hover:bg-muted/50">
                    <td className="p-3">
                      <Checkbox 
                        checked={selectedDeals.includes(deal.id)}
                        onCheckedChange={() => toggleSelect(deal.id)}
                      />
                    </td>
                    <td className="p-3">
                      <span className="font-medium">{deal.name}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded">
                          <AvatarImage src={deal.companyLogo} />
                          <AvatarFallback className="rounded text-xs">{deal.company[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{deal.company}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-medium">${deal.value.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      <Badge className={stageStyle}>{deal.stage}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-foreground rounded-full" 
                            style={{ width: `${deal.probability}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{deal.ownerAvatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground text-sm">{deal.owner}</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{deal.nextStep}</td>
                    <td className="p-3 text-sm text-muted-foreground">{deal.lastActivity}</td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                          <DropdownMenuItem>Change Stage</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;

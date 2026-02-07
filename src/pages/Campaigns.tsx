import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, MoreHorizontal, ChevronDown, Play, Pause, Archive, Download, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CampaignStatus = "Active" | "Completed" | "Paused" | "Archived";

interface Campaign {
  id: number;
  name: string;
  createdDate: string;
  status: CampaignStatus;
  prospects: number;
  sent: number;
  delivered: number;
  opened: number;
  openRate: number;
  replied: number;
  replyRate: number;
  positive: number;
  positiveRate: number;
  bookings: number;
  bookingRate: number;
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Podcast Production Companies | 430",
    createdDate: "28 Dec 2025",
    status: "Completed",
    prospects: 850,
    sent: 808,
    delivered: 792,
    opened: 312,
    openRate: 39.4,
    replied: 22,
    replyRate: 2.78,
    positive: 9,
    positiveRate: 40.91,
    bookings: 5,
    bookingRate: 55.56,
  },
  {
    id: 2,
    name: "Podcast Production Companies V2",
    createdDate: "03 Feb 2026",
    status: "Active",
    prospects: 2100,
    sent: 1894,
    delivered: 1856,
    opened: 687,
    openRate: 37.0,
    replied: 42,
    replyRate: 2.26,
    positive: 13,
    positiveRate: 30.95,
    bookings: 3,
    bookingRate: 23.08,
  },
  {
    id: 3,
    name: "SaaS Decision Makers - Q4",
    createdDate: "15 Jan 2026",
    status: "Active",
    prospects: 1500,
    sent: 1234,
    delivered: 1198,
    opened: 521,
    openRate: 43.5,
    replied: 38,
    replyRate: 3.17,
    positive: 15,
    positiveRate: 39.47,
    bookings: 7,
    bookingRate: 46.67,
  },
  {
    id: 4,
    name: "Enterprise CTOs Outreach",
    createdDate: "10 Jan 2026",
    status: "Paused",
    prospects: 650,
    sent: 412,
    delivered: 398,
    opened: 178,
    openRate: 44.7,
    replied: 18,
    replyRate: 4.52,
    positive: 8,
    positiveRate: 44.44,
    bookings: 4,
    bookingRate: 50.0,
  },
  {
    id: 5,
    name: "Marketing Leaders - Series B+",
    createdDate: "05 Jan 2026",
    status: "Active",
    prospects: 980,
    sent: 756,
    delivered: 742,
    opened: 298,
    openRate: 40.2,
    replied: 28,
    replyRate: 3.77,
    positive: 11,
    positiveRate: 39.29,
    bookings: 5,
    bookingRate: 45.45,
  },
];

const statusStyles: Record<CampaignStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
  Paused: "bg-amber-100 text-amber-700",
  Archived: "bg-slate-100 text-slate-700",
};

const Campaigns = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesFilter = activeFilter === "All" || campaign.status === activeFilter;
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalSent = filteredCampaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalReplies = filteredCampaigns.reduce((sum, c) => sum + c.replied, 0);

  const toggleSelect = (id: number) => {
    if (selectedCampaigns.includes(id)) {
      setSelectedCampaigns(selectedCampaigns.filter(c => c !== id));
    } else {
      setSelectedCampaigns([...selectedCampaigns, id]);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
            <p className="text-muted-foreground">Manage and monitor your email campaigns</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 border-b mb-5">
          <div className="flex items-center gap-1">
            {["All", "Active", "Completed", "Paused", "Archived"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
                  activeFilter === tab
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
          <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">{filteredCampaigns.length}</strong> campaigns
                  {" • "}
                  <strong className="text-foreground">{totalSent.toLocaleString()}</strong> sent
                  {" • "}
                  <strong className="text-foreground">{totalReplies}</strong> replies
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      Sort by: Created
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Created Date</DropdownMenuItem>
                    <DropdownMenuItem>Name A-Z</DropdownMenuItem>
                    <DropdownMenuItem>Sent Count</DropdownMenuItem>
                    <DropdownMenuItem>Reply Rate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedCampaigns.length > 0 && (
              <div className="border-b p-3 bg-primary/5 flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium">{selectedCampaigns.length} selected</span>
                <Button size="sm" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" />
                  Resume
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedCampaigns([])}>Clear</Button>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedCampaigns.length === filteredCampaigns.length && filteredCampaigns.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedCampaigns(filteredCampaigns.map(c => c.id));
                          else setSelectedCampaigns([]);
                        }}
                      />
                    </TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Prospects</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Opened</TableHead>
                    <TableHead className="text-right">Open Rate</TableHead>
                    <TableHead className="text-right">Replied</TableHead>
                    <TableHead className="text-right">Reply Rate</TableHead>
                    <TableHead className="text-right">Positive</TableHead>
                    <TableHead className="text-right">Bookings</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow 
                      key={campaign.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/campaigns/${campaign.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedCampaigns.includes(campaign.id)}
                          onCheckedChange={() => toggleSelect(campaign.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.createdDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusStyles[campaign.status]}>{campaign.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{campaign.prospects.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{campaign.opened.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="font-mono">{campaign.openRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{campaign.replied}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="font-mono">{campaign.replyRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">{campaign.positive}</TableCell>
                      <TableCell className="text-right font-medium">{campaign.bookings}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Pause</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;

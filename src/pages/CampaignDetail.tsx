import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock campaign data - in a real app this would come from an API
const campaignsData: Record<number, {
  name: string;
  sequenceStarted: string;
  prospectsContacted: number;
  totalReplies: number;
  totalRepliesPercent: number;
  humanReplies: number;
  humanRepliesPercent: number;
  positive: number;
  positivePercent: number;
  meetingsBooked: number;
  meetingsBookedPercent: number;
  meetingsShowed: number;
  meetingsShowedPercent: number;
  timeToLead: string;
  bounced: number;
  bouncedPercent: number;
}> = {
  1: {
    name: "Podcast Production Companies | 430",
    sequenceStarted: "28 December 2025",
    prospectsContacted: 430,
    totalReplies: 71,
    totalRepliesPercent: 16.51,
    humanReplies: 22,
    humanRepliesPercent: 5.12,
    positive: 9,
    positivePercent: 40.91,
    meetingsBooked: 5,
    meetingsBookedPercent: 55.56,
    meetingsShowed: 1,
    meetingsShowedPercent: 0.2,
    timeToLead: "64m 37s",
    bounced: 4,
    bouncedPercent: 0.5,
  },
  2: {
    name: "Podcast Production Companies V2",
    sequenceStarted: "03 February 2026",
    prospectsContacted: 1894,
    totalReplies: 142,
    totalRepliesPercent: 7.5,
    humanReplies: 42,
    humanRepliesPercent: 2.7,
    positive: 13,
    positivePercent: 30.95,
    meetingsBooked: 3,
    meetingsBookedPercent: 23.08,
    meetingsShowed: 2,
    meetingsShowedPercent: 0.15,
    timeToLead: "48m 12s",
    bounced: 12,
    bouncedPercent: 0.63,
  },
};

const chartData = [
  { date: "21 Jan", value: 0 },
  { date: "23 Jan", value: 0 },
  { date: "25 Jan", value: 0 },
  { date: "27 Jan", value: 0 },
  { date: "29 Jan", value: 0 },
  { date: "31 Jan", value: 0 },
  { date: "02 Feb", value: 0 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  percentage?: number;
  showInfo?: boolean;
}

const StatCard = ({ title, value, percentage, showInfo = true }: StatCardProps) => (
  <Card className="rounded-[10px] border-border">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        {showInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>More information about {title.toLowerCase()}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {percentage !== undefined && (
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        )}
      </div>
    </CardContent>
  </Card>
);

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const campaignId = parseInt(id || "1");
  const campaign = campaignsData[campaignId];

  if (!campaign) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Campaign not found</p>
          <Link to="/campaigns" className="text-primary hover:underline mt-2 inline-block">
            Back to Campaigns
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back To Campaigns
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{campaign.name}</h1>
          <p className="text-muted-foreground mt-1">
            Sequence Started: {campaign.sequenceStarted}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 gap-6">
            <TabsTrigger
              value="analytics"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="sequence"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
            >
              Sequence
            </TabsTrigger>
            <TabsTrigger
              value="replies"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground"
            >
              Replies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4 mt-0">
            {/* Stats Grid - Row 1 */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="Prospects Contacted"
                value={campaign.prospectsContacted}
              />
              <StatCard
                title="Total Replies"
                value={campaign.totalReplies}
                percentage={campaign.totalRepliesPercent}
              />
              <StatCard
                title="Human Replies"
                value={campaign.humanReplies}
                percentage={campaign.humanRepliesPercent}
              />
              <StatCard
                title="Positive"
                value={campaign.positive}
                percentage={campaign.positivePercent}
              />
            </div>

            {/* Stats Grid - Row 2 */}
            <div className="grid grid-cols-4 gap-4">
              <StatCard
                title="Meetings Booked"
                value={campaign.meetingsBooked}
                percentage={campaign.meetingsBookedPercent}
              />
              <StatCard
                title="Meetings Showed"
                value={campaign.meetingsShowed}
                percentage={campaign.meetingsShowedPercent}
              />
              <StatCard
                title="Time to Lead"
                value={campaign.timeToLead}
                showInfo={true}
              />
              <StatCard
                title="Bounced"
                value={campaign.bounced}
                percentage={campaign.bouncedPercent}
              />
            </div>

            {/* Chart */}
            <Card className="rounded-[10px] border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-foreground">Chart View</h3>
                  <span className="text-sm text-muted-foreground">20/01/2026 - 03/02/2026</span>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        domain={[-1, 1]}
                        ticks={[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--foreground))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sequence" className="mt-0">
            <Card className="rounded-[10px] border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Sequence content coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="replies" className="mt-0">
            <Card className="rounded-[10px] border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground">Replies content coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDetail;

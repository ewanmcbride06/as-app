import { useState } from "react";
import { subDays, startOfDay, endOfDay } from "date-fns";

import { 
  TrendingUp, TrendingDown, Users, Mail, MousePointer,
  Download, RefreshCw, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const metrics = [
  { label: "Total Sent", value: "24,892", change: "+12.3%", trend: "up" },
  { label: "Delivered", value: "24,156", change: "+11.8%", trend: "up" },
  { label: "Opened", value: "8,234", change: "+5.2%", trend: "up" },
  { label: "Clicked", value: "2,891", change: "-2.1%", trend: "down" },
  { label: "Replied", value: "892", change: "+18.4%", trend: "up" },
  { label: "Meetings", value: "127", change: "+24.6%", trend: "up" },
];

const topCampaigns = [
  { name: "Enterprise Q4 Outreach", sent: 4892, opens: 1847, clicks: 623, replies: 89, meetings: 23, openRate: 37.8, replyRate: 1.8 },
  { name: "SaaS Decision Makers", sent: 3241, opens: 1298, clicks: 412, replies: 67, meetings: 18, openRate: 40.0, replyRate: 2.1 },
  { name: "Series B Startups", sent: 2876, opens: 987, clicks: 298, replies: 54, meetings: 14, openRate: 34.3, replyRate: 1.9 },
  { name: "Marketing Leaders", sent: 2134, opens: 891, clicks: 267, replies: 42, meetings: 11, openRate: 41.8, replyRate: 2.0 },
  { name: "West Coast Tech", sent: 1987, opens: 756, clicks: 198, replies: 38, meetings: 9, openRate: 38.0, replyRate: 1.9 },
];

const recentActivity = [
  { action: "Reply received", contact: "Sarah Chen", campaign: "Enterprise Q4", time: "2m ago", type: "reply" },
  { action: "Meeting booked", contact: "Michael Brown", campaign: "SaaS Decision Makers", time: "15m ago", type: "meeting" },
  { action: "Email opened", contact: "Jessica Lee", campaign: "Series B Startups", time: "23m ago", type: "open" },
  { action: "Link clicked", contact: "David Kim", campaign: "Marketing Leaders", time: "45m ago", type: "click" },
  { action: "Reply received", contact: "Emily Davis", campaign: "West Coast Tech", time: "1h ago", type: "reply" },
  { action: "Meeting booked", contact: "James Wilson", campaign: "Enterprise Q4", time: "2h ago", type: "meeting" },
  { action: "Email opened", contact: "Amanda Martinez", campaign: "SaaS Decision Makers", time: "2h ago", type: "open" },
  { action: "Reply received", contact: "Robert Taylor", campaign: "Series B Startups", time: "3h ago", type: "reply" },
];

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(subDays(new Date(), 29)),
    to: endOfDay(new Date()),
  });

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Overview of your outreach performance</p>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-6 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-4 rounded-lg border bg-card">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-semibold">{metric.value}</span>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${metric.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Top Campaigns */}
          <div className="col-span-2 border rounded-lg">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Top Campaigns</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="text-right">Sent</TableHead>
                  <TableHead className="text-right">Opens</TableHead>
                  <TableHead className="text-right">Open Rate</TableHead>
                  <TableHead className="text-right">Replies</TableHead>
                  <TableHead className="text-right">Reply Rate</TableHead>
                  <TableHead className="text-right">Meetings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCampaigns.map((campaign) => (
                  <TableRow key={campaign.name} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{campaign.sent.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{campaign.opens.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="font-mono">{campaign.openRate}%</Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">{campaign.replies}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-mono">{campaign.replyRate}%</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{campaign.meetings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Recent Activity */}
          <div className="border rounded-lg">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="divide-y max-h-[400px] overflow-auto">
              {recentActivity.map((activity, i) => (
                <div key={i} className="px-4 py-3 hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'meeting' ? 'bg-emerald-500' :
                        activity.type === 'reply' ? 'bg-blue-500' :
                        activity.type === 'click' ? 'bg-amber-500' : 'bg-muted-foreground'
                      }`} />
                      <span className="text-sm font-medium">{activity.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.contact} • {activity.campaign}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

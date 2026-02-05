import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Search, Plus, ChevronDown, MoreHorizontal, Mail, MessageSquare, Phone,
  TrendingUp, TrendingDown, Calendar, Clock, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
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

interface EngagementRecord {
  id: string;
  contact: string;
  contactAvatar: string;
  company: string;
  emailsSent: number;
  emailsOpened: number;
  replies: number;
  calls: number;
  meetings: number;
  lastTouch: string;
  engagementScore: number;
  status: "Hot" | "Warm" | "Cold" | "Unresponsive";
}

const engagementData: EngagementRecord[] = [
  { id: "1", contact: "Sarah Chen", contactAvatar: "SC", company: "Acme Corp", emailsSent: 12, emailsOpened: 8, replies: 3, calls: 2, meetings: 1, lastTouch: "2h ago", engagementScore: 85, status: "Hot" },
  { id: "2", contact: "Michael Brown", contactAvatar: "MB", company: "TechFlow", emailsSent: 8, emailsOpened: 5, replies: 2, calls: 1, meetings: 0, lastTouch: "1d ago", engagementScore: 65, status: "Warm" },
  { id: "3", contact: "Jessica Lee", contactAvatar: "JL", company: "DataSync", emailsSent: 15, emailsOpened: 4, replies: 1, calls: 0, meetings: 0, lastTouch: "3d ago", engagementScore: 35, status: "Cold" },
  { id: "4", contact: "David Kim", contactAvatar: "DK", company: "CloudNine", emailsSent: 6, emailsOpened: 4, replies: 2, calls: 1, meetings: 1, lastTouch: "5h ago", engagementScore: 78, status: "Hot" },
  { id: "5", contact: "Emily Davis", contactAvatar: "ED", company: "Innovex", emailsSent: 10, emailsOpened: 6, replies: 2, calls: 0, meetings: 0, lastTouch: "2d ago", engagementScore: 52, status: "Warm" },
  { id: "6", contact: "James Wilson", contactAvatar: "JW", company: "Nextera", emailsSent: 20, emailsOpened: 2, replies: 0, calls: 0, meetings: 0, lastTouch: "1w ago", engagementScore: 15, status: "Unresponsive" },
  { id: "7", contact: "Amanda Martinez", contactAvatar: "AM", company: "Quantum Labs", emailsSent: 7, emailsOpened: 5, replies: 3, calls: 2, meetings: 1, lastTouch: "3h ago", engagementScore: 92, status: "Hot" },
  { id: "8", contact: "Robert Taylor", contactAvatar: "RT", company: "Velocity", emailsSent: 11, emailsOpened: 3, replies: 1, calls: 0, meetings: 0, lastTouch: "4d ago", engagementScore: 28, status: "Cold" },
];

const statusColors = {
  Hot: "bg-emerald-100 text-emerald-700",
  Warm: "bg-amber-100 text-amber-700",
  Cold: "bg-blue-100 text-blue-700",
  Unresponsive: "bg-red-100 text-red-700",
};

const metrics = [
  { label: "Total Touches", value: "2,847", change: "+12%", trend: "up" },
  { label: "Avg Response Time", value: "4.2h", change: "-18%", trend: "up" },
  { label: "Reply Rate", value: "24.3%", change: "+5%", trend: "up" },
  { label: "Meeting Rate", value: "8.7%", change: "-2%", trend: "down" },
];

const Engagement = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredData = engagementData.filter(record => 
    statusFilter === "All" || record.status === statusFilter
  );

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Engagement</h1>
            <p className="text-muted-foreground">Track contact interactions and engagement levels</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-9 h-9" />
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Log Activity
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
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

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b">
          {["All", "Hot", "Warm", "Cold", "Unresponsive"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                statusFilter === status ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox />
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    Emails
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Replies
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    Calls
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    Meetings
                  </div>
                </TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Touch</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">{record.contactAvatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.contact}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.company}</TableCell>
                  <TableCell className="text-center">
                    <span className="text-muted-foreground">{record.emailsOpened}/{record.emailsSent}</span>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{record.replies}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{record.calls}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{record.meetings}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={record.engagementScore} className="w-16 h-1.5" />
                      <span className="text-sm font-medium">{record.engagementScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[record.status]}>{record.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{record.lastTouch}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Log Call</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Engagement;

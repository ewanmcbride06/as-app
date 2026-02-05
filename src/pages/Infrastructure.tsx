import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Plus, MoreHorizontal, Mail, Globe, 
  CheckCircle2, XCircle, AlertCircle, RefreshCw, Download, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface Domain {
  id: string;
  domain: string;
  type: "sending" | "tracking" | "warmup";
  status: "active" | "warming" | "paused" | "error";
  health: number;
  emailsSent: number;
  dailyLimit: number;
  spamScore: number;
  dkim: boolean;
  spf: boolean;
  dmarc: boolean;
  lastChecked: string;
}

interface Mailbox {
  id: string;
  email: string;
  domain: string;
  status: "active" | "warming" | "paused" | "error";
  health: number;
  sentToday: number;
  dailyLimit: number;
  warmupProgress: number;
  reputation: "excellent" | "good" | "fair" | "poor";
  lastActivity: string;
}

const domains: Domain[] = [
  { id: "1", domain: "outreach.acme.io", type: "sending", status: "active", health: 98, emailsSent: 12450, dailyLimit: 500, spamScore: 0.2, dkim: true, spf: true, dmarc: true, lastChecked: "5m ago" },
  { id: "2", domain: "mail.acme.io", type: "sending", status: "active", health: 95, emailsSent: 8920, dailyLimit: 400, spamScore: 0.5, dkim: true, spf: true, dmarc: true, lastChecked: "5m ago" },
  { id: "3", domain: "track.acme.io", type: "tracking", status: "active", health: 100, emailsSent: 0, dailyLimit: 0, spamScore: 0, dkim: true, spf: true, dmarc: false, lastChecked: "5m ago" },
  { id: "4", domain: "warmup.acme.io", type: "warmup", status: "warming", health: 72, emailsSent: 1250, dailyLimit: 50, spamScore: 1.2, dkim: true, spf: true, dmarc: true, lastChecked: "5m ago" },
];

const mailboxes: Mailbox[] = [
  { id: "1", email: "james@outreach.acme.io", domain: "outreach.acme.io", status: "active", health: 96, sentToday: 48, dailyLimit: 100, warmupProgress: 100, reputation: "excellent", lastActivity: "2m ago" },
  { id: "2", email: "sarah@outreach.acme.io", domain: "outreach.acme.io", status: "active", health: 94, sentToday: 52, dailyLimit: 100, warmupProgress: 100, reputation: "excellent", lastActivity: "5m ago" },
  { id: "3", email: "michael@mail.acme.io", domain: "mail.acme.io", status: "active", health: 89, sentToday: 38, dailyLimit: 80, warmupProgress: 100, reputation: "good", lastActivity: "12m ago" },
  { id: "4", email: "emily@mail.acme.io", domain: "mail.acme.io", status: "warming", health: 65, sentToday: 15, dailyLimit: 30, warmupProgress: 68, reputation: "fair", lastActivity: "1h ago" },
  { id: "5", email: "david@warmup.acme.io", domain: "warmup.acme.io", status: "warming", health: 58, sentToday: 8, dailyLimit: 20, warmupProgress: 42, reputation: "fair", lastActivity: "2h ago" },
];

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  warming: "bg-amber-100 text-amber-700",
  paused: "bg-slate-100 text-slate-700",
  error: "bg-red-100 text-red-700",
};

const reputationColors = {
  excellent: "text-emerald-600",
  good: "text-blue-600",
  fair: "text-amber-600",
  poor: "text-red-600",
};

const Infrastructure = () => {
  const [activeTab, setActiveTab] = useState<"domains" | "mailboxes">("domains");

  const totalSentToday = mailboxes.reduce((sum, m) => sum + m.sentToday, 0);
  const totalDailyLimit = mailboxes.reduce((sum, m) => sum + m.dailyLimit, 0);
  const activeMailboxes = mailboxes.filter(m => m.status === "active").length;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Infrastructure</h1>
            <p className="text-muted-foreground">Manage your sending domains and mailboxes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Domain
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4">
          <button
            onClick={() => setActiveTab("domains")}
            className={`nav-tab flex items-center gap-2 ${activeTab === "domains" ? "nav-tab-active" : ""}`}
          >
            <Globe className="h-4 w-4" />
            Domains
          </button>
          <button
            onClick={() => setActiveTab("mailboxes")}
            className={`nav-tab flex items-center gap-2 ${activeTab === "mailboxes" ? "nav-tab-active" : ""}`}
          >
            <Mail className="h-4 w-4" />
            Mailboxes
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
          <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{domains.length}</strong> domains
                  {" • "}
                  <strong className="text-foreground">{activeMailboxes}/{mailboxes.length}</strong> active mailboxes
                  {" • "}
                  <strong className="text-foreground">{totalSentToday}/{totalDailyLimit}</strong> daily capacity used
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Capacity:</span>
                  <Progress value={(totalSentToday / totalDailyLimit) * 100} className="w-24 h-2" />
                  <span className="font-medium">{Math.round((totalSentToday / totalDailyLimit) * 100)}%</span>
                </div>
              </div>
            </div>

            {/* Domains Table */}
            {activeTab === "domains" && (
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead className="text-center">DKIM</TableHead>
                      <TableHead className="text-center">SPF</TableHead>
                      <TableHead className="text-center">DMARC</TableHead>
                      <TableHead className="text-right">Emails Sent</TableHead>
                      <TableHead>Last Checked</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domains.map((domain) => (
                      <TableRow key={domain.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{domain.domain}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">{domain.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[domain.status]}>{domain.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={domain.health} className="w-16 h-1.5" />
                            <span className="text-sm">{domain.health}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {domain.dkim ? <CheckCircle2 className="h-4 w-4 text-emerald-600 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                        </TableCell>
                        <TableCell className="text-center">
                          {domain.spf ? <CheckCircle2 className="h-4 w-4 text-emerald-600 mx-auto" /> : <XCircle className="h-4 w-4 text-red-500 mx-auto" />}
                        </TableCell>
                        <TableCell className="text-center">
                          {domain.dmarc ? <CheckCircle2 className="h-4 w-4 text-emerald-600 mx-auto" /> : <AlertCircle className="h-4 w-4 text-amber-500 mx-auto" />}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">{domain.emailsSent.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{domain.lastChecked}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View DNS Settings</DropdownMenuItem>
                              <DropdownMenuItem>Check Health</DropdownMenuItem>
                              <DropdownMenuItem>Manage Mailboxes</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove Domain</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Mailboxes Table */}
            {activeTab === "mailboxes" && (
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Warmup</TableHead>
                      <TableHead>Reputation</TableHead>
                      <TableHead className="text-right">Sent Today</TableHead>
                      <TableHead className="text-right">Daily Limit</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mailboxes.map((mailbox) => (
                      <TableRow key={mailbox.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{mailbox.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{mailbox.domain}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[mailbox.status]}>{mailbox.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={mailbox.health} className="w-16 h-1.5" />
                            <span className="text-sm">{mailbox.health}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={mailbox.warmupProgress} className="w-16 h-1.5" />
                            <span className="text-sm">{mailbox.warmupProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium capitalize ${reputationColors[mailbox.reputation]}`}>
                            {mailbox.reputation}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium">{mailbox.sentToday}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{mailbox.dailyLimit}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{mailbox.lastActivity}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Adjust Limits</DropdownMenuItem>
                              <DropdownMenuItem>Pause Sending</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove Mailbox</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Infrastructure;

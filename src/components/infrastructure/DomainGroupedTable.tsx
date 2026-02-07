import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WarmupCircle from "./WarmupCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type InfraDomain, getDomainAggregate } from "./mockData";
import gmailLogo from "@/assets/gmail-logo.png";
import outlookLogo from "@/assets/outlook-logo.png";

interface DomainGroupedTableProps {
  domains: InfraDomain[];
}

type FilterValue = "all" | string;

const DomainGroupedTable = ({ domains }: DomainGroupedTableProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());
  const [sendingVolumeFilter, setSendingVolumeFilter] = useState<FilterValue>("all");
  const [replyRateFilter, setReplyRateFilter] = useState<FilterValue>("all");
  const [bounceRateFilter, setBounceRateFilter] = useState<FilterValue>("all");
  const [warmupDaysFilter, setWarmupDaysFilter] = useState<FilterValue>("all");
  const [warmupHealthFilter, setWarmupHealthFilter] = useState<FilterValue>("all");

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        next.add(domain);
      }
      return next;
    });
  };

  const matchesMailboxFilters = (m: { sendingVolumeCurrent: number; sendingVolumeMax: number; replyRate: number; bounceRate: number; warmupDays: number; warmupPercent: number }) => {
    if (sendingVolumeFilter !== "all") {
      const ratio = m.sendingVolumeMax > 0 ? m.sendingVolumeCurrent / m.sendingVolumeMax : 0;
      if (sendingVolumeFilter === "full" && ratio < 1) return false;
      if (sendingVolumeFilter === "partial" && ratio >= 1) return false;
      if (sendingVolumeFilter === "zero" && m.sendingVolumeCurrent > 0) return false;
    }
    if (replyRateFilter !== "all") {
      if (replyRateFilter === "0" && m.replyRate > 0) return false;
      if (replyRateFilter === "lt2" && (m.replyRate <= 0 || m.replyRate >= 2)) return false;
      if (replyRateFilter === "2to5" && (m.replyRate < 2 || m.replyRate > 5)) return false;
      if (replyRateFilter === "gt5" && m.replyRate <= 5) return false;
    }
    if (bounceRateFilter !== "all") {
      if (bounceRateFilter === "0" && m.bounceRate > 0) return false;
      if (bounceRateFilter === "lt2" && (m.bounceRate <= 0 || m.bounceRate >= 2)) return false;
      if (bounceRateFilter === "2to5" && (m.bounceRate < 2 || m.bounceRate > 5)) return false;
      if (bounceRateFilter === "gt5" && m.bounceRate <= 5) return false;
    }
    if (warmupDaysFilter !== "all") {
      if (warmupDaysFilter === "lt14" && m.warmupDays >= 14) return false;
      if (warmupDaysFilter === "14to30" && (m.warmupDays < 14 || m.warmupDays > 30)) return false;
      if (warmupDaysFilter === "gt30" && m.warmupDays <= 30) return false;
    }
    if (warmupHealthFilter !== "all") {
      if (warmupHealthFilter === "healthy" && m.warmupPercent < 95) return false;
      if (warmupHealthFilter === "warning" && (m.warmupPercent < 80 || m.warmupPercent >= 95)) return false;
      if (warmupHealthFilter === "critical" && m.warmupPercent >= 80) return false;
    }
    return true;
  };

  const filteredDomains = useMemo(() => {
    const q = search.toLowerCase().trim();
    const hasFilters = sendingVolumeFilter !== "all" || replyRateFilter !== "all" || bounceRateFilter !== "all" || warmupDaysFilter !== "all" || warmupHealthFilter !== "all";

    return domains
      .map((d) => {
        // Apply metric filters at mailbox level
        let matchingMailboxes = hasFilters
          ? d.mailboxes.filter(matchesMailboxFilters)
          : d.mailboxes;

        // Apply search
        if (q) {
          const domainMatches = d.domain.toLowerCase().includes(q);
          if (!domainMatches) {
            matchingMailboxes = matchingMailboxes.filter((m) =>
              m.email.toLowerCase().includes(q)
            );
          }
        }

        if (matchingMailboxes.length === 0) return null;
        return { ...d, mailboxes: matchingMailboxes };
      })
      .filter(Boolean) as InfraDomain[];
  }, [domains, search, sendingVolumeFilter, replyRateFilter, bounceRateFilter, warmupDaysFilter, warmupHealthFilter]);

  // Auto-expand when searching
  const isExpanded = (domain: string) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const d = filteredDomains.find((fd) => fd.domain === domain);
      if (d) {
        const hasMailboxMatch = d.mailboxes.some((m) => m.email.toLowerCase().includes(q));
        if (hasMailboxMatch || d.domain.toLowerCase().includes(q)) return true;
      }
    }
    return expandedDomains.has(domain);
  };

  const hasActiveFilters = sendingVolumeFilter !== "all" || replyRateFilter !== "all" || bounceRateFilter !== "all" || warmupDaysFilter !== "all" || warmupHealthFilter !== "all";

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b p-3 flex items-center gap-2 bg-background shrink-0">
        <div className="relative w-[220px] shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search mailboxes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Select value={sendingVolumeFilter} onValueChange={setSendingVolumeFilter}>
            <SelectTrigger className={cn("h-9 w-auto min-w-[130px] text-xs gap-1.5", sendingVolumeFilter !== "all" && "border-foreground/30")}>
              <SelectValue placeholder="Sending Volume" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Volume</SelectItem>
              <SelectItem value="full">At Capacity</SelectItem>
              <SelectItem value="partial">Below Capacity</SelectItem>
              <SelectItem value="zero">No Volume</SelectItem>
            </SelectContent>
          </Select>

          <Select value={replyRateFilter} onValueChange={setReplyRateFilter}>
            <SelectTrigger className={cn("h-9 w-auto min-w-[120px] text-xs gap-1.5", replyRateFilter !== "all" && "border-foreground/30")}>
              <SelectValue placeholder="Reply Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Replies</SelectItem>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="lt2">&lt; 2%</SelectItem>
              <SelectItem value="2to5">2 – 5%</SelectItem>
              <SelectItem value="gt5">&gt; 5%</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bounceRateFilter} onValueChange={setBounceRateFilter}>
            <SelectTrigger className={cn("h-9 w-auto min-w-[120px] text-xs gap-1.5", bounceRateFilter !== "all" && "border-foreground/30")}>
              <SelectValue placeholder="Bounce Rate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bounces</SelectItem>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="lt2">&lt; 2%</SelectItem>
              <SelectItem value="2to5">2 – 5%</SelectItem>
              <SelectItem value="gt5">&gt; 5%</SelectItem>
            </SelectContent>
          </Select>

          <Select value={warmupDaysFilter} onValueChange={setWarmupDaysFilter}>
            <SelectTrigger className={cn("h-9 w-auto min-w-[130px] text-xs gap-1.5", warmupDaysFilter !== "all" && "border-foreground/30")}>
              <SelectValue placeholder="Time in Warmup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="lt14">&lt; 14 Days</SelectItem>
              <SelectItem value="14to30">14 – 30 Days</SelectItem>
              <SelectItem value="gt30">30+ Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={warmupHealthFilter} onValueChange={setWarmupHealthFilter}>
            <SelectTrigger className={cn("h-9 w-auto min-w-[140px] text-xs gap-1.5", warmupHealthFilter !== "all" && "border-foreground/30")}>
              <SelectValue placeholder="Warmup Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Health</SelectItem>
              <SelectItem value="healthy">Healthy (≥ 95%)</SelectItem>
              <SelectItem value="warning">Warning (80–94%)</SelectItem>
              <SelectItem value="critical">Critical (&lt; 80%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto scrollbar-hide">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-center">SENDING VOLUME</TableHead>
              <TableHead className="text-center">REPLY RATE</TableHead>
              <TableHead className="text-center">BOUNCE RATE</TableHead>
              <TableHead className="text-center">TIME IN WARMUP</TableHead>
              <TableHead className="text-center">WARMUP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.map((domain) => {
              const agg = getDomainAggregate(domain);
              const expanded = isExpanded(domain.domain);

              return (
                <>
                  {/* Domain Row */}
                  <TableRow
                    key={domain.domain}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleDomain(domain.domain)}
                  >
                    <TableCell className="w-[40px] pr-0">
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200",
                          expanded && "rotate-90"
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">{domain.domain}</span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({domain.mailboxes.length} accounts)
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {agg.sendingVolumeCurrent} / {agg.sendingVolumeMax}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{agg.replyRate}%</TableCell>
                    <TableCell className="text-center text-muted-foreground">{agg.bounceRate}%</TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
                        agg.warmupDays >= 14
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-red-50 text-red-700 border-red-300"
                      )}>
                        {agg.warmupDays} Days
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
                        agg.warmupPercent >= 95
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : agg.warmupPercent >= 80
                            ? "bg-orange-50 text-orange-700 border-orange-300"
                            : "bg-red-50 text-red-700 border-red-300"
                      )}>
                        {agg.warmupPercent}%
                      </span>
                    </TableCell>
                  </TableRow>

                  {/* Mailbox Rows */}
                  {expanded &&
                    domain.mailboxes.map((mailbox) => (
                      <TableRow
                        key={mailbox.id}
                        className="bg-muted/20 hover:bg-muted/40 cursor-pointer"
                        onClick={() => navigate(`/infrastructure/mailbox/${mailbox.id}`)}
                      >
                        <TableCell className="w-[40px]"></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={mailbox.provider === "outlook" ? outlookLogo : gmailLogo}
                              alt={mailbox.provider}
                              className="h-4 w-4 shrink-0 object-contain"
                            />
                            <span className="text-sm">{mailbox.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {mailbox.sendingVolumeCurrent} / {mailbox.sendingVolumeMax}
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">{mailbox.replyRate}%</TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">{mailbox.bounceRate}%</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
                            mailbox.warmupDays >= 14
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-red-50 text-red-700 border-red-300"
                          )}>
                            {mailbox.warmupDays} Days
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
                            mailbox.warmupPercent >= 95
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : mailbox.warmupPercent >= 80
                                ? "bg-orange-50 text-orange-700 border-orange-300"
                                : "bg-red-50 text-red-700 border-red-300"
                          )}>
                            {mailbox.warmupPercent}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DomainGroupedTable;

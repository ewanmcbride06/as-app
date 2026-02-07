import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
import {
  VolumeFilterPopover,
  RangeFilterPopover,
  DurationFilterPopover,
  defaultVolumeFilter,
  defaultRangeFilter,
  defaultDurationFilter,
  matchesVolumeFilter,
  matchesRangeFilter,
  matchesDurationFilter,
  type VolumeFilter,
  type RangeFilter,
  type DurationFilter,
} from "./InfraFilters";

interface DomainGroupedTableProps {
  domains: InfraDomain[];
}

const DomainGroupedTable = ({ domains }: DomainGroupedTableProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());
  const [volumeFilter, setVolumeFilter] = useState<VolumeFilter>(defaultVolumeFilter);
  const [replyFilter, setReplyFilter] = useState<RangeFilter>(defaultRangeFilter);
  const [bounceFilter, setBounceFilter] = useState<RangeFilter>(defaultRangeFilter);
  const [durationFilter, setDurationFilter] = useState<DurationFilter>(defaultDurationFilter);
  const [healthFilter, setHealthFilter] = useState<RangeFilter>(defaultRangeFilter);

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

  const matchesAllFilters = (m: { sendingVolumeCurrent: number; sendingVolumeMax: number; replyRate: number; bounceRate: number; warmupDays: number; warmupPercent: number }) => {
    if (!matchesVolumeFilter(volumeFilter, m.sendingVolumeCurrent)) return false;
    if (!matchesRangeFilter(replyFilter, m.replyRate)) return false;
    if (!matchesRangeFilter(bounceFilter, m.bounceRate)) return false;
    if (!matchesDurationFilter(durationFilter, m.warmupDays)) return false;
    if (!matchesRangeFilter(healthFilter, m.warmupPercent)) return false;
    return true;
  };

  const filteredDomains = useMemo(() => {
    const q = search.toLowerCase().trim();

    return domains
      .map((d) => {
        let matchingMailboxes = d.mailboxes.filter(matchesAllFilters);

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
  }, [domains, search, volumeFilter, replyFilter, bounceFilter, durationFilter, healthFilter]);

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
          <VolumeFilterPopover value={volumeFilter} onChange={setVolumeFilter} />
          <RangeFilterPopover label="Reply Rate" value={replyFilter} onChange={setReplyFilter} />
          <RangeFilterPopover label="Bounce Rate" value={bounceFilter} onChange={setBounceFilter} />
          <DurationFilterPopover value={durationFilter} onChange={setDurationFilter} />
          <RangeFilterPopover label="Health" value={healthFilter} onChange={setHealthFilter} unit="%" />
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

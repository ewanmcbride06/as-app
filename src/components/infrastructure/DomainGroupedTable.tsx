import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const DomainGroupedTable = ({ domains }: DomainGroupedTableProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

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

  const filteredDomains = useMemo(() => {
    if (!search.trim()) return domains;

    const q = search.toLowerCase();
    return domains
      .map((d) => {
        const domainMatches = d.domain.toLowerCase().includes(q);
        const matchingMailboxes = d.mailboxes.filter((m) =>
          m.email.toLowerCase().includes(q)
        );

        if (domainMatches) return d;
        if (matchingMailboxes.length > 0) return { ...d, mailboxes: matchingMailboxes };
        return null;
      })
      .filter(Boolean) as InfraDomain[];
  }, [domains, search]);

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

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b p-3 flex items-center gap-3 bg-background shrink-0">
        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for a mailbox…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>SENDING VOLUME</TableHead>
              <TableHead>REPLY RATE</TableHead>
              <TableHead>BOUNCE RATE</TableHead>
              <TableHead>TIME IN WARMUP</TableHead>
              <TableHead>WARMUP</TableHead>
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
                    <TableCell className="text-muted-foreground">
                      {agg.sendingVolumeCurrent} / {agg.sendingVolumeMax}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{agg.replyRate}%</TableCell>
                    <TableCell className="text-muted-foreground">{agg.bounceRate}%</TableCell>
                    <TableCell className="text-muted-foreground">{agg.warmupDays} Days</TableCell>
                    <TableCell>
                      <WarmupCircle percent={agg.warmupPercent} />
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
                        <TableCell className="text-sm text-muted-foreground">
                          {mailbox.sendingVolumeCurrent} / {mailbox.sendingVolumeMax}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{mailbox.replyRate}%</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{mailbox.bounceRate}%</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{mailbox.warmupDays} Days</TableCell>
                        <TableCell>
                          <WarmupCircle percent={mailbox.warmupPercent} />
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

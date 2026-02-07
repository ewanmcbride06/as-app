import { useState, useMemo } from "react";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type InfraDomain, getDomainAggregate } from "./mockData";

const OutlookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
    <path d="M22 8.5V17a2 2 0 0 1-2 2h-7V7h7a2 2 0 0 1 2 2v-.5Z" fill="#0078D4"/>
    <path d="M15 7H9.5L4 10v8l5.5 1H15V7Z" fill="#0364B8"/>
    <path d="M9.5 7L4 10v8l5.5 1V7Z" fill="#0078D4"/>
    <path d="M9.5 11.5a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z" fill="#28A8EA" opacity="0.5"/>
    <ellipse cx="6.75" cy="14.5" rx="2.25" ry="2.25" fill="white"/>
  </svg>
);

const GmailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z" fill="#F2F2F2"/>
    <path d="M2 6l10 7 10-7" stroke="#EA4335" strokeWidth="1.5" fill="none"/>
    <path d="M2 6v12l6-7L2 6Z" fill="#4285F4"/>
    <path d="M22 6v12l-6-7 6-5Z" fill="#34A853"/>
    <path d="M2 18l6-7 4 2.8L16 11l6 7H2Z" fill="#FBBC05"/>
  </svg>
);

interface DomainGroupedTableProps {
  domains: InfraDomain[];
}

const DomainGroupedTable = ({ domains }: DomainGroupedTableProps) => {
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
                      <div className="flex items-center gap-2">
                        <Progress value={agg.warmupPercent} className="w-16 h-1.5" />
                        <span className="text-sm text-muted-foreground">{agg.warmupPercent}%</span>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Mailbox Rows */}
                  {expanded &&
                    domain.mailboxes.map((mailbox) => (
                      <TableRow key={mailbox.id} className="bg-muted/20 hover:bg-muted/40">
                        <TableCell className="w-[40px]"></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 pl-2">
                            {mailbox.provider === "outlook" ? <OutlookIcon /> : <GmailIcon />}
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
                          <div className="flex items-center gap-2">
                            <Progress value={mailbox.warmupPercent} className="w-16 h-1.5" />
                            <span className="text-sm text-muted-foreground">{mailbox.warmupPercent}%</span>
                          </div>
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

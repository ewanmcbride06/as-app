import { useState, useMemo, useRef, useEffect } from "react";
import { format, isToday, isThisWeek, isThisMonth } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, Calendar, ChevronDown, MessageSquare, CalendarDays, BarChart3, Link2 } from "lucide-react";
import { TimezoneSelector } from "@/components/pipeline/TimezoneSelector";
import { getLocalTimezone, formatTimeInTimezone } from "@/components/pipeline/timezones";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusDropdown } from "@/components/pipeline/StatusDropdown";
import { mockMeetings } from "@/components/pipeline/mockData";
import {
  Meeting,
  LeadStatus,
  CallStatus,
  TakenStatus,
  BillingStatus,
  leadStatusColors,
  callStatusColors,
  takenStatusColors,
  billingStatusColors,
} from "@/components/pipeline/types";
import { updateDealStage, updateMeetingShowStatus } from "@/services/pipelineApi";
import { useToast } from "@/hooks/use-toast";
import { useConversationPanel } from "@/contexts/ConversationPanelContext";
import { cn } from "@/lib/utils";

// Status options
const leadStatusOptions: LeadStatus[] = ["Potential", "Qualified", "Not Qualified", "Won", "Lost - Not Interest", "Lost - Failed To Close"];
const callStatusOptions: CallStatus[] = ["Booked", "Rescheduled", "Cancelled"];
const takenStatusOptions: TakenStatus[] = ["Upcoming", "Shown", "Not Shown"];
const billingStatusOptions: BillingStatus[] = ["Not Billed", "Billed", "Pending", "Refunded"];

// Filter types
type DateFilter = "all" | "today" | "this_week" | "this_month";
type LeadFilter = "all" | LeadStatus;

const leadFilterOptions: { label: string; value: LeadFilter }[] = [
  { label: "All Statuses", value: "all" },
  { label: "Potential", value: "Potential" },
  { label: "Qualified", value: "Qualified" },
  { label: "Not Qualified", value: "Not Qualified" },
  { label: "Won", value: "Won" },
  { label: "Lost - Not Interest", value: "Lost - Not Interest" },
  { label: "Lost - Failed To Close", value: "Lost - Failed To Close" },
];

const dateFilterOptions: { label: string; value: DateFilter }[] = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
];

const Pipeline = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"booked" | "analytics" | "connections">("booked");
  const [leadFilter, setLeadFilter] = useState<LeadFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [timezone, setTimezone] = useState<string>(getLocalTimezone());
  const { openConversation } = useConversationPanel();
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDateIndex, setActiveDateIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const groups = container.querySelectorAll<HTMLDivElement>("[data-date-label]");
      let currentIndex = 0;

      groups.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        if (rect.top - containerRect.top <= 70) {
          currentIndex = i;
        }
      });

      setActiveDateIndex((prev) => (prev !== currentIndex ? currentIndex : prev));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      const matchesSearch =
        m.inviteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.inviteeEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLead = leadFilter === "all" || m.leadStatus === leadFilter;
      let matchesDate = true;
      if (dateFilter === "today") matchesDate = isToday(m.meetingDate);
      else if (dateFilter === "this_week") matchesDate = isThisWeek(m.meetingDate, { weekStartsOn: 1 });
      else if (dateFilter === "this_month") matchesDate = isThisMonth(m.meetingDate);
      return matchesSearch && matchesLead && matchesDate;
    });
  }, [meetings, searchQuery, leadFilter, dateFilter]);

  const groupedMeetings = useMemo(() => {
    const groups: Record<string, Meeting[]> = {};
    filteredMeetings.forEach((meeting) => {
      const dateKey = format(meeting.meetingDate, "yyyy-MM-dd");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(meeting);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([dateKey, meetings]) => ({ dateKey, date: new Date(dateKey), meetings }));
  }, [filteredMeetings]);

  const handleUpdateStatus = async (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
    if (field === "leadStatus") {
      const success = await updateDealStage({ deal_id: id, new_stage: value });
      if (!success) toast({ title: "Sync failed", description: "Failed to update deal stage.", variant: "destructive" });
    }
    if (field === "takenStatus") {
      const success = await updateMeetingShowStatus({ meeting_id: id, show_status: value });
      if (!success) toast({ title: "Sync failed", description: "Failed to update meeting status.", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-visible">
        {/* ─── Page Header ─── */}
        <div className="shrink-0 pb-5">
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">
            See an overview of all the clients' bookings and their sales analytics.
          </p>
        </div>

        {/* ─── Tabs ─── */}
        <div className="shrink-0 border-b mb-5">
          <div className="flex items-center gap-1">
            {([
              { key: "booked" as const, label: "Meetings", icon: CalendarDays },
              { key: "analytics" as const, label: "Analytics", icon: BarChart3 },
              { key: "connections" as const, label: "Connections", icon: Link2 },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Search & Controls Bar ─── */}
        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div className="inline-flex items-center h-9 px-4 text-xs font-medium border border-border rounded-[10px] bg-background shrink-0">
            Total: {filteredMeetings.length}
          </div>

          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for meetings by invitee or company name"
              className="pl-9 h-9 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <TimezoneSelector value={timezone} onChange={setTimezone} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={cn("gap-2 h-9 px-3 text-xs", leadFilter !== "all" && "border-foreground/30")}>
                  <Filter className="h-3.5 w-3.5" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                {leadFilterOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setLeadFilter(opt.value)}
                    className={cn("cursor-pointer text-sm", leadFilter === opt.value && "bg-muted font-medium")}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={cn("gap-2 h-9 px-3 text-xs", dateFilter !== "all" && "border-foreground/30")}>
                  <Calendar className="h-3.5 w-3.5" />
                  {dateFilterOptions.find((o) => o.value === dateFilter)?.label}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px]">
                {dateFilterOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setDateFilter(opt.value)}
                    className={cn("cursor-pointer text-sm", dateFilter === opt.value && "bg-muted font-medium")}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ─── Scrollable Content ─── */}
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          {/* ─── Background mask to hide content behind rounded corners ─── */}
          <div className="sticky top-0 z-40 h-0">
            <div className="absolute top-0 left-0 right-0 h-[60px] bg-background" />
          </div>

          {/* ─── Sticky Header Block: Column Headers + Date Bar ─── */}
          <div className="sticky top-0 z-50 border border-border rounded-[10px] overflow-hidden">
            {/* Column Labels */}
            <div className="flex items-center px-5 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider bg-background">
              <div className="w-[300px] shrink-0">Booking Information</div>
              <div className="flex-1">Lead Status</div>
              <div className="flex-1">Call Status</div>
              <div className="flex-1">Taken Status</div>
              <div className="flex-1">Billing Status</div>
              <div className="w-[100px] shrink-0 text-right">Time of Call</div>
            </div>
            {/* Sticky Date Bar — always shows the current group's date */}
            <div className="flex items-center justify-between px-5 py-1.5 bg-secondary border-t border-border">
              <span className="text-[12px] font-medium text-muted-foreground">
                {groupedMeetings.length > 0
                  ? format(groupedMeetings[activeDateIndex]?.date ?? groupedMeetings[0].date, "EEEE, dd MMMM yyyy")
                  : "No meetings"}
              </span>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {groupedMeetings.length > 0
                  ? `${(groupedMeetings[activeDateIndex] ?? groupedMeetings[0]).meetings.length} ${(groupedMeetings[activeDateIndex] ?? groupedMeetings[0]).meetings.length === 1 ? "meeting" : "meetings"}`
                  : ""}
              </span>
            </div>
          </div>

          {groupedMeetings.map(({ dateKey, date, meetings: dateMeetings }, index) => (
            <div key={date.toISOString()} data-date-label={format(date, "EEEE, dd MMMM yyyy")} data-date-count={`${dateMeetings.length} ${dateMeetings.length === 1 ? "meeting" : "meetings"}`}>
              {/* ─── Inline Date Header (non-sticky, fully rounded) — skip first group since it's in the sticky header ─── */}
              {index > 0 && (
                <div className="flex items-center justify-between px-5 py-1.5 bg-secondary border border-border rounded-[10px] mt-3 mb-2">
                  <span className="text-[12px] font-medium text-muted-foreground">
                    {format(date, "EEEE, dd MMMM yyyy")}
                  </span>
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    {dateMeetings.length} {dateMeetings.length === 1 ? "meeting" : "meetings"}
                  </span>
                </div>
              )}

              {/* Booking Cards */}
              <div className="space-y-4 mt-3">
                {dateMeetings.map((meeting) => (
                  <div key={meeting.id} className="border border-border rounded-[10px] overflow-hidden">
                    {/* Main Row */}
                    <div className="flex items-center px-5 py-4 bg-background">
                      {/* Booking Info: Day + Name */}
                      <div className="w-[300px] shrink-0 flex items-center gap-4">
                        <div className="w-[48px] shrink-0 text-center">
                          <div className="text-[11px] text-calendar-day leading-none font-medium">
                            {format(meeting.meetingDate, "EEE")}
                          </div>
                          <div className="text-lg font-semibold leading-tight">
                            {format(meeting.meetingDate, "dd")}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm leading-tight truncate">
                            {meeting.inviteeName}
                          </div>
                          <div className="text-xs text-muted-foreground leading-tight mt-0.5 truncate">
                            {meeting.company}
                          </div>
                        </div>
                      </div>

                      {/* Lead Status */}
                      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          value={meeting.leadStatus}
                          options={leadStatusOptions}
                          colorMap={leadStatusColors}
                          onChange={(v) => handleUpdateStatus(meeting.id, "leadStatus", v)}
                        />
                      </div>

                      {/* Call Status */}
                      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          value={meeting.callStatus}
                          options={callStatusOptions}
                          colorMap={callStatusColors}
                          onChange={(v) => handleUpdateStatus(meeting.id, "callStatus", v)}
                        />
                      </div>

                      {/* Taken Status */}
                      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          value={meeting.takenStatus}
                          options={takenStatusOptions}
                          colorMap={takenStatusColors}
                          onChange={(v) => handleUpdateStatus(meeting.id, "takenStatus", v)}
                        />
                      </div>

                      {/* Billing Status */}
                      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          value={meeting.billingStatus}
                          options={billingStatusOptions}
                          colorMap={billingStatusColors}
                          onChange={(v) => handleUpdateStatus(meeting.id, "billingStatus", v)}
                        />
                      </div>

                      {/* Time */}
                      <div className="w-[100px] shrink-0 text-right">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium tabular-nums whitespace-nowrap border border-border rounded-[10px] bg-background">
                          {formatTimeInTimezone(meeting.meetingDate, meeting.meetingTime, timezone)}
                        </span>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border" />

                    {/* Detail Row — inside card, off-white bg, bottom corners rounded */}
                    <div className="flex items-center justify-between px-5 py-2.5 bg-secondary">
                      <div className="flex items-center text-[12px] text-muted-foreground gap-1 flex-wrap">
                        <span>Booked on: <span className="text-foreground/60">{format(meeting.bookedAt, "EEEE dd MMM yyyy 'at' h:mm a")}</span></span>
                        <span className="mx-1.5">·</span>
                        <span>Invitees: <span className="text-foreground/60">{meeting.inviteeEmail}</span></span>
                        <span className="mx-1.5">·</span>
                        <span>No. of Reschedules <span className="text-foreground/60">{meeting.rescheduleCount}</span></span>
                        <span className="mx-1.5">·</span>
                        <span>Call Stage: <span className="text-foreground/60">{meeting.callStage}</span></span>
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0 ml-4">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => openConversation(meeting)}>
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredMeetings.length === 0 && (
            <div className="text-center py-16 text-sm text-muted-foreground">
              No meetings found matching your filters.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;

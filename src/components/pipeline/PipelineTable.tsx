import { useState } from "react";
import { format } from "date-fns";
import { Copy, MessageSquare, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusDropdown } from "./StatusDropdown";
import { BookingTimeline } from "./BookingTimeline";
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
} from "./types";
import { cn } from "@/lib/utils";

const leadStatusOptions: LeadStatus[] = [
  "Potential",
  "Qualified",
  "Not Qualified",
  "Won",
  "Lost - Not Interest",
  "Lost - Failed To Close",
];

const callStatusOptions: CallStatus[] = [
  "Booked",
  "Rescheduled",
  "Cancelled",
];

const takenStatusOptions: TakenStatus[] = ["Upcoming", "Shown", "Not Shown"];

const billingStatusOptions: BillingStatus[] = [
  "Not Billed",
  "Billed",
  "Pending",
  "Refunded",
];

interface MeetingGroup {
  date: Date;
  meetings: Meeting[];
}

interface PipelineTableProps {
  groupedMeetings: MeetingGroup[];
  filteredCount: number;
  selectedMeetings: string[];
  onToggleSelectAll: () => void;
  onToggleSelect: (id: string) => void;
  onUpdateStatus: (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => void;
  onOpenConversation: (meeting: Meeting) => void;
}

export function PipelineTable({
  groupedMeetings,
  filteredCount,
  selectedMeetings,
  onToggleSelectAll,
  onToggleSelect,
  onUpdateStatus,
  onOpenConversation,
}: PipelineTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-auto px-3 pb-3">
      {groupedMeetings.map(({ date, meetings }) => (
        <div key={date.toISOString()} className="mt-3 first:mt-0">
          {/* Floating Date Header */}
          <div className="sticky top-0 z-[5] py-2">
            <div className="inline-flex items-center px-3 py-1.5 bg-background border border-border rounded-[10px]">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                {format(date, "EEEE, dd MMMM yyyy")}
              </span>
            </div>
          </div>

          {/* Meeting Cards */}
          <div className="space-y-2 mt-2">
            {meetings.map((meeting) => {
              const isExpanded = expandedRows.has(meeting.id);
              return (
                <div
                  key={meeting.id}
                  className={cn(
                    "border border-border rounded-[10px] bg-background transition-colors group hover:border-muted-foreground/20",
                    isExpanded && "bg-muted/5"
                  )}
                >
                  {/* Main Row — 20px padding */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => toggleExpand(meeting.id)}
                  >
                    {/* Checkbox */}
                    <div
                      className="w-5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={selectedMeetings.includes(meeting.id)}
                        onCheckedChange={() => onToggleSelect(meeting.id)}
                      />
                    </div>

                    {/* Date */}
                    <div className="w-[50px] shrink-0 text-center">
                      <div className="text-[11px] text-muted-foreground leading-none">
                        {format(meeting.meetingDate, "EEE")}
                      </div>
                      <div className="text-lg font-semibold leading-tight">
                        {format(meeting.meetingDate, "dd")}
                      </div>
                    </div>

                    {/* Booking Info */}
                    <div className="min-w-[140px] flex-[2]">
                      <div className="font-medium text-sm">
                        {meeting.inviteeName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {meeting.company}
                      </div>
                    </div>

                    {/* Lead Status */}
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        value={meeting.leadStatus}
                        options={leadStatusOptions}
                        colorMap={leadStatusColors}
                        onChange={(value) =>
                          onUpdateStatus(meeting.id, "leadStatus", value)
                        }
                      />
                    </div>

                    {/* Call Status */}
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        value={meeting.callStatus}
                        options={callStatusOptions}
                        colorMap={callStatusColors}
                        onChange={(value) =>
                          onUpdateStatus(meeting.id, "callStatus", value)
                        }
                      />
                    </div>

                    {/* Taken */}
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        value={meeting.takenStatus}
                        options={takenStatusOptions}
                        colorMap={takenStatusColors}
                        onChange={(value) =>
                          onUpdateStatus(meeting.id, "takenStatus", value)
                        }
                      />
                    </div>

                    {/* Billing */}
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        value={meeting.billingStatus}
                        options={billingStatusOptions}
                        colorMap={billingStatusColors}
                        onChange={(value) =>
                          onUpdateStatus(meeting.id, "billingStatus", value)
                        }
                      />
                    </div>

                    {/* Time */}
                    <div className="w-[90px] shrink-0">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium tabular-nums whitespace-nowrap border border-border rounded-[10px] bg-background">
                        {meeting.meetingTime}
                      </span>
                    </div>

                    {/* Actions */}
                    <div
                      className="w-[80px] shrink-0 flex items-center justify-end gap-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground"
                          onClick={() => onOpenConversation(meeting)}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Timeline */}
                  {isExpanded && <BookingTimeline meeting={meeting} />}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {filteredCount === 0 && (
        <div className="text-center py-16 text-sm text-muted-foreground">
          No meetings found matching your search.
        </div>
      )}
    </div>
  );
}

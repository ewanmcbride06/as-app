import { format } from "date-fns";
import { Copy, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusDropdown } from "./StatusDropdown";

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

interface PipelineRowProps {
  meeting: Meeting;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onUpdateStatus: (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => void;
  onOpenConversation: (meeting: Meeting) => void;
}

export function PipelineRow({
  meeting,
  isSelected,
  onToggleSelect,
  onUpdateStatus,
  onOpenConversation,
}: PipelineRowProps) {
  return (
    <div className="border-b border-border last:border-b-0">
      {/* Main Row */}
      <div className="flex items-center gap-4 px-5 py-5">
        {/* Checkbox */}
        <div className="w-[20px] shrink-0" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(meeting.id)}
          />
        </div>

        {/* Date block */}
        <div className="w-[56px] shrink-0 text-center">
          <div className="text-[11px] text-muted-foreground leading-none">
            {format(meeting.meetingDate, "EEE")}
          </div>
          <div className="text-lg font-semibold leading-tight">
            {format(meeting.meetingDate, "dd")}
          </div>
        </div>

        {/* Name & company */}
        <div className="w-[180px] shrink-0">
          <div className="font-medium text-sm leading-tight">
            {meeting.inviteeName}
          </div>
          <div className="text-xs text-muted-foreground leading-tight mt-0.5">
            {meeting.company}
          </div>
        </div>

        {/* Lead Status */}
        <div className="flex-1 min-w-[130px]" onClick={(e) => e.stopPropagation()}>
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
        <div className="flex-1 min-w-[110px]" onClick={(e) => e.stopPropagation()}>
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
        <div className="flex-1 min-w-[110px]" onClick={(e) => e.stopPropagation()}>
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
        <div className="flex-1 min-w-[110px]" onClick={(e) => e.stopPropagation()}>
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
        <div className="w-[80px] shrink-0 text-right">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium tabular-nums whitespace-nowrap border border-border rounded-[10px] bg-background">
            {meeting.meetingTime}
          </span>
        </div>
      </div>

      {/* Detail Subsection */}
      <div className="flex items-center justify-between mx-5 mb-4 px-4 py-3 rounded-[10px] bg-muted/50 border border-border">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground flex-wrap">
          <span>
            Booked on:{" "}
            <span className="text-foreground/70">
              {format(meeting.bookedAt, "EEEE dd MMM yyyy 'at' h:mm a")}
            </span>
          </span>
          <span className="mx-1">·</span>
          <span>
            Invitees:{" "}
            <span className="text-foreground/70">{meeting.inviteeEmail}</span>
          </span>
          <span className="mx-1">·</span>
          <span>
            No. of Reschedules{" "}
            <span className="text-foreground/70">
              {meeting.rescheduleCount}
            </span>
          </span>
          <span className="mx-1">·</span>
          <span>
            Call Stage:{" "}
            <span className="text-foreground/70">{meeting.callStage}</span>
          </span>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-0.5 shrink-0 ml-3"
          onClick={(e) => e.stopPropagation()}
        >
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
      </div>
    </div>
  );
}

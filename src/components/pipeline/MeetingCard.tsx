import { format } from "date-fns";
import { Copy, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusDropdown } from "./StatusDropdown";
import { ConversationDialog } from "./ConversationDialog";
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

interface MeetingCardProps {
  meeting: Meeting;
  onUpdateStatus: (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => void;
}

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
  "No Show",
  "Completed",
  "Cancelled",
];

const takenStatusOptions: TakenStatus[] = ["Upcoming", "Shown", "Not Shown"];

const billingStatusOptions: BillingStatus[] = [
  "Not Billed",
  "Billed",
  "Pending",
  "Refunded",
];

export function MeetingCard({ meeting, onUpdateStatus }: MeetingCardProps) {
  const dayOfWeek = format(meeting.meetingDate, "EEE");
  const dayOfMonth = format(meeting.meetingDate, "dd");

  return (
    <div className="border border-border rounded-[10px] bg-background">
      {/* Main Row */}
      <div className="p-4 flex items-center gap-6">
        {/* Date Column */}
        <div className="text-center min-w-[50px]">
          <div className="text-sm text-muted-foreground">{dayOfWeek}</div>
          <div className="text-xl font-semibold">{dayOfMonth}</div>
        </div>

        {/* Invitee Info */}
        <div className="min-w-[160px]">
          <div className="font-medium">{meeting.inviteeName}</div>
          <div className="text-sm text-muted-foreground">{meeting.company}</div>
        </div>

        {/* Lead Status */}
        <div className="flex-1">
          <StatusDropdown
            value={meeting.leadStatus}
            options={leadStatusOptions}
            colorMap={leadStatusColors}
            onChange={(value) => onUpdateStatus(meeting.id, "leadStatus", value)}
          />
        </div>

        {/* Call Status */}
        <div className="flex-1">
          <StatusDropdown
            value={meeting.callStatus}
            options={callStatusOptions}
            colorMap={callStatusColors}
            onChange={(value) => onUpdateStatus(meeting.id, "callStatus", value)}
          />
        </div>

        {/* Taken Status */}
        <div className="flex-1">
          <StatusDropdown
            value={meeting.takenStatus}
            options={takenStatusOptions}
            colorMap={takenStatusColors}
            onChange={(value) => onUpdateStatus(meeting.id, "takenStatus", value)}
          />
        </div>

        {/* Billing Status */}
        <div className="flex-1">
          <StatusDropdown
            value={meeting.billingStatus}
            options={billingStatusOptions}
            colorMap={billingStatusColors}
            onChange={(value) => onUpdateStatus(meeting.id, "billingStatus", value)}
          />
        </div>

        {/* Time */}
        <div className="min-w-[80px] text-right font-medium">
          {meeting.meetingTime}
        </div>
      </div>

      {/* Details Row */}
      <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            Booked on: {format(meeting.bookedAt, "EEEE dd MMM yyyy 'at' HH:mm")}
          </span>
          <span className="text-border">•</span>
          <span>Invitees: {meeting.inviteeEmail}</span>
          <span className="text-border">•</span>
          <span>No. of Reschedules {meeting.rescheduleCount}</span>
          <span className="text-border">•</span>
          <span>Call Stage: {meeting.callStage}</span>
          <span className="text-border">•</span>
          <span>Calendar: {meeting.calendar}</span>
          <span className="text-border">•</span>
          <span>Closer: {meeting.closer}</span>
          <span className="text-border">•</span>
          <span>Booked by: {meeting.bookedBy}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-[10px] hover:bg-muted"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <ConversationDialog
            inviteeName={meeting.inviteeName}
            company={meeting.company}
            conversation={meeting.conversation}
          />
        </div>
      </div>
    </div>
  );
}

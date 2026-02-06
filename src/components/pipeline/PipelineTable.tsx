import { format } from "date-fns";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
}

export function PipelineTable({
  groupedMeetings,
  filteredCount,
  selectedMeetings,
  onToggleSelectAll,
  onToggleSelect,
  onUpdateStatus,
}: PipelineTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-10 pl-4">
              <Checkbox
                checked={
                  selectedMeetings.length === filteredCount &&
                  filteredCount > 0
                }
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[70px]">Date</TableHead>
            <TableHead className="min-w-[180px]">Booking Info</TableHead>
            <TableHead>Lead Status</TableHead>
            <TableHead>Call Status</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead className="w-[80px]">Time</TableHead>
            <TableHead>Booked</TableHead>
            <TableHead className="w-[70px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedMeetings.map(({ date, meetings }) => (
            <>
              {/* Date Group Header */}
              <TableRow
                key={date.toISOString()}
                className="bg-muted/30 hover:bg-muted/30"
              >
                <TableCell colSpan={10} className="py-1.5 pl-4">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {format(date, "EEEE, dd MMMM yyyy")}
                  </span>
                </TableCell>
              </TableRow>

              {/* Meeting Rows */}
              {meetings.map((meeting) => (
                <TableRow key={meeting.id} className="group">
                  <TableCell
                    className="pl-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedMeetings.includes(meeting.id)}
                      onCheckedChange={() => onToggleSelect(meeting.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-[11px] text-muted-foreground leading-none">
                        {format(meeting.meetingDate, "EEE")}
                      </div>
                      <div className="text-lg font-semibold leading-tight">
                        {format(meeting.meetingDate, "dd")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">
                        {meeting.inviteeName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {meeting.company}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      value={meeting.leadStatus}
                      options={leadStatusOptions}
                      colorMap={leadStatusColors}
                      onChange={(value) =>
                        onUpdateStatus(meeting.id, "leadStatus", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      value={meeting.callStatus}
                      options={callStatusOptions}
                      colorMap={callStatusColors}
                      onChange={(value) =>
                        onUpdateStatus(meeting.id, "callStatus", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      value={meeting.takenStatus}
                      options={takenStatusOptions}
                      colorMap={takenStatusColors}
                      onChange={(value) =>
                        onUpdateStatus(meeting.id, "takenStatus", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      value={meeting.billingStatus}
                      options={billingStatusOptions}
                      colorMap={billingStatusColors}
                      onChange={(value) =>
                        onUpdateStatus(meeting.id, "billingStatus", value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium tabular-nums">
                      {meeting.meetingTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>
                        {format(meeting.bookedAt, "dd MMM 'at' HH:mm")}
                      </div>
                      <div>by {meeting.bookedBy}</div>
                      <div className="text-muted-foreground/60">
                        {meeting.calendar} • {meeting.closer}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <ConversationDialog
                        inviteeName={meeting.inviteeName}
                        company={meeting.company}
                        conversation={meeting.conversation}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>

      {filteredCount === 0 && (
        <div className="text-center py-16 text-sm text-muted-foreground">
          No meetings found matching your search.
        </div>
      )}
    </div>
  );
}

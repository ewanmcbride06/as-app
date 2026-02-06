import { format } from "date-fns";
import { Meeting } from "./types";
import { PipelineRow } from "./PipelineRow";

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
  return (
    <div className="flex-1 overflow-auto">
      {/* Table Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          <div className="shrink-0 w-[18px]" />
          <div className="w-[52px] shrink-0 text-center">Date</div>
          <div className="min-w-[160px] flex-[1.5]">Contact</div>
          <div className="flex-1">Lead Status</div>
          <div className="flex-1">Call Status</div>
          <div className="flex-1">Taken</div>
          <div className="flex-1">Billing</div>
          <div className="w-[80px] shrink-0 text-right">Time</div>
          <div className="w-[20px] shrink-0" />
        </div>
      </div>

      {/* Table Body */}
      {groupedMeetings.map(({ date, meetings }) => (
        <div key={date.toISOString()}>
          {/* Date Group Header */}
          <div className="sticky top-[41px] z-[5] px-4 py-2 bg-muted/40 border-b border-border">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {format(date, "EEEE, dd MMMM yyyy")}
            </span>
          </div>

          {/* Rows */}
          {meetings.map((meeting) => (
            <PipelineRow
              key={meeting.id}
              meeting={meeting}
              isSelected={selectedMeetings.includes(meeting.id)}
              onToggleSelect={onToggleSelect}
              onUpdateStatus={onUpdateStatus}
              onOpenConversation={onOpenConversation}
            />
          ))}
        </div>
      ))}

      {filteredCount === 0 && (
        <div className="text-center py-16 text-sm text-muted-foreground">
          No meetings found matching your filters.
        </div>
      )}
    </div>
  );
}

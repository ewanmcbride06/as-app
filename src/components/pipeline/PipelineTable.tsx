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
      {/* Column Header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-10 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {/* Checkbox + Date + Contact grouped as "Booking Information" */}
          <div className="w-[20px] shrink-0" />
          <div className="w-[56px] shrink-0" />
          <div className="flex-[1.8] min-w-[150px]">Booking Information</div>
          <div className="flex-1">Lead Status</div>
          <div className="flex-1">Call Status</div>
          <div className="flex-1">Taken Status</div>
          <div className="flex-1">Billing Status</div>
          <div className="w-[80px] shrink-0 text-right">Time of Call</div>
        </div>
      </div>

      {/* Body */}
      {groupedMeetings.map(({ date, meetings }) => (
        <div key={date.toISOString()}>
          {/* Date Group Header */}
          <div className="sticky top-[37px] z-10 bg-secondary border-b border-border">
            <div className="px-5 py-2">
              <span className="text-[12px] font-medium text-muted-foreground">
                {format(date, "dd MMMM yyyy")}
              </span>
            </div>
          </div>

          {/* Cards */}
          <div className="pt-3">
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

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
      {/* Table Column Header */}
      <div className="sticky top-0 z-20 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-5 py-2.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          <div className="w-[20px] shrink-0" />
          <div className="w-[56px] shrink-0 text-center">Date</div>
          <div className="w-[180px] shrink-0">Contact</div>
          <div className="flex-1 min-w-[130px]">Lead Status</div>
          <div className="flex-1 min-w-[110px]">Call Status</div>
          <div className="flex-1 min-w-[110px]">Taken</div>
          <div className="flex-1 min-w-[110px]">Billing</div>
          <div className="w-[80px] shrink-0 text-right">Time</div>
        </div>
      </div>

      {/* Table Body */}
      {groupedMeetings.map(({ date, meetings }) => (
        <div key={date.toISOString()}>
          {/* Date Group Header — solid bg, stacks below column header */}
          <div className="sticky top-[37px] z-10 px-5 py-2 bg-secondary border-b border-border">
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

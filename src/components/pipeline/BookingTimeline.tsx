import { format } from "date-fns";
import {
  CalendarPlus,
  RefreshCw,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Meeting } from "./types";
import { cn } from "@/lib/utils";

interface BookingTimelineProps {
  meeting: Meeting;
}

interface TimelineEvent {
  icon: React.ReactNode;
  label: string;
  detail: string;
  time: string;
  dotColor?: string;
}

export function BookingTimeline({ meeting }: BookingTimelineProps) {
  const events: TimelineEvent[] = [];

  // Meeting booked
  events.push({
    icon: <CalendarPlus className="h-3 w-3" />,
    label: "Meeting Booked",
    detail: `by ${meeting.bookedBy} · Calendar: ${meeting.calendar} · Closer: ${meeting.closer}`,
    time: format(meeting.bookedAt, "dd MMM yyyy 'at' HH:mm"),
    dotColor: "bg-green-500",
  });

  // Reschedules
  if (meeting.rescheduleCount > 0) {
    for (let i = 0; i < meeting.rescheduleCount; i++) {
      events.push({
        icon: <RefreshCw className="h-3 w-3" />,
        label: `Meeting Rescheduled`,
        detail: `Reschedule ${i + 1} of ${meeting.rescheduleCount}`,
        time: "During booking lifecycle",
        dotColor: "bg-yellow-500",
      });
    }
  }

  // Cancelled
  if (meeting.callStatus === "Cancelled") {
    events.push({
      icon: <XCircle className="h-3 w-3" />,
      label: "Meeting Cancelled",
      detail: "Meeting was cancelled",
      time: "",
      dotColor: "bg-red-500",
    });
  }

  // Status changes — lead, call, taken, billing
  const statusChanges: { label: string; value: string; color: string }[] = [
    { label: "Lead Status", value: meeting.leadStatus, color: "bg-blue-400" },
    { label: "Call Status", value: meeting.callStatus, color: "bg-blue-500" },
    { label: "Taken", value: meeting.takenStatus, color: "bg-muted-foreground" },
    { label: "Billing", value: meeting.billingStatus, color: "bg-muted-foreground" },
  ];

  statusChanges.forEach(({ label, value, color }) => {
    events.push({
      icon: <ArrowRight className="h-3 w-3" />,
      label: `${label}`,
      detail: value,
      time: "Current",
      dotColor: color,
    });
  });

  return (
    <div className="bg-muted/30 border-t border-border">
      {/* Use table-like padding to align with columns: checkbox (w-10 + pl-4) + date (w-70) = ~120px offset */}
      <div className="py-3" style={{ paddingLeft: "calc(2.5rem + 1rem)" }}>
        <div className="flex items-start gap-8">
          {/* Timeline aligned roughly under the Date column area */}
          <div className="flex-1 max-w-2xl">
            <div className="relative pl-5">
              {events.map((event, idx) => (
                <div key={idx} className="relative pb-2.5 last:pb-0">
                  {/* Vertical line */}
                  {idx < events.length - 1 && (
                    <div className="absolute left-[5px] top-4 bottom-0 w-px bg-border" />
                  )}
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-0 top-[5px] w-[10px] h-[10px] rounded-full border-2 border-background",
                      event.dotColor || "bg-muted-foreground"
                    )}
                  />
                  {/* Content */}
                  <div className="ml-5 flex items-baseline gap-3">
                    <span className="text-xs font-medium text-foreground whitespace-nowrap">
                      {event.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {event.detail}
                    </span>
                    {event.time && (
                      <>
                        <span className="text-border">·</span>
                        <span className="text-[11px] text-muted-foreground/60">
                          {event.time}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

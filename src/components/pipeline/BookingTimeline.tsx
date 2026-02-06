import { format } from "date-fns";
import { Meeting } from "./types";
import { cn } from "@/lib/utils";

interface BookingTimelineProps {
  meeting: Meeting;
}

interface TimelineEvent {
  label: string;
  detail: string;
  dotColor?: string;
}

export function BookingTimeline({ meeting }: BookingTimelineProps) {
  const events: TimelineEvent[] = [];

  // Meeting booked
  events.push({
    label: "Meeting Booked",
    detail: `${format(meeting.bookedAt, "dd MMM yyyy 'at' HH:mm")} · ${meeting.bookedBy}`,
    dotColor: "bg-green-500",
  });

  // Reschedules
  if (meeting.rescheduleCount > 0) {
    for (let i = 0; i < meeting.rescheduleCount; i++) {
      events.push({
        label: "Meeting Rescheduled",
        detail: `Reschedule ${i + 1} of ${meeting.rescheduleCount}`,
        dotColor: "bg-yellow-500",
      });
    }
  }

  // Cancelled
  if (meeting.callStatus === "Cancelled") {
    events.push({
      label: "Meeting Cancelled",
      detail: "Meeting was cancelled",
      dotColor: "bg-red-500",
    });
  }

  // Current statuses
  events.push({
    label: "Lead Status",
    detail: meeting.leadStatus,
    dotColor: "bg-blue-400",
  });
  events.push({
    label: "Call Status",
    detail: `${meeting.callStatus} · Calendar: ${meeting.calendar}`,
    dotColor: "bg-blue-500",
  });
  events.push({
    label: "Taken",
    detail: meeting.takenStatus,
    dotColor: "bg-muted-foreground",
  });
  events.push({
    label: "Billing",
    detail: `${meeting.billingStatus} · Closer: ${meeting.closer}`,
    dotColor: "bg-muted-foreground",
  });

  // Layout math to align with the card's flex layout:
  // Card has p-5 (20px) with: checkbox(20px) + gap(16px) + date(50px) + gap(16px) + bookingInfo
  // Date center = 20px + 20px + 16px + 25px = 81px from card left edge
  // Booking info starts at = 20px + 20px + 16px + 50px + 16px = 122px from card left edge
  const dotCenterOffset = 81; // px from left edge of card, center of date column
  const textStartOffset = 122; // px from left edge of card, aligned with booking info

  return (
    <div className="border-t border-border bg-muted/30 rounded-b-[10px] py-4 relative">
      {/* Vertical line */}
      <div
        className="absolute top-4 bottom-4 w-px bg-border"
        style={{ left: `${dotCenterOffset}px` }}
      />

      {/* Events */}
      <div className="space-y-3">
        {events.map((event, idx) => (
          <div key={idx} className="relative flex items-start">
            {/* Dot — centered on date column */}
            <div
              className="absolute top-[3px]"
              style={{ left: `${dotCenterOffset - 5}px` }}
            >
              <div
                className={cn(
                  "w-[10px] h-[10px] rounded-full border-2 border-muted/30",
                  event.dotColor || "bg-muted-foreground"
                )}
              />
            </div>

            {/* Text — aligned with booking info */}
            <div style={{ marginLeft: `${textStartOffset}px` }}>
              <div className="text-xs font-medium text-foreground">
                {event.label}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {event.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

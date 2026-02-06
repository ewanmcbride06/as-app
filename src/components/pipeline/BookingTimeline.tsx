import { format } from "date-fns";
import {
  CalendarPlus,
  Clock,
  User,
  RefreshCw,
  Phone,
  UserCheck,
} from "lucide-react";
import { Meeting } from "./types";

interface BookingTimelineProps {
  meeting: Meeting;
}

interface TimelineEvent {
  icon: React.ReactNode;
  label: string;
  detail: string;
  time: string;
}

export function BookingTimeline({ meeting }: BookingTimelineProps) {
  const events: TimelineEvent[] = [
    {
      icon: <CalendarPlus className="h-3.5 w-3.5" />,
      label: "Booking Created",
      detail: `Booked by ${meeting.bookedBy}`,
      time: format(meeting.bookedAt, "dd MMM yyyy 'at' HH:mm"),
    },
    {
      icon: <UserCheck className="h-3.5 w-3.5" />,
      label: "Closer Assigned",
      detail: meeting.closer,
      time: format(meeting.bookedAt, "dd MMM yyyy 'at' HH:mm"),
    },
    {
      icon: <Phone className="h-3.5 w-3.5" />,
      label: "Call Stage",
      detail: meeting.callStage,
      time: `Calendar: ${meeting.calendar}`,
    },
  ];

  if (meeting.rescheduleCount > 0) {
    events.push({
      icon: <RefreshCw className="h-3.5 w-3.5" />,
      label: `Rescheduled ${meeting.rescheduleCount} time${meeting.rescheduleCount > 1 ? "s" : ""}`,
      detail: `Rescheduled by invitee`,
      time: "During booking lifecycle",
    });
  }

  events.push({
    icon: <Clock className="h-3.5 w-3.5" />,
    label: "Meeting Scheduled",
    detail: `${format(meeting.meetingDate, "EEEE, dd MMM yyyy")} at ${meeting.meetingTime}`,
    time: `Invitee: ${meeting.inviteeEmail}`,
  });

  return (
    <div className="px-4 py-3 bg-muted/40 border-t border-border">
      <div className="flex items-start gap-6">
        {/* Timeline */}
        <div className="flex-1">
          <div className="relative pl-6">
            {events.map((event, idx) => (
              <div key={idx} className="relative pb-3 last:pb-0">
                {/* Vertical line */}
                {idx < events.length - 1 && (
                  <div className="absolute left-0 top-5 bottom-0 w-px bg-border" />
                )}
                {/* Dot */}
                <div className="absolute left-0 top-1 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <div className="text-muted-foreground">{event.icon}</div>
                </div>
                {/* Content */}
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">
                      {event.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {event.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { format } from "date-fns";
import { X, Calendar, RefreshCw, XCircle, User, Phone, Eye, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Meeting } from "./types";
import { cn } from "@/lib/utils";

interface ConversationPanelProps {
  meeting: Meeting;
  onClose: () => void;
}

type FeedItem =
  | { type: "message"; sender: "us" | "them"; message: string; timestamp: Date; id: string }
  | { type: "activity"; label: string; detail: string; user: string; icon: React.ReactNode; timestamp: Date };

function buildFeed(meeting: Meeting): FeedItem[] {
  const items: FeedItem[] = [];

  // Add all conversation messages
  meeting.conversation.forEach((msg) => {
    items.push({
      type: "message",
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp,
      id: msg.id,
    });
  });

  // Meeting booked — placed at bookedAt time (interleaves with messages)
  items.push({
    type: "activity",
    label: "Meeting Booked",
    detail: `Booked for ${format(meeting.meetingDate, "dd MMM yyyy")} at ${meeting.meetingTime}`,
    user: meeting.bookedBy,
    icon: <Calendar className="h-3.5 w-3.5" />,
    timestamp: meeting.bookedAt,
  });

  // Reschedules — spaced after booking
  if (meeting.rescheduleCount > 0) {
    for (let i = 0; i < meeting.rescheduleCount; i++) {
      const rescheduleTime = new Date(meeting.bookedAt.getTime() + (i + 1) * 7200000);
      items.push({
        type: "activity",
        label: "Meeting Rescheduled",
        detail: `Reschedule ${i + 1} of ${meeting.rescheduleCount}`,
        user: meeting.bookedBy,
        icon: <RefreshCw className="h-3.5 w-3.5" />,
        timestamp: rescheduleTime,
      });
    }
  }

  // Cancelled — after reschedules
  if (meeting.callStatus === "Cancelled") {
    const cancelTime = new Date(meeting.bookedAt.getTime() + (meeting.rescheduleCount + 1) * 7200000 + 3600000);
    items.push({
      type: "activity",
      label: "Meeting Cancelled",
      detail: "Meeting was cancelled by the lead",
      user: meeting.inviteeName,
      icon: <XCircle className="h-3.5 w-3.5" />,
      timestamp: cancelTime,
    });
  }

  // Lead status — placed near the end of the conversation timeline
  const lastMsgTime = meeting.conversation.length > 0
    ? meeting.conversation[meeting.conversation.length - 1].timestamp
    : meeting.bookedAt;

  items.push({
    type: "activity",
    label: `Lead: ${meeting.leadStatus}`,
    detail: `Status updated to ${meeting.leadStatus}`,
    user: meeting.closer,
    icon: <User className="h-3.5 w-3.5" />,
    timestamp: new Date(lastMsgTime.getTime() + 60000),
  });

  items.push({
    type: "activity",
    label: `Call: ${meeting.callStatus}`,
    detail: `Calendar: ${meeting.calendar}`,
    user: meeting.closer,
    icon: <Phone className="h-3.5 w-3.5" />,
    timestamp: new Date(lastMsgTime.getTime() + 120000),
  });

  items.push({
    type: "activity",
    label: `Attendance: ${meeting.takenStatus}`,
    detail: meeting.takenStatus === "Shown" ? "Lead attended the meeting" : meeting.takenStatus === "Not Shown" ? "Lead did not attend" : "Meeting is upcoming",
    user: meeting.closer,
    icon: <Eye className="h-3.5 w-3.5" />,
    timestamp: new Date(lastMsgTime.getTime() + 180000),
  });

  items.push({
    type: "activity",
    label: `Billing: ${meeting.billingStatus}`,
    detail: `Closer: ${meeting.closer}`,
    user: meeting.closer,
    icon: <Receipt className="h-3.5 w-3.5" />,
    timestamp: new Date(lastMsgTime.getTime() + 240000),
  });

  // Sort chronologically
  items.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return items;
}

export function ConversationPanel({ meeting, onClose }: ConversationPanelProps) {
  const feed = buildFeed(meeting);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header — same height as TopNav (h-14 = 56px) */}
      <div className="h-14 px-5 flex items-center justify-between shrink-0 border-b border-border">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold truncate">{meeting.inviteeName}</h2>
          <p className="text-xs text-muted-foreground truncate">{meeting.company}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 ml-3"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Feed */}
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-4">
          {feed.map((item, idx) => {
            if (item.type === "message") {
              return (
                <div key={`msg-${item.id}`} className="space-y-1">
                  <div
                    className={cn(
                      "flex",
                      item.sender === "us" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] px-3.5 py-2 rounded-2xl text-sm",
                        item.sender === "us"
                          ? "bg-[hsl(var(--imessage-blue))] text-white rounded-br-sm"
                          : "bg-[hsl(var(--imessage-gray))] text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-[10px] text-muted-foreground",
                      item.sender === "us" ? "text-right" : "text-left"
                    )}
                  >
                    {format(item.timestamp, "MMM d, h:mm a")}
                  </p>
                </div>
              );
            }

            // Activity event — centered pill with status, time, user
            return (
              <div key={`activity-${idx}`} className="py-1.5">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {item.icon}
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {format(item.timestamp, "MMM d, h:mm a")}
                  </span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.user}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

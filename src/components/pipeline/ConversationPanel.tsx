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
  | { type: "activity"; label: string; detail: string; icon: React.ReactNode; timestamp: Date };

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

  // Meeting booked activity — use bookedAt timestamp
  items.push({
    type: "activity",
    label: "Meeting Booked",
    detail: `${format(meeting.bookedAt, "dd MMM yyyy 'at' HH:mm")} · ${meeting.bookedBy}`,
    icon: <Calendar className="h-3 w-3" />,
    timestamp: meeting.bookedAt,
  });

  // Reschedules — place them slightly after bookedAt
  if (meeting.rescheduleCount > 0) {
    for (let i = 0; i < meeting.rescheduleCount; i++) {
      const rescheduleTime = new Date(meeting.bookedAt.getTime() + (i + 1) * 3600000);
      items.push({
        type: "activity",
        label: "Meeting Rescheduled",
        detail: `Reschedule ${i + 1} of ${meeting.rescheduleCount}`,
        icon: <RefreshCw className="h-3 w-3" />,
        timestamp: rescheduleTime,
      });
    }
  }

  // Cancelled
  if (meeting.callStatus === "Cancelled") {
    const cancelTime = new Date(meeting.bookedAt.getTime() + (meeting.rescheduleCount + 1) * 3600000);
    items.push({
      type: "activity",
      label: "Meeting Cancelled",
      detail: "Meeting was cancelled",
      icon: <XCircle className="h-3 w-3" />,
      timestamp: cancelTime,
    });
  }

  // Lead status — place after last conversation message
  const lastMsgTime = meeting.conversation.length > 0
    ? meeting.conversation[meeting.conversation.length - 1].timestamp
    : meeting.bookedAt;

  items.push({
    type: "activity",
    label: "Lead Status Updated",
    detail: meeting.leadStatus,
    icon: <User className="h-3 w-3" />,
    timestamp: new Date(lastMsgTime.getTime() + 1000),
  });

  items.push({
    type: "activity",
    label: "Call Status",
    detail: `${meeting.callStatus} · Calendar: ${meeting.calendar}`,
    icon: <Phone className="h-3 w-3" />,
    timestamp: new Date(lastMsgTime.getTime() + 2000),
  });

  items.push({
    type: "activity",
    label: "Attendance",
    detail: meeting.takenStatus,
    icon: <Eye className="h-3 w-3" />,
    timestamp: new Date(lastMsgTime.getTime() + 3000),
  });

  items.push({
    type: "activity",
    label: "Billing",
    detail: `${meeting.billingStatus} · Closer: ${meeting.closer}`,
    icon: <Receipt className="h-3 w-3" />,
    timestamp: new Date(lastMsgTime.getTime() + 4000),
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

            // Activity event
            return (
              <div key={`activity-${idx}`} className="flex items-center justify-center gap-3 py-2">
                <div className="h-px flex-1 bg-border" />
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                  {item.icon}
                  <div className="text-[11px] font-medium">
                    {item.label}
                  </div>
                  <span className="text-[10px]">·</span>
                  <div className="text-[10px]">
                    {item.detail}
                  </div>
                </div>
                <div className="h-px flex-1 bg-border" />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

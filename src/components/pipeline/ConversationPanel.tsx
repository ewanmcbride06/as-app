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

  meeting.conversation.forEach((msg) => {
    items.push({
      type: "message",
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp,
      id: msg.id,
    });
  });

  items.push({
    type: "activity",
    label: "Meeting Booked",
    detail: `Booked for ${format(meeting.meetingDate, "dd MMM yyyy")} at ${meeting.meetingTime}`,
    user: meeting.bookedBy,
    icon: <Calendar className="h-3.5 w-3.5" />,
    timestamp: meeting.bookedAt,
  });

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

  items.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  return items;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ConversationPanel({ meeting, onClose }: ConversationPanelProps) {
  const feed = buildFeed(meeting);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 px-5 flex items-center justify-between shrink-0 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-[10px] bg-foreground text-background flex items-center justify-center text-xs font-semibold shrink-0">
            {getInitials(meeting.inviteeName)}
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-semibold truncate">{meeting.inviteeName}</h2>
            <p className="text-[11px] text-muted-foreground truncate">
              {meeting.company} · {meeting.inviteeEmail}
            </p>
          </div>
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
        <div className="px-5 py-6">
          {/* Timeline spine */}
          <div className="relative">
            {feed.map((item, idx) => {
              const isLast = idx === feed.length - 1;

              if (item.type === "activity") {
                return (
                  <div key={`activity-${idx}`} className="relative flex gap-3 pb-6">
                    {/* Spine */}
                    <div className="flex flex-col items-center shrink-0 w-8">
                      <div className="h-8 w-8 rounded-[10px] border border-border bg-background flex items-center justify-center text-muted-foreground shrink-0">
                        {item.icon}
                      </div>
                      {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="text-[13px] font-medium text-foreground leading-tight">
                        {item.label}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {item.detail}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[7px] font-semibold text-muted-foreground">
                            {getInitials(item.user)}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {item.user}
                        </span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] text-muted-foreground">
                          {format(item.timestamp, "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Message
              return (
                <div key={`msg-${item.id}`} className="relative flex gap-3 pb-6">
                  {/* Spine */}
                  <div className="flex flex-col items-center shrink-0 w-8">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-[10px] flex items-center justify-center text-[10px] font-semibold shrink-0",
                        item.sender === "us"
                          ? "bg-[hsl(var(--imessage-blue))] text-white"
                          : "bg-[hsl(var(--imessage-gray))] text-foreground"
                      )}
                    >
                      {item.sender === "us" ? "You" : getInitials(meeting.inviteeName)}
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[13px] font-medium text-foreground">
                        {item.sender === "us" ? "You" : meeting.inviteeName}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(item.timestamp, "MMM d, h:mm a")}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "mt-1.5 px-3.5 py-2.5 rounded-[10px] text-[13px] leading-relaxed",
                        item.sender === "us"
                          ? "bg-[hsl(var(--imessage-blue))] text-white"
                          : "bg-[hsl(var(--imessage-gray))] text-foreground"
                      )}
                    >
                      {item.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

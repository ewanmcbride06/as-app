import { format } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Meeting } from "./types";
import { cn } from "@/lib/utils";

interface ConversationPanelProps {
  meeting: Meeting;
  onClose: () => void;
}

export function ConversationPanel({ meeting, onClose }: ConversationPanelProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header — matches pipeline page header height */}
      <div className="px-5 py-4 flex items-center justify-between shrink-0 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{meeting.inviteeName}</h2>
          <p className="text-sm text-muted-foreground">{meeting.company}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-5 space-y-3">
          {meeting.conversation.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "us" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] px-3.5 py-2 rounded-2xl text-sm",
                  msg.sender === "us"
                    ? "bg-[hsl(var(--imessage-blue))] text-white rounded-br-sm"
                    : "bg-[hsl(var(--imessage-gray))] text-foreground rounded-bl-sm"
                )}
              >
                <p className="leading-relaxed">{msg.message}</p>
                <p
                  className={cn(
                    "text-[10px] mt-1",
                    msg.sender === "us" ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  {format(msg.timestamp, "MMM d, h:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

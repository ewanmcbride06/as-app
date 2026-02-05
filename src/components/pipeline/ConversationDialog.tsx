import { format } from "date-fns";
import { MessageSquare, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationMessage } from "./types";
import { cn } from "@/lib/utils";

interface ConversationDialogProps {
  inviteeName: string;
  company: string;
  conversation: ConversationMessage[];
}

export function ConversationDialog({
  inviteeName,
  company,
  conversation,
}: ConversationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 rounded-[10px] overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-sm font-medium">
            Conversation with {inviteeName}
            <span className="text-muted-foreground font-normal ml-1.5">
              • {company}
            </span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-3">
            {conversation.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "us" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] px-3 py-2 rounded-2xl text-sm",
                    msg.sender === "us"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1 opacity-60"
                    )}
                  >
                    {format(msg.timestamp, "MMM d, h:mm a")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

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
          className="h-8 w-8 rounded-[10px] hover:bg-muted"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 rounded-[10px] overflow-hidden">
        <DialogHeader className="px-4 py-3 border-b bg-muted/30">
          <DialogTitle className="text-base font-medium">
            Conversation with {inviteeName}
            <span className="text-muted-foreground font-normal ml-2">
              ({company})
            </span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-3">
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
                    "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm",
                    msg.sender === "us"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  <p>{msg.message}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      msg.sender === "us"
                        ? "text-blue-100"
                        : "text-muted-foreground"
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

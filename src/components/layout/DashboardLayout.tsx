import TopNav from "./TopNav";
import { ConversationPanel } from "@/components/pipeline/ConversationPanel";
import { useConversationPanel } from "@/contexts/ConversationPanelContext";
import { useLayout } from "@/contexts/LayoutContext";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { meeting, closeConversation, isOpen } = useConversationPanel();
  const { isExpanded } = useLayout();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Main app area — shrinks when panel is open */}
      <div className={cn(
        "flex-1 min-w-0 flex flex-col overflow-hidden transition-all duration-300 ease-out",
      )}>
        <TopNav />
        <main className={cn(
          "flex-1 overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "px-0 pt-0" : "px-[50px] pt-[50px]"
        )}>
          <Outlet />
        </main>
      </div>

      {/* Conversation Panel — full-height sibling to entire app, from top to bottom */}
      {isOpen && meeting && (
        <div className="w-[400px] shrink-0 border-l border-border bg-background animate-slide-in-right">
          <ConversationPanel
            meeting={meeting}
            onClose={closeConversation}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;

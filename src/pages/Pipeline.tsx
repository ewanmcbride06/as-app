import { useState, useMemo } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PipelineToolbar } from "@/components/pipeline/PipelineToolbar";
import { PipelineTable } from "@/components/pipeline/PipelineTable";
import { ConversationPanel } from "@/components/pipeline/ConversationPanel";
import { mockMeetings } from "@/components/pipeline/mockData";
import { Meeting } from "@/components/pipeline/types";
import { updateDealStage, updateMeetingShowStatus } from "@/services/pipelineApi";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Pipeline = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"booked" | "analytics" | "connections">("booked");
  const [conversationMeeting, setConversationMeeting] = useState<Meeting | null>(null);
  const { toast } = useToast();

  const filteredMeetings = useMemo(() => {
    return meetings.filter(
      (m) =>
        m.inviteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.inviteeEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [meetings, searchQuery]);

  const groupedMeetings = useMemo(() => {
    const groups: Record<string, Meeting[]> = {};
    filteredMeetings.forEach((meeting) => {
      const dateKey = format(meeting.meetingDate, "yyyy-MM-dd");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(meeting);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([dateKey, meetings]) => ({
        date: new Date(dateKey),
        meetings,
      }));
  }, [filteredMeetings]);

  const handleUpdateStatus = async (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );

    if (field === "leadStatus") {
      const success = await updateDealStage({ deal_id: id, new_stage: value });
      if (!success) {
        toast({
          title: "Sync failed",
          description: "Failed to update deal stage on the server.",
          variant: "destructive",
        });
      }
    }

    if (field === "takenStatus") {
      const success = await updateMeetingShowStatus({ meeting_id: id, show_status: value });
      if (!success) {
        toast({
          title: "Sync failed",
          description: "Failed to update meeting status on the server.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleSelectAll = () => {
    if (selectedMeetings.length === filteredMeetings.length) {
      setSelectedMeetings([]);
    } else {
      setSelectedMeetings(filteredMeetings.map((m) => m.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedMeetings((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const isPanelOpen = !!conversationMeeting;

  return (
    <DashboardLayout>
      {/* Full-width flex — negative right margin lets conversation panel extend to viewport edge */}
      <div
        className={cn(
          "flex h-full overflow-hidden transition-all duration-300 ease-out",
          isPanelOpen && "-mr-[50px]"
        )}
      >
        {/* Pipeline Content */}
        <div className="flex flex-col h-full overflow-hidden flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 shrink-0">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
              <p className="text-muted-foreground">
                Overview of all bookings and their sales analytics.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invitee or company..."
                  className="pl-9 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-4 shrink-0">
            {(["booked", "analytics", "connections"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-tab ${activeTab === tab ? "nav-tab-active" : ""}`}
              >
                {tab === "booked"
                  ? "Meetings Booked"
                  : tab === "analytics"
                  ? "Analytics"
                  : "Connections"}
              </button>
            ))}
          </div>

          {/* Toolbar + Cards */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <PipelineToolbar
              totalCount={filteredMeetings.length}
              selectedCount={selectedMeetings.length}
              onClearSelection={() => setSelectedMeetings([])}
            />

            <PipelineTable
              groupedMeetings={groupedMeetings}
              filteredCount={filteredMeetings.length}
              selectedMeetings={selectedMeetings}
              onToggleSelectAll={toggleSelectAll}
              onToggleSelect={toggleSelect}
              onUpdateStatus={handleUpdateStatus}
              onOpenConversation={setConversationMeeting}
            />
          </div>
        </div>

        {/* Full-page Conversation Panel */}
        {isPanelOpen && (
          <div className="w-[400px] shrink-0 h-full border-l border-border bg-background animate-slide-in-right">
            <ConversationPanel
              meeting={conversationMeeting!}
              onClose={() => setConversationMeeting(null)}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;

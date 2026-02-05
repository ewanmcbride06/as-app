import { useState, useMemo } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MeetingCard } from "@/components/pipeline/MeetingCard";
import { mockMeetings } from "@/components/pipeline/mockData";
import { Meeting } from "@/components/pipeline/types";

const Pipeline = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"booked" | "analytics" | "connections">("booked");

  // Filter meetings by search
  const filteredMeetings = useMemo(() => {
    return meetings.filter(
      (m) =>
        m.inviteeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.inviteeEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [meetings, searchQuery]);

  // Group meetings by date
  const groupedMeetings = useMemo(() => {
    const groups: Record<string, Meeting[]> = {};
    filteredMeetings.forEach((meeting) => {
      const dateKey = format(meeting.meetingDate, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(meeting);
    });

    // Sort by date descending
    return Object.entries(groups)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([dateKey, meetings]) => ({
        date: new Date(dateKey),
        meetings,
      }));
  }, [filteredMeetings]);

  const handleUpdateStatus = (
    id: string,
    field: "leadStatus" | "callStatus" | "takenStatus" | "billingStatus",
    value: string
  ) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
              <p className="text-muted-foreground text-sm">
                See an overview of all the clients' bookings and their sales analytics.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4 p-1 bg-muted/50 rounded-[10px] w-fit">
            <button
              onClick={() => setActiveTab("booked")}
              className={`px-6 py-2 text-sm font-medium rounded-[8px] transition-colors ${
                activeTab === "booked"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Meetings Booked
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-2 text-sm font-medium rounded-[8px] transition-colors ${
                activeTab === "analytics"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Analytics (Coming Soon)
            </button>
            <button
              onClick={() => setActiveTab("connections")}
              className={`px-6 py-2 text-sm font-medium rounded-[8px] transition-colors ${
                activeTab === "connections"
                  ? "bg-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Connections
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for meetings by invitee or company name"
                className="pl-9 h-9 rounded-[10px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 rounded-[10px]">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-[10px]">
              <Calendar className="h-4 w-4" />
              All Time
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-[10px]">
              <Plus className="h-4 w-4" />
              Payout
            </Button>
            <div className="text-sm text-muted-foreground">
              Total: {filteredMeetings.length}
            </div>
          </div>

          {/* Column Headers */}
          <div className="flex items-center gap-6 mt-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase bg-muted/30 rounded-[10px]">
            <div className="min-w-[50px]"></div>
            <div className="min-w-[160px]">Booking Information</div>
            <div className="flex-1">Lead Status</div>
            <div className="flex-1">Call Status</div>
            <div className="flex-1">Taken Status</div>
            <div className="flex-1">Billing Status</div>
            <div className="min-w-[80px] text-right">Time of Call</div>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-4 pr-4">
            {groupedMeetings.map(({ date, meetings }) => (
              <div key={date.toISOString()}>
                {/* Date Header */}
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  {format(date, "dd MMMM yyyy")}
                </div>

                {/* Meeting Cards */}
                <div className="space-y-2">
                  {meetings.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredMeetings.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No meetings found matching your search.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;

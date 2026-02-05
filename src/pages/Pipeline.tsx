import { useState, useMemo } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, Calendar, Plus, ChevronDown, Columns, Download, Upload, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StatusDropdown } from "@/components/pipeline/StatusDropdown";
import { ConversationDialog } from "@/components/pipeline/ConversationDialog";
import { mockMeetings } from "@/components/pipeline/mockData";
import {
  Meeting,
  LeadStatus,
  CallStatus,
  TakenStatus,
  BillingStatus,
  leadStatusColors,
  callStatusColors,
  takenStatusColors,
  billingStatusColors,
} from "@/components/pipeline/types";
import { updateDealStage, updateMeetingShowStatus } from "@/services/pipelineApi";
import { useToast } from "@/hooks/use-toast";

const leadStatusOptions: LeadStatus[] = [
  "Potential",
  "Qualified",
  "Not Qualified",
  "Won",
  "Lost - Not Interest",
  "Lost - Failed To Close",
];

const callStatusOptions: CallStatus[] = [
  "Booked",
  "Rescheduled",
  "No Show",
  "Completed",
  "Cancelled",
];

const takenStatusOptions: TakenStatus[] = ["Upcoming", "Shown", "Not Shown"];

const billingStatusOptions: BillingStatus[] = [
  "Not Billed",
  "Billed",
  "Pending",
  "Refunded",
];

const Pipeline = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeetings, setSelectedMeetings] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"booked" | "analytics" | "connections">("booked");
  const { toast } = useToast();

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
    // Optimistically update local state
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );

    // Call API for lead status (deal stage) changes
    if (field === "leadStatus") {
      const success = await updateDealStage({
        deal_id: id,
        new_stage: value,
      });
      if (!success) {
        toast({
          title: "Sync failed",
          description: "Failed to update deal stage on the server. Changes saved locally.",
          variant: "destructive",
        });
      }
    }

    // Call API for taken status (meeting show status) changes
    if (field === "takenStatus") {
      const success = await updateMeetingShowStatus({
        meeting_id: id,
        show_status: value,
      });
      if (!success) {
        toast({
          title: "Sync failed",
          description: "Failed to update meeting status on the server. Changes saved locally.",
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
    if (selectedMeetings.includes(id)) {
      setSelectedMeetings(selectedMeetings.filter((m) => m !== id));
    } else {
      setSelectedMeetings([...selectedMeetings, id]);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
            <p className="text-muted-foreground">See an overview of all the clients' bookings and their sales analytics.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invitee or company..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Booking
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-1 mb-4">
          <button
            onClick={() => setActiveTab("booked")}
            className={`nav-tab ${activeTab === "booked" ? "nav-tab-active" : ""}`}
          >
            Meetings Booked
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`nav-tab ${activeTab === "analytics" ? "nav-tab-active" : ""}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("connections")}
            className={`nav-tab ${activeTab === "connections" ? "nav-tab-active" : ""}`}
          >
            Connections
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
          <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">{filteredMeetings.length}</strong> meetings
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Statuses</DropdownMenuItem>
                    <DropdownMenuItem>Potential Only</DropdownMenuItem>
                    <DropdownMenuItem>Qualified Only</DropdownMenuItem>
                    <DropdownMenuItem>Won Deals</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      All Time
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Today</DropdownMenuItem>
                    <DropdownMenuItem>This Week</DropdownMenuItem>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                    <DropdownMenuItem>All Time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Columns className="h-4 w-4" />
                      Columns
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      {['Date', 'Invitee', 'Lead Status', 'Call Status', 'Taken', 'Billing', 'Time', 'Details'].map(col => (
                        <label key={col} className="flex items-center gap-2 text-sm">
                          <Checkbox defaultChecked />
                          {col}
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Payout
                </Button>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedMeetings.length > 0 && (
              <div className="border-b p-3 bg-primary/5 flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium">{selectedMeetings.length} selected</span>
                <Button size="sm" variant="outline">Update Status</Button>
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm" variant="outline">Mark as Billed</Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedMeetings([])}>Clear</Button>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        checked={selectedMeetings.length === filteredMeetings.length && filteredMeetings.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-[70px]">Date</TableHead>
                    <TableHead className="min-w-[180px]">Booking Information</TableHead>
                    <TableHead>Lead Status</TableHead>
                    <TableHead>Call Status</TableHead>
                    <TableHead>Taken Status</TableHead>
                    <TableHead>Billing Status</TableHead>
                    <TableHead className="w-[80px]">Time</TableHead>
                    <TableHead>Booked</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedMeetings.map(({ date, meetings }) => (
                    <>
                      {/* Date Group Header */}
                      <TableRow key={date.toISOString()} className="bg-muted/30 hover:bg-muted/30">
                        <TableCell colSpan={10} className="py-2">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {format(date, "dd MMMM yyyy")}
                          </span>
                        </TableCell>
                      </TableRow>
                      
                      {/* Meeting Rows */}
                      {meetings.map((meeting) => (
                        <TableRow key={meeting.id} className="group">
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedMeetings.includes(meeting.id)}
                              onCheckedChange={() => toggleSelect(meeting.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <div className="text-xs text-muted-foreground">{format(meeting.meetingDate, "EEE")}</div>
                              <div className="text-lg font-semibold">{format(meeting.meetingDate, "dd")}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{meeting.inviteeName}</div>
                              <div className="text-sm text-muted-foreground">{meeting.company}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusDropdown
                              value={meeting.leadStatus}
                              options={leadStatusOptions}
                              colorMap={leadStatusColors}
                              onChange={(value) => handleUpdateStatus(meeting.id, "leadStatus", value)}
                            />
                          </TableCell>
                          <TableCell>
                            <StatusDropdown
                              value={meeting.callStatus}
                              options={callStatusOptions}
                              colorMap={callStatusColors}
                              onChange={(value) => handleUpdateStatus(meeting.id, "callStatus", value)}
                            />
                          </TableCell>
                          <TableCell>
                            <StatusDropdown
                              value={meeting.takenStatus}
                              options={takenStatusOptions}
                              colorMap={takenStatusColors}
                              onChange={(value) => handleUpdateStatus(meeting.id, "takenStatus", value)}
                            />
                          </TableCell>
                          <TableCell>
                            <StatusDropdown
                              value={meeting.billingStatus}
                              options={billingStatusOptions}
                              colorMap={billingStatusColors}
                              onChange={(value) => handleUpdateStatus(meeting.id, "billingStatus", value)}
                            />
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{meeting.meetingTime}</span>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs text-muted-foreground space-y-0.5">
                              <div>{format(meeting.bookedAt, "dd MMM 'at' HH:mm")}</div>
                              <div>by {meeting.bookedBy}</div>
                              <div className="text-muted-foreground/60">{meeting.calendar} • {meeting.closer}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <ConversationDialog
                                inviteeName={meeting.inviteeName}
                                company={meeting.company}
                                conversation={meeting.conversation}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>

              {filteredMeetings.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No meetings found matching your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pipeline;

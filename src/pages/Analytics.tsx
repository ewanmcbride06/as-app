import { useState } from "react";
import { subDays, startOfDay, endOfDay } from "date-fns";

import { Download, TrendingUp, Users, Mail, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";

const Analytics = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(subDays(new Date(), 29)),
    to: endOfDay(new Date()),
  });

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Track your performance metrics and campaign insights</p>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
          <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Overview of all campaign performance
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 rounded-[10px] border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Total Sent</span>
                    </div>
                    <p className="text-2xl font-semibold">24,847</p>
                    <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
                  </div>
                  <div className="p-4 rounded-[10px] border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MousePointer className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Open Rate</span>
                    </div>
                    <p className="text-2xl font-semibold">38.2%</p>
                    <p className="text-xs text-muted-foreground mt-1">+3.5% from last period</p>
                  </div>
                  <div className="p-4 rounded-[10px] border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Reply Rate</span>
                    </div>
                    <p className="text-2xl font-semibold">4.8%</p>
                    <p className="text-xs text-muted-foreground mt-1">+0.8% from last period</p>
                  </div>
                  <div className="p-4 rounded-[10px] border bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Users className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">Meetings Booked</span>
                    </div>
                    <p className="text-2xl font-semibold">127</p>
                    <p className="text-xs text-muted-foreground mt-1">+18% from last period</p>
                  </div>
                </div>

                {/* Placeholder Charts */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-[10px] border bg-card">
                    <h3 className="text-sm font-medium mb-4">Emails Sent Over Time</h3>
                    <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-[10px]">
                      <p className="text-sm text-muted-foreground">Chart coming soon</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-[10px] border bg-card">
                    <h3 className="text-sm font-medium mb-4">Reply Rate Trend</h3>
                    <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-[10px]">
                      <p className="text-sm text-muted-foreground">Chart coming soon</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-[10px] border bg-card">
                  <h3 className="text-sm font-medium mb-4">Campaign Performance Breakdown</h3>
                  <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-[10px]">
                    <p className="text-sm text-muted-foreground">Detailed analytics chart coming soon</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

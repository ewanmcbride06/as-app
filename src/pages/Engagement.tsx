import { useState } from "react";
import { startOfDay, endOfDay, subDays } from "date-fns";

import { ArrowLeft, Download, Clock, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  weekdayReplyData,
  hourlyReplyData,
  dailyReplyTypeData,
  espReplyRates,
} from "@/components/engagement/mockData";
import { cn } from "@/lib/utils";

const Engagement = () => {
  const [activeTab, setActiveTab] = useState<"time" | "provider">("time");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(subDays(new Date(), 29)),
    to: endOfDay(new Date()),
  });

  const handleDayClick = (data: { day: string }) => {
    setSelectedDay(data.day);
  };

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Engagement</h1>
            <p className="text-muted-foreground">Reply analytics and ESP performance metrics</p>
          </div>
           <div className="flex items-center gap-2">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button variant="outline" size="sm" className="gap-2 h-9 px-3 text-xs">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="shrink-0 border-b mb-5">
          <div className="flex items-center gap-1">
            {([
              { key: "time" as const, label: "Time Analysis", icon: Clock },
              { key: "provider" as const, label: "Provider Analysis", icon: Server },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "shrink-0 flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-medium border-b-2 -mb-[2px] transition-colors whitespace-nowrap",
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-6 pr-4 pb-6">
            {activeTab === "time" && (
              <>
                {/* Section 1: Human vs Automated Replies */}
                <div className="border border-border rounded-[10px] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold">Human vs Automated Replies</h2>
                      <p className="text-sm text-muted-foreground">
                        Day by day comparison with percentage breakdown
                      </p>
                    </div>
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyReplyTypeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          formatter={(value: number, name: string, props: { payload: { human: number; automated: number } }) => {
                            const total = props.payload.human + props.payload.automated;
                            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
                            return [`${value} (${pct}%)`, name];
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                        <Line
                          type="monotone"
                          dataKey="human"
                          name="Human"
                          stroke="hsl(var(--foreground))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="automated"
                          name="Automated"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Section 2: Replies by Time */}
                <div className="border border-border rounded-[10px] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold">Replies by Time</h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedDay
                          ? `Hourly breakdown for ${selectedDay}`
                          : "Average reply times by weekday • Click a bar to drill down"}
                      </p>
                    </div>
                    {selectedDay && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDay(null)}
                        className="gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to weekly
                      </Button>
                    )}
                  </div>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {selectedDay ? (
                        <BarChart data={hourlyReplyData[selectedDay]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar dataKey="replies" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      ) : (
                        <BarChart data={weekdayReplyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                          <Bar
                            dataKey="replies"
                            fill="hsl(var(--foreground))"
                            radius={[4, 4, 0, 0]}
                            cursor="pointer"
                            onClick={(data) => handleDayClick(data)}
                          />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {activeTab === "provider" && (
              <div className="grid grid-cols-2 gap-6">
                {[...espReplyRates]
                  .sort((a, b) => b.avgRate - a.avgRate)
                  .map((esp, index) => {
                    const rank = index + 1;
                    const medalColors: Record<number, string> = {
                      1: "bg-yellow-500/15 text-yellow-600",
                      2: "bg-gray-300/20 text-gray-500",
                      3: "bg-amber-700/15 text-amber-700",
                    };
                    const medalClass = medalColors[rank] || "bg-muted text-muted-foreground";

                    return (
                      <div key={esp.name} className="border border-border rounded-[10px] p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className={cn("flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold", medalClass)}>
                              {rank}
                            </span>
                            <div>
                              <h2 className="text-base font-semibold">{esp.name}</h2>
                              <p className="text-sm text-muted-foreground">Average reply rate: {esp.avgRate}%</p>
                            </div>
                          </div>
                        </div>
                        <div className="h-[280px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={esp.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} domain={[0, 40]} />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--background))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                }}
                                formatter={(value: number) => [`${value}%`, "Reply Rate"]}
                              />
                              <Line
                                type="monotone"
                                dataKey="rate"
                                stroke="hsl(var(--foreground))"
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Engagement;


import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const activityData = [
  { day: "Mon", applications: 15, interviews: 8 },
  { day: "Tue", applications: 12, interviews: 6 },
  { day: "Wed", applications: 18, interviews: 12 },
  { day: "Thu", applications: 25, interviews: 15 },
  { day: "Fri", applications: 22, interviews: 10 },
  { day: "Sat", applications: 15, interviews: 8 },
  { day: "Sun", applications: 19, interviews: 14 }
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
  interviews: {
    label: "Interviews", 
    color: "hsl(var(--accent))",
  },
};

export function WeeklyActivityChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-sm text-gray-600">Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <span className="text-sm text-gray-600">Interviews</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ChartContainer config={chartConfig}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="interviews" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}

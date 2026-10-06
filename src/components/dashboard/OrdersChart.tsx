import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ordersChartData } from "../../data/dummyData";
import { Card } from "../ui/Card";

export function OrdersChart() {
  return (
    <Card className="p-5">
      <div className="mb-6">
        <p className="text-xs text-slate-400">Orders</p>

        <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">
          1,284
        </h3>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ordersChartData}>
            <CartesianGrid
              stroke="currentColor"
              strokeOpacity={0.06}
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#94a3b8",
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(34,211,238,.05)",
              }}
              contentStyle={{
                background: "#111718",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Bar
              dataKey="orders"
              fill="#22d3ee"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
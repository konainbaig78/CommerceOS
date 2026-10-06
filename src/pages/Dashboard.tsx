import { ArrowUpRight } from "lucide-react";
import { stats } from "../data/dummyData";
import { AIInsight } from "../components/dashboard/AIInsight";
import { OrdersChart } from "../components/dashboard/OrdersChart";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { StatCard } from "../components/dashboard/StatCard";
import { TopProducts } from "../components/dashboard/TopProducts";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-500">
            Overview
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Good afternoon, Alex.
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your store.
          </p>
        </div>

        <button className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-slate-200">
          Last 7 days
          <ArrowUpRight size={15} />
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            stat={stat}
            index={index}
          />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <AIInsight />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <OrdersChart />
        <TopProducts />
      </section>

      <RecentOrders />
    </div>
  );
}
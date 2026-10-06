import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { AIInsight } from "../components/dashboard/AIInsight";
import { OrdersChart } from "../components/dashboard/OrdersChart";
import { RecentOrders } from "../components/dashboard/RecentOrders";
import { RevenueChart } from "../components/dashboard/RevenueChart";
import { StatCard } from "../components/dashboard/StatCard";
import { TopProducts } from "../components/dashboard/TopProducts";

import { api } from "../lib/api";

import type {
  DashboardOrderPoint,
  DashboardRecentOrder,
  DashboardRevenuePoint,
  DashboardSummary,
  DashboardTopProduct,
} from "../types";

type DateRange = "7d" | "30d" | "90d";

export default function Dashboard() {
  const [range, setRange] =
    useState<DateRange>("7d");

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [revenue, setRevenue] = useState<
    DashboardRevenuePoint[]
  >([]);

  const [orders, setOrders] = useState<
    DashboardOrderPoint[]
  >([]);

  const [topProducts, setTopProducts] = useState<
    DashboardTopProduct[]
  >([]);

  const [recentOrders, setRecentOrders] = useState<
    DashboardRecentOrder[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        summaryResponse,
        revenueResponse,
        ordersResponse,
        productsResponse,
        recentOrdersResponse,
      ] = await Promise.all([
        api.get<DashboardSummary>(
          "/api/dashboard/summary",
          { range },
        ),

        api.get<DashboardRevenuePoint[]>(
          "/api/dashboard/revenue",
          { range },
        ),

        api.get<DashboardOrderPoint[]>(
          "/api/dashboard/orders",
          { range },
        ),

        api.get<DashboardTopProduct[]>(
          "/api/dashboard/top-products",
          { range },
        ),

        api.get<DashboardRecentOrder[]>(
          "/api/dashboard/recent-orders",
          { limit: 5 },
        ),
      ]);

      setSummary(summaryResponse.data);

      setRevenue(
        revenueResponse.data ?? [],
      );

      setOrders(
        ordersResponse.data ?? [],
      );

      setTopProducts(
        productsResponse.data ?? [],
      );

      setRecentOrders(
        recentOrdersResponse.data ?? [],
      );
    } catch (err) {
      console.error(
        "Dashboard API error:",
        err,
      );

      setError(
        "Unable to load dashboard data. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [range]);

  const formatChange = (
    value: number | null,
  ) => {
    if (value === null) {
      return "—";
    }

    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const stats = summary
    ? [
        {
          title: "Total revenue",
          value: `$${summary.totalRevenue.value.toLocaleString()}`,
          change: formatChange(
            summary.totalRevenue.changePercent,
          ),
          trend:
            (summary.totalRevenue.changePercent ?? 0) >= 0
              ? ("up" as const)
              : ("down" as const),
        },

        {
          title: "Total orders",
          value:
            summary.totalOrders.value.toLocaleString(),
          change: formatChange(
            summary.totalOrders.changePercent,
          ),
          trend:
            (summary.totalOrders.changePercent ?? 0) >= 0
              ? ("up" as const)
              : ("down" as const),
        },

        {
          title: "Customers",
          value:
            summary.totalCustomers.value.toLocaleString(),
          change: formatChange(
            summary.totalCustomers.changePercent,
          ),
          trend:
            (summary.totalCustomers.changePercent ?? 0) >= 0
              ? ("up" as const)
              : ("down" as const),
        },

        {
          title: "Conversion rate",
          value: `${summary.conversionRate.value.toFixed(1)}%`,
          change: formatChange(
            summary.conversionRate.changePercent,
          ),
          trend:
            (summary.conversionRate.changePercent ?? 0) >= 0
              ? ("up" as const)
              : ("down" as const),
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-500">
            Overview
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Good afternoon.
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your store.
          </p>
        </div>

        <select
          value={range}
          onChange={(event) =>
            setRange(
              event.target.value as DateRange,
            )
          }
          className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none dark:border-white/[0.07] dark:bg-white/[0.03] dark:text-slate-200"
        >
          <option value="7d">
            Last 7 days
          </option>

          <option value="30d">
            Last 30 days
          </option>

          <option value="90d">
            Last 90 days
          </option>
        </select>
      </section>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadDashboard}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-500/10"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-[155px] animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]"
                />
              ),
            )
          : stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                stat={stat}
                index={index}
              />
            ))}
      </section>

      {/* =====================================================
          REVENUE + AI
      ===================================================== */}

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <RevenueChart
          data={revenue}
          loading={loading}
        />

        <AIInsight />
      </section>

      {/* =====================================================
          ORDERS + PRODUCTS
      ===================================================== */}

      <section className="grid gap-4 xl:grid-cols-2">
        <OrdersChart
          data={orders}
          loading={loading}
        />

        <TopProducts
          products={topProducts}
          loading={loading}
        />
      </section>

      {/* =====================================================
          RECENT ORDERS
      ===================================================== */}

      <RecentOrders
        orders={recentOrders}
        loading={loading}
      />
    </div>
  );
}
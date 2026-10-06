import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "../components/ui/Card";
import { api } from "../lib/api";

type DateRange = "7d" | "30d" | "90d" | "1y";

interface AnalyticsPeriod {
  range: string;
  from: string;
  to: string;
  interval: string;
}

interface ComparisonMetric {
  value: number;
  previousValue: number;
  changePercent: number | null;
}

interface AnalyticsOverview {
  revenue: ComparisonMetric;
  orders: ComparisonMetric;
  completedOrders: ComparisonMetric;
  averageOrderValue: ComparisonMetric;
  unitsSold: ComparisonMetric;
  totalCustomers: ComparisonMetric;
  newCustomers: ComparisonMetric;
  purchasingCustomers: ComparisonMetric;
  revenuePerCustomer: ComparisonMetric;
  conversionRate: ComparisonMetric;
  sessions: ComparisonMetric;
  visitors: ComparisonMetric;
  retentionRate: ComparisonMetric;
  returningCustomerRate: ComparisonMetric;
  repeatPurchaseRate: ComparisonMetric;
}

interface RevenuePoint {
  date: string;
  revenue: number;
  completedOrders: number;
  averageOrderValue: number;
  unitsSold: number;
}

interface CustomerPoint {
  date: string;
  newCustomers: number;
  totalCustomers: number;
  activeCustomers: number;
  revenuePerCustomer: number;
}

interface CategoryPoint {
  categoryId: string;
  name: string;
  revenue: number;
  unitsSold: number;
  ordersCount: number;
  sharePercent: number;
}

interface Store {
  name: string;
  currency: string;
  timezone: string;
}

/*
 * The api.ts helper returns:
 *
 * {
 *   data: T,
 *   pagination?: Pagination
 * }
 *
 * So these interfaces describe the contents of `response.data`.
 */

interface RevenueResponse {
  period: AnalyticsPeriod;
  totals: {
    revenue: number;
    completedOrders: number;
    averageOrderValue: number;
    unitsSold: number;
  };
  series: RevenuePoint[];
}

interface CustomersResponse {
  period: AnalyticsPeriod;
  totals: {
    totalCustomers: number;
    newCustomers: number;
    growthRate: number;
    purchasingCustomers: number;
    revenuePerCustomer: number;
  };
  series: CustomerPoint[];
}

interface CategoriesResponse {
  period: AnalyticsPeriod;
  categories: CategoryPoint[];
}

interface StoreResponse {
  name: string;
  currency: string;
  timezone: string;
}

const ranges: {
  id: DateRange;
  label: string;
}[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "1y", label: "1Y" },
];

function formatCurrency(
  value: number,
  currency: string,
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function formatChange(
  change: number | null,
) {
  if (change === null) {
    return "—";
  }

  const sign = change > 0 ? "+" : "";

  return `${sign}${change.toFixed(1)}%`;
}

function formatDate(
  value: string,
  interval: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  if (interval === "month") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function LoadingCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="animate-pulse">
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-white/[0.06]" />

        <div className="mt-3 h-8 w-32 rounded bg-slate-200 dark:bg-white/[0.06]" />

        <div className="mt-3 h-3 w-20 rounded bg-slate-200 dark:bg-white/[0.06]" />
      </div>
    </Card>
  );
}

export default function Analytics() {
  const [range, setRange] =
    useState<DateRange>("30d");

  const [overview, setOverview] =
    useState<AnalyticsOverview | null>(null);

  const [revenue, setRevenue] =
    useState<RevenuePoint[]>([]);

  const [customers, setCustomers] =
    useState<CustomerPoint[]>([]);

  const [categories, setCategories] =
    useState<CategoryPoint[]>([]);

  const [period, setPeriod] =
    useState<AnalyticsPeriod | null>(null);

  const [currency, setCurrency] =
    useState("USD");

  const [store, setStore] =
    useState<Store | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * Used by Retry.
   *
   * Changing this value forces the effect to run again.
   */
  const [reloadKey, setReloadKey] =
    useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const [
          overviewResponse,
          revenueResponse,
          customersResponse,
          categoriesResponse,
          storeResponse,
        ] = await Promise.all([
          api.get<AnalyticsOverview>(
            "/api/analytics/overview",
            { range },
          ),

          api.get<RevenueResponse>(
            "/api/analytics/revenue",
            { range },
          ),

          api.get<CustomersResponse>(
            "/api/analytics/customers",
            { range },
          ),

          api.get<CategoriesResponse>(
            "/api/analytics/categories",
            { range },
          ),

          api.get<StoreResponse>(
            "/api/store",
          ),
        ]);

        if (cancelled) {
          return;
        }

        /*
         * IMPORTANT:
         *
         * api.get() already unwraps the backend response
         * into:
         *
         * response.data
         *
         * Therefore:
         *
         * overviewResponse.data
         * revenueResponse.data.series
         * customersResponse.data.series
         * categoriesResponse.data.categories
         */

        setOverview(
          overviewResponse.data,
        );

        setRevenue(
          revenueResponse.data.series ?? [],
        );

        setCustomers(
          customersResponse.data.series ?? [],
        );

        setCategories(
          categoriesResponse.data.categories ?? [],
        );

        /*
         * `period` belongs inside the analytics endpoint's
         * data object.
         */
        setPeriod(
          revenueResponse.data.period,
        );

        setStore(
          storeResponse.data,
        );

        setCurrency(
          storeResponse.data.currency || "USD",
        );
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load analytics:",
          err,
        );

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Unable to load analytics data.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [range, reloadKey]);

  const dateInterval =
    period?.interval ?? "day";

  const revenueChartData = revenue.map(
    (item) => ({
      ...item,
      label: formatDate(
        item.date,
        dateInterval,
      ),
    }),
  );

  const customerChartData =
    customers.map((item) => ({
      ...item,
      label: formatDate(
        item.date,
        dateInterval,
      ),
    }));

  /*
   * -------------------------
   * ERROR STATE
   * -------------------------
   */

  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
            Intelligence
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Understand what's driving your business.
          </p>
        </div>

        <Card className="p-8">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              !
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              Couldn't load analytics
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setReloadKey(
                  (value) => value + 1,
                )
              }
              className="mt-5 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Try again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  /*
   * -------------------------
   * MAIN PAGE
   * -------------------------
   */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
            Intelligence
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Understand what's driving your business.
          </p>

          {period && (
            <p className="mt-2 text-xs text-slate-400">
              {new Date(
                period.from,
              ).toLocaleDateString()}{" "}
              –{" "}
              {new Date(
                period.to,
              ).toLocaleDateString()}
            </p>
          )}

          {store && (
            <p className="mt-1 text-xs text-slate-400">
              {store.name}
            </p>
          )}
        </div>

        {/* Date range */}
        <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.02]">
          {ranges.map((item) => {
            const active =
              range === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setRange(item.id)
                }
                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Cards */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="p-5">
            <p className="text-xs text-slate-400">
              Conversion rate
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {formatPercent(
                overview?.conversionRate
                  .value ?? 0,
              )}
            </p>

            <p className="mt-2 text-xs text-emerald-500">
              {formatChange(
                overview?.conversionRate
                  .changePercent ?? null,
              )}{" "}
              vs previous period
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-slate-400">
              Customer retention
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {formatPercent(
                overview?.retentionRate
                  .value ?? 0,
              )}
            </p>

            <p className="mt-2 text-xs text-emerald-500">
              {formatChange(
                overview?.retentionRate
                  .changePercent ?? null,
              )}{" "}
              vs previous period
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-slate-400">
              Revenue per customer
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {formatCurrency(
                overview?.revenuePerCustomer
                  .value ?? 0,
                currency,
              )}
            </p>

            <p className="mt-2 text-xs text-emerald-500">
              {formatChange(
                overview?.revenuePerCustomer
                  .changePercent ?? null,
              )}{" "}
              vs previous period
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-xs text-slate-400">
              Average order value
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {formatCurrency(
                overview?.averageOrderValue
                  .value ?? 0,
                currency,
              )}
            </p>

            <p className="mt-2 text-xs text-emerald-500">
              {formatChange(
                overview?.averageOrderValue
                  .changePercent ?? null,
              )}{" "}
              vs previous period
            </p>
          </Card>
        </div>
      )}

      {/* Revenue */}
      <Card className="p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-xs text-slate-400">
            Revenue
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Revenue over time
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Completed-order revenue for the selected period.
          </p>
        </div>

        <div className="h-[320px]">
          {loading ? (
            <div className="h-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.03]" />
          ) : revenueChartData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No revenue data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={revenueChartData}
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#22d3ee"
                      stopOpacity={0.3}
                    />

                    <stop
                      offset="100%"
                      stopColor="#22d3ee"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
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
                  tickFormatter={(value) =>
                    formatCurrency(
                      Number(value),
                      currency,
                    )
                  }
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#111718",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    formatCurrency(
                      Number(value),
                      currency,
                    ),
                    "Revenue",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Customer Growth */}
      <Card className="p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-xs text-slate-400">
            Customers
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Customer acquisition
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            New customers added during the selected period.
          </p>
        </div>

        <div className="h-[320px]">
          {loading ? (
            <div className="h-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.03]" />
          ) : customerChartData.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No customer data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={customerChartData}
              >
                <defs>
                  <linearGradient
                    id="customerGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#8b5cf6"
                      stopOpacity={0.28}
                    />

                    <stop
                      offset="100%"
                      stopColor="#8b5cf6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
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
                  contentStyle={{
                    background:
                      "#111718",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    Number(value),
                    "New customers",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="newCustomers"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#customerGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Category Revenue */}
      <Card className="p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-xs text-slate-400">
            Categories
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            Revenue by category
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Categories ranked by completed-order revenue.
          </p>
        </div>

        <div className="h-[320px]">
          {loading ? (
            <div className="h-full animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.03]" />
          ) : categories.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No category data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={categories}
                layout="vertical"
                margin={{
                  left: 20,
                  right: 20,
                }}
              >
                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94a3b8",
                  }}
                  tickFormatter={(value) =>
                    formatCurrency(
                      Number(value),
                      currency,
                    )
                  }
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 11,
                    fill: "#94a3b8",
                  }}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#111718",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  formatter={(value) => [
                    formatCurrency(
                      Number(value),
                      currency,
                    ),
                    "Revenue",
                  ]}
                />

                <Bar
                  dataKey="revenue"
                  fill="#22d3ee"
                  radius={[
                    0,
                    6,
                    6,
                    0,
                  ]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
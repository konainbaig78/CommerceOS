import { ArrowUpRight } from "lucide-react";

import type { DashboardRecentOrder } from "../../types";

import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface RecentOrdersProps {
  orders: DashboardRecentOrder[];
  loading: boolean;
}

export function RecentOrders({
  orders,
  loading,
}: RecentOrdersProps) {
  return (
    <Card className="overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-white/[0.06]">
        <div>
          <p className="text-xs text-slate-400">
            Commerce
          </p>

          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
            Recent orders
          </h3>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400"
        >
          View all
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-4 p-5">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <div
                key={index}
                className="flex items-center gap-4"
              >
                <div className="h-4 w-20 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />

                <div className="h-4 flex-1 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />

                <div className="h-4 w-20 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />
              </div>
            ),
          )}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center text-sm text-slate-400">
          No recent orders.
        </div>
      ) : (
        /* Table */

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400 dark:border-white/[0.06]">
                <th className="px-5 py-3 font-medium">
                  Order
                </th>

                <th className="px-5 py-3 font-medium">
                  Customer
                </th>

                <th className="px-5 py-3 font-medium">
                  Amount
                </th>

                <th className="px-5 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map(
                (order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/[0.04]"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {order.orderNumber}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {order.customer}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                      $
                      {order.total.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        status={order.status}
                      />
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
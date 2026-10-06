import { ArrowUpRight } from "lucide-react";

import type { DashboardTopProduct } from "../../types";

import { Card } from "../ui/Card";

interface TopProductsProps {
  products: DashboardTopProduct[];
  loading: boolean;
}

export function TopProducts({
  products,
  loading,
}: TopProductsProps) {
  return (
    <Card className="p-5">
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Performance
          </p>

          <h3 className="mt-1 font-semibold text-slate-900 dark:text-white">
            Top products
          </h3>
        </div>

        <ArrowUpRight
          size={16}
          className="text-slate-400"
        />
      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100 dark:bg-white/[0.05]" />

                <div className="flex-1">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />

                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-100 dark:bg-white/[0.05]" />
                </div>
              </div>
            ),
          )}
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[180px] items-center justify-center text-sm text-slate-400">
          No product data available.
        </div>
      ) : (
        <div className="space-y-4">
          {products.slice(0, 4).map(
            (product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3"
              >
                {/* Rank */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-white/[0.05] dark:text-slate-300">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </div>

                {/* Product */}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                    {product.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    {product.unitsSold.toLocaleString()}{" "}
                    sold
                  </p>
                </div>

                {/* Revenue */}

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  $
                  {product.revenue.toLocaleString()}
                </p>
              </div>
            ),
          )}
        </div>
      )}
    </Card>
  );
}
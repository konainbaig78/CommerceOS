import { ArrowUpRight } from "lucide-react";

import { products } from "../../data/dummyData";
import { Card } from "../ui/Card";

export function TopProducts() {
  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

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

      {/* Products */}
      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-3"
          >
            {/* Rank */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500 dark:bg-white/[0.05] dark:text-slate-300">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Product info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                {product.name}
              </p>

              <p className="text-xs text-slate-400">
                {product.sales.toLocaleString()} sold
              </p>
            </div>

            {/* Price */}
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
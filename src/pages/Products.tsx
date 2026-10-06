import { Package, Search } from "lucide-react";
import { useState } from "react";
import { products } from "../data/dummyData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
            Inventory
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track products, inventory and performance.
          </p>
        </div>

        <Button variant="primary">
          <Package size={16} />
          Add product
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row dark:border-white/[0.06]">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-400 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white"
            />
          </div>

          <Button>Category</Button>
          <Button>Stock</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400 dark:border-white/[0.06]">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Sold</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus =
                  product.stock === 0
                    ? "Out of Stock"
                    : product.stock < 25
                      ? "Low Stock"
                      : "In Stock";

                return (
                  <tr
                    key={product.id}
                    className="border-b border-slate-100 dark:border-white/[0.04]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/[0.05]">
                          <Package
                            size={17}
                            className="text-slate-400"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {product.price}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {product.stock}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {product.sales.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <Badge status={stockStatus} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
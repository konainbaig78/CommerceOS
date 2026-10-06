import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { orders } from "../data/dummyData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Orders() {
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order.customer
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
          Commerce
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monitor every order across your store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total orders", "1,284"],
          ["Processing", "184"],
          ["Completed", "1,024"],
        ].map(([label, value]) => (
          <Card key={label} className="p-5">
            <p className="text-xs text-slate-400">{label}</p>

            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              {value}
            </p>
          </Card>
        ))}
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
              placeholder="Search orders..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-400 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white"
            />
          </div>

          <Button>Status</Button>
          <Button>Date</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400 dark:border-white/[0.06]">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 dark:border-white/[0.04]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart
                        size={15}
                        className="text-cyan-500"
                      />

                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {order.id}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {order.customer}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {order.amount}
                  </td>

                  <td className="px-5 py-4">
                    <Badge status={order.status} />
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
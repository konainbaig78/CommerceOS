import { Search, UserPlus } from "lucide-react";
import { useState } from "react";
import { customers } from "../data/dummyData";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Customers() {
  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-500">
            CRM
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage and understand your customer base.
          </p>
        </div>

        <Button variant="primary">
          <UserPlus size={16} />
          Add customer
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
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-400 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white"
            />
          </div>

          <Button>Filter</Button>
          <Button>Export</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400 dark:border-white/[0.06]">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Total spent</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => {
                const initials = customer.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-white/[0.04] dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                          {initials}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {customer.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {customer.orders}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                      {customer.spent}
                    </td>

                    <td className="px-5 py-4">
                      <Badge status={customer.status} />
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
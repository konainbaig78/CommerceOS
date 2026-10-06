import type { OrderStatus, CustomerStatus } from "../../types";

interface BadgeProps {
  status: OrderStatus | CustomerStatus | string;
}

export function Badge({ status }: BadgeProps) {
  const styles: Record<string, string> = {
    // Order statuses
    Completed:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    Processing:
      "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",

    Pending:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",

    Cancelled:
      "bg-red-500/10 text-red-600 dark:text-red-400",

    // Customer statuses
    Active:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    Inactive:
      "bg-slate-500/10 text-slate-500 dark:text-slate-400",

    // Product statuses
    "In Stock":
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",

    "Low Stock":
      "bg-amber-500/10 text-amber-600 dark:text-amber-400",

    "Out of Stock":
      "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  const badgeStyle =
    styles[status] ??
    "bg-slate-500/10 text-slate-500 dark:text-slate-400";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyle}`}
    >
      {status}
    </span>
  );
}
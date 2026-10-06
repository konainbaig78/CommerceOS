// src/data/dummyData.ts

import type {
  Customer,
  Product,
  Order,
  Stat,
  RevenueData,
  OrderChartData,
  AIInsight,
  CustomerGrowthData,
  CategoryData,
} from "../types";

// ─────────────────────────────────────────────
// Dashboard Stats
// ─────────────────────────────────────────────

export const stats: Stat[] = [
  {
    title: "Total Revenue",
    value: "$128,430",
    change: "+18.4%",
    trend: "up",
  },
  {
    title: "Total Orders",
    value: "2,847",
    change: "+12.8%",
    trend: "up",
  },
  {
    title: "Customers",
    value: "8,492",
    change: "+9.6%",
    trend: "up",
  },
  {
    title: "Conversion Rate",
    value: "4.82%",
    change: "+0.7%",
    trend: "up",
  },
];

// ─────────────────────────────────────────────
// Revenue Chart
// ─────────────────────────────────────────────

export const revenueData: RevenueData[] = [
  { day: "Mon", revenue: 8200 },
  { day: "Tue", revenue: 10400 },
  { day: "Wed", revenue: 9100 },
  { day: "Thu", revenue: 12800 },
  { day: "Fri", revenue: 14500 },
  { day: "Sat", revenue: 17800 },
  { day: "Sun", revenue: 15600 },
];

// ─────────────────────────────────────────────
// Orders Chart
// ─────────────────────────────────────────────

export const ordersChartData: OrderChartData[] = [
  { day: "Mon", orders: 320 },
  { day: "Tue", orders: 410 },
  { day: "Wed", orders: 365 },
  { day: "Thu", orders: 480 },
  { day: "Fri", orders: 530 },
  { day: "Sat", orders: 610 },
  { day: "Sun", orders: 531 },
];

// ─────────────────────────────────────────────
// Customer Growth Analytics
// ─────────────────────────────────────────────

export const customerGrowthData: CustomerGrowthData[] = [
  {
    month: "Jan",
    customers: 4200,
  },
  {
    month: "Feb",
    customers: 4650,
  },
  {
    month: "Mar",
    customers: 5120,
  },
  {
    month: "Apr",
    customers: 5680,
  },
  {
    month: "May",
    customers: 6410,
  },
  {
    month: "Jun",
    customers: 7290,
  },
  {
    month: "Jul",
    customers: 8492,
  },
];

// ─────────────────────────────────────────────
// Revenue by Category Analytics
// ─────────────────────────────────────────────

export const categoryData: CategoryData[] = [
  {
    category: "Electronics",
    revenue: 48200,
  },
  {
    category: "Wearables",
    revenue: 29600,
  },
  {
    category: "Accessories",
    revenue: 21400,
  },
  {
    category: "Furniture",
    revenue: 16800,
  },
  {
    category: "Storage",
    revenue: 12400,
  },
];

// ─────────────────────────────────────────────
// Customers
// ─────────────────────────────────────────────

export const customers: Customer[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    orders: 24,
    spent: "$2,840",
    status: "Active",
  },
  {
    id: 2,
    name: "Sophia Williams",
    email: "sophia@example.com",
    orders: 18,
    spent: "$2,140",
    status: "Active",
  },
  {
    id: 3,
    name: "Liam Anderson",
    email: "liam@example.com",
    orders: 15,
    spent: "$1,890",
    status: "Active",
  },
  {
    id: 4,
    name: "Noah Wilson",
    email: "noah@example.com",
    orders: 11,
    spent: "$1,420",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Martinez",
    email: "emma@example.com",
    orders: 31,
    spent: "$4,280",
    status: "Active",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    email: "olivia@example.com",
    orders: 9,
    spent: "$980",
    status: "Active",
  },
  {
    id: 7,
    name: "Ethan Brown",
    email: "ethan@example.com",
    orders: 21,
    spent: "$2,760",
    status: "Active",
  },
  {
    id: 8,
    name: "Mia Davis",
    email: "mia@example.com",
    orders: 7,
    spent: "$740",
    status: "Inactive",
  },
];

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal Wireless Headphones",
    category: "Electronics",
    price: "$129",
    stock: 84,
    sales: 1240,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: "Wearables",
    price: "$249",
    stock: 42,
    sales: 980,
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: "$149",
    stock: 67,
    sales: 764,
  },
  {
    id: 4,
    name: "Ultra HD Monitor",
    category: "Electronics",
    price: "$399",
    stock: 23,
    sales: 621,
  },
  {
    id: 5,
    name: "Ergonomic Desk Chair",
    category: "Furniture",
    price: "$329",
    stock: 18,
    sales: 512,
  },
  {
    id: 6,
    name: "Portable SSD 1TB",
    category: "Storage",
    price: "$99",
    stock: 91,
    sales: 486,
  },
];

// ─────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────

export const orders: Order[] = [
  {
    id: "#ORD-10482",
    customer: "Emma Martinez",
    amount: "$428.00",
    status: "Completed",
    date: "Oct 06, 2026",
  },
  {
    id: "#ORD-10481",
    customer: "Aarav Sharma",
    amount: "$249.00",
    status: "Processing",
    date: "Oct 06, 2026",
  },
  {
    id: "#ORD-10480",
    customer: "Sophia Williams",
    amount: "$129.00",
    status: "Completed",
    date: "Oct 05, 2026",
  },
  {
    id: "#ORD-10479",
    customer: "Liam Anderson",
    amount: "$548.00",
    status: "Pending",
    date: "Oct 05, 2026",
  },
  {
    id: "#ORD-10478",
    customer: "Ethan Brown",
    amount: "$399.00",
    status: "Completed",
    date: "Oct 04, 2026",
  },
  {
    id: "#ORD-10477",
    customer: "Olivia Taylor",
    amount: "$198.00",
    status: "Processing",
    date: "Oct 04, 2026",
  },
];

// ─────────────────────────────────────────────
// AI Insights
// ─────────────────────────────────────────────

export const aiInsights: AIInsight[] = [
  {
    id: 1,
    type: "opportunity",
    title: "Revenue opportunity",
    description:
      "Electronics sales are up 24% this week. Increasing inventory for your top products could prevent stockouts.",
  },
  {
    id: 2,
    type: "warning",
    title: "Inventory alert",
    description:
      "Ultra HD Monitor is running low with only 23 units remaining. Current sales velocity suggests a stockout within 9 days.",
  },
  {
    id: 3,
    type: "insight",
    title: "Customer trend",
    description:
      "Returning customers generated 68% of this week's revenue, indicating strong customer retention.",
  },
];
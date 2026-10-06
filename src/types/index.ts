export type CustomerStatus = "Active" | "Inactive";

export type ThemeMode = "light" | "dark" | "system";

export type OrderStatus =
  | "Completed"
  | "Processing"
  | "Pending"
  | "Cancelled";

export type AIInsightType =
  | "opportunity"
  | "warning"
  | "insight";

export interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface RevenueData {
  day: string;
  revenue: number;
}

export interface OrderChartData {
  day: string;
  orders: number;
}

export interface CustomerGrowthData {
  month: string;
  customers: number;
}

export interface CategoryData {
  category: string;
  revenue: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: string;
  status: CustomerStatus;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  sales: number;
}

export interface Order {
  id: string;
  customer: string;
  amount: string;
  status: OrderStatus;
  date: string;
}

export interface AIInsight {
  id: number;
  type: AIInsightType;
  title: string;
  description: string;
}
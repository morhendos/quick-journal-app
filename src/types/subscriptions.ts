export type BillingPeriod = 'monthly' | 'yearly' | 'weekly' | 'quarterly';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billingPeriod: BillingPeriod;
  startDate: string; // ISO date string
  description?: string;
  nextBillingDate?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface SubscriptionFormData {
  name: string;
  price: number;
  billingPeriod: BillingPeriod;
  startDate: string;
  description?: string;
}

export interface SubscriptionSummary {
  totalMonthly: number;
  totalYearly: number;
  totalWeekly: number;
  totalQuarterly: number;
  grandTotalMonthly: number; // All subscriptions converted to monthly rate
}
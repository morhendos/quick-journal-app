import { Currency, EXCHANGE_RATES } from '@/types/subscriptions';

export function formatCurrency(amount: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function convertToEur(amount: number, fromCurrency: Currency): number {
  if (fromCurrency === 'EUR') return amount;
  return amount * EXCHANGE_RATES[fromCurrency];
}

export function convertFromEur(amount: number, toCurrency: Currency): number {
  if (toCurrency === 'EUR') return amount;
  return amount / EXCHANGE_RATES[toCurrency];
}
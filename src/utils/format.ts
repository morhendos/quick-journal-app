import { Currency, EXCHANGE_RATES } from '@/types/subscriptions';

const CURRENCY_LOCALES: Record<Currency, string> = {
  EUR: 'de-DE', // German locale for Euro
  USD: 'en-US', // US locale for USD
  PLN: 'pl-PL'  // Polish locale for PLN
};

export function formatCurrency(amount: number, currency: Currency): string {
  if (!amount) return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: 'currency',
    currency: currency
  }).format(0);

  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
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
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Subscription, SubscriptionFormData, SubscriptionSummary } from '@/types/subscriptions';

const STORAGE_KEY = 'subscriptions';

export function useSubscriptionStorage() {
  const [subscriptions, setSubscriptions] = useLocalStorage<Subscription[]>(STORAGE_KEY, []);

  const addSubscription = (data: SubscriptionFormData): Subscription => {
    const newSubscription: Subscription = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      nextBillingDate: calculateNextBillingDate(data.startDate, data.billingPeriod)
    };

    setSubscriptions(current => [...current, newSubscription]);
    return newSubscription;
  };

  const updateSubscription = (id: string, data: Partial<SubscriptionFormData>) => {
    setSubscriptions(current =>
      current.map(sub =>
        sub.id === id
          ? {
              ...sub,
              ...data,
              updatedAt: new Date().toISOString(),
              nextBillingDate: data.startDate || data.billingPeriod
                ? calculateNextBillingDate(data.startDate || sub.startDate, data.billingPeriod || sub.billingPeriod)
                : sub.nextBillingDate
            }
          : sub
      )
    );
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(current => current.filter(sub => sub.id !== id));
  };

  const calculateSummary = (): SubscriptionSummary => {
    const summary = subscriptions.reduce(
      (acc, sub) => {
        const { price, billingPeriod } = sub;
        switch (billingPeriod) {
          case 'monthly':
            acc.totalMonthly += price;
            acc.grandTotalMonthly += price;
            break;
          case 'yearly':
            acc.totalYearly += price;
            acc.grandTotalMonthly += price / 12;
            break;
          case 'weekly':
            acc.totalWeekly += price;
            acc.grandTotalMonthly += price * 4.33; // Average weeks per month
            break;
          case 'quarterly':
            acc.totalQuarterly += price;
            acc.grandTotalMonthly += price / 3;
            break;
        }
        return acc;
      },
      {
        totalMonthly: 0,
        totalYearly: 0,
        totalWeekly: 0,
        totalQuarterly: 0,
        grandTotalMonthly: 0
      }
    );

    // Round all values to 2 decimal places
    return Object.fromEntries(
      Object.entries(summary).map(([key, value]) => [key, Math.round(value * 100) / 100])
    ) as SubscriptionSummary;
  };

  return {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    calculateSummary
  };
}

function calculateNextBillingDate(startDate: string, billingPeriod: string): string {
  const date = new Date(startDate);
  const today = new Date();
  
  // If start date is in the future, that's the next billing date
  if (date > today) {
    return date.toISOString();
  }

  // Calculate how many periods have passed
  const timeDiff = today.getTime() - date.getTime();
  let periodInMs: number;

  switch (billingPeriod) {
    case 'weekly':
      periodInMs = 7 * 24 * 60 * 60 * 1000;
      break;
    case 'monthly':
      periodInMs = 30 * 24 * 60 * 60 * 1000;
      break;
    case 'quarterly':
      periodInMs = 90 * 24 * 60 * 60 * 1000;
      break;
    case 'yearly':
      periodInMs = 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      return date.toISOString();
  }

  const periodsElapsed = Math.ceil(timeDiff / periodInMs);
  const nextBillingDate = new Date(date.getTime() + (periodsElapsed * periodInMs));

  return nextBillingDate.toISOString();
}
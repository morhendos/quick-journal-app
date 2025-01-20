'use client';

import { SubscriptionSummary as Summary } from '@/types/subscriptions';
import { formatCurrency } from '@/utils/format';

interface SubscriptionSummaryProps {
  summary: Summary;
}

export function SubscriptionSummary({ summary }: SubscriptionSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Monthly"
          amount={summary.totalMonthly}
          period="per month"
        />
        <SummaryCard
          title="Yearly"
          amount={summary.totalYearly}
          period="per year"
        />
        <SummaryCard
          title="Weekly"
          amount={summary.totalWeekly}
          period="per week"
        />
        <SummaryCard
          title="Quarterly"
          amount={summary.totalQuarterly}
          period="per quarter"
        />
      </div>

      <div className="bg-accent/10 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium journal-text mb-2">
          Total Monthly Spending
        </h3>
        <p className="text-2xl font-semibold text-accent">
          {formatCurrency(summary.grandTotalMonthly)}
        </p>
        <p className="text-sm text-ink/60 mt-1">
          All subscriptions converted to monthly rate
        </p>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  amount: number;
  period: string;
}

function SummaryCard({ title, amount, period }: SummaryCardProps) {
  return (
    <div className="bg-paper border border-border rounded-lg p-4">
      <h4 className="text-sm font-medium text-ink/60 mb-1">{title}</h4>
      <p className="text-xl font-semibold journal-text">{formatCurrency(amount)}</p>
      <p className="text-sm text-ink/60">{period}</p>
    </div>
  );
}
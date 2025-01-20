'use client';

import { useState } from 'react';
import { BillingPeriod, SubscriptionFormData } from '@/types/subscriptions';
import { X, Save, Plus } from 'lucide-react';

interface SubscriptionFormProps {
  onSubmit: (data: SubscriptionFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<SubscriptionFormData>;
  submitLabel?: string;
}

const BILLING_PERIODS: { value: BillingPeriod; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'quarterly', label: 'Quarterly' }
];

export function SubscriptionForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel = 'Add Subscription'
}: SubscriptionFormProps) {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    billingPeriod: initialData?.billingPeriod || 'monthly',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    description: initialData?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClassName = "flex h-10 w-full rounded-md border border-input bg-paper px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink/90 journal-text">
          Service Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className={inputClassName}
          placeholder="Netflix, Spotify, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-ink/90 journal-text">
            Price
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            min="0"
            step="0.01"
            className={inputClassName}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-ink/90 journal-text">
            Billing Period
          </label>
          <select
            value={formData.billingPeriod}
            onChange={(e) => setFormData({ ...formData, billingPeriod: e.target.value as BillingPeriod })}
            required
            className={inputClassName}
          >
            {BILLING_PERIODS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink/90 journal-text">
          Start Date
        </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
          className={inputClassName}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-ink/90 journal-text">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className={`min-h-[80px] ${inputClassName}`}
          placeholder="Add any notes about this subscription..."
        />
      </div>

      <div className="flex gap-4 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-paper text-ink/70 hover:text-ink
              py-3 px-6 rounded-md transition-all duration-200 
              flex items-center justify-center gap-2 group journal-text journal-button"
          >
            <X size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
            <span>Cancel</span>
          </button>
        )}
        <button 
          type="submit"
          className="flex-1 bg-accent/10 text-accent hover:bg-accent/15
            py-3 px-6 rounded-md transition-all duration-200
            flex items-center justify-center gap-2 group journal-text journal-button"
        >
          {initialData ? (
            <>
              <Save size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Plus size={18} className="group-hover:scale-105 transition-transform" strokeWidth={1.5} />
              <span>{submitLabel}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
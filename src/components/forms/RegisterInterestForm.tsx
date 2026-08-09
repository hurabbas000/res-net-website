import { useState, type FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { FormField, FormStatus, inputClass } from '@/components/ui/Accordion';

interface Errors {
  name?: string;
  email?: string;
}

export function RegisterInterestForm({ programTitle }: { programTitle: string }) {
  const [form, setForm] = useState({ name: '', email: '', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('program_interest').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        program: programTitle,
        notes: form.notes.trim() || null,
      });
      if (error) throw error;
      setStatus({
        type: 'success',
        message: 'Interest registered! We will email you with enrollment details for the next cohort.',
      });
      setForm({ name: '', email: '', notes: '' });
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 px-4 py-3 text-sm text-brand-700 dark:text-brand-300 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <span>Registering interest for: <strong>{programTitle}</strong></span>
      </div>
      <FormField label="Your Name" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Dr. Jane Doe"
          className={inputClass}
          disabled={loading}
        />
      </FormField>
      <FormField label="Email Address" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className={inputClass}
          disabled={loading}
        />
      </FormField>
      <FormField label="Notes (optional)">
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Any questions or preferences for cohort timing?"
          rows={3}
          className={`${inputClass} resize-none`}
          disabled={loading}
        />
      </FormField>
      {status && <FormStatus type={status.type} message={status.message} />}
      <Button type="submit" variant="accent" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Register Interest'}
      </Button>
    </form>
  );
}

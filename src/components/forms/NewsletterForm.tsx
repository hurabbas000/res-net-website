import { useState, type FormEvent } from 'react';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { FormStatus } from '@/components/ui/Accordion';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email: trimmed });
      if (error) {
        if (error.code === '23505') {
          setStatus({ type: 'success', message: "You're already subscribed — thank you!" });
          setEmail('');
        } else {
          throw error;
        }
      } else {
        setStatus({ type: 'success', message: 'Subscribed! Check your inbox for a welcome email.' });
        setEmail('');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email us directly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="w-full rounded-xl border border-navy-200 dark:border-navy-600 bg-white dark:bg-navy-800 pl-12 pr-4 py-3 text-navy-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            aria-label="Email address"
          />
        </div>
        <Button type="submit" variant="accent" disabled={loading} className="shrink-0">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Subscribe <ArrowRight className="h-4 w-4" /></>}
        </Button>
      </div>
      {status && <FormStatus type={status.type} message={status.message} />}
    </form>
  );
}

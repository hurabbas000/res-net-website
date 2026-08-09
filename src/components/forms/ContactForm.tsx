import { useState, type FormEvent } from 'react';
import { Loader2, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { FormField, FormStatus, inputClass } from '@/components/ui/Accordion';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email.';
    if (!form.message.trim()) e.message = 'Please enter a message.';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus({ type: 'success', message: 'Message sent! We will get back to you within 48 hours.' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
      <FormField label="Message" error={errors.message}>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us how we can help..."
          rows={5}
          className={`${inputClass} resize-none`}
          disabled={loading}
        />
      </FormField>
      {status && <FormStatus type={status.type} message={status.message} />}
      <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Send Message <Send className="h-4 w-4" /></>}
      </Button>
    </form>
  );
}

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { FormField, FormStatus, inputClass } from '@/components/ui/Accordion';

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setLoading(false);

    if (signInError) {
      setError('Invalid email or password.');
      return;
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <FormField label="Email Address">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          disabled={loading}
          autoFocus
        />
      </FormField>
      <FormField label="Password">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          disabled={loading}
        />
      </FormField>
      {error && <FormStatus type="error" message={error} />}
      <Button type="submit" variant="primary" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Log In'}
      </Button>
    </form>
  );
}

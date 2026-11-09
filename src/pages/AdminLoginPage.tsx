import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { LoginForm } from '@/components/forms/LoginForm';
import { SEO } from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/context/RouterContext';

export function AdminLoginPage() {
  const { role, loading } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!loading && role === 'admin') navigate('admin');
  }, [loading, navigate, role]);

  const handleLoginSuccess = () => navigate('admin');

  return (
    <>
      <SEO title="Administrator Sign In | Res.Net" description="Sign in to the Res.Net administrator dashboard." />
      <section className="pt-32 pb-20 max-w-lg mx-auto px-4 sm:px-6">
        {loading || role === 'admin' ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          </div>
        ) : (
          <div className="rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card p-6 sm:p-8">
            <h1 className="font-heading font-bold text-2xl text-navy-700 dark:text-white">
              Administrator Sign In
            </h1>
            <p className="mt-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
              This sign-in is restricted to Res.Net administrators.
            </p>
            <LoginForm onSuccess={handleLoginSuccess} />
            <button
              type="button"
              onClick={() => navigate('home')}
              className="mt-5 text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-700 dark:hover:text-brand-200"
            >
              Return to home
            </button>
          </div>
        )}
      </section>
    </>
  );
}

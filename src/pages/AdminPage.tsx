import { useEffect, useState } from 'react';
import { Loader2, ShieldAlert, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { inputClass } from '@/components/ui/Accordion';

type TabKey = 'registrations' | 'pre' | 'post' | 'pricing';

const DATA_TABS: { key: Exclude<TabKey, 'pricing'>; label: string; table: string }[] = [
  { key: 'registrations', label: 'Workshop Registrations', table: 'workshop_registrations' },
  { key: 'pre', label: 'Pre-Workshop Responses', table: 'pre_workshop_responses' },
  { key: 'post', label: 'Post-Workshop Responses', table: 'post_workshop_responses' },
];

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  return String(value);
}

interface WorkshopRow {
  id: string;
  slug: string;
  title: string;
  early_bird_price: number;
  regular_price: number;
  early_bird_active: boolean;
  currency: string;
}

function WorkshopPricingEditor() {
  const [workshops, setWorkshops] = useState<WorkshopRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('workshops')
      .select('id, slug, title, early_bird_price, regular_price, early_bird_active, currency')
      .order('title')
      .then(({ data, error: fetchError }) => {
        if (fetchError) setError(fetchError.message);
        else setWorkshops((data as WorkshopRow[]) || []);
        setLoading(false);
      });
  }, []);

  const updateField = <K extends keyof WorkshopRow>(id: string, field: K, value: WorkshopRow[K]) => {
    setWorkshops((rows) => rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSave = async (row: WorkshopRow) => {
    setSavingId(row.id);
    setError(null);
    const { error: updateError } = await supabase
      .from('workshops')
      .update({
        early_bird_price: row.early_bird_price,
        regular_price: row.regular_price,
        early_bird_active: row.early_bird_active,
      })
      .eq('id', row.id);
    setSavingId(null);
    if (updateError) {
      setError(`Could not save "${row.title}": ${updateError.message}`);
      return;
    }
    setSavedId(row.id);
    setTimeout(() => setSavedId((current) => (current === row.id ? null : current)), 2000);
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="divide-y divide-navy-100 dark:divide-navy-700">
      {error && <p className="p-4 text-sm text-red-500">{error}</p>}
      {workshops.map((w) => (
        <div key={w.id} className="p-5 sm:p-6 grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-end">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Workshop</p>
            <p className="font-medium text-navy-700 dark:text-white">{w.title}</p>
          </div>

          <div className="w-32">
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
              Early Bird ({w.currency})
            </label>
            <input
              type="number"
              min={0}
              value={w.early_bird_price}
              onChange={(e) => updateField(w.id, 'early_bird_price', Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div className="w-32">
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
              Regular ({w.currency})
            </label>
            <input
              type="number"
              min={0}
              value={w.regular_price}
              onChange={(e) => updateField(w.id, 'regular_price', Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 pb-3">
            <input
              type="checkbox"
              checked={w.early_bird_active}
              onChange={(e) => updateField(w.id, 'early_bird_active', e.target.checked)}
              className="h-4 w-4 rounded border-navy-300 dark:border-navy-600 text-brand-600 focus:ring-brand-400"
            />
            Early bird active
          </label>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave(w)}
            disabled={savingId === w.id}
          >
            {savingId === w.id ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : savedId === w.id ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}

export function AdminPage() {
  const { user, role, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<TabKey>('registrations');
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (role !== 'admin' || tab === 'pricing') return;

    const activeTab = DATA_TABS.find((t) => t.key === tab)!;
    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from(activeTab.table)
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) setError(fetchError.message);
        else setRows(data || []);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, role]);

  // Still checking who's logged in
  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    );
  }

  // Not an admin (or not logged in at all) — RLS would block the data
  // anyway, but we check here too so the page itself explains why.
  if (!user || role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <ShieldAlert className="h-10 w-10 text-red-400 mb-4" />
        <h1 className="font-heading font-bold text-2xl text-navy-700 dark:text-white">Admins only</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
          You need to log in with an admin account to view this page.
        </p>
      </div>
    );
  }

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <>
      <SEO title="Admin — Res.Net" description="Internal admin dashboard." />

      <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-bold text-3xl text-navy-700 dark:text-white mb-6">
          Admin Dashboard
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {[...DATA_TABS, { key: 'pricing' as TabKey, label: 'Workshop Pricing', table: '' }].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key
                  ? 'bg-navy-700 text-white'
                  : 'bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-gray-300 hover:bg-navy-100 dark:hover:bg-navy-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Card className="overflow-x-auto">
          {tab === 'pricing' ? (
            <WorkshopPricingEditor />
          ) : loading ? (
            <div className="p-10 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
            </div>
          ) : error ? (
            <p className="p-6 text-red-500 text-sm">{error}</p>
          ) : rows.length === 0 ? (
            <p className="p-6 text-gray-500 dark:text-gray-400 text-sm">No submissions yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-100 dark:border-navy-700 text-left">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 font-semibold text-navy-700 dark:text-white whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-navy-50 dark:border-navy-800 last:border-0">
                    {columns.map((col) => (
                      <td
                        key={col}
                        className="px-4 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap max-w-xs truncate"
                        title={formatCell(row[col])}
                      >
                        {formatCell(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {tab !== 'pricing' && (
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Payment receipts are stored in Supabase Storage and aren't shown here — view them in the
            Supabase Dashboard under Storage → receipts.
          </p>
        )}
      </section>
    </>
  );
}

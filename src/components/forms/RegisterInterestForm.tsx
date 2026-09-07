import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Landmark, Smartphone, Wallet } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { FormField, FormStatus, inputClass } from '@/components/ui/Accordion';
import {
  SelectField,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  FileUpload,
} from '@/components/ui/FormControls';
import { programs } from '@/data/content';

// ---------------------------------------------------------------------------
// Static options
// ---------------------------------------------------------------------------

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Final Year',
  'House Officer/Intern',
  'Graduate',
  'Other',
];

const RESEARCH_EXPERIENCE_OPTIONS = [
  'I have no prior research experience',
  'Literature searching/reviewing',
  'Letter to the Editor',
  'Critique/Commentary',
  'Case Report/Case Series',
  'Original Research',
  'Review Article',
  'Other',
];

const KNOWLEDGE_LEVEL_OPTIONS = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];
const YES_NO = ['Yes', 'No'];
const YES_MAYBE_NO = ['Yes', 'Maybe', 'No'];
const HEARD_ABOUT_OPTIONS = [
  'Instagram',
  'WhatsApp',
  'LinkedIn',
  'Friend/Colleague',
  'University',
  'Res.Net Team',
  'Other',
];

const PAYMENT_METHODS = [
  {
    name: 'Bank Transfer',
    icon: Landmark,
    lines: ['Habib Bank Limited', 'Account Title: Hur ADA', 'Account Number: 05837901552999'],
  },
  {
    name: 'Easypaisa',
    icon: Smartphone,
    lines: ['Account Title: Hur Abbas', 'Account Number: 03122947426'],
  },
  {
    name: 'Nayapay',
    icon: Wallet,
    lines: ['Account Title: Hur Abbas', 'Account Number: 03122947426'],
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WorkshopPricing {
  slug: string;
  title: string;
  early_bird_price: number;
  regular_price: number;
  early_bird_active: boolean;
  currency: string;
}

interface FormState {
  workshopSlug: string;
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  country: string;
  institution: string;
  programDegree: string;
  yearSemester: string;
  priorBasicWorkshop: string;
  researchExperience: string[];
  researchExperienceOther: string;
  publishedBefore: string;
  knowledgeLevel: string;
  mentorshipInterest: string;
  futureInterest: string;
  heardAbout: string;
  heardAboutOther: string;
  consentAccurate: boolean;
  paymentMethod: string;
  paymentConfirmed: boolean;
}

const initialState: FormState = {
  workshopSlug: '',
  fullName: '',
  email: '',
  whatsapp: '',
  city: '',
  country: '',
  institution: '',
  programDegree: '',
  yearSemester: '',
  priorBasicWorkshop: '',
  researchExperience: [],
  researchExperienceOther: '',
  publishedBefore: '',
  knowledgeLevel: '',
  mentorshipInterest: '',
  futureInterest: '',
  heardAbout: '',
  heardAboutOther: '',
  consentAccurate: false,
  paymentMethod: '',
  paymentConfirmed: false,
};

type Errors = Partial<Record<keyof FormState | 'receiptFile', string>>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RegisterInterestForm({ defaultWorkshopSlug }: { defaultWorkshopSlug?: string }) {
  const [form, setForm] = useState<FormState>({
    ...initialState,
    workshopSlug: defaultWorkshopSlug || '',
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [workshopPricing, setWorkshopPricing] = useState<WorkshopPricing[]>([]);
  const [pricingLoading, setPricingLoading] = useState(true);

  // Fetch pricing for every workshop once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('workshops')
        .select('slug, title, early_bird_price, regular_price, early_bird_active, currency');
      if (!cancelled) {
        if (!error && data) setWorkshopPricing(data as WorkshopPricing[]);
        setPricingLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const selectedPricing = workshopPricing.find((w) => w.slug === form.workshopSlug) || null;
  const feeType: 'early_bird' | 'regular' = selectedPricing?.early_bird_active ? 'early_bird' : 'regular';
  const feeAmount = selectedPricing
    ? feeType === 'early_bird'
      ? selectedPricing.early_bird_price
      : selectedPricing.regular_price
    : null;
  const currency = selectedPricing?.currency || 'PKR';

  const validate = (): boolean => {
    const e: Errors = {};

    if (!form.workshopSlug) e.workshopSlug = 'Please select a workshop.';

    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.';

    if (!form.email.trim()) e.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Please enter a valid email address.';

    if (!form.whatsapp.trim()) e.whatsapp = 'Please enter your WhatsApp number.';
    else if (!/^[+\d][\d\s-]{6,}$/.test(form.whatsapp.trim()))
      e.whatsapp = 'Please enter a valid phone number (digits only, optionally starting with +).';

    if (!form.city.trim()) e.city = 'Please enter your city.';
    if (!form.institution.trim()) e.institution = 'Please enter your institution/university.';
    if (!form.programDegree.trim()) e.programDegree = 'Please enter your current program/degree.';
    if (!form.yearSemester) e.yearSemester = 'Please select your current year/semester.';
    if (!form.priorBasicWorkshop) e.priorBasicWorkshop = 'Please select an option.';

    if (!form.consentAccurate) e.consentAccurate = 'You must confirm before submitting.';
    if (!form.paymentMethod) e.paymentMethod = 'Please select how you paid.';
    if (!form.paymentConfirmed) e.paymentConfirmed = 'Please confirm your payment before submitting.';
    if (!receiptFile) e.receiptFile = 'Please upload your payment receipt.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setForm({ ...initialState, workshopSlug: defaultWorkshopSlug || '' });
    setReceiptFile(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
      return;
    }
    if (!selectedPricing || feeAmount === null) {
      setStatus({ type: 'error', message: 'Could not load workshop pricing. Please try again.' });
      return;
    }

    setLoading(true);
    try {
      // 1. Upload the receipt to Supabase Storage
      const safeName = receiptFile!.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${form.workshopSlug}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(path, receiptFile!, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        throw new Error('Could not upload your receipt. Please check your file and try again.');
      }

      // 2. Insert the registration row
      const { error: insertError } = await supabase.from('workshop_registrations').insert({
        workshop_slug: form.workshopSlug,
        workshop_title: selectedPricing.title,
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        city: form.city.trim(),
        country: form.country.trim() || null,
        institution: form.institution.trim(),
        program_degree: form.programDegree.trim(),
        year_semester: form.yearSemester,
        prior_basic_workshop: form.priorBasicWorkshop === 'Yes',
        research_experience: form.researchExperience,
        research_experience_other: form.researchExperience.includes('Other')
          ? form.researchExperienceOther.trim() || null
          : null,
        published_before: form.publishedBefore ? form.publishedBefore === 'Yes' : null,
        research_knowledge_level: form.knowledgeLevel || null,
        interested_mentorship: form.mentorshipInterest ? form.mentorshipInterest === 'Yes' : null,
        interested_future_workshops: form.futureInterest || null,
        heard_about: form.heardAbout || null,
        heard_about_other: form.heardAbout === 'Other' ? form.heardAboutOther.trim() || null : null,
        consent_accurate: form.consentAccurate,
        fee_type: feeType,
        fee_amount: feeAmount,
        currency,
        payment_method: form.paymentMethod,
        receipt_path: path,
        payment_confirmed: form.paymentConfirmed,
      });

      if (insertError) {
        throw new Error('Your receipt uploaded, but we could not save your registration. Please contact us.');
      }

      setStatus({
        type: 'success',
        message:
          'Registration submitted! Your seat will be confirmed once we verify your payment. We will reach out on WhatsApp/email shortly.',
      });
      resetForm();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      {/* Workshop selection */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">
          Which workshop are you applying for?
        </h3>
        <FormField label="Workshop" error={errors.workshopSlug}>
          <select
            value={form.workshopSlug}
            onChange={(e) => update('workshopSlug', e.target.value)}
            disabled={loading}
            className={`${inputClass} appearance-none bg-white dark:bg-navy-800 cursor-pointer`}
          >
            <option value="" disabled>
              Select a workshop...
            </option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </FormField>
      </section>

      {/* 1. Basic Information */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          1. Basic Information
        </h3>
        <FormField label="Full Name" error={errors.fullName}>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Jane Doe"
            className={inputClass}
            disabled={loading}
          />
        </FormField>
        <FormField label="Email Address" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
            disabled={loading}
          />
        </FormField>
        <FormField label="WhatsApp Number" error={errors.whatsapp}>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            placeholder="+92 3XX XXXXXXX"
            className={inputClass}
            disabled={loading}
          />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="City" error={errors.city}>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="Karachi"
              className={inputClass}
              disabled={loading}
            />
          </FormField>
          <FormField label="Country">
            <input
              type="text"
              value={form.country}
              onChange={(e) => update('country', e.target.value)}
              placeholder="Pakistan"
              className={inputClass}
              disabled={loading}
            />
          </FormField>
        </div>
      </section>

      {/* 2. Academic Background */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          2. Academic Background
        </h3>
        <FormField label="Current Institution/University" error={errors.institution}>
          <input
            type="text"
            value={form.institution}
            onChange={(e) => update('institution', e.target.value)}
            placeholder="Aga Khan University"
            className={inputClass}
            disabled={loading}
          />
        </FormField>
        <FormField label="Current Program/Degree" error={errors.programDegree}>
          <input
            type="text"
            value={form.programDegree}
            onChange={(e) => update('programDegree', e.target.value)}
            placeholder="MBBS"
            className={inputClass}
            disabled={loading}
          />
        </FormField>
        <FormField label="Current Year/Semester" error={errors.yearSemester}>
          <SelectField
            value={form.yearSemester}
            onChange={(v) => update('yearSemester', v)}
            options={YEAR_OPTIONS}
            disabled={loading}
          />
        </FormField>
      </section>

      {/* 3. Research Background */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          3. Research Background
        </h3>
        <FormField label="Have you participated in Basic Research Workshop before?" error={errors.priorBasicWorkshop}>
          <RadioGroup
            name="priorBasicWorkshop"
            value={form.priorBasicWorkshop}
            onChange={(v) => update('priorBasicWorkshop', v)}
            options={YES_NO}
            disabled={loading}
          />
        </FormField>
        <FormField label="What type of research experience do you have? (Select all that apply)">
          <CheckboxGroup
            values={form.researchExperience}
            onChange={(v) => update('researchExperience', v)}
            options={RESEARCH_EXPERIENCE_OPTIONS}
            disabled={loading}
          />
          {form.researchExperience.includes('Other') && (
            <input
              type="text"
              value={form.researchExperienceOther}
              onChange={(e) => update('researchExperienceOther', e.target.value)}
              placeholder="Please specify"
              className={`${inputClass} mt-3`}
              disabled={loading}
            />
          )}
        </FormField>
        <FormField label="Have you published a research paper before?">
          <RadioGroup
            name="publishedBefore"
            value={form.publishedBefore}
            onChange={(v) => update('publishedBefore', v)}
            options={YES_NO}
            disabled={loading}
          />
        </FormField>
        <FormField label="How would you rate your current research knowledge?">
          <RadioGroup
            name="knowledgeLevel"
            value={form.knowledgeLevel}
            onChange={(v) => update('knowledgeLevel', v)}
            options={KNOWLEDGE_LEVEL_OPTIONS}
            disabled={loading}
          />
        </FormField>
      </section>

      {/* 4. Expectations & Engagement */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          4. Expectations &amp; Engagement
        </h3>
        <FormField label="Would you be interested in joining the Res.Net research mentorship program after the workshop?">
          <RadioGroup
            name="mentorshipInterest"
            value={form.mentorshipInterest}
            onChange={(v) => update('mentorshipInterest', v)}
            options={YES_NO}
            disabled={loading}
          />
        </FormField>
        <FormField label="Would you be interested in future Res.Net workshops/programs?">
          <RadioGroup
            name="futureInterest"
            value={form.futureInterest}
            onChange={(v) => update('futureInterest', v)}
            options={YES_MAYBE_NO}
            disabled={loading}
          />
        </FormField>
        <FormField label="How did you hear about Res.Net?">
          <RadioGroup
            name="heardAbout"
            value={form.heardAbout}
            onChange={(v) => update('heardAbout', v)}
            options={HEARD_ABOUT_OPTIONS}
            disabled={loading}
          />
          {form.heardAbout === 'Other' && (
            <input
              type="text"
              value={form.heardAboutOther}
              onChange={(e) => update('heardAboutOther', e.target.value)}
              placeholder="Please specify"
              className={`${inputClass} mt-3`}
              disabled={loading}
            />
          )}
        </FormField>
      </section>

      {/* Consent */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Consent / Confirmation
        </h3>
        <Checkbox
          checked={form.consentAccurate}
          onChange={(v) => update('consentAccurate', v)}
          label="I confirm that the information provided above is accurate and look forward to participating in the Res.Net workshop."
          disabled={loading}
          error={errors.consentAccurate}
        />
      </section>

      {/* Payment Details */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Payment Details
        </h3>

        {/* Fee display */}
        <div>
          <label className="block text-sm font-medium text-navy-700 dark:text-gray-200 mb-2">
            Workshop Fee
          </label>
          {!form.workshopSlug ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select a workshop above to see the fee.
            </p>
          ) : pricingLoading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading pricing...
            </p>
          ) : !selectedPricing ? (
            <p className="text-sm text-red-500">Could not load pricing for this workshop.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              <div
                className={`rounded-xl border px-4 py-3 ${
                  feeType === 'early_bird'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-navy-200 dark:border-navy-600 opacity-60'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Early Bird
                </p>
                <p className="font-heading font-bold text-lg text-navy-700 dark:text-white">
                  {selectedPricing.currency} {selectedPricing.early_bird_price.toLocaleString()}
                </p>
                {feeType === 'early_bird' && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1">
                    Applies to your registration
                  </p>
                )}
              </div>
              <div
                className={`rounded-xl border px-4 py-3 ${
                  feeType === 'regular'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-navy-200 dark:border-navy-600 opacity-60'
                }`}
              >
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Regular Fee
                </p>
                <p className="font-heading font-bold text-lg text-navy-700 dark:text-white">
                  {selectedPricing.currency} {selectedPricing.regular_price.toLocaleString()}
                </p>
                {feeType === 'regular' && (
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1">
                    Applies to your registration
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Payment method info + selection */}
        <FormField label="Payment Method — which one did you use?" error={errors.paymentMethod}>
          <div className="space-y-3 mb-3">
            {PAYMENT_METHODS.map((m) => (
              <div
                key={m.name}
                className="flex items-start gap-3 rounded-xl border border-navy-100 dark:border-navy-700 px-4 py-3"
              >
                <m.icon className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-700 dark:text-white text-sm">{m.name}</p>
                  {m.lines.map((line) => (
                    <p key={line} className="text-xs text-gray-500 dark:text-gray-400">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <RadioGroup
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={(v) => update('paymentMethod', v)}
            options={PAYMENT_METHODS.map((m) => m.name)}
            disabled={loading}
          />
        </FormField>

        <FormField label="Upload Payment Receipt" error={errors.receiptFile}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Please upload a clear screenshot/photo of your payment receipt.
          </p>
          <FileUpload
            file={receiptFile}
            onChange={(f, err) => {
              setReceiptFile(f);
              setErrors((e) => ({ ...e, receiptFile: err || undefined }));
            }}
            disabled={loading}
            error={errors.receiptFile}
          />
        </FormField>

        <Checkbox
          checked={form.paymentConfirmed}
          onChange={(v) => update('paymentConfirmed', v)}
          label="I confirm that I have completed the payment and uploaded the correct payment details/receipt."
          disabled={loading}
          error={errors.paymentConfirmed}
        />

        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Note: Your registration will be confirmed after verification of the submitted payment details.
        </p>
      </section>

      {status && <FormStatus type={status.type} message={status.message} />}

      <Button type="submit" variant="accent" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Registration'}
      </Button>
    </form>
  );
}

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { FormField, FormStatus, inputClass } from '@/components/ui/Accordion';
import { RadioGroup, CheckboxGroup, RatingScale } from '@/components/ui/FormControls';
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

const JOIN_REASONS_OPTIONS = [
  'To start research',
  'To improve writing skills',
  'To learn data analysis',
  'To publish an article',
  'CV improvement',
  'Requirement for academics',
  'Other',
];

const TOPICS_INTERESTED_OPTIONS = [
  'AI in research',
  'Letter to the Editor',
  'Critique',
  'Literature search & databases',
  'Journals, indexing & impact factors',
  'Reference management',
];

const YES_NO_MAYBE = ['Yes', 'No', 'Maybe'];
const YES_NO = ['Yes', 'No'];

const RESEARCH_TYPES_OPTIONS = [
  'Letter to the Editor/Critique',
  'Case Report',
  'Original Article',
  'Review Article',
  'Meta-analysis and Systematic Review',
  'None',
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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
  joinReasons: string[];
  joinReasonsOther: string;
  topicsInterested: string[];
  mentorshipInterest: string;
  ratingStudyDesigns: number | null;
  ratingLiteratureSearch: number | null;
  ratingJournalSelection: number | null;
  ratingReferenceManagement: number | null;
  ratingAiTools: number | null;
  priorWorkshopAttended: string;
  hasPublication: string;
  researchTypesWorked: string[];
  expectations: string;
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
  joinReasons: [],
  joinReasonsOther: '',
  topicsInterested: [],
  mentorshipInterest: '',
  ratingStudyDesigns: null,
  ratingLiteratureSearch: null,
  ratingJournalSelection: null,
  ratingReferenceManagement: null,
  ratingAiTools: null,
  priorWorkshopAttended: '',
  hasPublication: '',
  researchTypesWorked: [],
  expectations: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PreWorkshopForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};

    if (!form.workshopSlug) e.workshopSlug = 'Please select a workshop.';
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.';

    if (!form.email.trim()) e.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Please enter a valid email address.';

    if (!form.whatsapp.trim()) e.whatsapp = 'Please enter your WhatsApp number.';
    else if (!/^[+\d][\d\s-]{6,}$/.test(form.whatsapp.trim()))
      e.whatsapp = 'Please enter a valid phone number.';

    if (!form.city.trim()) e.city = 'Please enter your city.';
    if (!form.institution.trim()) e.institution = 'Please enter your institution/university.';
    if (!form.programDegree.trim()) e.programDegree = 'Please enter your current program/degree.';
    if (!form.yearSemester) e.yearSemester = 'Please select your current year/semester.';

    if (form.joinReasons.length === 0) e.joinReasons = 'Please select at least one option.';
    if (form.topicsInterested.length === 0) e.topicsInterested = 'Please select at least one topic.';
    if (!form.mentorshipInterest) e.mentorshipInterest = 'Please select an option.';

    if (form.ratingStudyDesigns === null) e.ratingStudyDesigns = 'Please rate this.';
    if (form.ratingLiteratureSearch === null) e.ratingLiteratureSearch = 'Please rate this.';
    if (form.ratingJournalSelection === null) e.ratingJournalSelection = 'Please rate this.';
    if (form.ratingReferenceManagement === null) e.ratingReferenceManagement = 'Please rate this.';
    if (form.ratingAiTools === null) e.ratingAiTools = 'Please rate this.';

    if (!form.priorWorkshopAttended) e.priorWorkshopAttended = 'Please select an option.';
    if (!form.hasPublication) e.hasPublication = 'Please select an option.';
    if (form.researchTypesWorked.length === 0)
      e.researchTypesWorked = 'Please select at least one option (or "None").';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before submitting.' });
      return;
    }

    const workshop = programs.find((p) => p.slug === form.workshopSlug);
    setLoading(true);
    try {
      const { error } = await supabase.from('pre_workshop_responses').insert({
        workshop_slug: form.workshopSlug,
        workshop_title: workshop?.title || form.workshopSlug,
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        city: form.city.trim(),
        country: form.country.trim() || null,
        institution: form.institution.trim(),
        program_degree: form.programDegree.trim(),
        year_semester: form.yearSemester,
        join_reasons: form.joinReasons,
        join_reasons_other: form.joinReasons.includes('Other') ? form.joinReasonsOther.trim() || null : null,
        topics_interested: form.topicsInterested,
        mentorship_interest: form.mentorshipInterest,
        rating_study_designs: form.ratingStudyDesigns,
        rating_literature_search: form.ratingLiteratureSearch,
        rating_journal_selection: form.ratingJournalSelection,
        rating_reference_management: form.ratingReferenceManagement,
        rating_ai_tools: form.ratingAiTools,
        prior_workshop_attended: form.priorWorkshopAttended === 'Yes',
        has_publication: form.hasPublication === 'Yes',
        research_types_worked: form.researchTypesWorked,
        expectations: form.expectations.trim() || null,
      });

      if (error) throw error;

      setStatus({ type: 'success', message: 'Thank you! Your responses have been submitted.' });
      setForm(initialState);
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <FormField label="Which workshop is this for?" error={errors.workshopSlug}>
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

      {/* 1. Basic Information */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          1. Basic Information
        </h3>
        <FormField label="Full Name" error={errors.fullName}>
          <input type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass} disabled={loading} />
        </FormField>
        <FormField label="Email Address" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} disabled={loading} />
        </FormField>
        <FormField label="WhatsApp Number" error={errors.whatsapp}>
          <input type="tel" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} placeholder="+92 3XX XXXXXXX" className={inputClass} disabled={loading} />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="City" error={errors.city}>
            <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} disabled={loading} />
          </FormField>
          <FormField label="Country">
            <input type="text" value={form.country} onChange={(e) => update('country', e.target.value)} className={inputClass} disabled={loading} />
          </FormField>
        </div>
      </section>

      {/* 2. Academic Background */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          2. Academic Background
        </h3>
        <FormField label="Current Institution/University" error={errors.institution}>
          <input type="text" value={form.institution} onChange={(e) => update('institution', e.target.value)} className={inputClass} disabled={loading} />
        </FormField>
        <FormField label="Current Program/Degree" error={errors.programDegree}>
          <input type="text" value={form.programDegree} onChange={(e) => update('programDegree', e.target.value)} className={inputClass} disabled={loading} />
        </FormField>
        <FormField label="Current Year/Semester" error={errors.yearSemester}>
          <select
            value={form.yearSemester}
            onChange={(e) => update('yearSemester', e.target.value)}
            disabled={loading}
            className={`${inputClass} appearance-none bg-white dark:bg-navy-800 cursor-pointer`}
          >
            <option value="" disabled>
              Select...
            </option>
            {YEAR_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>
      </section>

      {/* 3. Interest and Expectations */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          3. Interest and Expectations
        </h3>
        <FormField label="Why are you joining this workshop? (Select all that apply)" error={errors.joinReasons}>
          <CheckboxGroup values={form.joinReasons} onChange={(v) => update('joinReasons', v)} options={JOIN_REASONS_OPTIONS} disabled={loading} />
          {form.joinReasons.includes('Other') && (
            <input
              type="text"
              value={form.joinReasonsOther}
              onChange={(e) => update('joinReasonsOther', e.target.value)}
              placeholder="Please specify"
              className={`${inputClass} mt-3`}
              disabled={loading}
            />
          )}
        </FormField>
        <FormField label="Which topic are you most interested in? (Select all that apply)" error={errors.topicsInterested}>
          <CheckboxGroup values={form.topicsInterested} onChange={(v) => update('topicsInterested', v)} options={TOPICS_INTERESTED_OPTIONS} disabled={loading} />
        </FormField>
        <FormField label="Are you interested in joining a research mentorship program after this workshop?" error={errors.mentorshipInterest}>
          <RadioGroup name="mentorshipInterest" value={form.mentorshipInterest} onChange={(v) => update('mentorshipInterest', v)} options={YES_NO_MAYBE} disabled={loading} />
        </FormField>
      </section>

      {/* Knowledge self-assessment */}
      <section className="space-y-6">
        <div className="border-t border-navy-100 dark:border-navy-700 pt-8">
          <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">Knowledge Self-Assessment</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Rate your current level of knowledge or confidence (1 = No knowledge, 5 = Strong understanding).
          </p>
        </div>
        <FormField label="I understand the different types of study designs used in medical research." error={errors.ratingStudyDesigns}>
          <RatingScale name="ratingStudyDesigns" value={form.ratingStudyDesigns} onChange={(v) => update('ratingStudyDesigns', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to search scientific literature databases (e.g., PubMed) effectively." error={errors.ratingLiteratureSearch}>
          <RatingScale name="ratingLiteratureSearch" value={form.ratingLiteratureSearch} onChange={(v) => update('ratingLiteratureSearch', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to select the right journal for publishing my research." error={errors.ratingJournalSelection}>
          <RatingScale name="ratingJournalSelection" value={form.ratingJournalSelection} onChange={(v) => update('ratingJournalSelection', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to use a reference management tool (e.g., Zotero, Mendeley, EndNote)." error={errors.ratingReferenceManagement}>
          <RatingScale name="ratingReferenceManagement" value={form.ratingReferenceManagement} onChange={(v) => update('ratingReferenceManagement', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to use AI tools responsibly in research writing." error={errors.ratingAiTools}>
          <RatingScale name="ratingAiTools" value={form.ratingAiTools} onChange={(v) => update('ratingAiTools', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
      </section>

      {/* Previous research experience */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Previous Research Experience
        </h3>
        <FormField label="Have you ever attended any workshop related to research?" error={errors.priorWorkshopAttended}>
          <RadioGroup name="priorWorkshopAttended" value={form.priorWorkshopAttended} onChange={(v) => update('priorWorkshopAttended', v)} options={YES_NO} disabled={loading} />
        </FormField>
        <FormField label="Do you have any research publication?" error={errors.hasPublication}>
          <RadioGroup name="hasPublication" value={form.hasPublication} onChange={(v) => update('hasPublication', v)} options={YES_NO} disabled={loading} />
        </FormField>
        <FormField label="Which of the following types of research have you worked on before? (Select all that apply)" error={errors.researchTypesWorked}>
          <CheckboxGroup values={form.researchTypesWorked} onChange={(v) => update('researchTypesWorked', v)} options={RESEARCH_TYPES_OPTIONS} disabled={loading} />
        </FormField>
        <FormField label="What do you expect to gain from this workshop? (Optional)">
          <textarea
            value={form.expectations}
            onChange={(e) => update('expectations', e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            disabled={loading}
          />
        </FormField>
      </section>

      {status && <FormStatus type={status.type} message={status.message} />}

      <Button type="submit" variant="accent" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit'}
      </Button>
    </form>
  );
}

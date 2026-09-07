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

const USEFUL_SESSIONS_OPTIONS = [
  'Research & Study Designs',
  'Literature Search & Databases',
  'Journals, Indexing & Impact Factors',
  'Scientific Writing',
  'Publication Fees & Ethical Publishing',
  'AI, Plagiarism & Reference Management',
  'Selecting the Right Journal',
  'Hands-on Literature Search & Journal Evaluation',
  'Q&A / Panel Discussion',
];

const CONFIDENCE_OPTIONS = [
  'Not confident',
  'Slightly confident',
  'Moderately confident',
  'Very confident',
  'Extremely confident',
];

const YES_NO = ['Yes', 'No'];

const FUTURE_PROGRAMS_OPTIONS = [
  'Research Foundation Workshop',
  'AI in Medical Research',
  'Original Research Bootcamp',
  'Systematic Review & Meta-analysis',
  'Research Mentorship',
  'Journal Club',
  'Research Community',
  'Research Automation / AI Tools',
];

const RECOMMEND_OPTIONS = ['Definitely not', 'Probably not', 'Maybe', 'Probably yes', 'Definitely yes'];

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

  ratingOverall: number | null;
  ratingRelevance: number | null;
  ratingSpeakers: number | null;
  ratingHandsOn: number | null;
  ratingOrganization: number | null;

  ratingStudyDesigns: number | null;
  ratingLiteratureSearch: number | null;
  ratingIndexingImpact: number | null;
  ratingJournalSelection: number | null;
  ratingWritingBasics: number | null;
  ratingReferenceManagement: number | null;
  ratingAiTools: number | null;
  ratingEthicsPlagiarism: number | null;

  usefulSessions: string[];
  mostImportantLearning: string;
  confidenceLevel: string;
  nextAction: string;

  mentorshipInterest: string;
  futureProgramsInterest: string[];
  recommendLikelihood: string;

  likedMost: string;
  improveSuggestions: string;
  nextTopicSuggestion: string;
  additionalFeedback: string;
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

  ratingOverall: null,
  ratingRelevance: null,
  ratingSpeakers: null,
  ratingHandsOn: null,
  ratingOrganization: null,

  ratingStudyDesigns: null,
  ratingLiteratureSearch: null,
  ratingIndexingImpact: null,
  ratingJournalSelection: null,
  ratingWritingBasics: null,
  ratingReferenceManagement: null,
  ratingAiTools: null,
  ratingEthicsPlagiarism: null,

  usefulSessions: [],
  mostImportantLearning: '',
  confidenceLevel: '',
  nextAction: '',

  mentorshipInterest: '',
  futureProgramsInterest: [],
  recommendLikelihood: '',

  likedMost: '',
  improveSuggestions: '',
  nextTopicSuggestion: '',
  additionalFeedback: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PostWorkshopForm() {
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

    if (form.ratingOverall === null) e.ratingOverall = 'Please rate this.';
    if (form.ratingRelevance === null) e.ratingRelevance = 'Please rate this.';
    if (form.ratingSpeakers === null) e.ratingSpeakers = 'Please rate this.';
    if (form.ratingHandsOn === null) e.ratingHandsOn = 'Please rate this.';
    if (form.ratingOrganization === null) e.ratingOrganization = 'Please rate this.';

    if (form.ratingStudyDesigns === null) e.ratingStudyDesigns = 'Please rate this.';
    if (form.ratingLiteratureSearch === null) e.ratingLiteratureSearch = 'Please rate this.';
    if (form.ratingIndexingImpact === null) e.ratingIndexingImpact = 'Please rate this.';
    if (form.ratingJournalSelection === null) e.ratingJournalSelection = 'Please rate this.';
    if (form.ratingWritingBasics === null) e.ratingWritingBasics = 'Please rate this.';
    if (form.ratingReferenceManagement === null) e.ratingReferenceManagement = 'Please rate this.';
    if (form.ratingAiTools === null) e.ratingAiTools = 'Please rate this.';
    if (form.ratingEthicsPlagiarism === null) e.ratingEthicsPlagiarism = 'Please rate this.';

    if (!form.mostImportantLearning.trim()) e.mostImportantLearning = 'This field is required.';
    if (!form.confidenceLevel) e.confidenceLevel = 'Please select an option.';
    if (!form.nextAction.trim()) e.nextAction = 'This field is required.';

    if (!form.mentorshipInterest) e.mentorshipInterest = 'Please select an option.';
    if (!form.recommendLikelihood) e.recommendLikelihood = 'Please select an option.';

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
      const { error } = await supabase.from('post_workshop_responses').insert({
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

        rating_overall: form.ratingOverall,
        rating_relevance: form.ratingRelevance,
        rating_speakers: form.ratingSpeakers,
        rating_hands_on: form.ratingHandsOn,
        rating_organization: form.ratingOrganization,

        rating_study_designs: form.ratingStudyDesigns,
        rating_literature_search: form.ratingLiteratureSearch,
        rating_indexing_impact: form.ratingIndexingImpact,
        rating_journal_selection: form.ratingJournalSelection,
        rating_writing_basics: form.ratingWritingBasics,
        rating_reference_management: form.ratingReferenceManagement,
        rating_ai_tools: form.ratingAiTools,
        rating_ethics_plagiarism: form.ratingEthicsPlagiarism,

        useful_sessions: form.usefulSessions,
        most_important_learning: form.mostImportantLearning.trim(),
        confidence_level: form.confidenceLevel,
        next_action: form.nextAction.trim(),

        mentorship_interest: form.mentorshipInterest === 'Yes',
        future_programs_interest: form.futureProgramsInterest,
        recommend_likelihood: form.recommendLikelihood,

        liked_most: form.likedMost.trim() || null,
        improve_suggestions: form.improveSuggestions.trim() || null,
        next_topic_suggestion: form.nextTopicSuggestion.trim() || null,
        additional_feedback: form.additionalFeedback.trim() || null,
      });

      if (error) throw error;

      setStatus({ type: 'success', message: 'Thank you for your feedback! It has been submitted.' });
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

      {/* 1. Workshop Experience */}
      <section className="space-y-6">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Workshop Experience
        </h3>
        <FormField label="Overall, how would you rate this workshop?" error={errors.ratingOverall}>
          <RatingScale name="ratingOverall" value={form.ratingOverall} onChange={(v) => update('ratingOverall', v)} lowLabel="Very Poor" highLabel="Excellent" disabled={loading} />
        </FormField>
        <FormField label="How relevant was the workshop content to your research needs?" error={errors.ratingRelevance}>
          <RatingScale name="ratingRelevance" value={form.ratingRelevance} onChange={(v) => update('ratingRelevance', v)} lowLabel="Not relevant" highLabel="Extremely relevant" disabled={loading} />
        </FormField>
        <FormField label="How would you rate the speakers/facilitators?" error={errors.ratingSpeakers}>
          <RatingScale name="ratingSpeakers" value={form.ratingSpeakers} onChange={(v) => update('ratingSpeakers', v)} lowLabel="Very Poor" highLabel="Excellent" disabled={loading} />
        </FormField>
        <FormField label="How would you rate the hands-on activity?" error={errors.ratingHandsOn}>
          <RatingScale name="ratingHandsOn" value={form.ratingHandsOn} onChange={(v) => update('ratingHandsOn', v)} lowLabel="Very Poor" highLabel="Excellent" disabled={loading} />
        </FormField>
        <FormField label="How would you rate the overall organization of the workshop?" error={errors.ratingOrganization}>
          <RatingScale name="ratingOrganization" value={form.ratingOrganization} onChange={(v) => update('ratingOrganization', v)} lowLabel="Very Poor" highLabel="Excellent" disabled={loading} />
        </FormField>
      </section>

      {/* 2. Knowledge self-assessment */}
      <section className="space-y-6">
        <div className="border-t border-navy-100 dark:border-navy-700 pt-8">
          <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">Knowledge Self-Assessment</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Rate your current level of knowledge or confidence after this workshop (1 = No knowledge, 5 = Strong understanding).
          </p>
        </div>
        <FormField label="I understand the different types of study designs used in medical research." error={errors.ratingStudyDesigns}>
          <RatingScale name="ratingStudyDesigns" value={form.ratingStudyDesigns} onChange={(v) => update('ratingStudyDesigns', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to search scientific literature databases (e.g., PubMed) effectively." error={errors.ratingLiteratureSearch}>
          <RatingScale name="ratingLiteratureSearch" value={form.ratingLiteratureSearch} onChange={(v) => update('ratingLiteratureSearch', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I understand how journals are indexed and how impact factors can be interpreted." error={errors.ratingIndexingImpact}>
          <RatingScale name="ratingIndexingImpact" value={form.ratingIndexingImpact} onChange={(v) => update('ratingIndexingImpact', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I understand how to select an appropriate journal for publishing my research." error={errors.ratingJournalSelection}>
          <RatingScale name="ratingJournalSelection" value={form.ratingJournalSelection} onChange={(v) => update('ratingJournalSelection', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I understand the basics of scientific writing, including Letters to the Editor and critique writing." error={errors.ratingWritingBasics}>
          <RatingScale name="ratingWritingBasics" value={form.ratingWritingBasics} onChange={(v) => update('ratingWritingBasics', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I know how to use reference management tools (e.g., Zotero, Mendeley, EndNote)." error={errors.ratingReferenceManagement}>
          <RatingScale name="ratingReferenceManagement" value={form.ratingReferenceManagement} onChange={(v) => update('ratingReferenceManagement', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I understand how to use AI tools responsibly in research and academic writing." error={errors.ratingAiTools}>
          <RatingScale name="ratingAiTools" value={form.ratingAiTools} onChange={(v) => update('ratingAiTools', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
        <FormField label="I understand plagiarism and basic ethical practices in research publishing." error={errors.ratingEthicsPlagiarism}>
          <RatingScale name="ratingEthicsPlagiarism" value={form.ratingEthicsPlagiarism} onChange={(v) => update('ratingEthicsPlagiarism', v)} lowLabel="No knowledge" highLabel="Strong understanding" disabled={loading} />
        </FormField>
      </section>

      {/* 3. Learning & Impact */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Learning &amp; Impact
        </h3>
        <FormField label="Which session(s) did you find most useful? (Select all that apply)">
          <CheckboxGroup values={form.usefulSessions} onChange={(v) => update('usefulSessions', v)} options={USEFUL_SESSIONS_OPTIONS} disabled={loading} />
        </FormField>
        <FormField label="What is the most important thing you learned from this workshop?" error={errors.mostImportantLearning}>
          <textarea value={form.mostImportantLearning} onChange={(e) => update('mostImportantLearning', e.target.value)} rows={3} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
        <FormField label="After this workshop, how confident are you about starting or continuing your research journey?" error={errors.confidenceLevel}>
          <RadioGroup name="confidenceLevel" value={form.confidenceLevel} onChange={(v) => update('confidenceLevel', v)} options={CONFIDENCE_OPTIONS} disabled={loading} />
        </FormField>
        <FormField label="What is one thing you plan to do after this workshop?" error={errors.nextAction}>
          <textarea value={form.nextAction} onChange={(e) => update('nextAction', e.target.value)} rows={3} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
      </section>

      {/* 4. Res.Net community & future interest */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Res.Net Community &amp; Future Interest
        </h3>
        <FormField label="Would you be interested in joining a Res.Net research mentorship program?" error={errors.mentorshipInterest}>
          <RadioGroup name="mentorshipInterest" value={form.mentorshipInterest} onChange={(v) => update('mentorshipInterest', v)} options={YES_NO} disabled={loading} />
        </FormField>
        <FormField label="Which Res.Net programs would you be interested in? (Select all that apply)">
          <CheckboxGroup values={form.futureProgramsInterest} onChange={(v) => update('futureProgramsInterest', v)} options={FUTURE_PROGRAMS_OPTIONS} disabled={loading} />
        </FormField>
        <FormField label="Would you recommend this workshop to other medical students/researchers?" error={errors.recommendLikelihood}>
          <RadioGroup name="recommendLikelihood" value={form.recommendLikelihood} onChange={(v) => update('recommendLikelihood', v)} options={RECOMMEND_OPTIONS} disabled={loading} />
        </FormField>
      </section>

      {/* 5. Open feedback */}
      <section className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white border-t border-navy-100 dark:border-navy-700 pt-8">
          Open Feedback
        </h3>
        <FormField label="What did you like most about the workshop? (Optional)">
          <textarea value={form.likedMost} onChange={(e) => update('likedMost', e.target.value)} rows={2} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
        <FormField label="What could we improve for future workshops? (Optional)">
          <textarea value={form.improveSuggestions} onChange={(e) => update('improveSuggestions', e.target.value)} rows={2} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
        <FormField label="What topic would you like Res.Net to cover in our next workshop? (Optional)">
          <textarea value={form.nextTopicSuggestion} onChange={(e) => update('nextTopicSuggestion', e.target.value)} rows={2} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
        <FormField label="Any additional feedback or suggestions? (Optional)">
          <textarea value={form.additionalFeedback} onChange={(e) => update('additionalFeedback', e.target.value)} rows={2} className={`${inputClass} resize-none`} disabled={loading} />
        </FormField>
      </section>

      {status && <FormStatus type={status.type} message={status.message} />}

      <Button type="submit" variant="accent" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Feedback'}
      </Button>
    </form>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Compass,
  BrainCircuit,
  Rocket,
  Layers,
  Clock,
  BarChart,
  CheckCircle2,
  ListChecks,
  Trophy,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/LinkButton';
import { Button } from '@/components/ui/Button';
import { Accordion, SectionHeading } from '@/components/ui/Accordion';
import { RegisterInterestForm } from '@/components/forms/RegisterInterestForm';
import { PreWorkshopForm } from '@/components/forms/PreWorkshopForm';
import { PostWorkshopForm } from '@/components/forms/PostWorkshopForm';
import { Modal } from '@/components/ui/Modal';
import { useRouter } from '@/context/RouterContext';
import { programs, workshopFAQs, type Program } from '@/data/content';

const programIcons: Record<string, typeof Compass> = {
  Compass,
  BrainCircuit,
  Rocket,
  Layers,
};

const colorMap = {
  navy: {
    badge: 'bg-navy-100 text-navy-700 dark:bg-navy-700 dark:text-navy-100',
    icon: 'bg-navy-700',
    accent: 'text-navy-600 dark:text-navy-300',
    button: 'primary' as const,
  },
  brand: {
    badge: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
    icon: 'bg-brand-600',
    accent: 'text-brand-500',
    button: 'secondary' as const,
  },
  accent: {
    badge: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
    icon: 'bg-accent-500',
    accent: 'text-accent-500',
    button: 'accent' as const,
  },
};

function ProgramDetail({ program, onClose }: { program: Program; onClose: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const Icon = programIcons[program.icon] || Compass;
  const colors = colorMap[program.color];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [program.slug]);

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 text-navy-600 dark:text-gray-300 hover:text-navy-700 dark:hover:text-white font-medium text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> All Programs
      </button>

      <Card className="overflow-hidden">
        {/* Header */}
        <div className={`${colors.icon} p-8 sm:p-10`}>
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
                {program.title}
              </h1>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm text-white">
                  <BarChart className="h-4 w-4" /> {program.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {program.description}
          </p>

          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            {/* Curriculum */}
            <div>
              <h2 className="font-heading font-bold text-xl text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-brand-500" /> Curriculum Outline
              </h2>
              <ul className="space-y-3">
                {program.curriculum.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center text-xs font-bold text-navy-600 dark:text-brand-400 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div>
              <h2 className="font-heading font-bold text-xl text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-brand-500" /> Learning Outcomes
              </h2>
              <ul className="space-y-3">
                {program.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-navy-100 dark:border-navy-700">
            {showForm ? (
              <div className="max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">
                    Workshop Registration
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 text-gray-500"
                    aria-label="Close form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <RegisterInterestForm defaultWorkshopSlug={program.slug} />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-navy-700 dark:text-white">
                    Ready to join this program?
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Complete registration and payment to secure your seat.
                  </p>
                </div>
                <Button variant={colors.button} size="lg" onClick={() => setShowForm(true)}>
                  Register Now <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AcademyPage() {
  const { params, navigate } = useRouter();
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeForm, setActiveForm] = useState<'pre' | 'post' | null>(null);

  useEffect(() => {
    if (params.program) {
      const found = programs.find((p) => p.slug === params.program);
      if (found) {
        setSelectedProgram(found);
        return;
      }
    }
    setSelectedProgram(null);
  }, [params.program]);

  const handleClose = () => {
    setSelectedProgram(null);
    navigate('academy');
  };

  return (
    <>
      <SEO
        title="Workshop — Research Network (Res.Net)"
        description="Four structured research programs for medical students: Research Foundations, AI in Medical Research, Original Research Bootcamp, and Systematic Review Masterclass."
      />

      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white dark:bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-heading font-semibold tracking-wider uppercase text-brand-600 dark:text-brand-400 mb-3">
            Workshops
          </span>
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white leading-tight text-balance">
            Research Programs
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Structured programs to build practical research skills, gain expert guidance, and work on real research.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white dark:bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedProgram ? (
            <ProgramDetail program={selectedProgram} onClose={handleClose} />
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white">
                  Explore Our Programs
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Choose a program based on your research experience and goals.
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700">
                {programs.map((program, i) => (
                  <React.Fragment key={program.slug}>
                    <div 
                      className="group py-8 px-4 hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate('academy', { program: program.slug })}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                              {program.level}
                            </span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 uppercase tracking-wider">
                              Coming Soon
                            </span>
                          </div>
                          <h3 className="font-heading font-semibold text-xl text-navy-700 dark:text-white">
                            {program.title}
                          </h3>
                          <p className="mt-2 text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                            {program.shortDesc}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform duration-200">
                          <span className="text-sm font-medium">View Program</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    {i < programs.length - 1 && (
                      <div className="border-b border-gray-200 dark:border-gray-700" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                More research programs will be added as Res.Net grows.
              </p>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      {!selectedProgram && (
        <section className="py-20 bg-white dark:bg-navy-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                FAQ
              </span>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white mt-4">
                Questions About Our Programs
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Everything you need to know before joining a Res.Net program.
              </p>
            </div>
            <div className="mt-10">
              <Accordion items={workshopFAQs} />
            </div>

            {/* Pre/Post workshop feedback forms */}
            <div className="mt-14 pt-10 border-t border-navy-100 dark:border-navy-700 text-center">
              <h3 className="font-heading font-bold text-xl text-navy-700 dark:text-white">
                Attending or attended a workshop?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Fill out the pre-workshop form beforehand so we understand your goals, or the
                post-workshop form afterward to share your feedback.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveForm('pre')}>
                  Pre-Workshop Form
                </Button>
                <Button variant="outline" onClick={() => setActiveForm('post')}>
                  Post-Workshop Form
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Modal open={activeForm === 'pre'} onClose={() => setActiveForm(null)} title="Pre-Workshop Form">
        <PreWorkshopForm />
      </Modal>
      <Modal open={activeForm === 'post'} onClose={() => setActiveForm(null)} title="Post-Workshop Form">
        <PostWorkshopForm />
      </Modal>
    </>
  );
}

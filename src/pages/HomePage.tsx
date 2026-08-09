import React from 'react';
import {
  Compass,
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  Quote,
  Sparkles,
  FlaskConical,
  GraduationCap as Mentor,
  Globe,
  Bot,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card } from '@/components/ui/Card';
import { Accordion, SectionHeading } from '@/components/ui/Accordion';
import { useRouter } from '@/context/RouterContext';
import { useTheme } from '@/context/ThemeContext';
import { PlatformPreview } from '@/components/ui/PlatformPreview';
import { programs, testimonials, homeFAQs } from '@/data/content';

const featureCards = [
  {
    icon: FlaskConical,
    title: 'Learn by Doing',
    description: 'Work on real projects—not just lectures. Build protocols, reviews, and manuscripts.',
  },
  {
    icon: Mentor,
    title: 'Expert Mentorship',
    description: 'Receive 1-on-1 guidance from experienced researchers at every stage.',
  },
  {
    icon: Users,
    title: 'Research Community',
    description: 'Collaborate with medical students, join journal clubs, and grow together.',
  },
  {
    icon: TrendingUp,
    title: 'Career Advantage',
    description: 'Strengthen your CV with publications, research experience, and practical skills.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'Learn internationally accepted methods including PRISMA, Cochrane, and GRADE.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Research',
    description: 'Use AI responsibly to streamline literature review, analysis, and scientific writing.',
  },
];

export function HomePage() {
  const { navigate } = useRouter();
  const { theme } = useTheme();

  return (
    <>
      <SEO
        title="Research Network (Res.Net) — Learn. Research. Publish."
        description="Res.Net is a premium research education platform for medical students. Learn research methods, get mentored, and publish your first paper."
      />

      {/* Hero and Marquee Container */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-navy-200/30 blur-3xl" />

        {/* Hero */}
        <section className="relative pt-28 pb-0 lg:pt-32 lg:pb-4">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="flex items-center gap-5 mb-5 animate-fade-in">
                <img 
                  src={theme === 'dark' ? '/logo-icon-white.svg' : '/logo-icon-navy.svg'} 
                  alt="Res.Net" 
                  className="h-28 w-28 lg:h-32 lg:w-32"
                />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-7xl lg:text-8xl text-navy-700 dark:text-white tracking-tight">
                    Res<span className="text-brand-600">.Net</span>
                  </span>
                  <span className="font-heading font-semibold text-2xl lg:text-3xl text-brand-600 dark:text-brand-400 tracking-widest uppercase mt-1">
                    Research Network
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 px-5 py-2 text-base font-medium text-brand-600 dark:text-brand-300 mb-5 animate-fade-in">
                <Sparkles className="h-5 w-5" />
                Learn. Research. Publish.
              </span>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in">
                Master medical research through structured programs, expert mentorship, and hands-on projects.
              </p>
            </div>

            {/* Right Content - Platform Preview */}
            <div className="animate-fade-in">
              <PlatformPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose Res.Net */}
      <section className="pt-24 pb-12 relative animate-slide-up">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Students Choose Res.Net"
            title=""
            description=""
          />
          <div className="mt-4 overflow-hidden">
            <div className="relative flex items-center gap-8 animate-marquee hover:pause">
              <div className="flex items-center gap-8 whitespace-nowrap">
                {[
                  '✓ Learn by Doing',
                  '✓ 1-on-1 Mentorship',
                  '✓ Real Research Projects',
                  '✓ AI-Powered Research',
                  '✓ Publication Support',
                  '✓ Global Research Standards',
                  '✓ Research Community',
                  '✓ Hands-on Learning',
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <span className="font-heading font-semibold text-lg text-navy-700 dark:text-white">
                      {item}
                    </span>
                    {i < 7 && <span className="text-brand-500 text-xl">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-8 whitespace-nowrap">
                {[
                  '✓ Learn by Doing',
                  '✓ 1-on-1 Mentorship',
                  '✓ Real Research Projects',
                  '✓ AI-Powered Research',
                  '✓ Publication Support',
                  '✓ Global Research Standards',
                  '✓ Research Community',
                  '✓ Hands-on Learning',
                ].map((item, i) => (
                  <React.Fragment key={`dup1-${i}`}>
                    <span className="font-heading font-semibold text-lg text-navy-700 dark:text-white">
                      {item}
                    </span>
                    {i < 7 && <span className="text-brand-500 text-xl">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-8 whitespace-nowrap">
                {[
                  '✓ Learn by Doing',
                  '✓ 1-on-1 Mentorship',
                  '✓ Real Research Projects',
                  '✓ AI-Powered Research',
                  '✓ Publication Support',
                  '✓ Global Research Standards',
                  '✓ Research Community',
                  '✓ Hands-on Learning',
                ].map((item, i) => (
                  <React.Fragment key={`dup2-${i}`}>
                    <span className="font-heading font-semibold text-lg text-navy-700 dark:text-white">
                      {item}
                    </span>
                    {i < 7 && <span className="text-brand-500 text-xl">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-8 whitespace-nowrap">
                {[
                  '✓ Learn by Doing',
                  '✓ 1-on-1 Mentorship',
                  '✓ Real Research Projects',
                  '✓ AI-Powered Research',
                  '✓ Publication Support',
                  '✓ Global Research Standards',
                  '✓ Research Community',
                  '✓ Hands-on Learning',
                ].map((item, i) => (
                  <React.Fragment key={`dup3-${i}`}>
                    <span className="font-heading font-semibold text-lg text-navy-700 dark:text-white">
                      {item}
                    </span>
                    {i < 7 && <span className="text-brand-500 text-xl">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Research Programs */}
      <section className="py-20 bg-white dark:bg-navy-900 animate-slide-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Research Programs
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white mt-4">
              Master Medical Research
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore structured programs designed to develop practical research skills through expert mentorship and real research experience.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            {programs.map((program, i) => (
              <React.Fragment key={program.slug}>
                <div className="group py-8 px-4 hover:bg-gray-50 dark:hover:bg-navy-800/50 transition-colors duration-200 cursor-pointer">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading font-semibold text-xl text-navy-700 dark:text-white">
                          {program.title}
                        </h3>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {program.level}
                        </span>
                      </div>
                      <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">
                        {program.shortDesc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform duration-200">
                      <span className="text-sm font-medium">Learn More</span>
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
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 animate-slide-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Meet Our Team
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white mt-4">
              Meet the People Behind Res.Net
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Driven by a shared vision to make medical research more accessible, practical, and impactful.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-1 gap-8">
            {[
              { name: 'Hur Abbas', role: 'Founder', details: 'Final Year MBBS · Dow Medical College', image: '/CO_HUR.png' }
            ].map((member, i) => (
              <Card key={i} className="p-8 text-center animate-fade-up transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 mx-auto flex items-center justify-center mb-6 border-2 border-brand-200 dark:border-brand-700 shadow-lg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm font-heading font-semibold tracking-wider uppercase text-brand-500">
                  {member.role}
                </span>
                <h3 className="font-heading font-bold text-xl text-navy-700 dark:text-white mt-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {member.details}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton to="team" variant="primary" size="lg">
              View Our Team <ArrowRight className="h-5 w-5" />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-navy-900 animate-slide-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-navy-700 dark:text-white mt-4">
              Students Who Turned Curiosity Into Publications
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real stories from medical students who transformed curiosity into research experience and publication success.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6 animate-fade-up transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: `${i * 100}ms` }}>
                <Quote className="h-8 w-8 text-brand-300 mb-4" />
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center font-heading font-bold text-navy-600 dark:text-brand-400">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy-700 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 animate-slide-up">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Find answers to common questions about our programs, mentorship, and community."
          />
          <div className="mt-14 space-y-4">
            <Accordion items={homeFAQs} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 animate-slide-up">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-navy-700 to-navy-600 p-10 sm:p-16 text-center overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="relative">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white text-balance">
                Ready to Start Learning?
              </h2>
              <p className="mt-4 text-navy-100 text-lg max-w-xl mx-auto">
                Explore our research programs and turn your curiosity into published science. Your first paper is closer than you think.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <LinkButton to="academy" variant="accent" size="lg" className="transition-all duration-300 hover:scale-105">
                  Browse Courses <ArrowRight className="h-5 w-5" />
                </LinkButton>
                <LinkButton to="contact" variant="outline" size="lg" className="border-white/30 text-white hover:border-white hover:text-white transition-all duration-300">
                  Talk to Us
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

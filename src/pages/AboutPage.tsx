import {
  Award,
  ShieldCheck,
  Lightbulb,
  Users,
  DoorOpen,
  Target,
  Eye,
  Rocket,
  GraduationCap,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Accordion';
import { coreValues } from '@/data/content';

const valueIcons: Record<string, typeof Award> = {
  Award,
  ShieldCheck,
  Lightbulb,
  Users,
  DoorOpen,
};

const timeline = [
  {
    year: '2019',
    title: 'The Spark',
    description:
      'Our founder, Dr. Sarah Ahmed, publishes her first paper after months of struggling alone with research methodology. The idea for a structured platform is born.',
    icon: Lightbulb,
  },
  {
    year: '2021',
    title: 'First Cohort',
    description:
      'A small group of 12 medical students in Karachi completes the first Research Foundations Workshop. Three go on to publish within a year.',
    icon: Users,
  },
  {
    year: '2022',
    title: 'Programs Expand',
    description:
      'The Original Research Bootcamp and Systematic Review Masterclass are launched. Mentorship becomes the core of every program.',
    icon: Rocket,
  },
  {
    year: '2023',
    title: 'Community Forms',
    description:
      'The Journal Club and Campus Ambassador program launch. Res.Net becomes more than programs — it becomes a community of researchers.',
    icon: GraduationCap,
  },
  {
    year: '2024',
    title: 'Res.Net Today',
    description:
      'Over 500 students have completed our programs. Our alumni have published in international journals and secured research positions globally.',
    icon: Award,
  },
];

export function AboutPage() {
  return (
    <>
      <SEO
        title="About — Research Network (Res.Net)"
        description="Learn about Res.Net's mission to empower medical students through practical research education, mentorship, and collaboration."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            About Us
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            We Make Research Education Accessible
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Res.Net exists because quality research education should not be a privilege. We are
            building the platform we wish we had as students — structured, mentored, and built around
            real outputs.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Story"
            title="From Frustration to Platform"
            center={false}
          />
          <div className="mt-8 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            <p>
              In Pakistan, most medical students graduate without ever conducting original
              research. Not because they lack interest, but because research methodology is rarely
              taught systematically. Students who want to learn are left to figure it out alone —
              reading scattered resources, making avoidable mistakes, and often giving up before
              publishing.
            </p>
            <p>
              Our founder experienced this firsthand. The journey from first research question to
              first publication took over a year of trial and error. It did not have to be that
              hard.
            </p>
            <p>
              Res.Net was built to change this. We provide structured programs, experienced mentors,
              and a community of peers — so that every medical student with curiosity can become
              a published researcher. What started as a small workshop in Karachi has grown into a
              platform serving hundreds of students across Pakistan, with a vision to reach
              medical students globally.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8">
              <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-700 dark:text-white mb-3">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower medical students through practical research education, mentorship, and
                collaboration. We turn curiosity into capability, and capability into published
                science.
              </p>
            </Card>
            <Card className="p-8">
              <div className="h-12 w-12 rounded-xl bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-navy-600 dark:text-brand-400" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-navy-700 dark:text-white mb-3">
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A world where every medical student — regardless of geography or resources — has
                the education, mentorship, and community needed to contribute to medical science.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core Values"
            title="What We Stand For"
            description="Five principles that guide everything we build, teach, and do."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((value, i) => {
              const Icon = valueIcons[value.icon] || Award;
              return (
                <Card key={i} className="p-6 text-center">
                  <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-navy-700 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Timeline */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Founder Story"
            title="The Journey So Far"
            description="From one student with a question to a platform serving hundreds."
          />
          <div className="mt-14 relative">
            <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-px bg-navy-200 dark:bg-navy-600" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6">
                  <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 rounded-xl bg-navy-700 flex items-center justify-center z-10 shadow-md">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <Card className="flex-1 p-6">
                    <span className="text-sm font-heading font-bold text-brand-500 tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-navy-700 dark:text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

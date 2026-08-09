import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Accordion';
import { GraduationCap } from 'lucide-react';

const teamMembers = [
  {
    name: 'Hur Abbas',
    role: 'Founder',
    details: 'Final Year MBBS · Dow Medical College',
    image: '/CO_HUR.png',
  },
];

export function TeamPage() {
  return (
    <>
      <SEO
        title="Team — Research Network (Res.Net)"
        description="Meet the Res.Net team building the future of medical research education."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            Team
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            Meet Our Team
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            The people building Res.Net to make medical research education accessible, practical, and collaborative.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="p-8 text-center">
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
        </div>
      </section>
    </>
  );
}

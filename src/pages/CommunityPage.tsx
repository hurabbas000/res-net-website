import {
  Megaphone,
  Calendar,
  MessageCircle,
  Users,
  ArrowRight,
  Globe,
  HeartHandshake,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Accordion';

const communityLinks = [
  {
    name: 'WhatsApp Group',
    description: 'Join our WhatsApp community group for daily discussions, resource sharing, and quick questions.',
    href: 'https://chat.whatsapp.com/HJIzKVk4CkY2Q2XcXAoAYN',
    icon: MessageCircle,
    color: 'bg-brand-600',
    cta: 'Join WhatsApp',
  },
];

export function CommunityPage() {
  return (
    <>
      <SEO
        title="Community — Research Network (Res.Net)"
        description="Join the Res.Net community — mentorship program, campus ambassador program, monthly meetings, and our WhatsApp group."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            Community
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            Research Is Better Together
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Join a growing community of medical students who learn, discuss, and collaborate on
            research. From mentorship to ambassador programs — there is a place for you here.
          </p>
        </div>
      </section>

      {/* Mentorship Program */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <HeartHandshake className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="font-heading font-bold text-3xl text-navy-700 dark:text-white">
                Mentorship Program
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Become a Res.Net Mentor and help guide the next generation of medical student
                researchers. Mentors share their research experience, support mentees throughout
                their research journey, and help them develop the skills and confidence to learn,
                research, and publish.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Applicants should have experience in conducting and publishing research, strong
                communication skills, and a willingness to guide and support others. This is an
                opportunity to strengthen your mentoring and leadership skills, give back to the
                research community, and make a meaningful impact on aspiring researchers.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Applications are currently open.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Mail us your CV at{' '}
                <a href="mailto:contactresnet1@gmail.com" className="text-brand-500 hover:text-brand-600 underline">
                  contactresnet1@gmail.com
                </a>
              </p>
              <div className="mt-6">
                <a
                  href="mailto:contactresnet1@gmail.com?subject=Mentorship Program — CV Submission"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 transition-all"
                >
                  Send Your CV <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            <Card className="p-8 bg-gradient-to-br from-navy-50 to-brand-50 dark:from-navy-800 dark:to-navy-700">
              <div className="flex items-center gap-3 mb-4">
                <HeartHandshake className="h-5 w-5 text-brand-500" />
                <span className="font-heading font-semibold text-navy-700 dark:text-white">
                  Mentor Benefits
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  'Paid mentorship position with Res.Net',
                  'Certificate & letter of appreciation recognizing your contribution',
                  'Build your teaching and mentoring experience',
                  'Priority access to research collaboration opportunities',
                  'Expand your professional network within the Res.Net community',
                  'Opportunity to lead and contribute to research education initiatives',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mt-0.5">
                      <ArrowRight className="h-3 w-3 text-brand-500" />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Ambassador */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Card className="p-8 bg-gradient-to-br from-navy-50 to-brand-50 dark:from-navy-800 dark:to-navy-700 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Megaphone className="h-5 w-5 text-brand-500" />
                <span className="font-heading font-semibold text-navy-700 dark:text-white">
                  Ambassador Benefits
                </span>
              </div>
              <ul className="space-y-3">
                {[
                  'Exclusive Discounts on RES.NET Workshops & Programs',
                  'Certificate & letter of appreciation recognizing your contribution',
                  'Direct mentorship from the Res.Net team',
                  'Priority access to research collaboration opportunities',
                  'Build your network across medical institutions',
                  'Develop leadership experience as a Res.Net representative on your campus',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mt-0.5">
                      <ArrowRight className="h-3 w-3 text-brand-500" />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <div className="lg:order-1">
              <div className="h-12 w-12 rounded-xl bg-navy-100 dark:bg-navy-700 flex items-center justify-center mb-4">
                <Megaphone className="h-6 w-6 text-navy-600 dark:text-brand-400" />
              </div>
              <h2 className="font-heading font-bold text-3xl text-navy-700 dark:text-white">
                Campus Ambassador Program
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Become a Res.Net Ambassador at your institution and help build a stronger research community on your campus. Ambassadors represent Res.Net locally, organize study groups, share research resources, and connect fellow students with our programs and community.
                It's an opportunity to develop leadership and communication skills, strengthen your CV, and help your peers take their first steps in research. 

              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Applications are currently open.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Mail us your CV at{' '}
                <a href="mailto:contactresnet1@gmail.com" className="text-brand-500 hover:text-brand-600 underline">
                  contactresnet1@gmail.com
                </a>
              </p>
              <div className="mt-6">
                <a
                  href="mailto:contactresnet1@gmail.com?subject=Campus Ambassador Application"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 transition-all"
                >
                  Send Your CV <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Join Links */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Join Now"
            title="Get Connected"
            description="Join the conversation today."
          />
          <div className="mt-10 max-w-md mx-auto">
            {communityLinks.map((link) => (
              <Card key={link.name} hover className="p-8 text-center">
                <div className={`h-14 w-14 rounded-2xl ${link.color} flex items-center justify-center mx-auto mb-4`}>
                  <link.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-navy-700 dark:text-white mb-2">
                  {link.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {link.description}
                </p>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-navy-700 text-white hover:bg-navy-600 px-6 py-3 transition-all"
                >
                  {link.cta} <ArrowRight className="h-5 w-5" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

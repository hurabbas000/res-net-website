import {
  BookOpen,
  Megaphone,
  Calendar,
  MessageCircle,
  Users,
  ArrowRight,
  Globe,
  Video,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Accordion';

const communityLinks = [
  {
    name: 'WhatsApp Group',
    description: 'Join our WhatsApp community for daily discussions, resource sharing, and quick questions.',
    href: 'https://wa.me/923000000000',
    icon: MessageCircle,
    color: 'bg-brand-600',
    cta: 'Join WhatsApp',
  },
  {
    name: 'Discord Server',
    description: 'Our Discord server has channels for each program, journal club discussions, and study groups.',
    href: 'https://discord.gg/resnet',
    icon: Users,
    color: 'bg-navy-700',
    cta: 'Join Discord',
  },
];

export function CommunityPage() {
  return (
    <>
      <SEO
        title="Community — Research Network (Res.Net)"
        description="Join the Res.Net community — journal club, campus ambassador program, monthly meetings, and our WhatsApp and Discord groups."
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
            research. From journal clubs to ambassador programs — there is a place for you here.
          </p>
        </div>
      </section>

      {/* Journal Club */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="font-heading font-bold text-3xl text-navy-700 dark:text-white">
                Journal Club
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Our monthly Journal Club is where we dissect a landmark paper together. One paper,
                one hour, one lively discussion. A facilitator walks through the methodology, results,
                and implications — then the floor opens for questions and debate.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Critical appraisal practice with real papers',
                  'Live discussion with students across institutions',
                  'Facilitated by experienced researchers',
                  ' recordings available for members',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mt-0.5">
                      <ArrowRight className="h-3 w-3 text-brand-500" />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8 bg-gradient-to-br from-navy-50 to-brand-50 dark:from-navy-800 dark:to-navy-700">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-5 w-5 text-brand-500" />
                <span className="font-heading font-semibold text-navy-700 dark:text-white">
                  Next Session
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-navy-700 dark:text-white">
                "Efficacy and Safety of COVID-19 Vaccines: A Living Systematic Review"
              </h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                Published in The BMJ · Discussion led by Dr. Sarah Ahmed
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Video className="h-4 w-4" /> Online (Zoom)
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> Last Friday of every month
                </span>
              </div>
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
                  'Free access to one Workshops program per semester',
                  'Certificate of leadership and community building',
                  'Direct mentorship from the Res.Net team',
                  'Priority for research collaboration opportunities',
                  'Build your network across medical institutions',
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
                Become a Res.Net ambassador at your institution. Ambassadors are the face of Res.Net
                on their campus — they organize local study groups, share resources, and connect
                fellow students to our programs and community.
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                It is a leadership opportunity that builds your CV while helping your peers discover
                research. We accept ambassadors twice a year, in spring and fall.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:hello@resnet.org?subject=Campus Ambassador Application"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 transition-all"
                >
                  Apply to Be an Ambassador <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Meetings */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Monthly Meetings"
            title="Connect Every Month"
            description="Regular community gatherings to learn, share, and grow together."
          />
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: 'First Friday',
                desc: 'Journal Club — critical appraisal of a landmark paper.',
              },
              {
                icon: Users,
                title: 'Second Saturday',
                desc: 'Community Meetup — progress sharing, peer feedback, and networking.',
              },
              {
                icon: Globe,
                title: 'Last Thursday',
                desc: 'Guest Speaker — researchers and clinicians share their journey.',
              },
            ].map((meeting, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-4">
                  <meeting.icon className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="font-heading font-semibold text-navy-700 dark:text-white mb-2">
                  {meeting.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {meeting.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Links */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Join Now"
            title="Get Connected"
            description="Pick your preferred platform and join the conversation today."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
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

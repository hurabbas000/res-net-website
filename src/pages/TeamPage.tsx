import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import HurAbbas from '@/Team_member_pictures/HurAbbas.png';
import YashfeenZehra from '@/Team_member_pictures/Yashfeen_zehra.png';
import MaheenFatima from '@/Team_member_pictures/Maheen_fatima.png';
import MurtazaHaider from '@/Team_member_pictures/Murtaza_haider.png';
import RameenShafqat from '@/Team_member_pictures/Rameen_Shafqat.png';
import AishaArshad from '@/Team_member_pictures/Aisha_Arshad.png';
import JariHaider from '@/Team_member_pictures/Jari_Haider.png';

const founder = {
  name: 'Hur Abbas',
  role: 'Founder',
  details: 'Final-Year MBBS, Dow Medical College',
  bio: 'Medical researcher and educator with experience in systematic reviews, meta-analyses, clinical research, and AI in healthcare.',
  image: HurAbbas,
  links: [
    {
      label: 'ResearchGate',
      href: 'https://www.researchgate.net/profile/Hur-Abbas-3',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hur-abbas-zaidii/',
    },
    {
      label: 'Scholar',
      href: 'https://scholar.google.com/citations?user=ywrbvlIAAAAJ&hl=en',
    },
  ],
};

const teamMembers = [
  {
    name: 'Yashfeen Zehra',
    role: 'Product & Tech Lead',
    details: 'Computer Science Graduate, Habib University',
    image: YashfeenZehra,
  },
  {
    name: 'Maheen Fatima',
    role: 'Marketing Associate',
    details: '1st Year MBBS, Karachi Medical and Dental College',
    image: MaheenFatima,
  },
  {
    name: 'Murtaza Haider',
    role: 'Marketing Associate',
    details: '1st Year MBBS, Karachi Medical and Dental College',
    image: MurtazaHaider,
  },
  {
    name: 'Rameen Shafqat',
    role: 'Marketing Associate',
    details: '1st Year MBBS, Karachi Medical and Dental College',
    image: RameenShafqat,
  },
  {
    name: 'Aisha Arshad',
    role: 'Marketing Associate',
    details: '1st Year MBBS, Karachi Medical and Dental College',
    image: AishaArshad,
  },
  {
    name: 'Jari Haider',
    role: 'Outreach Associate',
    details: '1st Year MBBS, Sindh Medical College',
    image: JariHaider,
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Card className="p-8 text-center mx-auto max-w-md">
              <h2 className="font-heading font-bold text-2xl text-navy-700 dark:text-white mb-6">
                Meet the Founder
              </h2>
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 mx-auto flex items-center justify-center mb-6 border-2 border-brand-200 dark:border-brand-700 shadow-lg overflow-hidden">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span className="text-sm font-heading font-semibold tracking-wider uppercase text-brand-500">
                {founder.role}
              </span>
              <h3 className="font-heading font-bold text-xl text-navy-700 dark:text-white mt-2">
                {founder.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                {founder.details}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {founder.bio}
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-5">
                {founder.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-heading font-semibold text-brand-500 hover:text-brand-600 underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <Card key={i} className="p-8 text-center h-full">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/40 dark:to-brand-800/40 mx-auto flex items-center justify-center mb-6 border-2 border-brand-200 dark:border-brand-700 shadow-lg overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <span className="text-sm font-heading font-semibold tracking-wider uppercase text-brand-500">
                  {member.role}
                </span>
                <h3 className="font-heading font-bold text-xl text-navy-700 dark:text-white mt-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
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

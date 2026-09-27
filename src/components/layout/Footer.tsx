import { Logo } from '@/components/ui/Logo';
import { useRouter, type RouteName } from '@/context/RouterContext';
import { Mail, MessageCircle, Linkedin, Instagram, Facebook, Heart } from 'lucide-react';

const footerNav: { name: RouteName; label: string }[] = [
  { name: 'home', label: 'Home' },
  { name: 'academy', label: 'Workshops' },
  { name: 'community', label: 'Community' },
  { name: 'events', label: 'Events' },
  { name: 'contact', label: 'Contact' },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-navy-700 dark:bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img 
              src="/logo-horizontal-white.svg" 
              alt="Res.Net Logo" 
              className="h-10 w-auto"
            />
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Learn. Research. Publish. A research education, mentorship, and community platform for
              medical students.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.name)}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a href="mailto:contactresnet1@gmail.com" className="hover:text-brand-400 transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" /> contactresnet1@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923323205579"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />+92 332 3205579
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/res-net1/', label: 'LinkedIn' },
                { Icon: Instagram, href: 'https://www.instagram.com/researchnetwork1/', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/share/199XDN173G/', label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-navy-800 hover:bg-brand-600 transition-colors"
                >
                  <Icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Research Network (Res.Net). All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 text-accent-500 fill-current" /> for medical
            researchers
          </p>
        </div>
      </div>
    </footer>
  );
}

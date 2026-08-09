import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useRouter, type RouteName } from '@/context/RouterContext';
import { useTheme } from '@/context/ThemeContext';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/LinkButton';

const navItems: { name: RouteName; label: string }[] = [
  { name: 'home', label: 'Home' },
  { name: 'academy', label: 'Workshops' },
  { name: 'community', label: 'Community' },
  { name: 'resources', label: 'Resources' },
  { name: 'team', label: 'Team' },
  { name: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (to: RouteName) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  route === item.name
                    ? 'text-navy-700 dark:text-white bg-navy-50 dark:bg-navy-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-navy-700 dark:hover:text-white hover:bg-navy-50/70 dark:hover:bg-navy-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg text-navy-600 dark:text-gray-300 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <div className="hidden lg:block">
              <LinkButton to="academy" params={{ program: 'foundations' }} variant="accent" size="sm">
                Start Your Journey
              </LinkButton>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-lg text-navy-700 dark:text-gray-200 hover:bg-navy-50 dark:hover:bg-navy-800"
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-navy-50 dark:border-navy-800 bg-white dark:bg-navy-900 animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.name)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  route === item.name
                    ? 'text-navy-700 dark:text-white bg-navy-50 dark:bg-navy-800'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-navy-50 dark:hover:bg-navy-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <LinkButton to="academy" variant="accent" size="md" className="w-full">
                Start Your Journey
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

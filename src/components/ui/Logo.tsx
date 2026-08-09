import { useRouter } from '@/context/RouterContext';
import { useTheme } from '@/context/ThemeContext';

export function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  const { navigate } = useRouter();
  const { theme } = useTheme();

  return (
    <button
      onClick={() => navigate('home')}
      className={`flex items-center gap-3 group ${className}`}
      aria-label="Res.Net home"
    >
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
        theme === 'dark' ? 'bg-white' : 'bg-navy-700'
      }`}>
        <img
          src={theme === 'dark' ? '/rn-stroke-navy.svg' : '/rn-stroke-white.svg'}
          alt="Res.Net Logo"
          className="h-8 w-8"
        />
      </div>
      {showText && (
        <span className="font-heading font-bold text-xl text-navy-700 dark:text-white tracking-tight">
          Res<span className="text-brand-600">.Net</span>
        </span>
      )}
    </button>
  );
}

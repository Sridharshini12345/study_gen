import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { icon: 'h-7 w-7', text: 'text-lg', spark: 'h-3 w-3' },
  md: { icon: 'h-9 w-9', text: 'text-xl', spark: 'h-3.5 w-3.5' },
  lg: { icon: 'h-12 w-12', text: 'text-2xl', spark: 'h-5 w-5' },
};

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const s = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn('relative flex items-center justify-center', s.icon)}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-full w-full"
          aria-label="AI StudyGen logo"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="hsl(239 84% 67%)" />
              <stop offset="50%" stopColor="hsl(280 65% 60%)" />
              <stop offset="100%" stopColor="hsl(198 93% 60%)" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#logoGrad)" />
          <path
            d="M14 24c0-3 2-5 6-5s6 2 6 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="20" cy="14" r="3" fill="white" opacity="0.95" />
          <path
            d="M20 17.5L20 22"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M12 14.5c1-0.5 2-0.5 3 0M25 14.5c1-0.5 2-0.5 3 0"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M29 11l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"
            fill="white"
            opacity="0.8"
          />
        </svg>
      </div>
      {showText && (
        <span className={cn('font-display font-bold tracking-tight', s.text)}>
          Study<span className="gradient-text">Gen</span>
        </span>
      )}
    </div>
  );
}

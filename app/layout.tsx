import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-context';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as UiToaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI StudyGen — Learn smarter. Learn your way.',
  description:
    'AI-powered adaptive learning that understands your knowledge level, learning goals, and weaknesses — then creates a personalized learning experience just for you.',
  keywords: [
    'AI learning',
    'adaptive learning',
    'AI tutor',
    'personalized education',
    'StudyGen',
    'EdTech',
  ],
  openGraph: {
    title: 'AI StudyGen — Learn smarter. Learn your way.',
    description:
      'Tell AI StudyGen what you want to learn. We adapt every lesson, explanation, quiz and revision plan to your knowledge level and learning goals.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <UiToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

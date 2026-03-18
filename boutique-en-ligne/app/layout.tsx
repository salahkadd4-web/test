import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SessionProvider from '@/components/client/SessionProvider'
import Header from '../components/client/Header'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Boutique en ligne',
  description: 'Votre boutique en ligne',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var theme = localStorage.getItem('theme');
              var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (theme === 'system' && systemDark) || (!theme && systemDark)) {
                document.documentElement.classList.add('dark');
              }
            })();
          `
        }} />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ThemeProvider>
          <SessionProvider>
            <Header />
            {children}
            <ThemeToggle />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/constants/site';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const calSans = localFont({
  src: './fonts/CalSans-SemiBold.woff',
  variable: '--font-cal-sans',
  weight: '600',
});

const publicoText = localFont({
  src: './fonts/PublicoText-Roman-Web.woff',
  variable: '--font-publico-text',
  weight: '400',
});

const bentonSansRegular = localFont({
  src: './fonts/BentonSansForOmni-Regular.woff',
  variable: '--font-benton-sans',
  weight: '400',
});

const bentonSansBold = localFont({
  src: './fonts/BentonSansForOmni-Bold.woff',
  variable: '--font-benton-sans',
  weight: '700',
});

const bentonSansMedium = localFont({
  src: './fonts/BentonSansForOmniDisplay-Medium.woff',
  variable: '--font-benton-sans',
  weight: '500',
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="sv" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${calSans.variable} ${publicoText.variable} ${bentonSansRegular.variable} ${bentonSansBold.variable} ${bentonSansMedium.variable} antialiased bg-dots`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-h-screen flex flex-col justify-between font-[family-name:var(--font-geist-sans)]">
              <Header />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

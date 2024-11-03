import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { siteConfig } from '@/constants/site';
import { cn } from '@/lib/utils';

const sfUiText = localFont({
  src: './fonts/SF-UI-Text-Regular.woff',
  variable: '--font-sf-ui-text',
  weight: '400',
});

const sfUiTextSemiBold = localFont({
  src: './fonts/SF-UI-Text-Semibold.woff',
  variable: '--font-sf-ui-text-semibold',
  weight: '600',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={cn(
            'antialiased bg-dots',
            sfUiText.variable,
            sfUiTextSemiBold.variable
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <NuqsAdapter>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <div className="min-h-screen flex flex-col justify-between font-[family-name:var(--font-sf-ui-text)]">
                  <Header />
                  <TooltipProvider>{children}</TooltipProvider>
                  <Footer />
                </div>
                <Toaster />
              </ThemeProvider>
            </NuqsAdapter>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

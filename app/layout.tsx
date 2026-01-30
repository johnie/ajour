import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const sfUiText = localFont({
  src: "./fonts/SF-UI-Text-Regular.woff",
  variable: "--font-sf-ui-text",
  weight: "400",
});

const sfUiTextSemiBold = localFont({
  src: "./fonts/SF-UI-Text-Semibold.woff",
  variable: "--font-sf-ui-text-semibold",
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: siteConfig.name,
  description: siteConfig.description,
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
            "bg-dots antialiased",
            sfUiText.variable,
            sfUiTextSemiBold.variable
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <NuqsAdapter>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <div className="flex min-h-screen flex-col justify-between font-[family-name:var(--font-sf-ui-text)]">
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

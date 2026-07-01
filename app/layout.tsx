import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageIntro } from "@/components/intro/page-intro";
import { LanguageProvider } from "@/components/providers/language-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ChatWidget } from "@/components/ui/chat-widget";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { siteConfig } from "@/data/site";
import { DEFAULT_LOCALE, tr } from "@/lib/i18n/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metaRole = tr(DEFAULT_LOCALE, siteConfig.role);
const metaTagline = tr(DEFAULT_LOCALE, siteConfig.tagline);

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${metaRole}`,
  description: metaTagline,
  openGraph: {
    title: `${siteConfig.name} — ${metaRole}`,
    description: metaTagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){return;}document.documentElement.classList.add("dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
      </head>
      <body className="relative min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <AuroraBackground />
            <div className="grain-overlay" aria-hidden />
            <ScrollProgress />
            <PageIntro>
              <div className="relative z-10 flex min-h-screen flex-col">
                <Header />
                <main className="mx-auto w-full max-w-5xl flex-1 px-6">
                  {children}
                </main>
                <Footer />
              </div>
            </PageIntro>
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

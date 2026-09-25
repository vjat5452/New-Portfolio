import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/assistant/ChatWidget";
import { profile } from "@/data/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const syne = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const serif = Instrument_Serif({ variable: "--font-serif-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.headline}`,
  description: profile.tagline,
  keywords: ["AI Engineer", "Full-Stack Developer", "Creative Web Developer", "Next.js", "RAG", "Qdrant", "Three.js", profile.name],
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: profile.name, description: profile.tagline },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ChatWidget />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

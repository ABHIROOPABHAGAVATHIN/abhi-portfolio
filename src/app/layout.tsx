import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { personal, social } from "@/data/portfolio";
import { siteUrl } from "@/lib/utils";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${personal.name} — ${personal.title}`;
const description =
  "Java backend developer and CSE student building event-driven systems with Spring Boot, RabbitMQ and Redis, and LLM-powered tools with Groq and Ollama.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Abhiroopa Bhagavathi",
    "Java backend developer",
    "Spring Boot",
    "RabbitMQ",
    "Redis",
    "Drools",
    "LLM integration",
    "Computer Science Engineering",
    "portfolio",
  ],
  authors: [{ name: personal.name, url: social.github }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    siteName: personal.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: personal.name,
      jobTitle: personal.title,
      email: `mailto:${personal.email}`,
      url: siteUrl,
      sameAs: [social.github, social.linkedin],
      address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressCountry: "IN" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "VSB College of Engineering Technical Campus",
      },
    },
    { "@type": "WebSite", name: `${personal.name} — Portfolio`, url: siteUrl },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

const description =
  "MindPersonas™ is the Human Identity Operating System™ — a proprietary framework that maps how human identity organizes, adapts, protects, performs, and evolves under changing conditions. Understand the architecture behind human behavior, communication, performance, and change.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mindpersonas.com"),
  title: {
    default: "MindPersonas™ | The Human Identity Operating System™",
    template: "%s | MindPersonas™",
  },
  description,
  applicationName: "MindPersonas™",
  keywords: [
    "MindPersonas",
    "Human Identity Operating System",
    "MPHIOS",
    "identity architecture",
    "human behavior",
    "Core Shadow Oracle",
    "personal development",
    "leadership performance",
    "Travis Fox",
    "Michelle Fox",
    "identity framework",
    "behavioral science",
  ],
  authors: [{ name: "Travis Fox" }, { name: "Michelle Fox" }],
  creator: "MindPersonas™",
  publisher: "MindPersonas™",
  category: "Personal Development",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://mindpersonas.com",
    siteName: "MindPersonas™",
    title: "MindPersonas™ | The Human Identity Operating System™",
    description,
    images: [
      { url: "/logo.png", width: 192, height: 192, alt: "MindPersonas™" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindPersonas™ | The Human Identity Operating System™",
    description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Warm up the booking-widget origins on every page load, so the moment
            a user lands on /connect or /booking the DNS + TLS handshake is already
            done and the iframe starts fetching instantly instead of cold. */}
        <link rel="preconnect" href="https://api.leadconnectorhq.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://link.msgsndr.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://link.msgsndr.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

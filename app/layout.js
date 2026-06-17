import { Bebas_Neue, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HydrationHandler from "@/components/layout/HydrationHandler";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fxsurya.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FXSurya | Funded Trader & Mentor",
    template: "%s | FXSurya",
  },
  description:
    "FXSurya is a professional forex and crypto prop firm trader, mentor, and capital partner. Join the Trader Family and learn to trade like a funded trader.",
  keywords: [
    "forex trading",
    "crypto trading",
    "prop firm",
    "trading mentor",
    "funded trader",
    "forex education",
    "trading course",
    "crypto signals",
    "forex signals",
    "trader family",
  ],
  authors: [{ name: "FXSurya" }],
  creator: "FXSurya",
  publisher: "FXSurya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "FXSurya",
    title: "FXSurya | Funded Trader & Mentor",
    description:
      "Professional forex and crypto prop firm trader and mentor. Join the Trader Family and learn to trade like a funded trader.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FXSurya - Funded Trader & Mentor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FXSurya | Funded Trader & Mentor",
    description:
      "Professional forex and crypto prop firm trader and mentor. Join the Trader Family!",
    images: ["/og-image.jpg"],
    creator: "@fxupdates_official",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "Finance & Trading",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${bebasNeue.variable} ${inter.variable} ${montserrat.variable} antialiased bg-background text-white`}
      >
        <HydrationHandler />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #1F1F1F",
            },
            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

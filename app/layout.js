import { Bebas_Neue, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HydrationHandler from "@/components/layout/HydrationHandler";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "FXSurya | Funded Trader & Mentor",
  description:
    "FXSurya is a professional forex and crypto prop firm trader, mentor, and capital partner. Join the Trader Family and learn to trade like a funded trader.",
  keywords: "forex trading, crypto trading, prop firm, trading mentor, funded trader",
  openGraph: {
    title: "FXSurya | Funded Trader & Mentor",
    description: "Professional forex and crypto prop firm trader and mentor.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
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
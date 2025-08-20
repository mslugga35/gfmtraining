import type { Metadata } from "next";
import { Karla, Old_Standard_TT, Bebas_Neue, Oswald, Rajdhani, Inter } from "next/font/google";
// import { ClerkProvider } from '@clerk/nextjs';  // Temporarily disabled until API keys are added
import "./globals.css";
import MeshGradientBackground from "./components/premium/MeshGradientBackground";
import LiquidCursor from "./components/premium/LiquidCursor";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800']
});

const oldStandardTT = Old_Standard_TT({
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
  weight: ['400', '700']
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ['400']
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700']
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "GFM Training Academy - Elite Baseball Training",
  description: "Professional Baseball & Softball Training Academy - Central Florida / South Atlanta",
  icons: {
    icon: '/gfm_logo.webp',
    shortcut: '/gfm_logo.webp',
    apple: '/gfm_logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Calendly Script */}
        <script
          type="text/javascript"
          src="https://assets.calendly.com/assets/external/widget.js"
          async
        />
      </head>
      <body
        className={`${karla.variable} ${oldStandardTT.variable} ${bebasNeue.variable} ${oswald.variable} ${rajdhani.variable} ${inter.variable} antialiased min-h-screen body-font`}
        style={{ backgroundColor: '#f5f5f5', color: 'rgb(0, 0, 0)' }}
        suppressHydrationWarning
      >
        <MeshGradientBackground />
        <LiquidCursor />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

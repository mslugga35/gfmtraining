import type { Metadata } from "next";
import { Karla, Old_Standard_TT, Bebas_Neue, Oswald, Rajdhani, Inter, Orbitron } from "next/font/google";
// import { ClerkProvider } from '@clerk/nextjs';  // Temporarily disabled until API keys are added
import "./globals.css";
import EliteNavigation from "./components/EliteNavigation";
import AnimationProvider from "./components/AnimationProvider";

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

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "GFM Training - ELITE Sports Academy | Championship Training",
  description: "🔥 ELITE Sports Academy where CHAMPIONS are forged. Professional Baseball & Softball Training with cutting-edge methods. Join 500+ Elite Athletes who trust GFM Training.",
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
        className={`${karla.variable} ${oldStandardTT.variable} ${bebasNeue.variable} ${oswald.variable} ${rajdhani.variable} ${inter.variable} ${orbitron.variable} antialiased min-h-screen body-font`}
        suppressHydrationWarning
      >
        <AnimationProvider>
          <EliteNavigation />
          <div className="relative">
            {children}
          </div>
        </AnimationProvider>
      </body>
    </html>
  );
}

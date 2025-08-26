import type { Metadata } from "next";
import { Karla, Old_Standard_TT, Bebas_Neue, Oswald, Rajdhani, Inter, Orbitron } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import "./globals-override.css";
// import EliteNavigation from "./components/EliteNavigation";
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
  title: "GFM Training Academy | Elite Baseball & Softball Training",
  description: "Elite Baseball & Softball Training Academy in Sanford, FL. Professional coaching with proven training methodologies. Where champions are forged.",
  icons: {
    icon: '/gfm_logo.webp',
    shortcut: '/gfm_logo.webp',
    apple: '/gfm_logo.webp',
  },
  metadataBase: new URL('https://www.gfmtraining.com'),
  openGraph: {
    title: 'GFM Training Academy - Elite Baseball & Softball Training',
    description: 'Professional baseball and softball training in Sanford, FL. Elite coaching, video analysis, and personalized development programs.',
    url: 'https://www.gfmtraining.com',
    siteName: 'GFM Training Academy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GFM Training Academy',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GFM Training Academy',
    description: 'Elite Baseball & Softball Training in Sanford, FL',
    images: ['/og-image.png'],
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
        className={`${karla.variable} ${oldStandardTT.variable} ${bebasNeue.variable} ${oswald.variable} ${rajdhani.variable} ${inter.variable} ${orbitron.variable} font-sans antialiased min-h-screen`}
        style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.sabinksanthosh.me'),
  title: {
    default: "Sabin K Santhosh | Digital Architect & Developer",
    template: "%s | Sabin K Santhosh",
  },
  description: "Portfolio of Sabin K Santhosh. A creative developer focused on crafting immersive web experiences and building digital empires.",
  keywords: ["Sabin K Santhosh", "Web Developer", "Software Engineer", "React Developer", "Next.js", "Portfolio"],
  authors: [{ name: "Sabin K Santhosh" }],
  creator: "Sabin K Santhosh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Sabin K Santhosh | Digital Architect & Developer",
    description: "Building digital empires with code. View my projects, skills, and professional experience.",
    siteName: "Sabin K Santhosh Portfolio",
    images: [{
      url: "/icon.png",
      width: 1200,
      height: 630,
      alt: "Sabin K Santhosh Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabin K Santhosh | Digital Architect",
    description: "Building digital empires with code. View my projects and professional experience.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

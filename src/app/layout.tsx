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
  description: "Portfolio of Sabin K Santhosh, a Full Stack Developer and Digital Architect based in Kerala. Engineering the web with elegant, scalable code.",
  keywords: ["Sabin K Santhosh", "Web Developer", "Software Engineer", "React Developer", "Next.js", "Portfolio", "Kerala"],
  authors: [{ name: "Sabin K Santhosh" }],
  creator: "Sabin K Santhosh",
  alternates: {
    canonical: "/",
  },
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
    site: "@sabinksanthosh",
    creator: "@sabinksanthosh",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "name": "Sabin K Santhosh",
                  "url": "https://www.sabinksanthosh.me",
                  "jobTitle": "Full Stack Developer",
                  "sameAs": [
                    "https://github.com/Empire-SK",
                    "https://linkedin.com/in/sabin-k-santhosh/",
                    "https://twitter.com/sabinksanthosh",
                    "https://instagram.com/sabinksanthosh",
                    "https://youtube.com/@sabinksanthosh",
                    "https://facebook.com/sabinksanthosh"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Sabin K Santhosh Portfolio",
                  "image": "https://www.sabinksanthosh.me/icon.png",
                  "url": "https://www.sabinksanthosh.me",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kottayam",
                    "addressRegion": "Kerala",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "WebSite",
                  "url": "https://www.sabinksanthosh.me",
                  "name": "Sabin K Santhosh",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.sabinksanthosh.me/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
        {/* Google Analytics Placeholder */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        {/* Facebook Pixel Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '123456789012345');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={{ display: 'none' }} aria-hidden="true">
          <a href="https://facebook.com/sabinksanthosh">Facebook</a>
          <a href="https://twitter.com/sabinksanthosh">Twitter</a>
          <a href="https://instagram.com/sabinksanthosh">Instagram</a>
          <a href="https://youtube.com/@sabinksanthosh">YouTube</a>
          <a href="https://linkedin.com/in/sabin-k-santhosh/">LinkedIn</a>
          <a href="https://github.com/Empire-SK">GitHub</a>
        </div>
        {children}
      </body>
    </html>
  );
}

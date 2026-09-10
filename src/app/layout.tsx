import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';
import { CombinedSchemas } from '@/components/schema/OrganizationSchema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexosingenieria.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e1a',
};

export const metadata: Metadata = {
  title: {
    default: 'Nexos Ingeniería SAS | Integración Tecnológica y Smart Buildings',
    template: '%s | Nexos Ingeniería SAS',
  },
  description:
    'Soluciones integrales de cableado estructurado, seguridad electrónica, eficiencia energética y audio/video para edificios inteligentes en Colombia. 20 años de experiencia.',
  keywords: [
    'cableado estructurado',
    'seguridad electrónica',
    'eficiencia energética',
    'audio y video',
    'smart buildings',
    'domótica',
    'Colombia',
  ],
  authors: [{ name: 'Nexos Ingeniería SAS' }],
  openGraph: {
    title: 'Nexos Ingeniería SAS | Smart Building Partner',
    description:
      'Transformamos espacios con tecnología integrada. Cableado estructurado, seguridad, eficiencia energética y AV.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'Nexos Ingeniería SAS',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexos Ingeniería SAS - Smart Building Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexos Ingeniería SAS',
    description: 'Integración tecnológica para edificios inteligentes en Colombia',
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
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-CO': siteUrl,
    },
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <CombinedSchemas />
        <GoogleAnalytics />

        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || gaId === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

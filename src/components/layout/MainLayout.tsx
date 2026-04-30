import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { StickyCTABar } from '@/components/layout/StickyCTABar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-bg-primary focus:rounded-lg focus:font-medium"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16 md:pt-20" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCTABar />
    </>
  );
}

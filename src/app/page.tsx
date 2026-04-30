import { Suspense } from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import CTASection from '@/components/sections/CTASection';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { DifferentiatorsSection } from '@/components/sections/DifferentiatorsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { empresaData } from '@/data/scraped-content';

export const metadata: Metadata = {
  title: 'Inicio',
  description: empresaData.descripcionCorta,
  openGraph: {
    title: 'Nexos Ingeniería SAS | Smart Building Partner',
    description: empresaData.descripcionCorta,
  },
};

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-8 bg-surface rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-surface rounded w-2/3 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-surface rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <ClientLogos />
      </Suspense>

      <Suspense
        fallback={<SectionSkeleton className="py-20 md:py-32 bg-bg-secondary" />}
      >
        <SolutionsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <DifferentiatorsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <CTASection />
    </>
  );
}

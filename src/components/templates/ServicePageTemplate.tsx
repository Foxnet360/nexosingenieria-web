'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  CheckCircle,
  Sparkle,
  ShieldCheck,
  Buildings,
  Question,
  CaretDown,
  Lightning,
  Clock,
  Certificate,
} from '@phosphor-icons/react';
import { Section } from '@/components/ui/Section';
import { ServiceCTASection } from '@/components/sections/CTASection';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { PartnersSection } from '@/components/sections/PartnersSection';

export interface ServiceFeature {
  title: string;
  description: string;
  tags?: string[];
}

export interface MetricChip {
  label: string;
  value: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServicePageProps {
  title: string;
  category?: string;
  description: string;
  heroImage?: string;
  metrics?: MetricChip[];
  benefits?: string[];
  features: ServiceFeature[];
  sectors?: Array<{
    title: string;
    description: string;
  }>;
  faqs?: ServiceFAQ[];
  partnerFilter?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function ServicePageTemplate({
  title,
  category = 'Solución de Ingeniería Especializada',
  description,
  heroImage = '/images/hero-soluciones.webp',
  metrics = [
    { label: 'Garantía de Fábrica', value: 'Hasta 25 Años' },
    { label: 'Normativa Técnica', value: 'ANSI/TIA / ISO' },
    { label: 'Soporte Continuo', value: '24/7 SLA' },
    { label: 'Certificación', value: 'Fluke DSX-8000' },
  ],
  benefits = [
    'Cumplimiento 100% de la normativa colombiana e internacional (RETIE, RTV, TIA/EIA).',
    'Escalabilidad modular para acompañar la expansión de tu infraestructura.',
    'Optimización de costos operacionales y reducción del consumo energético.',
    'Entrega completa de carpeta técnica con memoria, rotulado y planos As-Built.',
  ],
  features,
  sectors = [
    {
      title: 'Edificios Corporativos',
      description:
        'Conectividad ininterrumpida y control unificado para altas densidades de usuarios.',
    },
    {
      title: 'Salud & Clínicas',
      description: 'Infraestructura crítica con cero margen de falla y máxima seguridad.',
    },
    {
      title: 'Retail & Comercio',
      description: 'Gestión inteligente de energía, videovigilancia y comunicación multisitio.',
    },
    {
      title: 'Educación & Campus',
      description: 'Redes de alta velocidad y ambientes interactivos de aprendizaje.',
    },
  ],
  faqs = [
    {
      question: '¿Qué garantía ofrecen en las instalaciones?',
      answer:
        'Ofrecemos hasta 25 años de garantía extendida de fábrica en cableado estructurado certificado, además de garantía directa de Nexos Ingeniería en la mano de obra e integración.',
    },
    {
      question: '¿Se entrega certificación técnica del proyecto?',
      answer:
        'Sí. Todos nuestros proyectos incluyen pruebas certificadas con equipos Fluke Networks y entrega de carpeta técnica completa con planos As-Built en formato CAD/PDF.',
    },
    {
      question: '¿Cómo gestionan el mantenimiento post-entrega?',
      answer:
        'Contamos con planes SLA de mantenimiento preventivo y correctivo con atención 24/7 y tiempos de respuesta garantizados según la criticidad de la falla.',
    },
  ],
  partnerFilter,
  ctaText = 'Solicitar Cotización Técnica',
  ctaHref = '/cotizar',
}: ServicePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* 1. High-Impact Photographic Hero Section */}
      <section className="relative min-h-[58vh] flex items-end py-16 md:py-24 bg-bg-primary overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover object-center filter brightness-[0.38] contrast-110 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.12),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <AnimatedElement animation="fade-in">
              <Link
                href="/soluciones"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card/80 backdrop-blur-md border border-border text-accent text-sm font-medium mb-6 hover:border-accent/50 transition-all"
              >
                <ArrowLeft weight="light" size={16} />
                Volver al Portafolio de Soluciones
              </Link>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
                <Sparkle weight="bold" size={14} />
                {category}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={200}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight font-[family-name:var(--font-geist-sans)]">
                {title}
              </h1>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={300}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mb-8">
                {description}
              </p>
            </AnimatedElement>

            {/* Metrics Chips */}
            <AnimatedElement animation="slide-up" delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {metrics.map(m => (
                  <div
                    key={m.label}
                    className="bg-bg-card/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 text-center"
                  >
                    <p className="text-accent font-bold text-base font-mono">{m.value}</p>
                    <p className="text-text-muted text-xs uppercase tracking-wider font-medium">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={500}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-bg-primary font-bold rounded-xl shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all duration-200 text-base"
                >
                  {ctaText}
                </Link>
                <a
                  href="#subsistemas"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-bg-card/80 backdrop-blur-md border border-border text-text-primary font-medium rounded-xl hover:border-accent/40 transition-all text-base"
                >
                  Explorar Subsistemas ↓
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* 2. Executive Overview & Strategic Value Split */}
      <Section background="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <AnimatedElement animation="fade-in">
                <span className="text-accent text-xs font-semibold uppercase tracking-wider font-mono">
                  Por qué elegir a Nexos Ingeniería
                </span>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight font-[family-name:var(--font-geist-sans)]">
                  Ingeniería de Precisión Integrada a tus Objetivos de Negocio
                </h2>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={200}>
                <p className="text-text-secondary leading-relaxed">
                  No solo instalamos equipos; diseñamos la arquitectura digital de tu edificación
                  asegurando máxima continuidad operativa, seguridad y eficiencia energética durante
                  todo el ciclo de vida de la propiedad.
                </p>
              </AnimatedElement>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 bg-bg-card border border-border p-4 rounded-xl">
                  <Certificate weight="bold" size={24} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-text-primary font-semibold text-sm mb-1">
                      Garantía Extendida
                    </h4>
                    <p className="text-text-muted text-xs">
                      Respaldo directo de marcas líderes internacionales.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-bg-card border border-border p-4 rounded-xl">
                  <Clock weight="bold" size={24} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-text-primary font-semibold text-sm mb-1">
                      Disponibilidad SLA 24/7
                    </h4>
                    <p className="text-text-muted text-xs">
                      Atención rápida a contingencias operacionales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <AnimatedElement animation="slide-up" delay={300}>
                <div className="bg-bg-card border border-accent/30 rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-accent/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />
                  <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                    <ShieldCheck weight="fill" size={24} className="text-accent" />
                    Beneficios Estratégicos Garantizados
                  </h3>
                  <ul className="space-y-4">
                    {benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-text-secondary text-sm">
                        <CheckCircle
                          weight="fill"
                          size={20}
                          className="text-accent shrink-0 mt-0.5"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Subsystems & Technical Capabilities Grid */}
      <section id="subsistemas">
        <Section background="default" padding="xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <AnimatedElement animation="fade-in">
                <span className="text-accent font-medium tracking-wide uppercase text-xs font-mono">
                  Alcance & Subsistemas
                </span>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 font-[family-name:var(--font-geist-sans)]">
                  Capacidades Técnicas e Integración
                </h2>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={200}>
                <p className="text-text-secondary mt-4 text-base">
                  Cada componente es seleccionado e integrado para ofrecer el máximo rendimiento
                  operativo.
                </p>
              </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <AnimatedElement key={feature.title} animation="slide-up" delay={(idx % 6) * 80}>
                  <div className="bg-bg-card border border-border/90 rounded-2xl p-7 h-full flex flex-col justify-between hover:border-accent/50 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-accent/5 group">
                    <div>
                      <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center mb-5 text-accent group-hover:scale-110 transition-transform">
                        <Lightning weight="bold" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary mb-3 font-[family-name:var(--font-geist-sans)] group-hover:text-accent transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed text-sm mb-4">
                        {feature.description}
                      </p>
                    </div>

                    {feature.tags && feature.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
                        {feature.tags.map(t => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-bg-secondary text-text-muted text-xs font-mono border border-border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* 4. Sector Applications */}
      <Section background="secondary" padding="xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <AnimatedElement animation="fade-in">
              <span className="text-accent font-medium tracking-wide uppercase text-xs font-mono">
                Casos de Uso Multi-Sector
              </span>
            </AnimatedElement>
            <AnimatedElement animation="slide-up" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 font-[family-name:var(--font-geist-sans)]">
                Adaptado a la Realidad de tu Industria
              </h2>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((s, idx) => (
              <AnimatedElement key={s.title} animation="slide-up" delay={idx * 100}>
                <div className="bg-bg-card border border-border rounded-xl p-6 h-full hover:border-accent/40 transition-colors">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-accent">
                    <Buildings weight="light" size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 font-[family-name:var(--font-geist-sans)]">
                    {s.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{s.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Embedded Manufacturer Partners */}
      <PartnersSection serviceFilter={partnerFilter || title} />

      {/* 6. Technical FAQ Accordion */}
      {faqs && faqs.length > 0 && (
        <Section background="default" padding="xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AnimatedElement animation="fade-in">
                <span className="text-accent font-medium tracking-wide uppercase text-xs font-mono">
                  Resolvemos tus dudas
                </span>
              </AnimatedElement>
              <AnimatedElement animation="slide-up" delay={100}>
                <h2 className="text-3xl font-bold text-text-primary mt-2 font-[family-name:var(--font-geist-sans)]">
                  Preguntas Frecuentes sobre {title}
                </h2>
              </AnimatedElement>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <AnimatedElement key={idx} animation="slide-up" delay={idx * 80}>
                    <div className="bg-bg-card border border-border rounded-xl overflow-hidden transition-colors">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="text-text-primary font-semibold text-base pr-4 flex items-center gap-3">
                          <Question weight="bold" size={20} className="text-accent shrink-0" />
                          {faq.question}
                        </span>
                        <CaretDown
                          weight="bold"
                          size={18}
                          className={`text-accent shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 text-text-secondary text-sm leading-relaxed border-t border-border/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </AnimatedElement>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* 7. Final Conversion CTA */}
      <ServiceCTASection serviceName={title} />
    </>
  );
}

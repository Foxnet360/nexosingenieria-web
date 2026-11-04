import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { AnimatedElement } from '@/components/ui/AnimatedElement';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { Icon } from '@/components/ui/Icon';
import { notFound } from 'next/navigation';
import { ArticleSchema } from '@/components/schema/OrganizationSchema';
import { blogPosts } from '@/data/blog';

export function generateStaticParams() {
  return Object.keys(blogPosts).map(slug => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return {
      title: 'Artículo no encontrado | Nexos Ingeniería SAS',
    };
  }
  return {
    title: `${post.title} | Nexos Ingeniería SAS`,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div>
      <ArticleSchema
        title={post.title}
        description={post.content.replace(/<[^>]*>/g, '').slice(0, 160)}
        slug={post.slug}
        date={post.date}
      />

      {/* Hero Photographic Banner */}
      <section className="relative min-h-[50vh] flex items-end pb-16 pt-28 overflow-hidden bg-bg-secondary border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
          <AnimatedElement animation="fade-in">
            <Link
              href="/blog"
              className="text-accent text-sm font-medium mb-6 inline-flex items-center gap-2 hover:underline bg-bg-primary/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border"
            >
              <Icon name="arrow-left" size="sm" />
              Volver al Blog
            </Link>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={100}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                {post.category}
              </span>
              <span className="text-text-muted text-xs">•</span>
              <span className="text-text-muted text-xs font-mono">{post.readTime} de lectura</span>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={200}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 font-[family-name:var(--font-geist-sans)] leading-tight">
              {post.title}
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={300}>
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              {post.author.avatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/40 shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-accent/20 border border-accent/40 rounded-full flex items-center justify-center font-bold text-accent text-sm tracking-wider shrink-0">
                  {post.author.initials}
                </div>
              )}
              <div>
                <p className="text-text-primary font-medium text-sm md:text-base">
                  {post.author.name}
                  <span className="text-text-muted font-normal text-xs ml-2">
                    ({post.author.role})
                  </span>
                </p>
                <time className="text-text-muted text-xs font-mono">
                  {new Date(post.date).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Section background="default" padding="xl">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement animation="slide-up">
            <article
              className="prose prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-headings:text-text-primary prose-headings:font-[family-name:var(--font-geist-sans)] prose-p:text-text-secondary prose-p:leading-relaxed prose-li:text-text-secondary prose-strong:text-accent prose-table:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedElement>

          {/* Author Card */}
          <div className="bg-bg-card border border-border rounded-2xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg shadow-black/20">
            {post.author.avatar ? (
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-accent/30 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center text-xl font-bold text-accent shrink-0">
                {post.author.initials}
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h4 className="text-text-primary font-bold text-base">{post.author.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
                  {post.author.role}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-3">{post.author.bio}</p>
              {post.author.linkedin && (
                <a
                  href={post.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
                >
                  <Icon name="linkedin-logo" size="sm" />
                  Perfil en LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <ShareButtons
              title={post.title}
              url={`https://nexosingenieria.com/blog/${post.slug}`}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

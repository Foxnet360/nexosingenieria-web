import { client } from './client';
import { safeSanityFetch, staticFallbacks } from './fetch';

export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    author,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

export const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category,
    tags,
    publishedAt,
    author,
    metaTitle,
    metaDescription,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180)
  }
`;

export const relatedPostsQuery = `
  *[_type == "post" && slug.current != $slug && category == $category] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
`;

export const servicesQuery = `
  *[_type == "service" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon,
    isPillar,
    "image": content[_type == "image"][0]
  }
`;

export const serviceQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon,
    isPillar,
    content,
    features,
    partners,
    metaTitle,
    metaDescription
  }
`;

export const pillarServicesQuery = `
  *[_type == "service" && isPillar == true] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`;

export const industriesQuery = `
  *[_type == "industry" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`;

export const industryQuery = `
  *[_type == "industry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon,
    content,
    solutions,
    caseStudies[]-> {
      _id,
      title,
      slug,
      client,
      coverImage
    },
    metaTitle,
    metaDescription
  }
`;

export const caseStudiesQuery = `
  *[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    industry,
    challenge,
    coverImage,
    results,
    publishedAt
  }
`;

export const caseStudyQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    industry,
    challenge,
    solution,
    results,
    testimonial,
    coverImage,
    publishedAt
  }
`;

export const leadMagnetsQuery = `
  *[_type == "leadMagnet" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    type,
    description,
    ctaText
  }
`;

export const leadMagnetQuery = `
  *[_type == "leadMagnet" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    description,
    content,
    formFields,
    downloadFile,
    ctaText,
    thankYouMessage
  }
`;

export async function getPosts() {
  return safeSanityFetch(postsQuery, {}, []);
}

export async function getPost(slug: string) {
  return safeSanityFetch(postQuery, { slug }, null);
}

export async function getRelatedPosts(slug: string, category: string) {
  return safeSanityFetch(relatedPostsQuery, { slug, category }, []);
}

export async function getServices() {
  return safeSanityFetch(servicesQuery, {}, staticFallbacks.services);
}

export async function getService(slug: string) {
  const fallback = staticFallbacks.services.find(s => s.slug.current === slug) || null;
  return safeSanityFetch(serviceQuery, { slug }, fallback);
}

export async function getPillarServices() {
  return safeSanityFetch(
    pillarServicesQuery,
    {},
    staticFallbacks.services.filter(s => s.isPillar)
  );
}

export async function getIndustries() {
  return safeSanityFetch(industriesQuery, {}, []);
}

export async function getIndustry(slug: string) {
  return safeSanityFetch(industryQuery, { slug }, null);
}

export async function getCaseStudies() {
  return safeSanityFetch(caseStudiesQuery, {}, staticFallbacks.projects);
}

export async function getCaseStudy(slug: string) {
  const fallback = staticFallbacks.projects.find(p => p.slug.current === slug) || null;
  return safeSanityFetch(caseStudyQuery, { slug }, fallback);
}

export async function getLeadMagnets() {
  return safeSanityFetch(leadMagnetsQuery, {}, []);
}

export async function getLeadMagnet(slug: string) {
  return safeSanityFetch(leadMagnetQuery, { slug }, null);
}

import { client } from './client'

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
`

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
`

export const relatedPostsQuery = `
  *[_type == "post" && slug.current != $slug && category == $category] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt
  }
`

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
`

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
`

export const pillarServicesQuery = `
  *[_type == "service" && isPillar == true] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

export const industriesQuery = `
  *[_type == "industry" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

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
`

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
`

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
`

export const leadMagnetsQuery = `
  *[_type == "leadMagnet" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    slug,
    type,
    description,
    ctaText
  }
`

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
`

export async function getPosts() {
  return client.fetch(postsQuery)
}

export async function getPost(slug: string) {
  return client.fetch(postQuery, { slug })
}

export async function getRelatedPosts(slug: string, category: string) {
  return client.fetch(relatedPostsQuery, { slug, category })
}

export async function getServices() {
  return client.fetch(servicesQuery)
}

export async function getService(slug: string) {
  return client.fetch(serviceQuery, { slug })
}

export async function getPillarServices() {
  return client.fetch(pillarServicesQuery)
}

export async function getIndustries() {
  return client.fetch(industriesQuery)
}

export async function getIndustry(slug: string) {
  return client.fetch(industryQuery, { slug })
}

export async function getCaseStudies() {
  return client.fetch(caseStudiesQuery)
}

export async function getCaseStudy(slug: string) {
  return client.fetch(caseStudyQuery, { slug })
}

export async function getLeadMagnets() {
  return client.fetch(leadMagnetsQuery)
}

export async function getLeadMagnet(slug: string) {
  return client.fetch(leadMagnetQuery, { slug })
}

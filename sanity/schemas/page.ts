export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'SEO title (max 60 chars)',
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'SEO description (max 160 chars)',
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
  ],
}

export default {
  name: 'industry',
  type: 'document',
  title: 'Industry',
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
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
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
    {
      name: 'solutions',
      type: 'array',
      title: 'Solutions',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Solution Title' },
            { name: 'description', type: 'text', title: 'Solution Description' },
          ],
        },
      ],
    },
    {
      name: 'caseStudies',
      type: 'array',
      title: 'Related Case Studies',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    },
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      validation: (Rule: any) => Rule.max(160),
    },
  ],
}

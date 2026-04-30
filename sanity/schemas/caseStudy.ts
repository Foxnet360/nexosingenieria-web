export default {
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
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
      name: 'client',
      type: 'string',
      title: 'Client Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'industry',
      type: 'string',
      title: 'Industry',
      options: {
        list: [
          { title: 'Corporativo', value: 'corporativo' },
          { title: 'Retail', value: 'retail' },
          { title: 'Salud', value: 'salud' },
          { title: 'Educación', value: 'educacion' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Residencial', value: 'residencial' },
        ],
      },
    },
    {
      name: 'challenge',
      type: 'text',
      title: 'Challenge',
      description: 'Describe the client problem',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'solution',
      type: 'array',
      title: 'Solution',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'results',
      type: 'array',
      title: 'Results',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'object',
      title: 'Testimonial',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote' },
        { name: 'author', type: 'string', title: 'Author' },
        { name: 'role', type: 'string', title: 'Role' },
      ],
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}

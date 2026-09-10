import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule: Rule) => rule.required().max(300),
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      description: 'Phosphor icon name (e.g., "Network", "Shield")',
    },
    {
      name: 'isPillar',
      type: 'boolean',
      title: 'Is Pillar Service',
      description: 'Mark as one of the 3 priority services',
      initialValue: false,
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Feature Title' },
            { name: 'description', type: 'text', title: 'Feature Description' },
          ],
        },
      ],
    },
    {
      name: 'partners',
      type: 'array',
      title: 'Partners/Manufacturers',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Partner Name' },
            { name: 'logo', type: 'image', title: 'Logo' },
          ],
        },
      ],
    },
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      validation: (rule: Rule) => rule.max(60),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      validation: (rule: Rule) => rule.max(160),
    },
  ],
});

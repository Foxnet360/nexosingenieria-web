import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'leadMagnet',
  type: 'document',
  title: 'Lead Magnet',
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
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Calculator', value: 'calculator' },
          { title: 'Assessment', value: 'assessment' },
          { title: 'Configurator', value: 'configurator' },
          { title: 'Guide', value: 'guide' },
        ],
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    },
    {
      name: 'formFields',
      type: 'array',
      title: 'Form Fields',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Field Name' },
            { name: 'label', type: 'string', title: 'Field Label' },
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: { list: ['text', 'email', 'number', 'select'] },
            },
            { name: 'required', type: 'boolean', title: 'Required', initialValue: false },
          ],
        },
      ],
    },
    {
      name: 'downloadFile',
      type: 'file',
      title: 'Download File',
    },
    {
      name: 'ctaText',
      type: 'string',
      title: 'CTA Button Text',
      initialValue: 'Descargar ahora',
    },
    {
      name: 'thankYouMessage',
      type: 'text',
      title: 'Thank You Message',
    },
  ],
});

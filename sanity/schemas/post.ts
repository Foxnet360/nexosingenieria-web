import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'post',
  type: 'document',
  title: 'Blog Post',
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
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      validation: (rule: Rule) => rule.max(200),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Cableado Estructurado', value: 'cableado-estructurado' },
          { title: 'Seguridad Electrónica', value: 'seguridad-electronica' },
          { title: 'Eficiencia Energética', value: 'eficiencia-energetica' },
          { title: 'Audio y Video', value: 'audio-video' },
          { title: 'Automatización', value: 'automatizacion' },
          { title: 'Centros de Datos', value: 'centros-de-datos' },
        ],
      },
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
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

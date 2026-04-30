export default {
  name: 'formSubmission',
  title: 'Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'service',
      title: 'Service Interest',
      type: 'string',
      options: {
        list: [
          { title: 'Cableado Estructurado', value: 'cableado' },
          { title: 'Seguridad Electrónica', value: 'seguridad' },
          { title: 'Eficiencia Energética', value: 'eficiencia' },
          { title: 'Audio y Video', value: 'audio-video' },
          { title: 'Domótica', value: 'domotica' },
          { title: 'Múltiples servicios', value: 'multiple' },
        ],
      },
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
    },
    {
      name: 'page',
      title: 'Form Page',
      type: 'string',
      options: {
        list: [
          { title: 'Contacto', value: 'contacto' },
          { title: 'Cotizar', value: 'cotizar' },
          { title: 'Newsletter', value: 'newsletter' },
        ],
      },
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Closed', value: 'closed' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }: { title: string; subtitle: string; status: string }) {
      return {
        title: `${title} (${status})`,
        subtitle,
      }
    },
  },
}

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { page } from './sanity/schemas'
import { post } from './sanity/schemas'
import { service } from './sanity/schemas'
import { industry } from './sanity/schemas'
import { caseStudy } from './sanity/schemas'
import { leadMagnet } from './sanity/schemas'
import { formSubmission } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'nexos-website',
  title: 'Nexos Ingeniería Website',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [page, post, service, industry, caseStudy, leadMagnet, formSubmission],
  },
})

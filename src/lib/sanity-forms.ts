import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-29';

// Sanity client with write token (only for server-side or API routes)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Needs to be set in environment
});

interface FormSubmissionData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  page: string;
}

export async function storeFormSubmission(data: FormSubmissionData) {
  try {
    const doc = {
      _type: 'formSubmission',
      name: data.name,
      email: data.email,
      company: data.company || '',
      phone: data.phone || '',
      service: data.service || '',
      message: data.message || '',
      page: data.page,
      submittedAt: new Date().toISOString(),
      status: 'new',
    };

    const result = await sanityClient.create(doc);
    return { success: true, id: result._id };
  } catch (error) {
    console.error('Error storing form submission:', error);
    return { success: false, error: 'Failed to store submission' };
  }
}

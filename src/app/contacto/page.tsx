import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ContactoForm from '@/components/contacto/ContactoForm';

export const metadata: Metadata = {
  title: pageMetadata.contacto.title,
  description: pageMetadata.contacto.description,
};

export default function ContactoPage() {
  return <ContactoForm />;
}

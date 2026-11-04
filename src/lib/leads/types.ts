export interface LeadInput {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  projectSize?: string;
  budget?: string;
  message?: string;
  page?: string;
}

export interface LeadMetadata {
  ip?: string;
  userAgent?: string;
}

export interface LeadRecord extends LeadInput {
  id: string;
  created_at: string;
  updated_at: string;
  email_status: 'pending' | 'sent' | 'failed';
  email_error?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface SaveLeadResult {
  success: boolean;
  id?: string;
  error?: string;
}

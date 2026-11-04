-- Nexos Ingeniería - Contact Leads Table
-- Schema for PostgreSQL on Railway

CREATE TABLE IF NOT EXISTS contact_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    page VARCHAR(50) NOT NULL DEFAULT 'Contacto',
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(255),
    project_size VARCHAR(100),
    budget VARCHAR(100),
    message TEXT,
    email_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    email_error TEXT,
    ip_address VARCHAR(100),
    user_agent TEXT
);

-- Indexes for efficient queries and analytics
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email_status ON contact_leads(email_status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_page ON contact_leads(page);

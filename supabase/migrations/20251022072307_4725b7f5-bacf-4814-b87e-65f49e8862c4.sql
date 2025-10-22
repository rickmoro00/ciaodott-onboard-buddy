-- Create table for onboarding submissions
CREATE TABLE public.onboarding_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Section 1: Center Info
  structure_name TEXT NOT NULL,
  address TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  main_phone TEXT NOT NULL,
  
  -- Section 2: Booking Flow
  patient_info JSONB NOT NULL DEFAULT '[]'::jsonb,
  communications JSONB DEFAULT '[]'::jsonb,
  greeting_type TEXT NOT NULL,
  custom_greeting TEXT,
  other_instructions TEXT,
  additional_options JSONB DEFAULT '[]'::jsonb,
  services_list_file TEXT,
  guidelines_file TEXT,
  dont_handle TEXT NOT NULL,
  
  -- Section 3: Call Forwarding
  call_forwarding_settings JSONB DEFAULT '{}'::jsonb,
  
  -- Section 4: Phone Integration
  pbx_type TEXT NOT NULL,
  main_call_number TEXT NOT NULL,
  forwarding_number TEXT NOT NULL,
  tech_contact_name TEXT NOT NULL,
  tech_contact_email TEXT NOT NULL,
  tech_contact_phone TEXT NOT NULL,
  external_provider TEXT,
  
  -- Section 5: Notifications
  notification_types JSONB DEFAULT '[]'::jsonb,
  notification_emails TEXT NOT NULL,
  patient_notification TEXT NOT NULL,
  whatsapp_message TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public submissions
CREATE POLICY "Anyone can submit onboarding form" 
ON public.onboarding_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public read access" 
ON public.onboarding_submissions 
FOR SELECT 
USING (true);

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('onboarding-documents', 'onboarding-documents', false);

CREATE POLICY "Upload documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'onboarding-documents');

CREATE POLICY "View documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'onboarding-documents');
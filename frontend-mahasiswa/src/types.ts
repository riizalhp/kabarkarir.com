// Types for Frontend Mahasiswa

export interface Internship {
  id: number;
  title: string;
  slug: string;
  company_name: string;
  company_slug?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  benefits?: string;
  duration?: string;
  location: string;
  province?: string;
  city?: string;
  is_remote: boolean;
  stipend?: string;
  application_url?: string;
  application_deadline?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  applicants_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface Scholarship {
  id: number;
  title: string;
  slug: string;
  provider_name: string;
  provider_logo?: string;
  description: string;
  eligibility: string;
  benefits: string;
  coverage: string;
  amount?: string;
  education_level: string;
  majors: string[];
  deadline?: string;
  application_url: string;
  countries: string[];
  duration?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  applicants_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface Competition {
  id: number;
  title: string;
  slug: string;
  organizer_name: string;
  organizer_logo?: string;
  description: string;
  category: string;
  prize_pool?: string;
  prizes?: string;
  eligibility?: string;
  registration_fee?: string;
  registration_deadline?: string;
  competition_date?: string;
  location?: string;
  is_online: boolean;
  registration_url: string;
  website_url?: string;
  contact_info?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  participants_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface Webinar {
  id: number;
  title: string;
  slug: string;
  host_name: string;
  host_logo?: string;
  speaker_name?: string;
  speaker_title?: string;
  speaker_photo?: string;
  description: string;
  topics: string[];
  date: string;
  duration?: string;
  platform?: string;
  registration_url: string;
  is_free: boolean;
  price?: string;
  max_participants?: number;
  certificate_available: boolean;
  recording_available: boolean;
  recording_url?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  registrants_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface CampusEvent {
  id: number;
  title: string;
  slug: string;
  university_name: string;
  university_logo?: string;
  event_type: string;
  description: string;
  date: string;
  end_date?: string;
  location?: string;
  address?: string;
  is_online: boolean;
  registration_required: boolean;
  registration_url?: string;
  is_free: boolean;
  ticket_price?: string;
  max_attendees?: number;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  poster_image?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  attendees_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

export interface FreelanceJob {
  id: number;
  title: string;
  slug: string;
  client_name?: string;
  description: string;
  requirements?: string;
  deliverables?: string;
  category: string;
  skills_required: string[];
  budget_min?: number;
  budget_max?: number;
  budget_currency: string;
  budget_type: string;
  duration?: string;
  location?: string;
  is_remote: boolean;
  experience_level: string;
  deadline?: string;
  application_url?: string;
  application_email?: string;
  posted_date: string;
  is_active: boolean;
  views_count: number;
  applicants_count: number;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  created_at: string;
}

// Shared types (from frontend-user)
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  posted_date: string;
  views_count: number;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
}

export interface MisiCuanOffer {
  id: number;
  title: string;
  slug: string;
  description: string;
  reward: string;
  difficulty: string;
  category: string;
  requirements: string[];
  steps: string[];
  deadline?: string;
  is_active: boolean;
}

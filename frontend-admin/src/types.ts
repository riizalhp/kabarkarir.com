export interface NavLink {
  name: string;
  href: string;
  isSpecial?: boolean;
  icon?: string;
}

export interface Category {
  name: string;
  count: number;
  icon: string;
  iconBgColor: string;
  iconTextColor: string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  jobsAvailable: number;
  type: 'BUMN' | 'SWASTA' | 'INSTANSI';
  website?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  companySlug?: string;
  logo?: string;
  location?: string;
  province?: string;
  city?: string;
  type?: string;
  category?: string;
  categoryColor?: 'blue' | 'green' | 'orange';
  description?: string;
  posted?: string;
  education?: string;
  qualifications?: string[];
  benefits?: string[];
  howToApply?: string;
  aboutCompany?: string; // Frontend field
  about_company?: string; // Database field
  experience?: string;
  tags?: string[];
  majors?: string[];
  pdfEmbedUrl?: string;
  videoEmbedUrl?: string;
  dueDate?: string;
  salaryRange?: string;
  slug?: string;
  is_active?: boolean;
  posted_date?: string;
  category_color?: string;
  salary_range?: string;
  how_to_apply?: string;
  due_date?: string;
  pdf_embed_url?: string;
  video_embed_url?: string;
}

export interface Company {
  name: string;
  logo: string;
  jobsAvailable: number;
}

export interface Article {
  id: number;
  title: string;
  posted: string;
}

export interface RecruitmentEvent {
  id: number;
  title: string;
  organizer: string;
  organizerSlug?: string;
  date: string;
  time: string;
  location: string;
  province: string;
  city: string;
  type: string;
  isFeatured: boolean;
  image: string;
  description: string;
  participatingCompanies?: { name: string; logo: string; slug?: string }[];
  availablePositions?: string[];
  whatToBring?: string[];
  mapEmbedUrl?: string;
  mapDirectionUrl?: string;
  pdfEmbedUrl?: string;
  videoEmbedUrl?: string;
}


export interface BlogPost {
  id: number;
  title: string;
  category: string;
  description?: string;
  content?: string;
  image?: string;
  posted?: string;
  categoryColor?: 'blue' | 'green' | 'orange'; // Frontend display only
}

export interface SubmissionField {
  id: number;
  label: string;
  type: 'text' | 'file' | 'url';
}

export interface MisiCuanOffer {
  id: number;
  company: string;
  companySlug: string;
  logo: string;
  title: string;
  time: string;
  expiryDate: string;
  description: string;
  quota: number;
  submissions: number;
  reward: string;
  details?: string;
  steps?: string[];
  submissionRequirement?: string;
  submissionFields?: SubmissionField[];
}

export interface PelatihanInfo {
  id: number;
  image: string;
  category: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string; // Short description for card
  fullDescription?: string; // Full description for detail page
  registrationLink: string;
  videoEmbedUrl?: string;
  pdfEmbedUrl?: string;
}

export interface Major {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface MisiSubmission {
  id: number;
  misiId: number;
  misiTitle: string;
  user: string;
  submissionDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  data: {
    fieldId: number;
    label: string;
    value: string | { fileName: string; url: string };
  }[];
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Content Manager';
}

export interface Activity {
  id: number;
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  category: 'Lowongan' | 'Artikel' | 'Perusahaan' | 'Event' | 'Misi';
  text: string;
  timestamp: Date;
}
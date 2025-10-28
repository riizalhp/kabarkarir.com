// User Frontend Types - Read-only data types for display
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
  view_count?: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  companySlug: string;
  logo: string;
  location: string;
  province: string;
  city: string;
  type: string;
  category: string;
  categoryColor: 'blue' | 'green' | 'orange';
  description: string;
  posted: string;
  education: string;
  qualifications: string[];
  benefits: string[];
  howToApply: string;
  aboutCompany: string;
  experience: string;
  tags: string[];
  majors?: string[];
  pdfEmbedUrl?: string;
  videoEmbedUrl?: string;
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
  view_count?: number;
}

export interface BlogPost {
  id: number;
  image: string;
  category: string;
  categoryColor: 'blue' | 'green' | 'orange';
  title: string;
  description: string;
  posted: string;
  content?: string;
  view_count?: number;
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
  description: string;
  fullDescription?: string;
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

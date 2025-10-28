import { Job, BlogPost, RecruitmentEvent, CompanyProfile, MisiCuanOffer } from '../types';

// Base URL configuration
export const SITE_URL = 'https://www.kabarkarir.com';
export const SITE_NAME = 'KabarKarir.com';
export const SITE_LOGO = `${SITE_URL}/logo.png`;

// Generate structured data for Organization
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Kabar Karir',
    url: SITE_URL,
    logo: SITE_LOGO,
    description: 'Portal lowongan kerja terpercaya di Indonesia dengan ribuan lowongan dari perusahaan BUMN, Swasta, dan Instansi',
    sameAs: [
      'https://www.facebook.com/kabarkarir',
      'https://www.instagram.com/kabarkarir',
      'https://www.linkedin.com/company/kabarkarir',
      'https://twitter.com/kabarkarir'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-xxx-xxxx-xxxx',
      contactType: 'customer service',
      areaServed: 'ID',
      availableLanguage: 'Indonesian'
    }
  };
};

// Generate structured data for Website
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
};

// Generate structured data for Job Posting
export const generateJobPostingSchema = (job: Job) => {
  const company = {
    name: job.company,
    logo: job.logo,
    slug: job.companySlug
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    identifier: {
      '@type': 'PropertyValue',
      name: SITE_NAME,
      value: job.id.toString()
    },
    datePosted: job.posted,
    validThrough: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    employmentType: job.type === 'Full Time' ? 'FULL_TIME' : job.type === 'Part Time' ? 'PART_TIME' : job.type === 'Intern' ? 'INTERN' : 'CONTRACTOR',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: `${SITE_URL}/perusahaan/${company.slug}`,
      logo: company.logo
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || job.location,
        addressRegion: job.province,
        addressCountry: 'ID'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'IDR',
      value: {
        '@type': 'QuantitativeValue',
        value: 0,
        unitText: 'MONTH'
      }
    },
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: job.education
    },
    qualifications: job.qualifications?.join(', '),
    skills: job.tags?.join(', '),
    url: `${SITE_URL}/lowongan/${job.id}/${generateSlug(job.title)}`
  };
};

// Generate structured data for Blog Article
export const generateArticleSchema = (article: BlogPost) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.posted,
    dateModified: article.posted,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.id}/${generateSlug(article.title)}`
    }
  };
};

// Generate structured data for Event
export const generateEventSchema = (event: RecruitmentEvent) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    image: event.image,
    startDate: `${event.date}T${event.time.split(' ')[0]}`,
    endDate: `${event.date}T${event.time.split('-')[1]?.trim().split(' ')[0] || event.time.split(' ')[0]}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.location.includes('Online') ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location.includes('Online') ? {
      '@type': 'VirtualLocation',
      url: `${SITE_URL}/event/${event.id}/${generateSlug(event.title)}`
    } : {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressRegion: event.province,
        addressCountry: 'ID'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: event.organizer,
      url: event.organizerSlug ? `${SITE_URL}/perusahaan/${event.organizerSlug}` : undefined
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/event/${event.id}/${generateSlug(event.title)}`
    }
  };
};

// Generate structured data for Company
export const generateCompanySchema = (company: CompanyProfile) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    logo: company.logo,
    url: `${SITE_URL}/perusahaan/${company.slug}`,
    aggregateRating: company.view_count ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: company.view_count
    } : undefined
  };
};

// Generate structured data for Misi Cuan Offer
export const generateMisiCuanSchema = (misi: MisiCuanOffer) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: misi.title,
    description: misi.description,
    price: misi.reward,
    priceCurrency: 'IDR',
    availability: misi.submissions < misi.quota ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    validThrough: misi.expiryDate,
    seller: {
      '@type': 'Organization',
      name: misi.company,
      url: `${SITE_URL}/perusahaan/${misi.companySlug}`
    },
    url: `${SITE_URL}/misi-cuan/${misi.id}/${generateSlug(misi.title)}`
  };
};

// Generate Breadcrumb structured data
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// Helper function to generate SEO-friendly slug
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Helper function to inject JSON-LD into page
export const injectJSONLD = (data: any) => {
  if (typeof window === 'undefined') return;

  // Remove existing JSON-LD scripts with the same type
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => {
    const scriptData = JSON.parse(script.textContent || '{}');
    if (scriptData['@type'] === data['@type']) {
      script.remove();
    }
  });

  // Create new script tag
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

// Helper function to update page meta tags
export const updateMetaTags = (meta: {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}) => {
  if (typeof window === 'undefined') return;

  // Update title
  if (meta.title) {
    document.title = meta.title;
    updateMetaTag('property', 'og:title', meta.title);
    updateMetaTag('property', 'twitter:title', meta.title);
  }

  // Update description
  if (meta.description) {
    updateMetaTag('name', 'description', meta.description);
    updateMetaTag('property', 'og:description', meta.description);
    updateMetaTag('property', 'twitter:description', meta.description);
  }

  // Update keywords
  if (meta.keywords) {
    updateMetaTag('name', 'keywords', meta.keywords);
  }

  // Update canonical
  if (meta.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = meta.canonical;
    updateMetaTag('property', 'og:url', meta.canonical);
    updateMetaTag('property', 'twitter:url', meta.canonical);
  }

  // Update OG image
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
    updateMetaTag('property', 'twitter:image', meta.ogImage);
  }

  // Update OG type
  if (meta.ogType) {
    updateMetaTag('property', 'og:type', meta.ogType);
  }
};

// Helper to update individual meta tag
const updateMetaTag = (attr: string, attrValue: string, content: string) => {
  let meta = document.querySelector(`meta[${attr}="${attrValue}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, attrValue);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

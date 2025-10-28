# SEO Implementation Guide

## Overview

This document describes the comprehensive SEO optimization implemented for KabarKarir.com, including meta tags, structured data (JSON-LD), robots.txt, sitemap.xml, and URL slug optimization.

## 1. Meta Tags (index.html)

### Primary Meta Tags

- **Title**: "KabarKarir.com - Lowongan Kerja BUMN & Swasta Terbaru" (49 characters)
- **Description**: SEO-optimized description (150 characters) with keywords
- **Keywords**: 20+ relevant Indonesian job search terms
- **Robots**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- **Canonical URL**: Self-referencing canonical to prevent duplicate content
- **Author**: KabarKarir.com
- **Publisher**: KabarKarir.com

### Open Graph Tags (Facebook)

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.kabarkarir.com/" />
<meta property="og:site_name" content="KabarKarir.com" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://www.kabarkarir.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="id_ID" />
```

### Twitter Card Tags

```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://www.kabarkarir.com/" />
<meta property="twitter:title" content="..." />
<meta property="twitter:description" content="..." />
<meta
  property="twitter:image"
  content="https://www.kabarkarir.com/twitter-image.jpg"
/>
```

### Additional Tags

- Apple Touch Icon: 180x180
- Favicon: Multiple sizes (32x32, 16x16)
- Theme Color: #3B82F6
- Alternate Language Tags: id, en

## 2. robots.txt

Location: `frontend-user/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login/
Disallow: /api/

Sitemap: https://www.kabarkarir.com/sitemap.xml
Crawl-delay: 1
```

**Purpose**:

- Allow all search engine crawlers
- Block admin, login, and API routes
- Reference sitemap for better indexing
- Polite crawl delay to prevent server overload

## 3. Sitemap.xml

### Static Sitemap

Location: `frontend-user/public/sitemap.xml`

Contains:

- Homepage (priority 1.0, daily)
- Static pages (about, blog, perusahaan, event, etc.)
- Job category pages
- Note for dynamic URLs

### Dynamic Sitemap Generator

Location: `frontend-user/src/utils/sitemapGenerator.ts`

**Features:**

- Fetches all published content from Supabase
- Generates XML with proper priorities and change frequencies
- Supports jobs, companies, events, blog posts, misi cuan, pelatihan
- Includes lastmod timestamps for better indexing

**Priority Scheme:**

- Homepage: 1.0 (daily)
- Job listings, companies, events: 0.7-0.9 (daily/weekly)
- Blog posts: 0.6 (monthly)
- Static pages: 0.4-0.7 (monthly/yearly)

**Usage:**

```typescript
import { generateSitemapXML, saveSitemap } from "./utils/sitemapGenerator";

// Generate sitemap XML
const xml = await generateSitemapXML();

// Save to file (for build process)
await saveSitemap("public/sitemap.xml");
```

## 4. Structured Data (JSON-LD)

Location: `frontend-user/src/utils/seo.ts`

### Available Schemas

#### 4.1 Organization Schema

```typescript
generateOrganizationSchema();
```

Used in: Homepage, About page
Purpose: Establish site as organization with contact info

#### 4.2 Website Schema

```typescript
generateWebsiteSchema();
```

Used in: Homepage
Purpose: Enable Google Search Box in SERPs

#### 4.3 JobPosting Schema

```typescript
generateJobPostingSchema(job: Job)
```

Used in: Job detail pages (`JobDetailPage.tsx`)
Fields:

- title, description, datePosted, validThrough
- employmentType (FULL_TIME, PART_TIME, INTERN, CONTRACTOR)
- hiringOrganization (company name, logo, URL)
- jobLocation (city, province, country)
- baseSalary, educationRequirements, qualifications, skills

#### 4.4 Article Schema

```typescript
generateArticleSchema(article: BlogPost)
```

Used in: Blog article pages (`ArticleDetailPage.tsx`)
Fields:

- headline, description, image, datePublished, dateModified
- author, publisher (with logo)
- mainEntityOfPage

#### 4.5 Event Schema

```typescript
generateEventSchema(event: RecruitmentEvent)
```

Used in: Event detail pages (`EventDetailPage.tsx`)
Fields:

- name, description, image, startDate, endDate
- eventStatus (EventScheduled)
- eventAttendanceMode (Online/Offline)
- location (VirtualLocation or Place)
- organizer, offers (price, availability)

#### 4.6 Company Schema

```typescript
generateCompanySchema(company: CompanyProfile)
```

Used in: Company profile pages (`CompanyDetailPage.tsx`)
Fields:

- name, description, logo, url
- aggregateRating (based on view_count)

#### 4.7 Misi Cuan Offer Schema

```typescript
generateMisiCuanSchema(misi: MisiCuanOffer)
```

Used in: Misi Cuan detail pages (`MisiDetailPage.tsx`)
Fields:

- name, description, price, priceCurrency
- availability (InStock/SoldOut)
- validThrough, seller, url

#### 4.8 Breadcrumb Schema

```typescript
generateBreadcrumbSchema(items: Array<{name: string, url: string}>)
```

Used in: All detail pages
Purpose: Show breadcrumb trail in Google search results

### Helper Functions

#### injectJSONLD(data)

Injects JSON-LD structured data into page `<head>`:

```typescript
import { injectJSONLD, generateJobPostingSchema } from "./utils/seo";

useEffect(() => {
  injectJSONLD(generateJobPostingSchema(job));
}, [job]);
```

#### updateMetaTags(meta)

Updates page-specific meta tags dynamically:

```typescript
import { updateMetaTags } from "./utils/seo";

useEffect(() => {
  updateMetaTags({
    title: `${job.title} - KabarKarir.com`,
    description: job.description.substring(0, 155),
    canonical: `https://www.kabarkarir.com/lowongan/${job.id}/${generateSlug(
      job.title
    )}`,
    ogImage: job.company_logo || job.banner,
    ogType: "article",
  });
}, [job]);
```

#### generateSlug(text)

Converts text to SEO-friendly URL slug:

```typescript
generateSlug("Staff Administrasi PT Pertamina");
// => "staff-administrasi-pt-pertamina"
```

## 5. SEO-Friendly URL Slugs

### Current Structure (Before)

- `/lowongan/123`
- `/perusahaan/45`
- `/event/67`
- `/blog/89`
- `/misi-cuan/12`

### Optimized Structure (After)

- `/lowongan/123/staff-administrasi-pt-pertamina`
- `/perusahaan/pt-pertamina-persero`
- `/event/67/job-fair-jakarta-2024`
- `/blog/89/tips-interview-kerja`
- `/misi-cuan/12/misi-cuan-bni-46`

### Benefits

- Better SEO rankings (keywords in URL)
- Improved user experience (descriptive URLs)
- Social media sharing (readable links)
- Better click-through rates in search results

### Implementation Notes

1. Slugs are generated using `generateSlug()` utility
2. ID is retained for database lookups
3. Router handles both formats for backwards compatibility
4. Slugs are unique and kebab-cased

## 6. Per-Page SEO Optimization

Each page type should implement:

### 6.1 Job Detail Page

```typescript
import {
  injectJSONLD,
  updateMetaTags,
  generateJobPostingSchema,
  generateBreadcrumbSchema,
} from "../utils/seo";

useEffect(() => {
  // Update meta tags
  updateMetaTags({
    title: `${job.title} - ${job.company} | KabarKarir.com`,
    description: `Lowongan ${job.title} di ${
      job.company
    }. ${job.description.substring(0, 100)}...`,
    keywords: `${job.title}, lowongan ${job.category}, ${job.company}, ${job.location}`,
    canonical: `https://www.kabarkarir.com/lowongan/${job.id}/${generateSlug(
      job.title
    )}`,
    ogImage: job.company_logo,
    ogType: "article",
  });

  // Inject JSON-LD
  injectJSONLD(generateJobPostingSchema(job));
  injectJSONLD(
    generateBreadcrumbSchema([
      { name: "Beranda", url: "https://www.kabarkarir.com/" },
      { name: "Lowongan Kerja", url: "https://www.kabarkarir.com/" },
      { name: job.title, url: window.location.href },
    ])
  );
}, [job]);
```

### 6.2 Company Page

```typescript
useEffect(() => {
  updateMetaTags({
    title: `${company.name} - Profil Perusahaan | KabarKarir.com`,
    description: company.description.substring(0, 155),
    canonical: `https://www.kabarkarir.com/perusahaan/${company.slug}`,
    ogImage: company.logo,
    ogType: "profile",
  });

  injectJSONLD(generateCompanySchema(company));
}, [company]);
```

### 6.3 Event Page

```typescript
useEffect(() => {
  updateMetaTags({
    title: `${event.title} | KabarKarir.com`,
    description: event.description.substring(0, 155),
    canonical: `https://www.kabarkarir.com/event/${event.id}/${generateSlug(
      event.title
    )}`,
    ogImage: event.image,
    ogType: "event",
  });

  injectJSONLD(generateEventSchema(event));
}, [event]);
```

### 6.4 Blog Article Page

```typescript
useEffect(() => {
  updateMetaTags({
    title: `${article.title} | Blog KabarKarir.com`,
    description: article.description,
    canonical: `https://www.kabarkarir.com/blog/${article.id}/${generateSlug(
      article.title
    )}`,
    ogImage: article.image,
    ogType: "article",
  });

  injectJSONLD(generateArticleSchema(article));
}, [article]);
```

## 7. Testing & Validation

### Tools to Use:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results

   - Validate JSON-LD structured data
   - Check for errors/warnings

2. **Google Search Console**:

   - Submit sitemap.xml
   - Monitor indexing status
   - Check for coverage issues

3. **Schema.org Validator**: https://validator.schema.org/

   - Validate structured data syntax

4. **PageSpeed Insights**: https://pagespeed.web.dev/

   - Check Core Web Vitals
   - SEO audit

5. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/

   - Test Open Graph tags

6. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Test Twitter Card tags

### Manual Checks:

```bash
# Check robots.txt
curl https://www.kabarkarir.com/robots.txt

# Check sitemap.xml
curl https://www.kabarkarir.com/sitemap.xml

# View page source
view-source:https://www.kabarkarir.com/lowongan/123/staff-admin
```

## 8. Best Practices

### Content Optimization

- Keep titles under 60 characters
- Keep descriptions between 120-155 characters
- Use keywords naturally in content
- Add alt text to all images
- Use heading hierarchy (H1, H2, H3)

### Technical SEO

- Ensure mobile responsiveness
- Optimize page load speed
- Use HTTPS everywhere
- Implement lazy loading for images
- Minimize CSS/JS files

### Schema Markup

- Always validate JSON-LD before deployment
- Keep structured data up-to-date
- Use most specific schema types available
- Include all required properties

### URL Structure

- Use hyphens, not underscores
- Keep URLs short and descriptive
- Avoid special characters
- Use lowercase letters only

## 9. Future Enhancements

### Recommended Additions:

1. **FAQ Schema**: For help pages
2. **Review Schema**: For company ratings
3. **HowTo Schema**: For CV building guide
4. **Video Schema**: For tutorial videos
5. **LocalBusiness Schema**: For office locations
6. **BreadcrumbList Schema**: Site-wide navigation
7. **SpeakableSpecification**: For voice search
8. **AMP Pages**: For mobile speed
9. **Hreflang Tags**: For multi-language support
10. **Canonical Pagination**: For category pages

### Performance Monitoring:

- Track keyword rankings
- Monitor click-through rates (CTR)
- Analyze bounce rates
- Check Core Web Vitals monthly
- Review Search Console regularly

## 10. Maintenance Checklist

### Weekly:

- [ ] Check Search Console for errors
- [ ] Monitor indexing status
- [ ] Review top performing pages

### Monthly:

- [ ] Update sitemap.xml
- [ ] Audit meta descriptions
- [ ] Check broken links
- [ ] Review keyword performance

### Quarterly:

- [ ] Full SEO audit
- [ ] Update structured data
- [ ] Review competitors
- [ ] Optimize underperforming pages

### Yearly:

- [ ] Major content refresh
- [ ] Update robots.txt rules
- [ ] Review entire SEO strategy
- [ ] Update schema markup standards

## Conclusion

This comprehensive SEO implementation provides a solid foundation for search engine visibility. Regular monitoring and updates are essential to maintain and improve rankings. Always prioritize user experience alongside technical SEO best practices.

For questions or updates, refer to:

- **SEO Utility**: `frontend-user/src/utils/seo.ts`
- **Sitemap Generator**: `frontend-user/src/utils/sitemapGenerator.ts`
- **Main HTML**: `frontend-user/index.html`
- **robots.txt**: `frontend-user/public/robots.txt`

import { supabase } from '../lib/supabase';
import { generateSlug } from './seo';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface DatabaseItem {
  id: number;
  title?: string;
  name?: string;
  slug?: string;
  created_at: string;
  updated_at?: string;
}

const SITE_URL = 'https://www.kabarkarir.com';

// Generate static URLs
const staticUrls: SitemapUrl[] = [
  { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
  { loc: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
  { loc: '/perusahaan', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
  { loc: '/event', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
  { loc: '/misi-cuan', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { loc: '/komunitas', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { loc: '/pasang-iklan', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/join-telegram', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { loc: '/favorites', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.5 },
  { loc: '/help', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { loc: '/privacy', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: 0.4 },
  { loc: '/terms', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: 0.4 }
];

// Category URLs
const categoryUrls: SitemapUrl[] = [
  'Teknologi', 'Keuangan', 'Marketing', 'Kesehatan', 'Pendidikan', 'Retail', 
  'Manufaktur', 'Logistik', 'Konstruksi', 'Media'
].map(category => ({
  loc: `/kategori/${category}`,
  lastmod: new Date().toISOString().split('T')[0],
  changefreq: 'daily' as const,
  priority: 0.8
}));

// Fetch dynamic job URLs
export const fetchJobUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('id, title, created_at, updated_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10000); // Adjust based on your needs

    if (error) throw error;

    return jobs?.map((job: DatabaseItem) => ({
      loc: `/lowongan/${job.id}/${generateSlug(job.title || 'job')}`,
      lastmod: job.updated_at || job.created_at,
      changefreq: 'weekly' as const,
      priority: 0.8
    })) || [];
  } catch (error) {
    console.error('Error fetching job URLs:', error);
    return [];
  }
};

// Fetch dynamic company URLs
export const fetchCompanyUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: companies, error } = await supabase
      .from('companies')
      .select('id, name, slug, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) throw error;

    return companies?.map((company: DatabaseItem) => ({
      loc: `/perusahaan/${company.slug || company.id}`,
      lastmod: company.updated_at || company.created_at,
      changefreq: 'monthly' as const,
      priority: 0.7
    })) || [];
  } catch (error) {
    console.error('Error fetching company URLs:', error);
    return [];
  }
};

// Fetch dynamic event URLs
export const fetchEventUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: events, error } = await supabase
      .from('recruitment_events')
      .select('id, title, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) throw error;

    return events?.map((event: DatabaseItem) => ({
      loc: `/event/${event.id}/${generateSlug(event.title || 'event')}`,
      lastmod: event.updated_at || event.created_at,
      changefreq: 'weekly' as const,
      priority: 0.7
    })) || [];
  } catch (error) {
    console.error('Error fetching event URLs:', error);
    return [];
  }
};

// Fetch dynamic blog URLs
export const fetchBlogUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('id, title, created_at, updated_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) throw error;

    return posts?.map((post: DatabaseItem) => ({
      loc: `/blog/${post.id}/${generateSlug(post.title || 'article')}`,
      lastmod: post.updated_at || post.created_at,
      changefreq: 'monthly' as const,
      priority: 0.6
    })) || [];
  } catch (error) {
    console.error('Error fetching blog URLs:', error);
    return [];
  }
};

// Fetch dynamic misi cuan URLs
export const fetchMisiCuanUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: misi, error } = await supabase
      .from('misi_cuan_offers')
      .select('id, title, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) throw error;

    return misi?.map((m: DatabaseItem) => ({
      loc: `/misi-cuan/${m.id}/${generateSlug(m.title || 'misi')}`,
      lastmod: m.updated_at || m.created_at,
      changefreq: 'weekly' as const,
      priority: 0.7
    })) || [];
  } catch (error) {
    console.error('Error fetching misi cuan URLs:', error);
    return [];
  }
};

// Fetch dynamic pelatihan URLs
export const fetchPelatihanUrls = async (): Promise<SitemapUrl[]> => {
  try {
    const { data: pelatihan, error } = await supabase
      .from('pelatihan')
      .select('id, title, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(10000);

    if (error) throw error;

    return pelatihan?.map((p: DatabaseItem) => ({
      loc: `/pelatihan/${p.id}/${generateSlug(p.title || 'pelatihan')}`,
      lastmod: p.updated_at || p.created_at,
      changefreq: 'monthly' as const,
      priority: 0.6
    })) || [];
  } catch (error) {
    console.error('Error fetching pelatihan URLs:', error);
    return [];
  }
};

// Generate complete sitemap XML
export const generateSitemapXML = async (): Promise<string> => {
  // Fetch all dynamic URLs in parallel
  const [jobUrls, companyUrls, eventUrls, blogUrls, misiUrls] = await Promise.all([
    fetchJobUrls(),
    fetchCompanyUrls(),
    fetchEventUrls(),
    fetchBlogUrls(),
    fetchMisiCuanUrls()
  ]);

  // Combine all URLs
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...jobUrls,
    ...companyUrls,
    ...eventUrls,
    ...blogUrls,
    ...misiUrls
  ];

  // Generate XML
  const urlsXML = allUrls.map(url => `
  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urlsXML}
</urlset>`;
};

// Function to save sitemap to file (for build process)
export const saveSitemap = async (filePath: string): Promise<void> => {
  const xml = await generateSitemapXML();
  // In browser, you can trigger download
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// API Endpoints
export const API_BASE_URL = SUPABASE_URL;

// Site Configuration
export const SITE_NAME = 'KabarKarir Mahasiswa';
export const SITE_URL = 'https://mahasiswa.kabarkarir.com';
export const MAIN_SITE_URL = 'https://kabarkarir.com';
export const ADMIN_SITE_URL = 'https://admin.kabarkarir.com';
export const LMS_SITE_URL = 'https://learn.kabarkarir.com';

// Social Media
export const TELEGRAM_LINK = 'https://t.me/kabarkarir';
export const WHATSAPP_LINK = 'https://wa.me/6281234567890';
export const INSTAGRAM_LINK = 'https://instagram.com/kabarkarir';

// SEO Defaults
export const DEFAULT_META_TITLE = 'KabarKarir Mahasiswa - Magang, Beasiswa, Lomba & Peluang Karir';
export const DEFAULT_META_DESCRIPTION = 'Platform lengkap untuk mahasiswa Indonesia. Temukan magang, beasiswa, lomba, webinar, freelance, dan peluang karir terbaik.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Pagination
export const ITEMS_PER_PAGE = 12;

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Site URLs
export const SITE_URL = 'https://learn.kabarkarir.com';
export const MAIN_SITE_URL = 'https://kabarkarir.com';
export const MAHASISWA_SITE_URL = 'https://mahasiswa.kabarkarir.com';
export const ADMIN_SITE_URL = 'https://admin.kabarkarir.com';

// SEO
export const SITE_NAME = 'KabarKarir Learn';
export const SITE_DESCRIPTION = 'Platform pembelajaran online terbaik di Indonesia. Akses ribuan kursus, video pelatihan, dan dapatkan sertifikat.';

// Social Media
export const TELEGRAM_LINK = 'https://t.me/kabarkarir';
export const INSTAGRAM_LINK = 'https://instagram.com/kabarkarir';

// Pagination
export const ITEMS_PER_PAGE = 12;

// Course Levels
export const COURSE_LEVELS = [
  { value: 'beginner', label: 'Pemula' },
  { value: 'intermediate', label: 'Menengah' },
  { value: 'advanced', label: 'Mahir' }
];

// Course Categories
export const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'UI/UX Design',
  'Digital Marketing',
  'Business',
  'Photography',
  'Video Editing',
  'Graphic Design',
  'Soft Skills'
];

// Video Player Config
export const VIDEO_PLAYER_CONFIG = {
  youtube: {
    width: '100%',
    height: '100%',
    allowFullScreen: true,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  },
  vimeo: {
    width: '100%',
    height: '100%',
    allowFullScreen: true,
    allow: 'autoplay; fullscreen; picture-in-picture'
  },
  drive: {
    width: '100%',
    height: '100%',
    allowFullScreen: true
  }
};

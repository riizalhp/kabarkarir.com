# KabarKarir Mahasiswa

Portal peluang karir untuk mahasiswa Indonesia - Magang, Beasiswa, Lomba, dan lebih banyak lagi.

## 🌐 Live URL

**https://mahasiswa.kabarkarir.com**

## 📋 Features

### Main Content Pages

- **Magang (Internship)** - Program magang dari berbagai perusahaan
- **Beasiswa (Scholarship)** - Beasiswa dalam dan luar negeri
- **Lomba (Competition)** - Kompetisi mahasiswa se-Indonesia
- **Webinar** - Webinar gratis dan berbayar
- **Event Kampus** - Acara dan event di kampus
- **Freelance** - Proyek freelance untuk mahasiswa
- **Blog & Artikel** - Tips dan panduan karir
- **Misi Cuan** - Program earning untuk mahasiswa

### Service Pages

- **Konsultasi Karir** - Career counseling gratis
- **Bangun CV** - CV builder dengan template profesional
- **Pasang Iklan** - Promosi program ke mahasiswa
- **Komunitas** - Grup Telegram mahasiswa

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Font Awesome 6.4.0
- **Deployment:** Vercel

## 📂 Project Structure

```
frontend-mahasiswa/
├── public/
│   ├── _redirects          # Vercel SPA routing
│   ├── robots.txt          # SEO crawler config
│   └── sitemap.xml         # Sitemap for search engines
├── src/
│   ├── components/         # All page components
│   │   ├── HomePage.tsx
│   │   ├── InternshipPage.tsx
│   │   ├── ScholarshipPage.tsx
│   │   ├── CompetitionPage.tsx
│   │   ├── WebinarPage.tsx
│   │   ├── CampusEventPage.tsx
│   │   ├── FreelancePage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── MisiCuanPage.tsx
│   │   ├── KonsulKarirPage.tsx
│   │   ├── BangunCVPage.tsx
│   │   ├── PasangIklanPage.tsx
│   │   ├── KomunitasPage.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Configuration constants
│   ├── Router.tsx          # Route definitions
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── index.html              # HTML template with SEO
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account with database setup

### 1. Install Dependencies

```powershell
cd frontend-mahasiswa
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get your Supabase credentials:**

1. Go to Supabase Dashboard > Settings > API
2. Copy `Project URL` → Use as `VITE_SUPABASE_URL`
3. Copy `anon public` key → Use as `VITE_SUPABASE_ANON_KEY`

### 3. Database Setup

Run the migration file in Supabase SQL Editor:

```sql
-- Execute: supabase/migrations/create_mahasiswa_tables.sql
```

This will create 6 tables:

- `internships` (magang)
- `scholarships` (beasiswa)
- `competitions` (lomba)
- `webinars`
- `campus_events`
- `freelance_jobs`

### 4. Run Development Server

```powershell
npm run dev
```

The app will run on **http://localhost:5176**

### 5. Build for Production

```powershell
npm run build
```

Output will be in `dist/` folder.

## 🗄️ Database Schema

### Internships Table

```sql
- id (uuid, primary key)
- title (text) - "Magang Frontend Developer"
- slug (text, unique) - "magang-frontend-developer-2024"
- company_name (text)
- company_logo_url (text)
- location (text)
- is_remote (boolean)
- type (text) - "full-time", "part-time", "project-based"
- description (text)
- requirements (text)
- benefits (text)
- stipend_min, stipend_max (integer)
- application_url (text)
- deadline (date)
- posted_date (date)
- tags (text[]) - ["react", "typescript"]
- is_active (boolean)
- views_count (integer)
- applicants_count (integer)
- meta_title, meta_description (text) - For SEO
```

### Scholarships Table

```sql
- id, title, slug (similar to internships)
- provider (text) - "LPDP", "Chevening"
- scholarship_type (text) - "full", "partial"
- education_level (text) - "S1", "S2", "S3"
- countries (text[]) - ["Indonesia", "USA"]
- coverage (text) - "Biaya kuliah, living cost, dll"
- eligibility (text)
- application_process (text)
- amount (text) - "Full tuition + $1500/month"
- application_url (text)
- deadline (date)
- Other fields similar to internships
```

### Competitions Table

```sql
- id, title, slug
- organizer (text)
- category (text) - "Technology", "Business", "Design"
- prizes (text) - "1st: Rp 10 juta, 2nd: Rp 5 juta"
- registration_fee (integer)
- is_online (boolean)
- location (text)
- description, requirements (text)
- deadline, announcement_date (date)
- Other standard fields
```

### Webinars Table

```sql
- id, title, slug
- speaker (text)
- speaker_title (text)
- date_time (timestamp)
- duration_minutes (integer)
- is_paid (boolean)
- price (integer)
- platform (text) - "Zoom", "Google Meet"
- max_participants (integer)
- current_participants (integer)
- certificate_available (boolean)
- recording_url (text)
- Other standard fields
```

### Campus Events Table

```sql
- id, title, slug
- university (text)
- event_type (text) - "seminar", "festival", "workshop"
- location, venue (text)
- date_time (timestamp)
- is_free (boolean)
- ticket_price (integer)
- poster_url (text)
- organizer_contact (text)
- rsvp_required (boolean)
- Other standard fields
```

### Freelance Jobs Table

```sql
- id, title, slug
- client_name (text)
- job_category (text) - "Web Development", "Design", "Writing"
- budget_min, budget_max (integer)
- duration (text) - "2 weeks", "1 month"
- skills_required (text[])
- experience_level (text) - "beginner", "intermediate", "expert"
- description, deliverables (text)
- deadline (date)
- Other standard fields
```

## 🎨 Styling

This project uses **Tailwind CSS via CDN** for rapid development. The CDN is included in `index.html`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

For production, consider:

1. Installing Tailwind CSS as dependency
2. Using PostCSS for optimization
3. Purging unused styles

## 🔐 Supabase Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Public Read Access:**

```sql
-- Anyone can read active content
SELECT * FROM internships WHERE is_active = true;
```

**Admin Full Access:**

```sql
-- Admins can insert, update, delete
-- Requires admin role in Supabase auth
```

## 📱 Responsive Design

- **Mobile First:** Designed for mobile devices
- **Breakpoints:** sm, md, lg, xl (Tailwind defaults)
- **Mobile Menu:** Hamburger menu for mobile navigation

## 🔍 SEO Features

### Meta Tags

- Title, description, keywords
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs

### Sitemap.xml

Located at `public/sitemap.xml` with all main pages listed.

### Robots.txt

Allows all crawlers, references sitemap.

### SEO-Friendly URLs

- Clean slugs: `/magang/frontend-developer-2024`
- No query parameters
- Automatic slug generation from titles

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel:**

   ```bash
   vercel
   ```

2. **Configure Subdomain:**
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add custom domain: `mahasiswa.kabarkarir.com`
3. **DNS Configuration:**
   Add CNAME record to your domain:

   ```
   Type: CNAME
   Name: mahasiswa
   Value: cname.vercel-dns.com
   ```

4. **Environment Variables:**
   Add in Vercel Dashboard → Project → Settings → Environment Variables:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. **Deploy:**
   ```bash
   vercel --prod
   ```

## 🔗 Related Projects

- **Frontend User:** https://kabarkarir.com (main job portal)
- **Frontend Pelatihan:** https://learn.kabarkarir.com (LMS)
- **Frontend Admin:** https://admin.kabarkarir.com (admin panel)

## 📊 Next Steps

### Phase 1: Basic Functionality (Current)

- [x] Project setup
- [x] Database schema
- [x] Routing structure
- [x] Layout components (Header, Footer)
- [x] Placeholder pages
- [ ] npm install & test dev server

### Phase 2: Data Integration

- [ ] Create API service layer (`src/services/api.ts`)
- [ ] Implement data fetching for all pages
- [ ] Add loading states
- [ ] Add error handling
- [ ] Implement pagination

### Phase 3: Detail Pages

- [ ] Create detail page components for each content type
- [ ] Implement slug-based routing
- [ ] Add share buttons
- [ ] Add "Apply Now" / "Register" CTAs
- [ ] Track view counts

### Phase 4: Search & Filter

- [ ] Add search bar in Header
- [ ] Implement filters (location, type, date)
- [ ] Add sorting options
- [ ] Implement faceted search

### Phase 5: Admin Integration

- [ ] Create admin modules in `frontend-admin`
- [ ] CRUD operations for all 6 content types
- [ ] Excel import/export
- [ ] Bulk operations

### Phase 6: Advanced Features

- [ ] User authentication (favorites, applications)
- [ ] Email notifications
- [ ] Social sharing
- [ ] Analytics integration
- [ ] Performance optimization

## 🐛 Current Status

**Development Stage:** Initial Setup

All page components are currently **placeholders** with "Coming Soon" messages. The project structure is complete and ready for:

1. Running `npm install`
2. Adding `.env` file with Supabase credentials
3. Testing dev server
4. Implementing data fetching logic

**TypeScript Errors:** All current TypeScript errors (`Cannot find module 'react'`) are expected and will disappear after running `npm install`.

## 📝 Notes

- Port: **5176** (configured in `vite.config.ts`)
- Similar design to `frontend-user` for consistency
- All content is SEO-optimized with slugs and meta fields
- Database uses PostgreSQL with full-text search capabilities
- Icons use Font Awesome (already included via CDN)

## 💡 Tips

1. **Development Workflow:**

   - Start with one content type (e.g., Internships)
   - Implement full CRUD in admin panel
   - Test data fetching in frontend
   - Apply same pattern to other content types

2. **Testing Data:**

   - Use Supabase Table Editor to add sample data
   - Or import via admin panel (after creating admin modules)

3. **Performance:**
   - Use Supabase's built-in indexes
   - Implement pagination (12 items per page)
   - Add image optimization for logos/posters

## 🆘 Troubleshooting

**Issue:** TypeScript errors everywhere

- **Solution:** Run `npm install`

**Issue:** Blank page in browser

- **Solution:** Check `.env` file exists with correct Supabase credentials

**Issue:** 404 on page refresh

- **Solution:** `_redirects` file handles SPA routing (already configured)

**Issue:** Can't connect to Supabase

- **Solution:** Verify RLS policies are set correctly in Supabase dashboard

## 📄 License

Part of KabarKarir.com ecosystem.

---

**Need Help?** Contact the development team or check the admin panel at admin.kabarkarir.com

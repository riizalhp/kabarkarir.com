# KabarKarir Learn (Frontend Pelatihan)

Platform LMS (Learning Management System) untuk kursus online - Video pembelajaran, sertifikat, dan tracking progress.

## 🌐 Live URL

**https://learn.kabarkarir.com**

## 📋 Features

### Course Management

- **Course Listing** - Browse ribuan kursus dengan filter dan kategori
- **Course Detail** - Informasi lengkap: kurikulum, instruktur, review
- **Video Player** - Support iframe dari YouTube, Google Drive, Vimeo
- **Progress Tracking** - Track penyelesaian lesson dan progress keseluruhan
- **Certificate** - Generate dan download sertifikat otomatis

### User Features

- **My Learning** - Dashboard untuk kursus yang diikuti
- **Watch History** - Lanjutkan dari posisi terakhir
- **Reviews & Rating** - Beri review dan rating untuk kursus
- **Certificate Gallery** - Koleksi sertifikat yang didapat

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Routing:** React Router DOM v6
- **Database:** Supabase PostgreSQL
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Font Awesome 6.4.0
- **Video:** Iframe-based (YouTube, Drive, Vimeo)
- **Deployment:** Vercel

## 📂 Project Structure

```
frontend-pelatihan/
├── public/
│   ├── _redirects          # Vercel SPA routing
│   ├── robots.txt          # SEO crawler config
│   └── sitemap.xml         # Sitemap for search engines
├── src/
│   ├── components/         # All page components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── CoursesPage.tsx # Course listing
│   │   ├── CourseDetailPage.tsx  # Course detail + enrollment
│   │   ├── LessonPlayerPage.tsx  # Video player with iframe
│   │   ├── MyLearningPage.tsx    # User dashboard
│   │   ├── CertificatesPage.tsx  # Certificate gallery
│   │   └── CertificateViewPage.tsx # Certificate preview
│   │
│   ├── lib/
│   │   └── supabase.ts     # Supabase client
│   │
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # Config + constants
│   ├── Router.tsx          # Route definitions
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
│
├── index.html              # SEO-optimized HTML
├── package.json            # Dependencies
├── vite.config.ts          # Vite config (port 5177)
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account with database

### 1. Install Dependencies

```powershell
cd frontend-pelatihan
npm install
```

### 2. Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Run migration in Supabase SQL Editor:

```sql
-- Execute: supabase/migrations/create_pelatihan_lms_tables.sql
```

Creates 7 tables:

- `courses` - Course catalog
- `course_modules` - Course sections
- `course_lessons` - Individual lessons with iframe video
- `user_enrollments` - Student registrations
- `user_progress` - Lesson completion tracking
- `certificates` - Auto-generated certificates
- `course_reviews` - 5-star ratings

### 4. Run Development Server

```powershell
npm run dev
```

Opens at: **http://localhost:5177**

### 5. Build for Production

```powershell
npm run build
```

## 🗄️ Database Schema

### Courses Table

```sql
- id, title, slug (SEO-optimized)
- description, requirements, what_you_will_learn
- instructor_name, instructor_title, instructor_avatar_url
- thumbnail_url, intro_video_url
- price, discount_price, is_free
- level: 'beginner' | 'intermediate' | 'advanced'
- duration_hours, language, category, tags[]
- enrollments_count, average_rating, reviews_count
- is_published, is_featured, lifetime_access
- certificate_available
- meta_title, meta_description (SEO)
```

### Course Lessons Table (KEY FEATURE)

```sql
- id, module_id, title, description
- video_url (YouTube/Drive/Vimeo URL)
- video_iframe_code (full iframe HTML if needed)
- video_type: 'youtube' | 'vimeo' | 'drive' | 'other'
- video_duration_minutes
- content_text (optional text content)
- resources (downloadable files)
- order_number, is_preview
```

### User Progress Table

```sql
- id, user_id, lesson_id
- completed (boolean)
- completed_at (timestamp)
- watch_time_seconds (total watch time)
- last_position_seconds (for video resume)
```

### Certificates Table

```sql
- id, user_id, course_id
- certificate_number (unique: CERT-XXXX-XXXX)
- issued_at
- certificate_url (PDF or image)
- verification_url (public verification page)
```

## 🎥 Video Player Implementation

### Supported Platforms

**YouTube:**

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
```

**Google Drive:**

```html
<iframe
  src="https://drive.google.com/file/d/FILE_ID/preview"
  allowfullscreen
></iframe>
```

**Vimeo:**

```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" allowfullscreen></iframe>
```

### Video Data Storage

Store in `course_lessons` table:

- **Option 1:** `video_url` - Direct URL to video
- **Option 2:** `video_iframe_code` - Full iframe HTML code
- Always set `video_type` to detect platform

## 🎓 Certificate System

### Auto-Generation

When user completes all lessons:

1. Check completion percentage = 100%
2. Generate unique certificate number
3. Create certificate record in database
4. Send notification email
5. Make available in user's certificate gallery

### Certificate Verification

Public URL format:

```
https://learn.kabarkarir.com/certificate/CERT-2024-001234
```

Anyone can verify certificate authenticity via this URL.

## 📱 Responsive Design

- Mobile-first approach
- Video player responsive
- Touch-friendly controls
- Optimized for tablet and mobile

## 🔍 SEO Features

- Meta tags for each course (title, description)
- Slug-based URLs (`/courses/web-development-101`)
- Sitemap.xml with course pages
- Robots.txt configured
- Structured data for courses (future)

## 🚀 Deployment

### Vercel Deployment

```powershell
cd frontend-pelatihan
vercel
```

### Configure Subdomain

1. Vercel Dashboard → Domains
2. Add: `learn.kabarkarir.com`
3. DNS Configuration:

```
Type: CNAME
Name: learn
Value: cname.vercel-dns.com
```

### Environment Variables in Vercel

Add in Project Settings:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔗 Related Projects

- **Frontend User:** https://kabarkarir.com
- **Frontend Mahasiswa:** https://mahasiswa.kabarkarir.com
- **Frontend Admin:** https://admin.kabarkarir.com

## 📊 Next Steps

### Phase 1: Basic Functionality

- [x] Project setup
- [x] Database schema
- [x] Routing structure
- [x] Layout components
- [x] Placeholder pages
- [ ] npm install & test

### Phase 2: Course Features

- [ ] Fetch and display courses
- [ ] Course filtering and search
- [ ] Course detail with modules/lessons
- [ ] Enrollment system
- [ ] Payment integration (optional)

### Phase 3: Video Player

- [ ] Implement iframe video player
- [ ] YouTube embed support
- [ ] Google Drive embed support
- [ ] Vimeo embed support
- [ ] Progress tracking during playback
- [ ] Resume from last position

### Phase 4: Progress & Certificate

- [ ] Track lesson completion
- [ ] Calculate progress percentage
- [ ] Auto-generate certificates
- [ ] Certificate download (PDF)
- [ ] Certificate verification page

### Phase 5: User Dashboard

- [ ] My Learning page with enrolled courses
- [ ] Progress visualization
- [ ] Continue watching feature
- [ ] Course reviews and ratings

### Phase 6: Admin Integration

- [ ] Course builder in admin panel
- [ ] Module/Lesson editor
- [ ] Iframe URL input and preview
- [ ] Enrollment management
- [ ] Certificate management

## 🐛 Current Status

**Development Stage:** Initial Setup Complete

All components are **placeholders** with "Coming Soon" messages. Ready for:

1. Running `npm install`
2. Adding `.env` file
3. Testing dev server
4. Implementing data fetching

**TypeScript Errors:** Expected until `npm install` runs.

## 💡 Development Tips

### Creating Video Lessons

1. Upload video to YouTube/Drive/Vimeo
2. Get shareable URL or embed code
3. Add to `course_lessons` table with `video_url`
4. Set `video_type` correctly
5. Test iframe loads in player

### Progress Tracking

Track these events:

- Lesson opened (start time)
- Video progress (every 10 seconds)
- Lesson completed (video finished or marked complete)
- Course completed (all lessons done)

### Certificate Generation

Trigger when:

```sql
SELECT
  COUNT(*) FILTER (WHERE completed = true) as completed_count,
  COUNT(*) as total_lessons
FROM user_progress up
JOIN course_lessons cl ON cl.id = up.lesson_id
WHERE up.user_id = $1 AND cl.module_id IN (
  SELECT id FROM course_modules WHERE course_id = $2
)
```

If `completed_count = total_lessons`, generate certificate.

## 📝 Notes

- Port: **5177** (different from mahasiswa:5176, user:5173)
- No local video files - all via iframe
- Certificates stored as records, not actual PDFs initially
- Can add PDF generation later with libraries

## 🆘 Troubleshooting

**Video not loading:**

- Check video URL is correct and public
- Verify iframe embed is allowed by video platform
- Check video_type matches actual platform

**Progress not saving:**

- Verify user authentication
- Check Supabase RLS policies
- Ensure lesson_id and user_id are correct

**Certificate not generating:**

- Check all lessons are marked complete
- Verify trigger functions in database
- Check user has completed course enrollment

---

**Need Help?** Check PROJECT_STATUS.md for full development roadmap.

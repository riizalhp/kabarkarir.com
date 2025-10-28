# View Tracking System - KabarKarir.com

## 📊 Overview

Sistem tracking jumlah kunjungan (view count) untuk menentukan konten trending di kabarkarir.com.

## 🎯 Features

### 1. **View Tracking**

- ✅ Company Profile Views
- ✅ Event Detail Views
- ✅ Blog Post Views

### 2. **Trending Algorithm**

Trending ditentukan berdasarkan:

- **Primary**: `view_count` (jumlah kunjungan)
- **Secondary**: Metrics lain (jobs available untuk companies)

### 3. **Display Locations**

View count ditampilkan di:

- **Sidebar** - Perusahaan Trending (view count + jobs available)
- **Sidebar** - Artikel Terbaru (view count + tanggal)
- **Sidebar** - Event Rekrutmen (view count + info event)

## 🗄️ Database Schema

### Columns Added

```sql
-- Companies table
ALTER TABLE companies ADD COLUMN view_count INTEGER DEFAULT 0;

-- Events table
ALTER TABLE recruitment_events ADD COLUMN view_count INTEGER DEFAULT 0;

-- Blog posts table
ALTER TABLE blog_posts ADD COLUMN view_count INTEGER DEFAULT 0;
```

### Indexes for Performance

```sql
CREATE INDEX idx_companies_view_count ON companies(view_count DESC);
CREATE INDEX idx_events_view_count ON recruitment_events(view_count DESC);
CREATE INDEX idx_blog_posts_view_count ON blog_posts(view_count DESC);
```

### RPC Functions

```sql
-- Increment company views
CREATE FUNCTION increment_company_views(company_id INTEGER) RETURNS VOID

-- Increment event views
CREATE FUNCTION increment_event_views(event_id INTEGER) RETURNS VOID

-- Increment blog post views
CREATE FUNCTION increment_blog_views(post_id INTEGER) RETURNS VOID
```

## 📁 Files Structure

```
frontend-user/src/
├── services/
│   └── viewTracking.ts          # Service untuk tracking views
├── components/
│   ├── CompanyDetailPage.tsx    # Track company views
│   ├── EventDetailPage.tsx      # Track event views
│   ├── ArticleDetailPage.tsx    # Track blog views
│   └── Sidebar.tsx              # Display view counts
└── types.ts                     # TypeScript interfaces dengan view_count

supabase/migrations/
└── add_view_tracking.sql        # SQL migration
```

## 🔧 Implementation

### Service Layer (`viewTracking.ts`)

```typescript
export const viewTrackingService = {
  trackCompanyView: async (companyId: number) => {
    await supabase.rpc('increment_company_views', { company_id: companyId });
  },

  trackEventView: async (eventId: number) => {
    await supabase.rpc('increment_event_views', { event_id: eventId });
  },

  trackBlogPostView: async (postId: number) => {
    await supabase.rpc('increment_blog_views', { post_id: postId });
  },

  getTrendingCompanies: async (limit = 4) => { ... },
  getTrendingEvents: async (limit = 5) => { ... },
  getTrendingBlogPosts: async (limit = 5) => { ... },
};
```

### Tracking Implementation

**CompanyDetailPage.tsx**

```typescript
useEffect(() => {
  if (company && !isPreviewMode) {
    viewTrackingService.trackCompanyView(company.id);
  }
}, [company, isPreviewMode]);
```

**EventDetailPage.tsx**

```typescript
useEffect(() => {
  if (event && !isPreviewMode) {
    viewTrackingService.trackEventView(event.id);
  }
}, [event, isPreviewMode]);
```

**ArticleDetailPage.tsx**

```typescript
useEffect(() => {
  if (post && !isPreviewMode) {
    viewTrackingService.trackBlogPostView(post.id);
  }
}, [post, isPreviewMode]);
```

### Trending Logic

**App.tsx**

```typescript
const trendingCompanies = useMemo(() => {
  return [...companiesWithJobCount]
    .sort((a, b) => {
      const viewDiff = (b.view_count || 0) - (a.view_count || 0);
      if (viewDiff !== 0) return viewDiff;
      return b.jobsAvailable - a.jobsAvailable; // Fallback
    })
    .slice(0, 4);
}, [companiesWithJobCount]);
```

### Display View Count

**Sidebar.tsx**

```typescript
{
  company.view_count && (
    <span className="flex items-center gap-1">
      <i className="fas fa-eye text-primary"></i>
      {company.view_count} views
    </span>
  );
}
```

## 🚀 Usage

### 1. Run Migration

```bash
# Execute SQL migration in Supabase Dashboard
# Or via CLI
supabase db push
```

### 2. Verify Functions

```sql
-- Test increment functions
SELECT increment_company_views(1);
SELECT increment_event_views(1);
SELECT increment_blog_views(1);

-- Check view counts
SELECT id, name, view_count FROM companies ORDER BY view_count DESC LIMIT 5;
```

### 3. Monitor Performance

```sql
-- Check if indexes are being used
EXPLAIN ANALYZE
SELECT * FROM companies
ORDER BY view_count DESC
LIMIT 10;
```

## 📈 Benefits

1. **Real-time Trending**: Content popularity based on actual user behavior
2. **Better UX**: Users see what's actually popular
3. **Analytics**: Track which content gets the most attention
4. **SEO**: Popular content can be prioritized
5. **Performance**: Optimized with database indexes

## ⚠️ Notes

- View tracking only works in **production mode** (not preview mode)
- Views are tracked **client-side** on detail page load
- RPC functions handle **atomic increments** (no race conditions)
- View counts are **cumulative** (never decrease)

## 🔮 Future Enhancements

- [ ] Add **time-based decay** for trending (recent views weighted more)
- [ ] Track **unique views** per user (using localStorage/cookies)
- [ ] Add **view history** table for analytics
- [ ] Implement **admin dashboard** for view statistics
- [ ] Add **API rate limiting** to prevent view count manipulation
- [ ] Add **trending badges** (🔥 for high view counts)

## 📊 Example View Counts

```
Companies Trending:
1. PT Tech Indonesia    - 1,523 views | 45 lowongan
2. Bank Mandiri        - 1,201 views | 32 lowongan
3. Telkom Indonesia    -   987 views | 28 lowongan
4. PT Astra            -   856 views | 21 lowongan

Event Rekrutmen:
1. Job Fair Jakarta 2025     - 2,341 views
2. Career Expo Surabaya      - 1,876 views

Artikel Terbaru:
1. Tips Interview IT         - 3,421 views
2. Cara Buat CV Menarik      - 2,987 views
```

## 🎨 UI/UX

View count ditampilkan dengan:

- **Icon**: Eye icon (fas fa-eye)
- **Color**: Primary blue untuk icon
- **Size**: text-xs (kecil, tidak mengganggu)
- **Position**: Di bawah/samping info utama

---

**Last Updated**: October 28, 2025  
**Status**: ✅ Fully Implemented

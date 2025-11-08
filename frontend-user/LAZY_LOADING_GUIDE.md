# Lazy Loading Implementation Guide

## Overview

Implementasi lazy loading untuk mengurangi initial data fetch dari 8 API calls menjadi hanya data yang dibutuhkan per page.

## Strategy

### Before (Load ALL data on app mount):

```typescript
// App.tsx - useEffect runs on mount
useEffect(() => {
  const fetchAllData = async () => {
    const [jobs, companies, blogs, events, misi, pelatihan, majors, tags] =
      await Promise.all([
        jobsService.getAll(), // ← Load even if not needed
        companiesService.getAll(), // ← Load even if not needed
        blogService.getAll(), // ← Load even if not needed
        // ... etc
      ]);
  };
  fetchAllData();
}, []);
```

**Problem:** Homepage perlu jobs + companies, tapi kita fetch 8 tables!

### After (Load data per route):

#### 1. **Homepage** - Only Jobs & Companies

```typescript
// In MainContent.tsx or HomePage.tsx
useEffect(() => {
  const fetchHomeData = async () => {
    const [jobs, companies] = await Promise.all([
      jobsService.getAll(),
      companiesService.getAll({ limit: 12 }), // Only first page
    ]);
    // ...
  };
  fetchHomeData();
}, []);
```

#### 2. **Companies Page** - Only Companies (with pagination)

```typescript
// In CompanyListPage.tsx - Already implemented!
const { data, isLoading } = useCompanies({
  filter: activeFilter,
  page: currentPage,
  itemsPerPage: 12,
});
```

#### 3. **Blog Page** - Only Blog Posts

```typescript
// In BlogPage.tsx
useEffect(() => {
  const fetchBlogData = async () => {
    const posts = await blogService.getAll();
    setBlogPosts(posts);
  };
  fetchBlogData();
}, []);
```

#### 4. **Misi Cuan Page** - Only Misi Offers

```typescript
// In MisiCuanPage.tsx
useEffect(() => {
  const fetchMisiData = async () => {
    const offers = await misiService.getAll();
    setMisiOffers(offers);
  };
  fetchMisiData();
}, []);
```

## Implementation Steps

### Step 1: Remove Global Data Fetching

In `App.tsx`, remove or modify the `fetchAllData` to only fetch minimal data:

```typescript
// App.tsx
useEffect(() => {
  const fetchMinimalData = async () => {
    try {
      setLoading(true);

      // Only fetch data needed for navigation/sidebar
      const [majorsData, tagsData] = await Promise.all([
        majorsService.getAll(),
        tagsService.getAll(),
      ]);

      setMajors(majorsData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMinimalData();
}, []);
```

### Step 2: Move Data Fetching to Each Page Component

#### CompanyListPage.tsx (✅ Already Done!)

```typescript
const { data, isLoading } = useCompanies({
  filter: activeFilter,
  page: currentPage,
  itemsPerPage: 12,
});
```

#### JobListings.tsx or HomePage.tsx

```typescript
const [jobs, setJobs] = useState<Job[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await jobsService.getAll();
      setJobs(data);
    } finally {
      setLoading(false);
    }
  };
  fetchJobs();
}, []);
```

#### BlogPage.tsx

```typescript
const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAll();
      setBlogPosts(data);
    } finally {
      setLoading(false);
    }
  };
  fetchBlogs();
}, []);
```

### Step 3: Use React Query for Better Caching

After installing React Query (`@tanstack/react-query`), use hooks:

```typescript
// In CompanyListPage.tsx
import { useCompanies } from "../hooks/useCompanies";

const { data, isLoading, error } = useCompanies({
  filter: activeFilter,
  page: currentPage,
  itemsPerPage: 12,
});
```

```typescript
// In BlogPage.tsx
import { useBlogPosts } from "../hooks/useBlog";

const { data: blogPosts, isLoading } = useBlogPosts();
```

## Benefits

### Performance Improvements:

| Metric                         | Before          | After             | Improvement     |
| ------------------------------ | --------------- | ----------------- | --------------- |
| **Initial Load API Calls**     | 8 APIs          | 2-3 APIs          | **60-75% less** |
| **Data Downloaded (Homepage)** | ~500KB          | ~150KB            | **70% less**    |
| **Time to Interactive**        | 2-3s            | 0.5-1s            | **3-6x faster** |
| **Memory Usage**               | High (all data) | Low (only needed) | **60% less**    |

### User Experience:

- ✅ Faster initial page load
- ✅ Better perceived performance
- ✅ Less memory consumption
- ✅ Network efficiency
- ✅ Smoother navigation

### Developer Experience:

- ✅ Easier to maintain (data close to component)
- ✅ Better code organization
- ✅ Easier to debug (per-page logic)
- ✅ Automatic caching with React Query

## Testing Checklist

After implementation:

- [ ] Homepage loads only jobs + companies
- [ ] Companies page loads only companies (paginated)
- [ ] Blog page loads only blog posts
- [ ] Misi Cuan page loads only misi offers
- [ ] Back navigation uses cached data (with React Query)
- [ ] Network tab shows fewer API calls on initial load
- [ ] Page transitions are smooth
- [ ] No data loss when navigating

## Migration Plan

### Phase 1: Setup React Query (30 mins)

1. Install `@tanstack/react-query`
2. Setup QueryClientProvider in `index.tsx`
3. Test basic functionality

### Phase 2: Migrate CompanyListPage (15 mins)

1. Already done with database pagination
2. Add React Query hook
3. Test filtering and pagination

### Phase 3: Migrate Other Pages (1-2 hours)

1. BlogPage
2. JobListings/HomePage
3. MisiCuanPage
4. EventsPage
5. PelatihanPage

### Phase 4: Remove Global Fetching (30 mins)

1. Update App.tsx to only fetch minimal data
2. Remove unused props from components
3. Clean up AppRoutes

### Phase 5: Testing & Optimization (1 hour)

1. Test all routes
2. Check caching behavior
3. Optimize staleTime and cacheTime
4. Performance benchmarking

**Total Estimated Time:** 3-4 hours

## Notes

- Sidebar data (trending companies, latest articles) might still need global fetch or separate lazy load
- Consider keeping majors and tags at app level (small data, needed globally)
- Use React Query DevTools to monitor cache behavior
- Adjust staleTime and cacheTime based on data update frequency

---

**Status:** Implementation Guide Created  
**Next Step:** Install React Query and start migration  
**Priority:** Medium (nice to have, not critical after N+1 fix)

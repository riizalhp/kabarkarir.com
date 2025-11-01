# Admin Panel - MPA Architecture

## Overview

Frontend admin telah dimigrasi dari **Single Page Application (SPA)** menjadi **Multi-Page Application (MPA)**. Perubahan ini membuat setiap section menjadi halaman independen dengan full page reload saat navigasi.

## Why MPA?

### Advantages

✅ **Simpler State Management**: Setiap halaman mengelola state-nya sendiri
✅ **Better Separation of Concerns**: Halaman independen dan modular
✅ **Fresh Data**: Setiap page load mengambil data terbaru dari database
✅ **Better Memory Management**: Browser mem-free memory saat page reload
✅ **Easier to Debug**: Setiap halaman dapat di-debug secara terpisah
✅ **Reduced Complexity**: Tidak ada shared state antar halaman

### Trade-offs

❌ **Full Page Reload**: Setiap navigasi memerlukan full page reload
❌ **Slower Navigation**: Lebih lambat dibanding client-side routing
❌ **No Smooth Transitions**: Tidak ada animasi transisi antar halaman
❌ **Re-fetch Data**: Data di-fetch ulang setiap page load

## Architecture

### File Structure

```
src/
├── components/
│   ├── AdminLayout.tsx          # Shared layout component
│   ├── DashboardPage.tsx        # /admin
│   ├── JobsPage.tsx             # /admin/lowongan
│   ├── CompaniesPage.tsx        # /admin/perusahaan
│   ├── MajorsPage.tsx           # /admin/jurusan
│   ├── TagsPage.tsx             # /admin/tags
│   ├── ArticlesPage.tsx         # /admin/artikel
│   ├── EventsPage.tsx           # /admin/event
│   ├── MisiPage.tsx             # /admin/misi
│   ├── PelatihanPage.tsx        # /admin/pelatihan
│   ├── AnalyticsPage.tsx        # /admin/analytics
│   ├── UsersPage.tsx            # /admin/pengguna
│   ├── SettingsPage.tsx         # /admin/pengaturan
│   └── sections/                # Section components (reusable)
│       ├── AdminDashboard.tsx
│       ├── AdminJobs.tsx
│       ├── AdminCompanies.tsx
│       └── ...
├── AppRoutes.tsx                # Route definitions
└── App.tsx                      # Root component
```

### Component Hierarchy

```
App.tsx (Authentication)
  └── AppRoutes.tsx (Routing)
      └── *Page.tsx (Page wrapper)
          └── AdminLayout.tsx (Layout)
              └── Admin*.tsx (Section logic)
```

## Page Component Pattern

Setiap page component mengikuti pola yang konsisten:

```tsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminJobs from './sections/AdminJobs';
import { Job, CompanyProfile } from '../types';
import { adminJobsService, adminCompaniesService } from '../services/adminApi';

interface JobsPageProps {
  onNavigateHome: () => void;
  onLogout?: () => void;
  addActivity: (activity: {...}) => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ onNavigateHome, onLogout, addActivity }) => {
  // 1. Local state untuk data halaman ini
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);

  // 2. Fetch data saat component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jobsData, companiesData] = await Promise.all([
        adminJobsService.getAll(),
        adminCompaniesService.getAll(),
      ]);
      setJobs(jobsData);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 3. Render dengan AdminLayout wrapper
  return (
    <AdminLayout currentSection="jobs" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminJobs
        jobs={jobs}
        setJobs={setJobs}
        allCompanies={companies}
        addActivity={addActivity}
      />
    </AdminLayout>
  );
};

export default JobsPage;
```

## AdminLayout Component

`AdminLayout.tsx` menyediakan struktur konsisten untuk semua halaman:

### Features

1. **Sidebar Navigation** dengan links ke semua section
2. **Header** dengan title dinamis
3. **Logout Button** di sidebar dan header
4. **Consistent Styling** menggunakan Tailwind CSS

### Navigation Implementation

```tsx
const NavItem: React.FC<{
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}> = ({ icon, label, href, isActive }) => {
  return (
    <a // Menggunakan <a> tag, bukan <Link>
      href={href}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
        isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-700"
      }`}
    >
      <i className={icon}></i>
      <span>{label}</span>
    </a>
  );
};
```

**Key Point**: Menggunakan `<a>` tag dengan `href` attribute, **bukan** React Router `<Link>`. Ini menyebabkan full page reload.

## Routing Configuration

### AppRoutes.tsx

```tsx
const AppRoutes: React.FC<AppRoutesProps> = ({ isLoggedIn, setIsLoggedIn, onLogout }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={...} />} />

      <Route
        path="/admin"
        element={isLoggedIn ? <DashboardPage ... /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/lowongan"
        element={isLoggedIn ? <JobsPage ... /> : <Navigate to="/login" />}
      />

      {/* ... more routes */}
    </Routes>
  );
};
```

### App.tsx

`App.tsx` sekarang hanya mengelola:

- ✅ Authentication state
- ✅ Login/logout logic
- ✅ Auth check on mount

❌ Tidak lagi mengelola:

- Data untuk jobs, companies, articles, dll.
- Activity logs
- Section state

## Data Flow

### 1. Initial Load

```
User visits /admin/lowongan
  → Browser loads page
  → React renders App.tsx
  → App.tsx checks authentication
  → AppRoutes.tsx matches route
  → JobsPage.tsx renders
  → useEffect runs
  → fetchData() calls API
  → Data loaded into local state
  → AdminJobs renders with data
```

### 2. Navigation

```
User clicks "Perusahaan" link
  → <a href="/admin/perusahaan"> triggers
  → Full page reload
  → Browser navigates to /admin/perusahaan
  → Repeat "Initial Load" flow for CompaniesPage
```

### 3. Data Refresh

```
User performs action (e.g., add job)
  → AdminJobs calls API
  → API returns updated data
  → setJobs updates local state
  → Component re-renders with new data
```

## Benefits of This Architecture

### 1. Isolation

Setiap halaman independen. Bug di satu halaman tidak affect halaman lain.

### 2. Simplicity

Tidak perlu kompleks state management atau data sharing antar halaman.

### 3. Fresh Data

Setiap page load mengambil data terbaru dari database. Tidak ada stale data.

### 4. Memory Management

Browser mem-free memory saat page reload, mencegah memory leaks.

### 5. Easy Testing

Setiap page component dapat di-test secara terpisah dengan mudah.

### 6. Clear Separation

Mudah menambah halaman baru tanpa affect existing pages.

## Migration Path

### Old Architecture (SPA)

```
App.tsx holds all state
  → Pass via props to AdminPage
    → AdminPage has section switcher
      → Renders section component
```

### New Architecture (MPA)

```
App.tsx only handles auth
  → AppRoutes defines routes
    → Each route renders a Page component
      → Page fetches its own data
        → Page wraps section with AdminLayout
```

## Adding New Pages

To add a new admin page:

1. **Create page component** di `src/components/`

   ```tsx
   // src/components/NewFeaturePage.tsx
   const NewFeaturePage: React.FC<Props> = ({ onNavigateHome, onLogout }) => {
     const [data, setData] = useState([]);

     useEffect(() => {
       fetchData();
     }, []);

     return (
       <AdminLayout
         currentSection="newFeature"
         onNavigateHome={onNavigateHome}
         onLogout={onLogout}
       >
         <AdminNewFeature data={data} setData={setData} />
       </AdminLayout>
     );
   };
   ```

2. **Add route** di `AppRoutes.tsx`

   ```tsx
   <Route
     path="/admin/fitur-baru"
     element={isLoggedIn ? <NewFeaturePage ... /> : <Navigate to="/login" />}
   />
   ```

3. **Add nav item** di `AdminLayout.tsx`

   ```tsx
   const navItems = [
     // ... existing items
     {
       icon: "fas fa-star",
       label: "Fitur Baru",
       href: "/admin/fitur-baru",
       sectionName: "newFeature",
     },
   ];
   ```

4. **Update section title** di `AdminLayout.tsx`
   ```tsx
   const getSectionTitle = () => {
     switch (currentSection) {
       // ... existing cases
       case "newFeature":
         return "Fitur Baru";
     }
   };
   ```

Done! New page is ready.

## Best Practices

### 1. Keep Pages Focused

Setiap page hanya fetch dan manage data yang dibutuhkan.

### 2. Use AdminLayout Consistently

Semua admin pages harus wrap content dengan `AdminLayout`.

### 3. Handle Loading States

```tsx
const [loading, setLoading] = useState(true);

const fetchData = async () => {
  try {
    setLoading(true);
    const data = await service.getAll();
    setData(data);
  } finally {
    setLoading(false);
  }
};
```

### 4. Handle Errors Gracefully

```tsx
const fetchData = async () => {
  try {
    const data = await service.getAll();
    setData(data);
  } catch (error) {
    console.error("Error:", error);
    toast("Gagal memuat data");
  }
};
```

### 5. Use Toast for User Feedback

```tsx
import { toast } from "../utils/toast";

const handleDelete = async (id: number) => {
  try {
    await service.delete(id);
    toast("Data berhasil dihapus");
  } catch (error) {
    toast("Gagal menghapus data");
  }
};
```

## Conclusion

MPA architecture memberikan struktur yang lebih simple dan maintainable untuk admin panel. Meskipun ada trade-off dalam kecepatan navigasi, benefits dalam simplicity dan reliability lebih outweigh disadvantages tersebut untuk use case admin panel.

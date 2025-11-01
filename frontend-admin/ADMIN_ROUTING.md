# Admin Panel Routing Documentation - MPA Architecture

## Architecture Overview

Frontend admin telah diubah dari Single Page Application (SPA) menjadi Multi-Page Application (MPA). Setiap section sekarang merupakan halaman terpisah yang di-render secara independen.

## URL Structure

Frontend admin sekarang menggunakan URL yang lebih deskriptif dan SEO-friendly untuk setiap section.

### Available Routes

| Section    | URL Path            | Description                         |
| ---------- | ------------------- | ----------------------------------- |
| Dashboard  | `/admin`            | Halaman utama dashboard admin       |
| Lowongan   | `/admin/lowongan`   | Manajemen lowongan kerja            |
| Perusahaan | `/admin/perusahaan` | Manajemen profil perusahaan         |
| Jurusan    | `/admin/jurusan`    | Manajemen data jurusan kuliah       |
| Tags       | `/admin/tags`       | Manajemen tags untuk konten         |
| Artikel    | `/admin/artikel`    | Manajemen artikel blog              |
| Event      | `/admin/event`      | Manajemen event rekrutmen           |
| Misi Cuan  | `/admin/misi`       | Manajemen misi cuan dan submissions |
| Pelatihan  | `/admin/pelatihan`  | Manajemen info pelatihan            |
| Analytics  | `/admin/analytics`  | Analytics dan laporan               |
| Pengguna   | `/admin/pengguna`   | Manajemen pengguna admin            |
| Pengaturan | `/admin/pengaturan` | Pengaturan sistem                   |

## Features

### 1. URL Navigation

- Setiap section memiliki URL yang unik dan deskriptif
- URL dapat dibookmark dan dishare langsung
- Browser history bekerja dengan tombol back/forward

### 2. Deep Linking

- Admin dapat langsung mengakses section tertentu melalui URL
- Contoh: `https://admin.kabarkarir.com/admin/lowongan`

### 3. URL Synchronization

- State section dan URL selalu tersinkronisasi
- Refresh halaman akan mempertahankan section yang aktif
- Navigation melalui sidebar atau direct URL menghasilkan behavior yang sama

## Implementation Details

### MPA Architecture

Aplikasi sekarang menggunakan arsitektur MPA dengan karakteristik:

1. **Separate Page Components**: Setiap section memiliki komponen page terpisah

   - `DashboardPage.tsx` - Dashboard utama
   - `JobsPage.tsx` - Manajemen lowongan
   - `CompaniesPage.tsx` - Manajemen perusahaan
   - Dan seterusnya...

2. **Independent Data Fetching**: Setiap halaman fetch data sendiri saat mount

   ```tsx
   useEffect(() => {
     fetchData();
   }, []);
   ```

3. **Shared Layout Component**: `AdminLayout.tsx` menyediakan struktur konsisten

   - Sidebar navigation
   - Header dengan title
   - Logout button
   - Navigation menggunakan `<a>` tag untuk full page reload

4. **Navigation**: Menggunakan native HTML links
   ```tsx
   <a href="/admin/lowongan">Lowongan</a>
   ```
   Ini menyebabkan full page reload, bukan client-side navigation

### Route Configuration

Routes didefinisikan di `AppRoutes.tsx`:

```tsx
<Route path="/admin" element={<DashboardPage onNavigateHome={...} onLogout={...} />} />
<Route path="/admin/lowongan" element={<JobsPage onNavigateHome={...} onLogout={...} addActivity={...} />} />
<Route path="/admin/perusahaan" element={<CompaniesPage onNavigateHome={...} onLogout={...} addActivity={...} />} />
// ... dan seterusnya
```

### Page Component Structure

Setiap page component mengikuti pola yang sama:

```tsx
const JobsPage: React.FC<JobsPageProps> = ({ onNavigateHome, onLogout, addActivity }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  // ... state lainnya

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await adminJobsService.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <AdminLayout currentSection="jobs" onNavigateHome={onNavigateHome} onLogout={onLogout}>
      <AdminJobs jobs={jobs} setJobs={setJobs} ... />
    </AdminLayout>
  );
};
```

### Shared Layout

`AdminLayout.tsx` menyediakan:

- **Sidebar Navigation**: Links ke semua section
- **Header**: Judul section dan logout button
- **Consistent Styling**: Design yang sama di semua halaman
  const sectionToUrl: Record<AdminSection, string> = {
  dashboard: "/admin",
  jobs: "/admin/lowongan",
  companies: "/admin/perusahaan",
  // ...
  };

````

### Navigation Handler

AdminPage component menggunakan `useNavigate` dan `useLocation` hooks:

```tsx
const navigate = useNavigate();
const location = useLocation();

// Sync section with URL
React.useEffect(() => {
  const currentSection = getCurrentSection();
  setSection(currentSection);
}, [location.pathname]);

// Navigate when section changes
const handleSetSection = (newSection: AdminSection) => {
  setSection(newSection);
  navigate(sectionToUrl[newSection]);
};
````

## SPA Configuration

### Vercel

File `vercel.json` dikonfigurasi untuk rewrite semua routes ke index.html:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Netlify

File `public/_redirects` dikonfigurasi untuk SPA routing:

```
/*    /index.html   200
```

## Benefits

1. **Better UX**: URL yang jelas menunjukkan posisi user dalam aplikasi
2. **Bookmarkable**: User dapat bookmark halaman tertentu
3. **Shareable**: URL dapat dishare ke team member lain
4. **Browser Navigation**: Tombol back/forward browser bekerja dengan baik
5. **SEO Ready**: Struktur URL yang jelas dan deskriptif
6. **Deep Linking**: Akses langsung ke section tertentu melalui URL

## Migration Notes

Perubahan ini backward compatible. URL lama `/admin` masih bekerja dan redirect ke dashboard.

## Future Enhancements

Potensi peningkatan di masa depan:

- Query parameters untuk filter dan search state
- Nested routes untuk detail pages (e.g., `/admin/lowongan/:id`)
- Breadcrumb navigation berdasarkan URL
- URL-based state persistence untuk pagination dan sorting

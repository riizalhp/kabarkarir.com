# URL Struktur MPA - KabarKarir.com

Aplikasi telah diubah dari SPA (Single Page Application) menjadi MPA (Multi-Page Application) dengan React Router.

## Struktur URL

### Halaman Utama

- `/` - Homepage

### Lowongan Kerja

- `/lowongan/:id` - Detail lowongan kerja (contoh: /lowongan/1)
- `/kategori/:category` - Lowongan per kategori (contoh: /kategori/BUMN)

### Perusahaan

- `/perusahaan` - Daftar semua perusahaan
- `/perusahaan/:slug` - Profile perusahaan & lowongan (contoh: /perusahaan/pt-bank-central-asia-bca)

### Blog

- `/blog` - Halaman blog
- `/blog/:slug` - Detail artikel (contoh: /blog/cara-mendaftar-magang atau /blog/1 untuk backwards compatibility)

### Misi Cuan

- `/misi-cuan` - Daftar semua misi
- `/misi-cuan/:slug` - Detail misi (contoh: /misi-cuan/misi-cuan-bni-46 atau /misi-cuan/1)
- `/misi-cuan/:slug/tahapan` - Tahapan misi
- `/misi-cuan/:slug/submit` - Submit bukti misi

### Event Rekrutmen

- `/event` - Daftar event
- `/event/:slug` - Detail event (contoh: /event/job-fair-jakarta-2024 atau /event/1)

### Pelatihan

- `/pelatihan` - Daftar info pelatihan
- `/pelatihan/:slug` - Detail pelatihan (contoh: /pelatihan/workshop-digital-marketing atau /pelatihan/1)

### Layanan

- `/konsul-karir` - Konsul Karir
- `/konsul-karir/ongoing` - Konsul Karir On Going
- `/bangun-cv` - Bangun CV & Review
- `/bangun-cv/ongoing` - Bangun CV On Going
- `/pasang-iklan` - Pasang Iklan
- `/pasang-iklan/ongoing` - Pasang Iklan On Going
- `/psikotes` - Psikotes

### Halaman Lainnya

- `/favorit` - Daftar favorit
- `/komunitas` - Join Telegram
- `/tentang-kami` - Tentang Kami
- `/syarat-ketentuan` - Syarat & Ketentuan
- `/kebijakan-privasi` - Kebijakan Privasi
- `/bantuan` - Bantuan

### Admin

- `/login` - Login admin
- `/admin` - Admin dashboard (protected route)

## Keuntungan MPA dengan React Router

1. **SEO-Friendly**: Setiap halaman memiliki URL unik yang dapat diindeks oleh mesin pencari
2. **Shareable Links**: User dapat membagikan link spesifik ke halaman tertentu
3. **Browser History**: Tombol back/forward browser berfungsi dengan baik
4. **Bookmarkable**: User dapat bookmark halaman spesifik
5. **Deep Linking**: Link langsung ke konten spesifik (misalnya lowongan tertentu)

## Catatan Implementasi

- Menggunakan `react-router-dom` untuk routing
- Breadcrumb otomatis berdasarkan URL path
- Protected route untuk admin (redirect ke /login jika belum login)
- History API fallback otomatis di Vite untuk mendukung reload halaman
- Navigasi menggunakan `window.location.href` untuk full page reload (dapat dioptimasi dengan `useNavigate` dari React Router)

## Deployment

Untuk production, pastikan server dikonfigurasi untuk:

- Mengarahkan semua request ke `index.html` (SPA fallback)
- Atau gunakan konfigurasi seperti `_redirects` (Netlify) atau `.htaccess` (Apache)

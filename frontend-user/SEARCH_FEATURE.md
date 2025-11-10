# Fitur Search - Dokumentasi

## Overview

Fitur search yang menampilkan hasil pencarian dari berbagai kategori dalam satu halaman tersendiri.

## Fitur Utama

1. **Pencarian Multi-Kategori**: Menampilkan hasil dari 4 kategori berbeda:

   - 🏢 Lowongan Kerja (jobs)
   - 🏛️ Perusahaan (companies)
   - 📰 Artikel & Tips (blog posts)
   - 💰 Misi Cuan (offers)

2. **Pencarian Real-time**:

   - User dapat menekan Enter atau klik icon search untuk mencari
   - Hasil otomatis difilter berdasarkan query

3. **Pencarian Substring**:
   - Tidak harus cocok dari awal string
   - Contoh: "bank" akan cocok dengan "Bank Mandiri", "Perbankan", dll

## Cara Menggunakan

### Untuk User:

1. Ketik kata kunci di search bar di header
2. Tekan Enter atau klik icon search (🔍)
3. Akan redirect ke halaman `/search?q=keyword`
4. Lihat hasil pencarian yang dikelompokkan per kategori

### Field yang Dicari:

**Lowongan Kerja:**

- title (judul lowongan)
- company (nama perusahaan)
- location (lokasi)
- description (deskripsi)
- category (kategori)
- tags (tag-tag)
- majors (jurusan terkait)

**Perusahaan:**

- name (nama perusahaan)
- description (deskripsi)
- type (tipe perusahaan)

**Artikel:**

- title (judul artikel)
- description (deskripsi)
- category (kategori)

**Misi Cuan:**

- title (judul misi)
- company (nama perusahaan)
- description (deskripsi)

## Struktur File

### Komponen Baru:

- `SearchResultsPage.tsx` - Halaman utama search results
- `ArticleCard.tsx` - Card component untuk artikel

### File yang Dimodifikasi:

1. `Header.tsx`:

   - Tambah handler onKeyDown untuk Enter
   - Tambah onClick pada icon search
   - Redirect ke `/search?q=keyword`

2. `App.tsx`:

   - Tambah case 'search' pada handleNavigation
   - Tambah breadcrumb untuk halaman search

3. `AppRoutes.tsx`:
   - Import `SearchResultsPage` dan `useSearchParams`
   - Tambah route `/search`
   - Tambah `SearchResultsWrapper` component

## URL Structure

```
/search?q=<keyword>
```

Query parameter `q` berisi kata kunci pencarian

## UI/UX Features

1. **Empty State**: Tampilkan pesan jika belum ada keyword
2. **No Results**: Tampilkan pesan jika tidak ada hasil
3. **Result Count**: Tampilkan jumlah total hasil
4. **Grouped Results**: Hasil dikelompokkan per kategori dengan icon
5. **Load More**: Tampilkan max 8 items per kategori, dengan link "Lihat semua X hasil"
6. **Card Design**: Setiap kategori menggunakan card component yang sudah ada

## Performance Optimization

- Menggunakan `useMemo` untuk filtering agar tidak re-compute setiap render
- Lazy loading dengan slice untuk limit hasil yang ditampilkan

## Testing Checklist

- [ ] Search dari header redirect ke halaman search
- [ ] Query parameter muncul di URL
- [ ] Hasil search muncul sesuai keyword
- [ ] Substring matching berfungsi
- [ ] Semua 4 kategori muncul jika ada hasil
- [ ] Card dapat diklik dan redirect ke detail page
- [ ] Empty state muncul jika belum search
- [ ] No results state muncul jika tidak ada hasil
- [ ] Link "Lihat semua" berfungsi
- [ ] Breadcrumb muncul dengan benar

## Future Enhancements

- [ ] Tambah filter by category
- [ ] Tambah sorting options
- [ ] Tambah highlight pada matched text
- [ ] Tambah search suggestions/autocomplete
- [ ] Tambah recent searches
- [ ] Tambah debounce untuk performa
- [ ] Persist search query di URL untuk shareable links
- [ ] Tambah pagination untuk hasil banyak
- [ ] Tambah search analytics

## Technical Notes

- Search dilakukan di client-side menggunakan `Array.filter()`
- Case-insensitive matching menggunakan `toLowerCase()`
- Substring matching menggunakan `String.includes()`
- Query parameter dibaca menggunakan `useSearchParams` dari react-router-dom

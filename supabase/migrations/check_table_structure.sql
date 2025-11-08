-- ================================================
-- CHECK TABLE STRUCTURE - KABARKARIR.COM
-- ================================================
-- Script untuk mengecek struktur tabel yang ada
-- ================================================

-- ===========================================
-- 1. CEK SEMUA TABEL YANG ADA
-- ===========================================
SELECT table_name
FROM information_schema.tables
WHERE
    table_schema = 'public'
ORDER BY table_name;

-- ===========================================
-- 2. CEK STRUKTUR TABEL COMPANIES
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'companies'
ORDER BY ordinal_position;

-- ===========================================
-- 3. CEK STRUKTUR TABEL JOBS
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'jobs'
ORDER BY ordinal_position;

-- ===========================================
-- 4. CEK STRUKTUR TABEL BLOG_POSTS
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'blog_posts'
ORDER BY ordinal_position;

-- ===========================================
-- 5. CEK STRUKTUR TABEL INTERNSHIPS
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'internships'
ORDER BY ordinal_position;

-- ===========================================
-- 6. CEK STRUKTUR TABEL SCHOLARSHIPS
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'scholarships'
ORDER BY ordinal_position;

-- ===========================================
-- 7. CEK STRUKTUR TABEL COURSES
-- ===========================================
SELECT
    column_name,
    data_type,
    character_maximum_length,
    column_default,
    is_nullable
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'courses'
ORDER BY ordinal_position;

-- ===========================================
-- 8. CEK DATA YANG SUDAH ADA
-- ===========================================
-- Companies
SELECT 'companies' as table_name, COUNT(*) as row_count
FROM companies
UNION ALL
SELECT 'jobs', COUNT(*)
FROM jobs
UNION ALL
SELECT 'blog_posts', COUNT(*)
FROM blog_posts
UNION ALL
SELECT 'internships', COUNT(*)
FROM internships
UNION ALL
SELECT 'scholarships', COUNT(*)
FROM scholarships
UNION ALL
SELECT 'courses', COUNT(*)
FROM courses;

-- ===========================================
-- 9. CEK SAMPLE DATA JOBS (jika ada)
-- ===========================================
SELECT * FROM jobs LIMIT 1;

-- ===========================================
-- 10. CEK CONSTRAINTS & INDEXES
-- ===========================================
SELECT tc.constraint_name, tc.table_name, kcu.column_name, tc.constraint_type
FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
WHERE
    tc.table_schema = 'public'
    AND tc.table_name IN (
        'companies',
        'jobs',
        'blog_posts',
        'internships',
        'scholarships',
        'courses'
    )
ORDER BY tc.table_name, tc.constraint_type;

-- ================================================
-- CARA MENGGUNAKAN:
-- ================================================
-- 1. Copy paste script ini ke Supabase SQL Editor
-- 2. Run setiap query satu per satu (atau sekaligus)
-- 3. Lihat hasilnya untuk mengetahui struktur tabel yang sebenarnya
-- 4. Gunakan informasi ini untuk memperbaiki seed_dummy_data_v2.sql
-- ================================================
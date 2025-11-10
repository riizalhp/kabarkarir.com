-- Cek kolom apa saja yang ada di tabel blog_posts
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_schema = 'public'
    AND table_name = 'blog_posts'
ORDER BY ordinal_position;
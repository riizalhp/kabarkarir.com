-- Create or update blog_posts table structure
-- This ensures the table has all the columns we need

-- Drop table if exists (BE CAREFUL IN PRODUCTION!)
-- DROP TABLE IF EXISTS blog_posts CASCADE;

-- Create blog_posts table with correct structure
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE,
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author_name VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    featured_image VARCHAR(500),
    tags TEXT, -- JSON string
    is_published BOOLEAN DEFAULT true,
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);

CREATE INDEX IF NOT EXISTS idx_blog_posts_posted_date ON blog_posts (posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);

CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts (is_published);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;

CREATE POLICY "Public can view published posts" ON blog_posts FOR
SELECT USING (is_published = true);

-- Create policy for authenticated users to insert/update/delete
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON blog_posts;

CREATE POLICY "Authenticated users can manage posts" ON blog_posts FOR ALL USING (
    auth.role () = 'authenticated'
)
WITH
    CHECK (
        auth.role () = 'authenticated'
    );

-- Add comment
COMMENT ON
TABLE blog_posts IS 'Blog articles and posts for KabarKarir.com';

-- Show table structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_name = 'blog_posts'
ORDER BY ordinal_position;
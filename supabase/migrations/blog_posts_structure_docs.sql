-- Update blog_posts table to match actual database structure
-- Based on table inspection, the actual structure uses:
-- image (not featured_image), description (not excerpt), no author_name, no tags

-- Note: Table already exists with this structure, this is for documentation

/*
Actual table structure:
- id (bigint, primary key, auto-increment)
- title (varchar, NOT NULL)
- slug (varchar, NOT NULL, UNIQUE)
- image (text)
- category (varchar)
- category_color (varchar, default 'blue')
- description (text)
- content (text)
- posted_date (date, default CURRENT_DATE)
- is_published (boolean, default true)
- created_at (timestamp with time zone, default now())
- updated_at (timestamp with time zone, default now())
- view_count (integer, default 0)
*/

-- If you need to create the table from scratch, use this:
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    slug VARCHAR NOT NULL UNIQUE,
    image TEXT,
    category VARCHAR,
    category_color VARCHAR DEFAULT 'blue',
    description TEXT,
    content TEXT,
    posted_date DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        view_count INTEGER DEFAULT 0
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
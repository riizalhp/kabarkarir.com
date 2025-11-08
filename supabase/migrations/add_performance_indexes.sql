-- Add indexes for better query performance
-- This will significantly speed up data loading

-- Index for jobs table - company_slug is frequently used in joins and filters
CREATE INDEX IF NOT EXISTS idx_jobs_company_slug ON jobs (company_slug);

-- Index for jobs table - posted_date for sorting
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs (posted_date DESC);

-- Index for jobs table - is_active for filtering
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs (is_active);

-- Index for companies table - slug for lookups
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies (slug);

-- Index for companies table - name for sorting
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies (name);

-- Index for blog_posts table - posted_date for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_posted_date ON blog_posts (posted_date DESC);

-- Index for blog_posts table - is_published for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts (is_published);

-- Index for recruitment_events table - event_date for sorting
CREATE INDEX IF NOT EXISTS idx_events_event_date ON recruitment_events (event_date DESC);

-- Index for activity_logs table - created_at for sorting
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs (created_at DESC);

-- Composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_jobs_active_posted ON jobs (is_active, posted_date DESC);

-- Verify indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE
    schemaname = 'public'
ORDER BY tablename, indexname;
-- Add view_count columns to tables
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

ALTER TABLE recruitment_events
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Create indexes for better performance on view_count queries
CREATE INDEX IF NOT EXISTS idx_companies_view_count ON companies (view_count DESC);

CREATE INDEX IF NOT EXISTS idx_events_view_count ON recruitment_events (view_count DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON blog_posts (view_count DESC);

-- Function to increment company views
CREATE OR REPLACE FUNCTION increment_company_views(company_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE companies 
  SET view_count = COALESCE(view_count, 0) + 1 
  WHERE id = company_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment event views
CREATE OR REPLACE FUNCTION increment_event_views(event_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE recruitment_events 
  SET view_count = COALESCE(view_count, 0) + 1 
  WHERE id = event_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment blog post views
CREATE OR REPLACE FUNCTION increment_blog_views(post_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = COALESCE(view_count, 0) + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON COLUMN companies.view_count IS 'Total number of times company profile has been viewed';

COMMENT ON COLUMN recruitment_events.view_count IS 'Total number of times event detail has been viewed';

COMMENT ON COLUMN blog_posts.view_count IS 'Total number of times blog post has been viewed';

COMMENT ON FUNCTION increment_company_views IS 'Increment view count for a company profile';

COMMENT ON FUNCTION increment_event_views IS 'Increment view count for a recruitment event';

COMMENT ON FUNCTION increment_blog_views IS 'Increment view count for a blog post';
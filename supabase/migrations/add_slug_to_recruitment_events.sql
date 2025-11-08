-- ================================================
-- ADD SLUG TO RECRUITMENT_EVENTS TABLE
-- ================================================
-- Menambahkan kolom slug untuk SEO-friendly URLs

-- Add slug column to recruitment_events table
ALTER TABLE recruitment_events
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_recruitment_events_slug ON recruitment_events (slug);

-- Add comment
COMMENT ON COLUMN recruitment_events.slug IS 'SEO-friendly URL slug for the event';
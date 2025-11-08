-- Add slug column to jobs table for SEO-friendly URLs
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs (slug);

-- Update existing jobs with slug generated from title
-- This is a one-time migration for existing data
UPDATE jobs
SET
    slug = LOWER(
        REGEXP_REPLACE(
            REGEXP_REPLACE(
                REGEXP_REPLACE(
                    title,
                    '[^a-zA-Z0-9\s-]',
                    '',
                    'g'
                ),
                '\s+',
                '-',
                'g'
            ),
            '-+',
            '-',
            'g'
        )
    )
WHERE
    slug IS NULL;

-- Make slug NOT NULL after populating existing data
ALTER TABLE jobs ALTER COLUMN slug SET NOT NULL;
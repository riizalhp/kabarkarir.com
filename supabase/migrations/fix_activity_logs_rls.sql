-- Fix Row-Level Security (RLS) for activity_logs table
-- This allows authenticated users to insert activity logs

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow authenticated users to insert activity logs" ON activity_logs;

DROP POLICY IF EXISTS "Allow public read access to activity logs" ON activity_logs;

-- Enable RLS on activity_logs table
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow authenticated users to INSERT activity logs
CREATE POLICY "Allow authenticated users to insert activity logs" ON activity_logs FOR
INSERT
    TO authenticated
WITH
    CHECK (true);

-- Policy 2: Allow authenticated users to SELECT activity logs
CREATE POLICY "Allow authenticated users to read activity logs" ON activity_logs FOR
SELECT TO authenticated USING (true);

-- Policy 3: Allow service role to do anything (for admin operations)
CREATE POLICY "Allow service role full access" ON activity_logs FOR ALL TO service_role USING (true)
WITH
    CHECK (true);

-- Optional: If you want public read access (for displaying recent activities on public pages)
-- Uncomment the line below:
-- CREATE POLICY "Allow public read access to activity logs"
-- ON activity_logs
-- FOR SELECT
-- TO public
-- USING (true);

-- Verify policies
SELECT * FROM pg_policies WHERE tablename = 'activity_logs';
-- ============================================================================
-- FIX RLS POLICIES - Allow Anonymous Access to Frontend-User Data
-- ============================================================================
-- Problem: Data visible in admin (authenticated) but not in frontend-user (anonymous)
-- Solution: Create RLS policies to allow public SELECT access
-- ============================================================================

-- ============================================================================
-- 1. JOBS TABLE - Allow public to view active jobs
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON jobs;

DROP POLICY IF EXISTS "Public can view active jobs" ON jobs;

CREATE POLICY "Public can view active jobs" ON jobs FOR
SELECT USING (is_active = true);

-- ============================================================================
-- 2. COMPANIES TABLE - Allow public to view all companies
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON companies;

DROP POLICY IF EXISTS "Public can view companies" ON companies;

-- Companies tidak punya is_active, jadi allow all
CREATE POLICY "Public can view companies" ON companies FOR
SELECT USING (true);

-- ============================================================================
-- 3. BLOG_POSTS TABLE - Allow public to view published posts
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;

DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;

CREATE POLICY "Public can view published posts" ON blog_posts FOR
SELECT USING (is_published = true);

-- ============================================================================
-- 4. RECRUITMENT_EVENTS TABLE - Allow public to view active events
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON recruitment_events;

DROP POLICY IF EXISTS "Public can view active events" ON recruitment_events;

CREATE POLICY "Public can view active events" ON recruitment_events FOR
SELECT USING (is_active = true);

-- ============================================================================
-- 5. MISI_CUAN_OFFERS TABLE - Allow public to view offers (if table exists)
-- ============================================================================
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE
        table_name = 'misi_cuan_offers'
) THEN
DROP POLICY IF EXISTS "Enable read access for all users" ON misi_cuan_offers;

DROP POLICY IF EXISTS "Public can view active misi cuan" ON misi_cuan_offers;

-- Try with is_active column
IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE
        table_name = 'misi_cuan_offers'
        AND column_name = 'is_active'
) THEN
EXECUTE 'CREATE POLICY "Public can view active misi cuan" ON misi_cuan_offers FOR SELECT USING (is_active = true)';

ELSE
EXECUTE 'CREATE POLICY "Public can view all misi cuan" ON misi_cuan_offers FOR SELECT USING (true)';

END IF;

END IF;

END $$;

-- ============================================================================
-- 6. MAJORS TABLE - Allow public to view all majors
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON majors;

DROP POLICY IF EXISTS "Public can view all majors" ON majors;

-- Majors mungkin tidak punya is_active, jadi allow all
CREATE POLICY "Public can view all majors" ON majors FOR
SELECT USING (true);

-- ============================================================================
-- 7. TAGS TABLE - Allow public to view all tags
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON tags;

DROP POLICY IF EXISTS "Public can view all tags" ON tags;

-- Tags mungkin tidak punya is_active, jadi allow all
CREATE POLICY "Public can view all tags" ON tags FOR
SELECT USING (true);

-- ============================================================================
-- 8. COURSES TABLE (Pelatihan) - Allow public to view published courses
-- ============================================================================
DROP POLICY IF EXISTS "Enable read access for all users" ON courses;

DROP POLICY IF EXISTS "Public can view published courses" ON courses;

-- Courses use 'status' not 'is_active'
CREATE POLICY "Public can view published courses" ON courses FOR
SELECT USING (status = 'published');

-- ============================================================================
-- VERIFICATION - Test if anonymous can access data
-- ============================================================================
-- Run these queries to verify RLS policies work:
-- Test 1: Check jobs (should return data)
SELECT COUNT(*) as total_active_jobs
FROM jobs
WHERE
    is_active = true;

-- Test 2: Check companies (should return data)
SELECT COUNT(*) as total_companies
FROM companies;

-- Test 3: Check blog posts (should return data)
SELECT COUNT(*) as total_published_posts
FROM blog_posts
WHERE
    is_published = true;

-- Test 4: Check recruitment events (should return data)
SELECT COUNT(*) as total_active_events
FROM recruitment_events
WHERE
    is_active = true;

-- Test 5: Check if RLS is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE
    schemaname = 'public'
    AND tablename IN (
        'jobs',
        'companies',
        'blog_posts',
        'recruitment_events',
        'misi_cuan_offers',
        'majors',
        'tags',
        'courses'
    )
ORDER BY tablename;

-- Test 6: List all active policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE
    schemaname = 'public'
    AND tablename IN (
        'jobs',
        'companies',
        'blog_posts',
        'recruitment_events',
        'misi_cuan_offers',
        'majors',
        'tags',
        'courses'
    )
ORDER BY tablename, policyname;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$ BEGIN RAISE NOTICE '✅ RLS POLICIES UPDATED SUCCESSFULLY!';

RAISE NOTICE '';

RAISE NOTICE '📋 Policies created for:';

RAISE NOTICE '   - jobs (public can view active)';

RAISE NOTICE '   - companies (public can view all)';

RAISE NOTICE '   - blog_posts (public can view published)';

RAISE NOTICE '   - recruitment_events (public can view active)';

RAISE NOTICE '   - misi_cuan_offers (public can view active)';

RAISE NOTICE '   - majors (public can view all)';

RAISE NOTICE '   - tags (public can view all)';

RAISE NOTICE '   - courses (public can view published)';

RAISE NOTICE '';

RAISE NOTICE '🧪 Test with verification queries above';

RAISE NOTICE '🔄 Refresh frontend-user to see data appear';

END $$;
-- ============================================================================
-- MIGRATION: Delete ALL Data from ALL Tables
-- ============================================================================
-- WARNING: This will permanently delete all data from your database!
-- Use with extreme caution. This is irreversible.
-- Recommended: Create a backup before running this script.
-- ============================================================================

-- ============================================================================
-- DELETE DATA FROM PELATIHAN LMS TABLES
-- ============================================================================
-- TRUNCATE CASCADE will automatically handle foreign key constraints

-- LMS Tables (delete child tables first for clarity, but CASCADE handles it)
TRUNCATE TABLE course_reviews RESTART IDENTITY CASCADE;

TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;

TRUNCATE TABLE user_progress RESTART IDENTITY CASCADE;

TRUNCATE TABLE user_enrollments RESTART IDENTITY CASCADE;

TRUNCATE TABLE course_lessons RESTART IDENTITY CASCADE;

TRUNCATE TABLE course_modules RESTART IDENTITY CASCADE;

TRUNCATE TABLE courses RESTART IDENTITY CASCADE;

-- ============================================================================
-- DELETE DATA FROM MAHASISWA TABLES
-- ============================================================================
TRUNCATE TABLE internships RESTART IDENTITY CASCADE;

TRUNCATE TABLE scholarships RESTART IDENTITY CASCADE;

TRUNCATE TABLE competitions RESTART IDENTITY CASCADE;

TRUNCATE TABLE webinars RESTART IDENTITY CASCADE;

TRUNCATE TABLE campus_events RESTART IDENTITY CASCADE;

TRUNCATE TABLE freelance_jobs RESTART IDENTITY CASCADE;

-- ============================================================================
-- DELETE DATA FROM OTHER TABLES (if they exist)
-- ============================================================================
-- Add any other tables you want to clear
-- TRUNCATE TABLE your_other_table RESTART IDENTITY CASCADE;

-- ============================================================================
-- VERIFICATION - Check all tables are empty
-- ============================================================================
-- Note: RESTART IDENTITY in TRUNCATE already reset the sequences to 1
SELECT 'courses' as table_name, COUNT(*) as row_count
FROM courses
UNION ALL
SELECT 'course_modules' as table_name, COUNT(*) as row_count
FROM course_modules
UNION ALL
SELECT 'course_lessons' as table_name, COUNT(*) as row_count
FROM course_lessons
UNION ALL
SELECT 'user_enrollments' as table_name, COUNT(*) as row_count
FROM user_enrollments
UNION ALL
SELECT 'user_progress' as table_name, COUNT(*) as row_count
FROM user_progress
UNION ALL
SELECT 'certificates' as table_name, COUNT(*) as row_count
FROM certificates
UNION ALL
SELECT 'course_reviews' as table_name, COUNT(*) as row_count
FROM course_reviews
UNION ALL
SELECT 'internships' as table_name, COUNT(*) as row_count
FROM internships
UNION ALL
SELECT 'scholarships' as table_name, COUNT(*) as row_count
FROM scholarships
UNION ALL
SELECT 'competitions' as table_name, COUNT(*) as row_count
FROM competitions
UNION ALL
SELECT 'webinars' as table_name, COUNT(*) as row_count
FROM webinars
UNION ALL
SELECT 'campus_events' as table_name, COUNT(*) as row_count
FROM campus_events
UNION ALL
SELECT 'freelance_jobs' as table_name, COUNT(*) as row_count
FROM freelance_jobs
ORDER BY table_name;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$ BEGIN RAISE NOTICE '✅ ALL DATA HAS BEEN DELETED SUCCESSFULLY!';

RAISE NOTICE '✅ All sequences have been reset to 1';

RAISE NOTICE '⚠️  Tables structure is preserved (not dropped)';

RAISE NOTICE '📝 Check verification query above to confirm all tables are empty';

END $$;
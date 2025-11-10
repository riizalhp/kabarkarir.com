-- ============================================================================
-- MIGRATION: Delete ALL Data - SAFE VERSION with Confirmation
-- ============================================================================
-- This is a safer version that requires manual confirmation
-- Instructions:
-- 1. Review the tables that will be affected
-- 2. Uncomment the TRUNCATE commands you want to execute
-- 3. Run this script
-- ============================================================================

-- ============================================================================
-- STEP 1: VIEW CURRENT DATA COUNT
-- ============================================================================
-- Run this first to see how much data will be deleted
SELECT 'courses' as table_name, COUNT(*) as row_count
FROM courses
UNION ALL
SELECT 'course_modules', COUNT(*)
FROM course_modules
UNION ALL
SELECT 'course_lessons', COUNT(*)
FROM course_lessons
UNION ALL
SELECT 'user_enrollments', COUNT(*)
FROM user_enrollments
UNION ALL
SELECT 'user_progress', COUNT(*)
FROM user_progress
UNION ALL
SELECT 'certificates', COUNT(*)
FROM certificates
UNION ALL
SELECT 'course_reviews', COUNT(*)
FROM course_reviews
UNION ALL
SELECT 'internships', COUNT(*)
FROM internships
UNION ALL
SELECT 'scholarships', COUNT(*)
FROM scholarships
UNION ALL
SELECT 'competitions', COUNT(*)
FROM competitions
UNION ALL
SELECT 'webinars', COUNT(*)
FROM webinars
UNION ALL
SELECT 'campus_events', COUNT(*)
FROM campus_events
UNION ALL
SELECT 'freelance_jobs', COUNT(*)
FROM freelance_jobs
ORDER BY table_name;

-- ============================================================================
-- STEP 2: UNCOMMENT TO DELETE DATA
-- ============================================================================
-- Remove the /* and */ comments below to execute deletion

/*
-- PELATIHAN LMS TABLES (RESTART IDENTITY resets sequences automatically)
TRUNCATE TABLE course_reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_progress RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_enrollments RESTART IDENTITY CASCADE;
TRUNCATE TABLE course_lessons RESTART IDENTITY CASCADE;
TRUNCATE TABLE course_modules RESTART IDENTITY CASCADE;
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;

-- MAHASISWA TABLES
TRUNCATE TABLE internships RESTART IDENTITY CASCADE;
TRUNCATE TABLE scholarships RESTART IDENTITY CASCADE;
TRUNCATE TABLE competitions RESTART IDENTITY CASCADE;
TRUNCATE TABLE webinars RESTART IDENTITY CASCADE;
TRUNCATE TABLE campus_events RESTART IDENTITY CASCADE;
TRUNCATE TABLE freelance_jobs RESTART IDENTITY CASCADE;

SELECT 'Data deleted successfully! All sequences reset to 1.' as status;
*/

-- ============================================================================
-- STEP 3: VERIFY DELETION (Run after uncommenting above)
-- ============================================================================
-- Uncomment this after deletion to verify

/*
SELECT 
'courses' as table_name, 
COUNT(*) as remaining_rows 
FROM courses
UNION ALL
SELECT 'course_modules', COUNT(*) FROM course_modules
UNION ALL
SELECT 'course_lessons', COUNT(*) FROM course_lessons
UNION ALL
SELECT 'user_enrollments', COUNT(*) FROM user_enrollments
UNION ALL
SELECT 'user_progress', COUNT(*) FROM user_progress
UNION ALL
SELECT 'certificates', COUNT(*) FROM certificates
UNION ALL
SELECT 'course_reviews', COUNT(*) FROM course_reviews
UNION ALL
SELECT 'internships', COUNT(*) FROM internships
UNION ALL
SELECT 'scholarships', COUNT(*) FROM scholarships
UNION ALL
SELECT 'competitions', COUNT(*) FROM competitions
UNION ALL
SELECT 'webinars', COUNT(*) FROM webinars
UNION ALL
SELECT 'campus_events', COUNT(*) FROM campus_events
UNION ALL
SELECT 'freelance_jobs', COUNT(*) FROM freelance_jobs
ORDER BY table_name;
*/
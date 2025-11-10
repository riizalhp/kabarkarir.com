-- ============================================================================
-- MIGRATION: Delete Specific Table Data Only
-- ============================================================================
-- Use this to delete data from specific tables only
-- Uncomment only the tables you want to delete
-- ============================================================================

-- ============================================================================
-- PELATIHAN LMS TABLES
-- ============================================================================

-- Delete Course Reviews Only
-- TRUNCATE TABLE course_reviews RESTART IDENTITY CASCADE;

-- Delete Certificates Only
-- TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;

-- Delete User Progress Only
-- TRUNCATE TABLE user_progress RESTART IDENTITY CASCADE;

-- Delete User Enrollments Only
-- TRUNCATE TABLE user_enrollments RESTART IDENTITY CASCADE;

-- Delete Course Lessons Only
-- TRUNCATE TABLE course_lessons RESTART IDENTITY CASCADE;

-- Delete Course Modules Only
-- TRUNCATE TABLE course_modules RESTART IDENTITY CASCADE;

-- Delete Courses Only
-- TRUNCATE TABLE courses RESTART IDENTITY CASCADE;

-- ============================================================================
-- MAHASISWA TABLES
-- ============================================================================

-- Delete Internships Only
-- TRUNCATE TABLE internships RESTART IDENTITY CASCADE;

-- Delete Scholarships Only
-- TRUNCATE TABLE scholarships RESTART IDENTITY CASCADE;

-- Delete Competitions Only
-- TRUNCATE TABLE competitions RESTART IDENTITY CASCADE;

-- Delete Webinars Only
-- TRUNCATE TABLE webinars RESTART IDENTITY CASCADE;

-- Delete Campus Events Only
-- TRUNCATE TABLE campus_events RESTART IDENTITY CASCADE;

-- Delete Freelance Jobs Only
-- TRUNCATE TABLE freelance_jobs RESTART IDENTITY CASCADE;

-- ============================================================================
-- BULK DELETE OPTIONS
-- ============================================================================

-- Option 1: Delete ALL Pelatihan LMS Data
/*
TRUNCATE TABLE course_reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_progress RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_enrollments RESTART IDENTITY CASCADE;
TRUNCATE TABLE course_lessons RESTART IDENTITY CASCADE;
TRUNCATE TABLE course_modules RESTART IDENTITY CASCADE;
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;
*/

-- Option 2: Delete ALL Mahasiswa Data
/*
TRUNCATE TABLE internships RESTART IDENTITY CASCADE;
TRUNCATE TABLE scholarships RESTART IDENTITY CASCADE;
TRUNCATE TABLE competitions RESTART IDENTITY CASCADE;
TRUNCATE TABLE webinars RESTART IDENTITY CASCADE;
TRUNCATE TABLE campus_events RESTART IDENTITY CASCADE;
TRUNCATE TABLE freelance_jobs RESTART IDENTITY CASCADE;
*/

-- Option 3: Delete ALL User Activity Data Only (keep course structure)
/*
TRUNCATE TABLE course_reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE certificates RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_progress RESTART IDENTITY CASCADE;
TRUNCATE TABLE user_enrollments RESTART IDENTITY CASCADE;
*/
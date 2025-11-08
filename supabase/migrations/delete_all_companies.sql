-- ============================================================================
-- SCRIPT: DELETE ALL COMPANIES DATA
-- ============================================================================
-- WARNING: This will PERMANENTLY DELETE all company data from the database
-- Make sure you have a backup before running this script!
-- ============================================================================

-- Step 1: Check current count (optional, for verification)
-- Uncomment to see how many companies will be deleted
-- SELECT COUNT(*) as total_companies FROM companies;
-- SELECT COUNT(*) as total_jobs FROM jobs WHERE company_slug IN (SELECT slug FROM companies);

-- ============================================================================
-- IMPORTANT: Check Foreign Key Constraints First
-- ============================================================================
-- Jobs table likely has a foreign key to companies.slug
-- We need to handle jobs that reference companies first

-- Option A: Delete all jobs related to companies first (if you want to delete jobs too)
-- Uncomment if you want to delete related jobs:
-- DELETE FROM jobs WHERE company_slug IN (SELECT slug FROM companies);

-- Option B: Update jobs to remove company reference (set to NULL or default)
-- Uncomment if you want to keep jobs but remove company association:
-- UPDATE jobs SET company_slug = NULL WHERE company_slug IN (SELECT slug FROM companies);

-- ============================================================================
-- Step 2: Delete all companies
-- ============================================================================
-- This will delete ALL companies from the database
-- Uncomment the line below when you're ready to execute:

-- DELETE FROM companies;

-- Alternative: Delete with WHERE clause if you want to be more selective
-- Example: Delete only specific type
-- DELETE FROM companies WHERE type = 'BUMN';
-- DELETE FROM companies WHERE type = 'SWASTA';
-- DELETE FROM companies WHERE type = 'INSTANSI';

-- ============================================================================
-- Step 3: Verify deletion (optional)
-- ============================================================================
-- Uncomment to verify companies were deleted:
-- SELECT COUNT(*) as remaining_companies FROM companies;

-- ============================================================================
-- ROLLBACK INSTRUCTIONS
-- ============================================================================
-- If you run this in a transaction, you can rollback:
-- BEGIN;
--   DELETE FROM companies;
--   -- Check if everything looks good
--   SELECT COUNT(*) FROM companies;
--   -- If you want to undo: ROLLBACK;
--   -- If you're sure: COMMIT;
-- COMMIT;

-- ============================================================================
-- READY-TO-USE SCRIPT (Remove comments to activate)
-- ============================================================================

BEGIN;

-- Check before delete
SELECT 'BEFORE DELETE' as status, COUNT(*) as total_companies
FROM companies;

-- Option 1: Delete related jobs first (RECOMMENDED if jobs are test data)
-- DELETE FROM jobs WHERE company_slug IN (SELECT slug FROM companies);

-- Option 2: Set company_slug to NULL in jobs (RECOMMENDED if jobs should be kept)
-- UPDATE jobs SET company_slug = NULL WHERE company_slug IN (SELECT slug FROM companies);

-- Delete all companies
DELETE FROM companies;

-- Check after delete
SELECT 'AFTER DELETE' as status, COUNT(*) as remaining_companies
FROM companies;

-- Review the results above
-- If everything looks good, run: COMMIT;
-- If you want to undo, run: ROLLBACK;

-- Uncomment one of these after reviewing:
-- COMMIT;   -- To make changes permanent
-- ROLLBACK; -- To undo changes

COMMIT;
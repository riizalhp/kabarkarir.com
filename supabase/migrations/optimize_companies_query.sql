-- Optimize companies table query performance
-- Add index for type column (BUMN, SWASTA, INSTANSI filter)

-- Index for companies table - type for filtering
CREATE INDEX IF NOT EXISTS idx_companies_type ON companies (type);

-- Composite index for type + name sorting (common query pattern)
CREATE INDEX IF NOT EXISTS idx_companies_type_name ON companies (type, name);

-- Analyze the table to update statistics for query planner
ANALYZE companies;

-- Verify the indexes
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE
    schemaname = 'public'
    AND tablename = 'companies'
ORDER BY indexname;
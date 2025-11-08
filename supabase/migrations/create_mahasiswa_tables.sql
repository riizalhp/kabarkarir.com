-- ============================================================================
-- MIGRATION: Create Tables for Frontend Mahasiswa (mahasiswa.kabarkarir.com)
-- ============================================================================
-- Tables: internships, scholarships, competitions, webinars, campus_events, freelance_jobs
-- All tables include SEO-optimized slugs and metadata
-- ============================================================================

-- ============================================================================
-- 1. INTERNSHIPS TABLE (Magang)
-- ============================================================================
CREATE TABLE IF NOT EXISTS internships (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL, -- SEO optimized slug
    company_name VARCHAR(255) NOT NULL,
    company_slug VARCHAR(255), -- Reference to companies table if exists
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    benefits TEXT,
    duration VARCHAR(100), -- e.g., "3 bulan", "6 bulan"
    location VARCHAR(255),
    province VARCHAR(100),
    city VARCHAR(100),
    is_remote BOOLEAN DEFAULT false,
    stipend VARCHAR(100), -- e.g., "Rp 2.000.000/bulan", "Unpaid"
    application_url TEXT,
    application_deadline DATE,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    applicants_count INTEGER DEFAULT 0,
    tags TEXT[], -- ["teknologi", "marketing", "design"]
    meta_title VARCHAR(255), -- SEO
    meta_description TEXT, -- SEO
    meta_keywords TEXT, -- SEO
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. SCHOLARSHIPS TABLE (Beasiswa)
-- ============================================================================
CREATE TABLE IF NOT EXISTS scholarships (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    provider_name VARCHAR(255) NOT NULL, -- Nama pemberi beasiswa
    provider_logo TEXT, -- URL logo
    description TEXT NOT NULL,
    eligibility TEXT NOT NULL, -- Syarat kelayakan
    benefits TEXT NOT NULL, -- Manfaat beasiswa
    coverage VARCHAR(255), -- "Full", "Partial", "50%"
    amount VARCHAR(100), -- Nominal jika ada
    education_level VARCHAR(100), -- "S1", "S2", "S3", "D3"
    majors TEXT[], -- Jurusan yang eligible
    deadline DATE,
    application_url TEXT NOT NULL,
    countries TEXT[], -- Negara tujuan: ["Indonesia", "USA", "UK"]
    duration VARCHAR(100), -- "1 tahun", "4 tahun"
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    applicants_count INTEGER DEFAULT 0,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 3. COMPETITIONS TABLE (Lomba)
-- ============================================================================
CREATE TABLE IF NOT EXISTS competitions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    organizer_name VARCHAR(255) NOT NULL,
    organizer_logo TEXT,
    description TEXT NOT NULL,
    category VARCHAR(100), -- "Teknologi", "Bisnis", "Seni", "Olahraga"
    prize_pool VARCHAR(255), -- "Total hadiah Rp 50 juta"
    prizes TEXT, -- Detail hadiah: Juara 1, 2, 3
    eligibility TEXT, -- Syarat peserta
    registration_fee VARCHAR(100), -- "Gratis", "Rp 100.000"
    registration_deadline DATE,
    competition_date DATE,
    location VARCHAR(255),
    is_online BOOLEAN DEFAULT false,
    registration_url TEXT NOT NULL,
    website_url TEXT,
    contact_info TEXT,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    participants_count INTEGER DEFAULT 0,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 4. WEBINARS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS webinars (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    host_name VARCHAR(255) NOT NULL, -- Nama penyelenggara
    host_logo TEXT,
    speaker_name VARCHAR(255), -- Pembicara
    speaker_title VARCHAR(255), -- Jabatan pembicara
    speaker_photo TEXT,
    description TEXT NOT NULL,
    topics TEXT[], -- ["Career Development", "Digital Marketing"]
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration VARCHAR(50), -- "2 jam", "90 menit"
    platform VARCHAR(100), -- "Zoom", "Google Meet", "YouTube Live"
    registration_url TEXT NOT NULL,
    is_free BOOLEAN DEFAULT true,
    price VARCHAR(100), -- "Gratis", "Rp 50.000"
    max_participants INTEGER,
    certificate_available BOOLEAN DEFAULT false,
    recording_available BOOLEAN DEFAULT false,
    recording_url TEXT,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    registrants_count INTEGER DEFAULT 0,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 5. CAMPUS EVENTS TABLE (Event Kampus)
-- ============================================================================
CREATE TABLE IF NOT EXISTS campus_events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    university_name VARCHAR(255) NOT NULL,
    university_logo TEXT,
    event_type VARCHAR(100), -- "Seminar", "Workshop", "Career Fair", "Festival"
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(255),
    address TEXT,
    is_online BOOLEAN DEFAULT false,
    registration_required BOOLEAN DEFAULT true,
    registration_url TEXT,
    is_free BOOLEAN DEFAULT true,
    ticket_price VARCHAR(100),
    max_attendees INTEGER,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    poster_image TEXT,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    attendees_count INTEGER DEFAULT 0,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 6. FREELANCE JOBS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS freelance_jobs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    client_name VARCHAR(255), -- Bisa anonim
    description TEXT NOT NULL,
    requirements TEXT,
    deliverables TEXT, -- Apa yang harus diserahkan
    category VARCHAR(100), -- "Design", "Programming", "Writing", "Marketing"
    skills_required TEXT[], -- ["Figma", "Photoshop", "Illustrator"]
    budget_min INTEGER,
    budget_max INTEGER,
    budget_currency VARCHAR(10) DEFAULT 'IDR',
    budget_type VARCHAR(50), -- "Fixed", "Hourly", "Project-based"
    duration VARCHAR(100), -- "1 minggu", "1 bulan"
    location VARCHAR(255),
    is_remote BOOLEAN DEFAULT true,
    experience_level VARCHAR(50), -- "Entry", "Intermediate", "Expert"
    deadline DATE,
    application_url TEXT,
    application_email VARCHAR(255),
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    applicants_count INTEGER DEFAULT 0,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_internships_slug ON internships (slug);

CREATE INDEX IF NOT EXISTS idx_internships_posted_date ON internships (posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_internships_is_active ON internships (is_active);

CREATE INDEX IF NOT EXISTS idx_internships_company_slug ON internships (company_slug);

CREATE INDEX IF NOT EXISTS idx_scholarships_slug ON scholarships (slug);

CREATE INDEX IF NOT EXISTS idx_scholarships_posted_date ON scholarships (posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_scholarships_is_active ON scholarships (is_active);

CREATE INDEX IF NOT EXISTS idx_scholarships_deadline ON scholarships (deadline);

CREATE INDEX IF NOT EXISTS idx_competitions_slug ON competitions (slug);

CREATE INDEX IF NOT EXISTS idx_competitions_posted_date ON competitions (posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_competitions_is_active ON competitions (is_active);

CREATE INDEX IF NOT EXISTS idx_competitions_registration_deadline ON competitions (registration_deadline);

CREATE INDEX IF NOT EXISTS idx_webinars_slug ON webinars (slug);

CREATE INDEX IF NOT EXISTS idx_webinars_date ON webinars (date DESC);

CREATE INDEX IF NOT EXISTS idx_webinars_is_active ON webinars (is_active);

CREATE INDEX IF NOT EXISTS idx_campus_events_slug ON campus_events (slug);

CREATE INDEX IF NOT EXISTS idx_campus_events_date ON campus_events (date DESC);

CREATE INDEX IF NOT EXISTS idx_campus_events_is_active ON campus_events (is_active);

CREATE INDEX IF NOT EXISTS idx_freelance_jobs_slug ON freelance_jobs (slug);

CREATE INDEX IF NOT EXISTS idx_freelance_jobs_posted_date ON freelance_jobs (posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_freelance_jobs_is_active ON freelance_jobs (is_active);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on all tables
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;

ALTER TABLE campus_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE freelance_jobs ENABLE ROW LEVEL SECURITY;

-- Public read access for active records
CREATE POLICY "Public read access for active internships" ON internships FOR
SELECT USING (is_active = true);

CREATE POLICY "Public read access for active scholarships" ON scholarships FOR
SELECT USING (is_active = true);

CREATE POLICY "Public read access for active competitions" ON competitions FOR
SELECT USING (is_active = true);

CREATE POLICY "Public read access for active webinars" ON webinars FOR
SELECT USING (is_active = true);

CREATE POLICY "Public read access for active campus_events" ON campus_events FOR
SELECT USING (is_active = true);

CREATE POLICY "Public read access for active freelance_jobs" ON freelance_jobs FOR
SELECT USING (is_active = true);

-- Admin full access (authenticated users with admin role)
-- Note: Adjust this based on your auth setup
CREATE POLICY "Admin full access internships" ON internships FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access scholarships" ON scholarships FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access competitions" ON competitions FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access webinars" ON webinars FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access campus_events" ON campus_events FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access freelance_jobs" ON freelance_jobs FOR ALL USING (
    auth.role () = 'authenticated'
);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_internships_updated_at
    BEFORE UPDATE ON internships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scholarships_updated_at
    BEFORE UPDATE ON scholarships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
    BEFORE UPDATE ON competitions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webinars_updated_at
    BEFORE UPDATE ON webinars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campus_events_updated_at
    BEFORE UPDATE ON campus_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_freelance_jobs_updated_at
    BEFORE UPDATE ON freelance_jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Verify tables created
SELECT table_name
FROM information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN (
        'internships',
        'scholarships',
        'competitions',
        'webinars',
        'campus_events',
        'freelance_jobs'
    )
ORDER BY table_name;
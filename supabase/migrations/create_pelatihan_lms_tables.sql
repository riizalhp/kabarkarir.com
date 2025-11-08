-- ============================================================================
-- MIGRATION: Create Tables for Frontend Pelatihan LMS (learn.kabarkarir.com)
-- ============================================================================
-- Tables: courses, course_modules, course_lessons, user_enrollments,
--         user_progress, certificates, course_reviews
-- Full LMS system with video iframe support (YouTube, Drive, Vimeo)
-- ============================================================================

-- ============================================================================
-- 1. COURSES TABLE (Kelas Pelatihan)
-- ============================================================================
CREATE TABLE IF NOT EXISTS courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL, -- SEO optimized
    description TEXT NOT NULL,
    short_description TEXT,
    instructor_name VARCHAR(255) NOT NULL,
    instructor_title VARCHAR(255), -- "Software Engineer", "Marketing Expert"
    instructor_bio TEXT,
    instructor_photo TEXT, -- URL
    thumbnail_image TEXT NOT NULL, -- Course thumbnail
    preview_video_url TEXT, -- Iframe URL for preview
    category VARCHAR(100) NOT NULL, -- "Programming", "Design", "Marketing", "Business"
    subcategory VARCHAR(100),
    level VARCHAR(50), -- "Beginner", "Intermediate", "Advanced", "All Levels"
    language VARCHAR(50) DEFAULT 'Bahasa Indonesia',
    duration_hours DECIMAL(5,2), -- Total durasi dalam jam
    total_lessons INTEGER DEFAULT 0,
    total_modules INTEGER DEFAULT 0,

-- Pricing
is_free BOOLEAN DEFAULT false,
price INTEGER DEFAULT 0,
original_price INTEGER, -- For discount display
currency VARCHAR(10) DEFAULT 'IDR',

-- Features
has_certificate BOOLEAN DEFAULT true,
has_lifetime_access BOOLEAN DEFAULT true,
has_downloadable_resources BOOLEAN DEFAULT false,
has_assignments BOOLEAN DEFAULT false,
has_quizzes BOOLEAN DEFAULT false,

-- Stats
enrollments_count INTEGER DEFAULT 0,
completions_count INTEGER DEFAULT 0,
average_rating DECIMAL(3, 2) DEFAULT 0.0,
reviews_count INTEGER DEFAULT 0,
views_count INTEGER DEFAULT 0,

-- Status
status VARCHAR(50) DEFAULT 'draft', -- "draft", "published", "archived"
published_date TIMESTAMP
WITH
    TIME ZONE,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,

-- SEO
meta_title VARCHAR(255),
meta_description TEXT,
meta_keywords TEXT,

-- Learning outcomes
what_you_will_learn TEXT[], -- ["Skill 1", "Skill 2"]
    prerequisites TEXT[], -- Requirements
    target_audience TEXT[], -- Who should take this
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 2. COURSE MODULES TABLE (Modul/Section dalam Kelas)
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_modules (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL, -- Urutan modul
    duration_minutes INTEGER, -- Estimasi waktu
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (course_id, order_index)
);

-- ============================================================================
-- 3. COURSE LESSONS TABLE (Materi dalam Modul)
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_lessons (
    id BIGSERIAL PRIMARY KEY,
    module_id BIGINT NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL, -- Urutan lesson dalam modul

-- Video Content (Iframe URLs)
video_type VARCHAR(50), -- "youtube", "vimeo", "google_drive", "custom_iframe"
video_url TEXT NOT NULL, -- Full iframe embed URL
video_iframe_code TEXT, -- Full iframe HTML if needed
duration_minutes INTEGER,

-- Additional Content
content TEXT, -- Rich text content/transcript
downloadable_resources JSONB, -- [{name: "file.pdf", url: "https://..."}]

-- Lesson Settings
is_preview BOOLEAN DEFAULT false, -- Free preview lesson
    is_published BOOLEAN DEFAULT true,
    requires_previous BOOLEAN DEFAULT true, -- Must complete previous lesson
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(module_id, order_index)
);

-- ============================================================================
-- 4. USER ENROLLMENTS TABLE (Pendaftaran User ke Kelas)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_enrollments (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL, -- Reference to auth.users
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,

-- Enrollment details
enrolled_at TIMESTAMP
WITH
    TIME ZONE DEFAULT NOW(),
    payment_status VARCHAR(50) DEFAULT 'free', -- "free", "paid", "pending"
    payment_amount INTEGER,
    payment_method VARCHAR(100),
    payment_reference VARCHAR(255),

-- Progress tracking
progress_percentage DECIMAL(5, 2) DEFAULT 0.0,
completed_lessons INTEGER DEFAULT 0,
total_lessons INTEGER DEFAULT 0,
last_accessed_at TIMESTAMP
WITH
    TIME ZONE,
    completed_at TIMESTAMP
WITH
    TIME ZONE,

-- Certificate
certificate_issued BOOLEAN DEFAULT false,
    certificate_issued_at TIMESTAMP WITH TIME ZONE,
    certificate_number VARCHAR(100) UNIQUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, course_id)
);

-- ============================================================================
-- 5. USER PROGRESS TABLE (Progress per Lesson)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id BIGINT NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,

-- Progress details
is_completed BOOLEAN DEFAULT false,
completed_at TIMESTAMP
WITH
    TIME ZONE,
    watch_time_seconds INTEGER DEFAULT 0,
    last_position_seconds INTEGER DEFAULT 0, -- For resuming video

-- Activity
first_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    access_count INTEGER DEFAULT 1,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, lesson_id)
);

-- ============================================================================
-- 6. CERTIFICATES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS certificates (
    id BIGSERIAL PRIMARY KEY,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_id BIGINT NOT NULL REFERENCES user_enrollments(id) ON DELETE CASCADE,

-- Student info
student_name VARCHAR(255) NOT NULL,
student_email VARCHAR(255) NOT NULL,

-- Course info
course_title VARCHAR(255) NOT NULL,
instructor_name VARCHAR(255) NOT NULL,
completion_date DATE NOT NULL,

-- Certificate design
template_type VARCHAR(50) DEFAULT 'default',
certificate_url TEXT, -- URL to generated PDF
verification_url TEXT, -- Public verification URL

-- Metadata
issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_valid BOOLEAN DEFAULT true,
    revoked_at TIMESTAMP WITH TIME ZONE,
    revoke_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 7. COURSE REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS course_reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_id BIGINT NOT NULL REFERENCES user_enrollments(id) ON DELETE CASCADE,

-- Review details
rating INTEGER NOT NULL CHECK (
    rating >= 1
    AND rating <= 5
),
review_text TEXT,

-- Helpful votes
helpful_count INTEGER DEFAULT 0,

-- Status
is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, course_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses (slug);

CREATE INDEX IF NOT EXISTS idx_courses_status ON courses (status);

CREATE INDEX IF NOT EXISTS idx_courses_category ON courses (category);

CREATE INDEX IF NOT EXISTS idx_courses_is_featured ON courses (is_featured);

CREATE INDEX IF NOT EXISTS idx_courses_published_date ON courses (published_date DESC);

CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules (course_id);

CREATE INDEX IF NOT EXISTS idx_course_modules_order ON course_modules (course_id, order_index);

CREATE INDEX IF NOT EXISTS idx_course_lessons_course_id ON course_lessons (course_id);

CREATE INDEX IF NOT EXISTS idx_course_lessons_module_id ON course_lessons (module_id);

CREATE INDEX IF NOT EXISTS idx_course_lessons_order ON course_lessons (module_id, order_index);

CREATE INDEX IF NOT EXISTS idx_user_enrollments_user_id ON user_enrollments (user_id);

CREATE INDEX IF NOT EXISTS idx_user_enrollments_course_id ON user_enrollments (course_id);

CREATE INDEX IF NOT EXISTS idx_user_enrollments_user_course ON user_enrollments (user_id, course_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress (user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress (lesson_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_lesson ON user_progress (user_id, lesson_id);

CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates (certificate_number);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates (user_id);

CREATE INDEX IF NOT EXISTS idx_certificates_course_id ON certificates (course_id);

CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON course_reviews (course_id);

CREATE INDEX IF NOT EXISTS idx_course_reviews_user_id ON course_reviews (user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Public read for published courses
CREATE POLICY "Public read published courses" ON courses FOR
SELECT USING (status = 'published');

CREATE POLICY "Public read published modules" ON course_modules FOR
SELECT USING (is_published = true);

CREATE POLICY "Public read preview lessons" ON course_lessons FOR
SELECT USING (
        is_preview = true
        OR is_published = true
    );

-- Enrolled users can read course content
CREATE POLICY "Enrolled users read modules" ON course_modules FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM user_enrollments
            WHERE
                user_enrollments.course_id = course_modules.course_id
                AND user_enrollments.user_id = auth.uid ()
        )
    );

CREATE POLICY "Enrolled users read lessons" ON course_lessons FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM user_enrollments
            WHERE
                user_enrollments.course_id = course_lessons.course_id
                AND user_enrollments.user_id = auth.uid ()
        )
    );

-- Users manage their own enrollments
CREATE POLICY "Users read own enrollments" ON user_enrollments FOR
SELECT USING (user_id = auth.uid ());

CREATE POLICY "Users insert own enrollments" ON user_enrollments FOR
INSERT
WITH
    CHECK (user_id = auth.uid ());

CREATE POLICY "Users update own enrollments" ON user_enrollments FOR
UPDATE USING (user_id = auth.uid ());

-- Users manage their own progress
CREATE POLICY "Users manage own progress" ON user_progress FOR ALL USING (user_id = auth.uid ());

-- Users read own certificates
CREATE POLICY "Users read own certificates" ON certificates FOR
SELECT USING (user_id = auth.uid ());

-- Public verification of certificates
CREATE POLICY "Public verify certificates" ON certificates FOR
SELECT USING (is_valid = true);

-- Users manage own reviews
CREATE POLICY "Users manage own reviews" ON course_reviews FOR ALL USING (user_id = auth.uid ());

CREATE POLICY "Public read published reviews" ON course_reviews FOR
SELECT USING (is_published = true);

-- Admin full access
CREATE POLICY "Admin full access courses" ON courses FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access modules" ON course_modules FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access lessons" ON course_lessons FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access enrollments" ON user_enrollments FOR ALL USING (
    auth.role () = 'authenticated'
);

CREATE POLICY "Admin full access certificates" ON certificates FOR ALL USING (
    auth.role () = 'authenticated'
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_modules_updated_at
    BEFORE UPDATE ON course_modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at
    BEFORE UPDATE ON course_lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_enrollments_updated_at
    BEFORE UPDATE ON user_enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at
    BEFORE UPDATE ON course_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update course stats when enrollment changes
CREATE OR REPLACE FUNCTION update_course_enrollments_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET enrollments_count = (
        SELECT COUNT(*) FROM user_enrollments WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_enrollments_count
    AFTER INSERT OR DELETE ON user_enrollments
    FOR EACH ROW
    EXECUTE FUNCTION update_course_enrollments_count();

-- Function to update course rating when review changes
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses 
    SET 
        average_rating = (
            SELECT AVG(rating) FROM course_reviews 
            WHERE course_id = COALESCE(NEW.course_id, OLD.course_id) 
            AND is_published = true
        ),
        reviews_count = (
            SELECT COUNT(*) FROM course_reviews 
            WHERE course_id = COALESCE(NEW.course_id, OLD.course_id) 
            AND is_published = true
        )
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_course_rating
    AFTER INSERT OR UPDATE OR DELETE ON course_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_course_rating();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT table_name
FROM information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN (
        'courses',
        'course_modules',
        'course_lessons',
        'user_enrollments',
        'user_progress',
        'certificates',
        'course_reviews'
    )
ORDER BY table_name;
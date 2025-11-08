-- ================================================
-- DUMMY DATA FOR KABARKARIR.COM - VERSION 2
-- ================================================
-- Fixed version with correct database column names
-- ================================================

-- ===========================================
-- 1. COMPANIES (frontend-user)
-- ===========================================
INSERT INTO
    companies (
        id,
        slug,
        name,
        logo,
        type,
        description,
        website
    )
VALUES (
        1,
        'pertamina',
        'PT Pertamina (Persero)',
        'https://via.placeholder.com/100?text=Pertamina',
        'BUMN',
        'BUMN yang bergerak di bidang energi meliputi minyak, gas serta energi baru dan terbarukan. Didirikan tahun 1957.',
        'https://www.pertamina.com'
    ),
    (
        2,
        'telkom',
        'PT Telkom Indonesia',
        'https://via.placeholder.com/100?text=Telkom',
        'BUMN',
        'BUMN terbesar di bidang telekomunikasi dan jaringan di Indonesia. Didirikan tahun 1965.',
        'https://www.telkom.co.id'
    ),
    (
        3,
        'bni',
        'PT Bank Negara Indonesia',
        'https://via.placeholder.com/100?text=BNI',
        'BUMN',
        'Bank BUMN terkemuka yang melayani nasabah korporasi dan retail. Didirikan tahun 1946.',
        'https://www.bni.co.id'
    ),
    (
        4,
        'tokopedia',
        'PT Tokopedia',
        'https://via.placeholder.com/100?text=Tokopedia',
        'SWASTA',
        'Platform e-commerce terbesar di Indonesia dengan jutaan merchant. Didirikan tahun 2009.',
        'https://www.tokopedia.com'
    ),
    (
        5,
        'gojek',
        'PT GoTo Gojek Tokopedia',
        'https://via.placeholder.com/100?text=Gojek',
        'SWASTA',
        'Super app yang menyediakan layanan transportasi dan pembayaran digital. Didirikan tahun 2010.',
        'https://www.gojek.com'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 2. JOBS (frontend-user)
-- ===========================================
-- Note: Adjust column names based on your actual database schema
-- Common Supabase naming: snake_case (company_slug, posted_date, etc)
INSERT INTO
    jobs (
        id,
        company_slug,
        title,
        slug,
        company,
        logo,
        location,
        province,
        city,
        type,
        category,
        category_color,
        education,
        experience,
        salary_range,
        description,
        qualifications,
        benefits,
        how_to_apply,
        about_company,
        posted,
        due_date,
        is_active,
        tags
    )
VALUES (
        1,
        'pertamina',
        'Management Trainee Program 2024',
        'management-trainee-pertamina-2024',
        'PT Pertamina (Persero)',
        'https://via.placeholder.com/100?text=Pertamina',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        'Full Time',
        'MT/ODP',
        'blue',
        'Strata 1',
        'Fresh Graduate',
        'Rp 8.000.000 - Rp 12.000.000',
        'Program pengembangan talenta muda untuk menjadi pemimpin masa depan Pertamina.',
        '["Lulusan S1/S2 dari universitas terkemuka", "IPK minimal 3.00", "Usia maksimal 27 tahun"]',
        '["Gaji kompetitif", "Asuransi kesehatan", "Jenjang karir jelas"]',
        'Kirim lamaran melalui website resmi Pertamina careers',
        'BUMN terbesar di Indonesia yang bergerak di bidang energi',
        '2 minggu yang lalu',
        '2024-12-31',
        true,
        '["MT", "BUMN", "Fresh Graduate"]'
    ),
    (
        2,
        'telkom',
        'IT Developer Fresh Graduate',
        'it-developer-telkom',
        'PT Telkom Indonesia',
        'https://via.placeholder.com/100?text=Telkom',
        'Bandung',
        'Jawa Barat',
        'Bandung',
        'Full Time',
        'Fresh Grad',
        'blue',
        'Strata 1',
        'Fresh Graduate',
        'Rp 6.000.000 - Rp 8.000.000',
        'Bergabung dengan tim IT Telkom untuk mengembangkan aplikasi digital.',
        '["Lulusan S1 Teknik Informatika", "IPK minimal 3.25", "Menguasai Java/Python"]',
        '["Gaji pokok + tunjangan", "Asuransi kesehatan", "Training"]',
        'Apply melalui portal rekrutmen Telkom Indonesia',
        'BUMN terbesar di bidang telekomunikasi di Indonesia',
        '1 minggu yang lalu',
        '2024-12-31',
        true,
        '["IT", "BUMN", "Developer"]'
    ),
    (
        3,
        'bni',
        'Credit Analyst Officer',
        'credit-analyst-bni',
        'PT Bank Negara Indonesia',
        'https://via.placeholder.com/100?text=BNI',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        'Full Time',
        'BUMN',
        'blue',
        'Strata 1',
        '0-1 Tahun',
        'Rp 7.000.000 - Rp 10.000.000',
        'Menganalisis kelayakan kredit nasabah korporasi dan retail.',
        '["S1 Ekonomi/Manajemen/Akuntansi", "IPK minimal 3.00", "Analytical thinking"]',
        '["Gaji standar BUMN", "Bonus kinerja", "Dana pensiun"]',
        'Daftar melalui https://recruitment.bni.co.id',
        'Bank BUMN terkemuka di Indonesia',
        '3 hari yang lalu',
        '2024-12-15',
        true,
        '["Finance", "BUMN", "Analyst"]'
    ),
    (
        4,
        'tokopedia',
        'Product Manager Intern',
        'product-manager-intern-tokopedia',
        'PT Tokopedia',
        'https://via.placeholder.com/100?text=Tokopedia',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        'Internship',
        'Intern',
        'orange',
        'Strata 1',
        'Fresh Graduate',
        'Rp 4.000.000 - Rp 5.000.000',
        'Kesempatan magang 6 bulan sebagai Product Manager di startup unicorn.',
        '["Mahasiswa aktif S1 semester 6-8", "Analytical skills", "Familiar dengan PM tools"]',
        '["Uang saku kompetitif", "Sertifikat", "Mentoring dari PM senior"]',
        'Submit portfolio dan CV ke careers@tokopedia.com',
        'Platform e-commerce terbesar di Indonesia',
        '5 hari yang lalu',
        '2024-12-20',
        true,
        '["Internship", "Product Management", "Startup"]'
    ),
    (
        5,
        'gojek',
        'Data Scientist',
        'data-scientist-gojek',
        'PT GoTo Gojek Tokopedia',
        'https://via.placeholder.com/100?text=Gojek',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        'Full Time',
        'Fresh Grad',
        'green',
        'Strata 1',
        'Fresh Graduate',
        'Rp 9.000.000 - Rp 13.000.000',
        'Bergabung dengan data science team untuk menganalisis algoritma aplikasi.',
        '["S1/S2 Matematika/Statistika/CS", "IPK minimal 3.50", "Menguasai Python, R, SQL"]',
        '["Salary package menarik", "Stock options", "Flexible working hours"]',
        'Apply via Gojek careers portal',
        'Super app terbesar di Indonesia',
        '1 minggu yang lalu',
        '2024-12-25',
        true,
        '["Data Science", "Tech", "Startup"]'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 3. BLOG POSTS (frontend-user)
-- ===========================================
INSERT INTO
    blog_posts (
        id,
        slug,
        title,
        excerpt,
        content,
        author_name,
        category,
        featured_image,
        tags,
        is_published,
        posted_date
    )
VALUES (
        1,
        'tips-lolos-interview-bumn',
        '10 Tips Sukses Interview BUMN 2024',
        'Panduan lengkap persiapan interview di perusahaan BUMN.',
        '<h2>Persiapan Interview BUMN</h2><p>Interview di perusahaan BUMN memiliki karakteristik tersendiri...</p>',
        'Admin KabarKarir',
        'Tips Karir',
        'https://via.placeholder.com/800x450?text=Interview',
        '["interview", "BUMN", "tips karir"]',
        true,
        '2024-11-01'
    ),
    (
        2,
        'cara-buat-cv-menarik',
        'Cara Membuat CV yang Menarik untuk HRD',
        'CV yang baik adalah kunci pertama membuka peluang karir.',
        '<h2>Struktur CV yang Efektif</h2><p>CV yang baik harus memiliki struktur yang jelas...</p>',
        'Tim Redaksi',
        'Tips Karir',
        'https://via.placeholder.com/800x450?text=CV',
        '["CV", "resume", "tips karir"]',
        true,
        '2024-11-05'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 4. MAHASISWA - INTERNSHIPS
-- ===========================================
INSERT INTO
    internships (
        id,
        slug,
        title,
        company_name,
        company_logo,
        location,
        duration,
        stipend_min,
        stipend_max,
        description,
        requirements,
        benefits,
        application_url,
        start_date,
        end_date,
        is_active
    )
VALUES (
        1,
        'magang-frontend-tokopedia',
        'Frontend Developer Intern',
        'Tokopedia',
        'https://via.placeholder.com/80?text=Tokopedia',
        'Jakarta',
        '6 Bulan',
        3000000,
        4000000,
        'Kesempatan magang sebagai Frontend Developer menggunakan React dan TypeScript.',
        '["Mahasiswa aktif semester 5-8", "Menguasai HTML, CSS, JavaScript", "Familiar dengan React"]',
        '["Uang saku bulanan", "Sertifikat magang", "Mentoring dari senior developer"]',
        'https://career.tokopedia.com/internship',
        '2024-12-01',
        '2025-05-31',
        true
    ),
    (
        2,
        'magang-data-analyst-gojek',
        'Data Analyst Intern',
        'Gojek',
        'https://via.placeholder.com/80?text=Gojek',
        'Jakarta',
        '3-6 Bulan',
        3500000,
        5000000,
        'Bergabung dengan data team untuk menganalisis user behavior dan business metrics.',
        '["Mahasiswa S1 Statistika/Matematika/TI", "Menguasai SQL dan Python", "Analytical thinking"]',
        '["Stipend kompetitif", "Project real impact", "Networking dengan data professionals"]',
        'https://www.gojek.io/careers',
        '2024-12-15',
        '2025-06-15',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 5. MAHASISWA - SCHOLARSHIPS
-- ===========================================
INSERT INTO
    scholarships (
        id,
        slug,
        title,
        provider,
        provider_logo,
        scholarship_type,
        education_level,
        coverage,
        amount_min,
        amount_max,
        description,
        requirements,
        benefits,
        application_url,
        open_date,
        close_date,
        is_active
    )
VALUES (
        1,
        'beasiswa-unggulan-2024',
        'Beasiswa Unggulan Kemendikbudristek 2024',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
        'https://via.placeholder.com/80?text=Kemendikbud',
        'Full Scholarship',
        'S1, S2, S3',
        'Full (Tuition + Living)',
        10000000,
        50000000,
        'Program beasiswa penuh dari pemerintah untuk mahasiswa berprestasi.',
        '["WNI berprestasi akademik/non-akademik", "IPK minimal 3.25", "Surat rekomendasi"]',
        '["Biaya kuliah penuh", "Biaya hidup bulanan", "Tunjangan buku"]',
        'https://beasiswaunggulan.kemdikbud.go.id',
        '2024-11-01',
        '2025-04-30',
        true
    ),
    (
        2,
        'beasiswa-lpdp-2024',
        'Beasiswa LPDP S2 Luar Negeri',
        'Lembaga Pengelola Dana Pendidikan (LPDP)',
        'https://via.placeholder.com/80?text=LPDP',
        'Full Scholarship',
        'S2',
        'Full (Tuition + Living + Travel)',
        0,
        800000000,
        'Beasiswa penuh untuk studi S2 di luar negeri.',
        '["Lulusan S1 IPK minimal 3.00", "LoA unconditional", "TOEFL/IELTS sesuai ketentuan"]',
        '["Biaya pendidikan penuh", "Biaya hidup di luar negeri", "Tiket PP"]',
        'https://lpdp.kemenkeu.go.id',
        '2024-11-15',
        '2025-05-15',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 6. PELATIHAN - COURSES
-- ===========================================
INSERT INTO
    courses (
        id,
        slug,
        title,
        short_description,
        description,
        instructor_name,
        instructor_title,
        instructor_photo,
        category,
        level,
        language,
        duration_hours,
        total_modules,
        total_lessons,
        total_students,
        price,
        discount_price,
        is_free,
        is_published,
        is_featured,
        certificate_available,
        requirements,
        learning_outcomes,
        thumbnail_url,
        preview_video_url,
        average_rating,
        total_reviews
    )
VALUES (
        1,
        'fullstack-web-bootcamp',
        'Fullstack Web Developer Bootcamp 2024',
        'Belajar web development dari nol hingga mahir. HTML, CSS, JavaScript, React, Node.js.',
        '<h2>Deskripsi</h2><p>Kursus komprehensif untuk menjadi fullstack web developer professional.</p>',
        'John Doe',
        'Senior Fullstack Developer',
        'https://via.placeholder.com/150?text=John',
        'Web Development',
        'beginner',
        'Bahasa Indonesia',
        120,
        12,
        150,
        5420,
        2999000,
        1499000,
        false,
        true,
        true,
        true,
        '["Laptop/PC", "Koneksi internet", "Tidak perlu pengalaman coding"]',
        '["Membuat website responsive", "Membangun aplikasi dengan React", "Create REST API"]',
        'https://via.placeholder.com/800x450?text=Fullstack',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.8,
        342
    ),
    (
        2,
        'data-science-pemula',
        'Data Science untuk Pemula - Python & ML',
        'Masuk ke dunia data science dengan Python. Belajar data analysis dan machine learning.',
        '<h2>Tentang Kursus</h2><p>Step by step belajar Python dan machine learning basics.</p>',
        'Dr. Amanda Lee',
        'Data Scientist - Gojek',
        'https://via.placeholder.com/150?text=Amanda',
        'Data Science',
        'beginner',
        'Bahasa Indonesia',
        80,
        10,
        120,
        3890,
        1999000,
        999000,
        false,
        true,
        true,
        true,
        '["Laptop dengan RAM minimal 8GB", "Basic programming knowledge (opsional)"]',
        '["Master Python untuk data science", "Data visualization", "Build ML models"]',
        'https://via.placeholder.com/800x450?text=DataScience',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.9,
        289
    ),
    (
        3,
        'python-gratis',
        'Pengantar Programming dengan Python - Gratis',
        'Kursus gratis untuk memulai journey programming. Belajar Python dari nol.',
        '<h2>Mulai Belajar Programming</h2><p>Perfect untuk pemula absolute.</p>',
        'Lisa Beginner',
        'Python Instructor',
        'https://via.placeholder.com/150?text=Lisa',
        'Web Development',
        'beginner',
        'Bahasa Indonesia',
        30,
        5,
        50,
        8750,
        0,
        0,
        true,
        true,
        true,
        true,
        '["Laptop/PC", "Tidak perlu background IT"]',
        '["Programming basics", "Python syntax", "Basic projects"]',
        'https://via.placeholder.com/800x450?text=Python',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.9,
        567
    ) ON CONFLICT (id) DO NOTHING;

-- ================================================
-- END OF DUMMY DATA
-- ================================================
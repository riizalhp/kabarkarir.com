-- ================================================
-- DUMMY DATA V3 - FIXED STRUCTURE
-- ================================================
-- Disesuaikan dengan struktur tabel yang sebenarnya
-- jobs: SEKARANG PUNYA slug (SEO-friendly), pakai company_id (FK)
-- CATATAN: Jalankan add_slug_to_jobs.sql SEBELUM file ini
-- ================================================

-- ===========================================
-- 1. COMPANIES (25 Companies)
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
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'BUMN yang bergerak di bidang energi meliputi minyak, gas serta energi baru dan terbarukan. Didirikan tahun 1957.',
        'https://www.pertamina.com'
    ),
    (
        2,
        'telkom',
        'PT Telkom Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'BUMN terbesar di bidang telekomunikasi dan jaringan di Indonesia. Didirikan tahun 1965.',
        'https://www.telkom.co.id'
    ),
    (
        3,
        'bni',
        'PT Bank Negara Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Bank BUMN terkemuka yang melayani nasabah korporasi dan retail. Didirikan tahun 1946.',
        'https://www.bni.co.id'
    ),
    (
        4,
        'tokopedia',
        'PT Tokopedia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Platform e-commerce terbesar di Indonesia dengan jutaan merchant. Didirikan tahun 2009.',
        'https://www.tokopedia.com'
    ),
    (
        5,
        'gojek',
        'PT GoTo Gojek Tokopedia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Super app yang menyediakan layanan transportasi dan pembayaran digital. Didirikan tahun 2010.',
        'https://www.gojek.com'
    ),
    (
        6,
        'bri',
        'PT Bank Rakyat Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Bank terbesar di Indonesia dengan jaringan cabang terluas di seluruh nusantara.',
        'https://www.bri.co.id'
    ),
    (
        7,
        'pln',
        'PT PLN (Persero)',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'BUMN yang mengelola ketenagalistrikan di Indonesia.',
        'https://www.pln.co.id'
    ),
    (
        8,
        'mandiri',
        'PT Bank Mandiri',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Bank terbesar di Indonesia dari sisi aset, deposito, dan pinjaman.',
        'https://www.bankmandiri.co.id'
    ),
    (
        9,
        'garuda',
        'PT Garuda Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Maskapai penerbangan nasional Indonesia yang melayani rute domestik dan internasional.',
        'https://www.garuda-indonesia.com'
    ),
    (
        10,
        'bukalapak',
        'PT Bukalapak',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Platform e-commerce dan teknologi Indonesia yang memberdayakan UMKM.',
        'https://www.bukalapak.com'
    ),
    (
        11,
        'shopee',
        'PT Shopee International Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Platform e-commerce terkemuka di Asia Tenggara dan Taiwan.',
        'https://www.shopee.co.id'
    ),
    (
        12,
        'traveloka',
        'PT Traveloka Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Platform travel dan lifestyle terbesar di Indonesia.',
        'https://www.traveloka.com'
    ),
    (
        13,
        'dana',
        'PT Espay Debit Indonesia Koe',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Platform dompet digital dan pembayaran Indonesia.',
        'https://www.dana.id'
    ),
    (
        14,
        'ovo',
        'PT Visionet Internasional',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Aplikasi pembayaran dan layanan keuangan digital.',
        'https://www.ovo.id'
    ),
    (
        15,
        'unilever',
        'PT Unilever Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Perusahaan multinasional yang memproduksi produk konsumen.',
        'https://www.unilever.co.id'
    ),
    (
        16,
        'astra',
        'PT Astra International',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Perusahaan konglomerasi terbesar di Indonesia yang bergerak di berbagai bidang.',
        'https://www.astra.co.id'
    ),
    (
        17,
        'indofood',
        'PT Indofood Sukses Makmur',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Produsen makanan dan minuman terbesar di Indonesia.',
        'https://www.indofood.com'
    ),
    (
        18,
        'xl-axiata',
        'PT XL Axiata',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Perusahaan telekomunikasi seluler terkemuka di Indonesia.',
        'https://www.xlaxiata.co.id'
    ),
    (
        19,
        'krakatau-steel',
        'PT Krakatau Steel',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Produsen baja terintegrasi terbesar di Indonesia.',
        'https://www.krakatausteel.com'
    ),
    (
        20,
        'adaro',
        'PT Adaro Energy',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Perusahaan pertambangan batubara terbesar di Indonesia.',
        'https://www.adaro.com'
    ),
    (
        21,
        'wijaya-karya',
        'PT Wijaya Karya (WIKA)',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'BUMN yang bergerak di bidang konstruksi dan infrastruktur.',
        'https://www.wika.co.id'
    ),
    (
        22,
        'pupuk-indonesia',
        'PT Pupuk Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Holding perusahaan pupuk terbesar di Indonesia.',
        'https://www.pupuk-indonesia.com'
    ),
    (
        23,
        'semen-indonesia',
        'PT Semen Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'Produsen semen terbesar di Indonesia dengan berbagai merek.',
        'https://www.semenindonesia.com'
    ),
    (
        24,
        'bank-cimb-niaga',
        'PT Bank CIMB Niaga',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'SWASTA',
        'Bank swasta terkemuka dengan layanan perbankan lengkap.',
        'https://www.cimbniaga.co.id'
    ),
    (
        25,
        'kai',
        'PT Kereta Api Indonesia',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'BUMN',
        'BUMN yang mengelola perkeretaapian di Indonesia.',
        'https://www.kai.id'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 2. JOBS (STRUKTUR LENGKAP)
-- ===========================================


INSERT INTO jobs (
    id, title, slug, company_id, company, company_slug, logo, location, province, city,
    type, category, category_color, description, posted_date, education, experience,
    qualifications, benefits, how_to_apply, about_company, tags, majors,
    pdf_embed_url, video_embed_url, is_active, due_date, salary_range
) VALUES
(1, 'Management Trainee Program 2024', 'management-trainee-program-2024-pertamina', 1, 'PT Pertamina (Persero)', 'pertamina',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'MT/ODP', 'blue', 
 'Program pengembangan talenta muda untuk menjadi pemimpin masa depan Pertamina. Peserta akan mendapat pelatihan intensif dan rotasi divisi selama 1 tahun.',
 CURRENT_DATE, 'Strata 1', 'Fresh Graduate',
 '["Lulusan S1/S2 dari universitas terkemuka", "IPK minimal 3.00", "Usia maksimal 27 tahun", "Mampu berbahasa Inggris aktif", "Belum menikah"]'::jsonb,
 '["Gaji kompetitif", "Asuransi kesehatan", "Jenjang karir jelas", "Pelatihan intensif", "Tunjangan perumahan"]'::jsonb,
 'Kirim lamaran melalui website resmi Pertamina careers',
 'BUMN terbesar di Indonesia yang bergerak di bidang energi meliputi minyak dan gas',
 '["MT", "BUMN", "Fresh Graduate", "Management"]'::jsonb,
 '["Teknik", "Ekonomi", "Manajemen"]'::jsonb,
 NULL, NULL, true, '2024-12-31', 'Rp 8.000.000 - Rp 12.000.000'),

(2, 'IT Developer Fresh Graduate', 'it-developer-fresh-graduate-telkom', 2, 'PT Telkom Indonesia', 'telkom',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Bandung', 'Jawa Barat', 'Bandung',
 'Full Time', 'Fresh Grad', 'blue',
 'Bergabung dengan tim IT Telkom untuk mengembangkan aplikasi dan sistem digital perusahaan. Program khusus untuk fresh graduate yang passionate di bidang teknologi.',
 CURRENT_DATE, 'Strata 1', 'Fresh Graduate',
 '["Lulusan S1 Teknik Informatika/Sistem Informasi", "IPK minimal 3.25", "Menguasai Java, Python, atau JavaScript", "Fresh graduate atau pengalaman maksimal 1 tahun", "Memahami konsep database dan API"]'::jsonb,
 '["Gaji pokok + tunjangan", "Asuransi kesehatan keluarga", "Training & sertifikasi", "Work from anywhere", "Bonus tahunan"]'::jsonb,
 'Apply melalui portal rekrutmen Telkom Indonesia',
 'BUMN terbesar di bidang telekomunikasi dan jaringan di Indonesia',
 '["IT", "BUMN", "Developer", "Programming"]'::jsonb,
 '["Teknik Informatika", "Sistem Informasi", "Ilmu Komputer"]'::jsonb,
 NULL, NULL, true, '2024-12-31', 'Rp 6.000.000 - Rp 8.000.000'),

(3, 'Credit Analyst Officer', 'credit-analyst-officer-bni', 3, 'PT Bank Negara Indonesia', 'bni',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'BUMN', 'blue',
 'Menganalisis kelayakan kredit nasabah korporasi dan retail. Posisi strategis di divisi Risk Management BNI dengan peluang karir yang cemerlang.',
 CURRENT_DATE, 'Strata 1', '0-1 Tahun',
 '["S1 Ekonomi/Manajemen/Akuntansi", "IPK minimal 3.00", "Memahami analisa laporan keuangan", "Detail oriented dan analytical thinking", "Bersedia ditempatkan di seluruh Indonesia"]'::jsonb,
 '["Gaji sesuai standar BUMN", "Bonus kinerja", "Asuransi kesehatan + jiwa", "Dana pensiun", "Cuti tahunan 12 hari"]'::jsonb,
 'Daftar melalui https://recruitment.bni.co.id',
 'Bank BUMN terkemuka yang melayani nasabah korporasi dan retail',
 '["Finance", "BUMN", "Analyst", "Banking"]'::jsonb,
 '["Ekonomi", "Manajemen", "Akuntansi"]'::jsonb,
 NULL, NULL, true, '2024-12-15', 'Rp 7.000.000 - Rp 10.000.000'),

(4, 'Product Manager Intern', 'product-manager-intern-tokopedia', 4, 'PT Tokopedia', 'tokopedia',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Internship', 'Intern', 'orange',
 'Kesempatan magang 6 bulan sebagai Product Manager di salah satu startup unicorn Indonesia. Belajar langsung dari PM senior dan terlibat dalam pengembangan produk.',
 CURRENT_DATE, 'Strata 1', 'Fresh Graduate',
 '["Mahasiswa aktif S1 semester 6-8 atau fresh graduate", "Tertarik dengan product management", "Analytical dan problem solving skills", "Familiar dengan tools product management", "Dapat bekerja full-time selama 6 bulan"]'::jsonb,
 '["Uang saku kompetitif", "Sertifikat magang", "Mentoring dari PM senior", "Laptop & peralatan kerja", "Networking dengan tech community"]'::jsonb,
 'Submit portfolio dan CV ke careers@tokopedia.com',
 'Platform e-commerce terbesar di Indonesia dengan jutaan merchant',
 '["Internship", "Product Management", "Startup", "E-Commerce"]'::jsonb,
 '["Semua Jurusan"]'::jsonb,
 NULL, NULL, true, '2024-12-20', 'Rp 4.000.000 - Rp 5.000.000'),

(5, 'Data Scientist', 'data-scientist-gojek', 5, 'PT GoTo Gojek Tokopedia', 'gojek',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'Fresh Grad', 'green',
 'Bergabung dengan data science team untuk menganalisis dan mengoptimalkan algoritma aplikasi Gojek. Bekerja dengan big data dan machine learning.',
 CURRENT_DATE, 'Strata 1', 'Fresh Graduate',
 '["S1/S2 Matematika, Statistika, Computer Science", "IPK minimal 3.50", "Menguasai Python, R, SQL", "Pengalaman dengan ML frameworks (TensorFlow, PyTorch)", "Portfolio project data science"]'::jsonb,
 '["Salary package menarik", "Stock options", "Unlimited leave", "Flexible working hours", "Health & wellness program"]'::jsonb,
 'Apply via Gojek careers portal',
 'Super app terbesar di Indonesia yang menyediakan layanan transportasi dan pembayaran digital',
 '["Data Science", "Tech", "Startup", "Machine Learning"]'::jsonb,
 '["Matematika", "Statistika", "Ilmu Komputer"]'::jsonb,
 NULL, NULL, true, '2024-12-25', 'Rp 9.000.000 - Rp 13.000.000'),

(6, 'Account Officer Banking', 'account-officer-banking-bri', 6, 'PT Bank Rakyat Indonesia', 'bri',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Surabaya', 'Jawa Timur', 'Surabaya',
 'Full Time', 'BUMN', 'blue',
 'Mengelola portfolio nasabah dan mengembangkan bisnis perbankan di wilayah Surabaya dan sekitarnya.',
 CURRENT_DATE - INTERVAL '1 days', 'Strata 1', '0-2 Tahun',
 '["S1 semua jurusan", "IPK minimal 2.75", "Memiliki kendaraan pribadi dan SIM", "Komunikatif dan berorientasi target", "Bersedia ditempatkan di wilayah Jawa Timur"]'::jsonb,
 '["Gaji pokok + insentif", "Bonus pencapaian target", "BPJS Kesehatan & Ketenagakerjaan", "Kendaraan operasional", "Jenjang karir jelas"]'::jsonb,
 'Kirim lamaran via portal rekrutmen BRI',
 'Bank terbesar di Indonesia dengan jaringan cabang terluas',
 '["Banking", "BUMN", "Sales", "Marketing"]'::jsonb,
 '["Semua Jurusan"]'::jsonb,
 NULL, NULL, true, '2025-01-15', 'Rp 5.500.000 - Rp 8.000.000'),

(7, 'Engineer Officer PLN', 'engineer-officer-pln', 7, 'PT PLN (Persero)', 'pln',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Medan', 'Sumatera Utara', 'Medan',
 'Full Time', 'BUMN', 'blue',
 'Bertanggung jawab atas operasional dan maintenance sistem kelistrikan di wilayah Sumatera Utara.',
 CURRENT_DATE - INTERVAL '2 days', 'Strata 1', 'Fresh Graduate',
 '["S1 Teknik Elektro/Teknik Listrik", "IPK minimal 3.00", "Memahami sistem tenaga listrik", "Sehat jasmani dan rohani", "Bersedia bekerja shift"]'::jsonb,
 '["Gaji sesuai standar BUMN", "Tunjangan shift", "Asuransi kesehatan keluarga", "Rumah dinas", "Program pensiun"]'::jsonb,
 'Daftar melalui recruitment.pln.co.id',
 'BUMN yang mengelola ketenagalistrikan di Indonesia',
 '["Engineering", "BUMN", "Electrical", "Fresh Graduate"]'::jsonb,
 '["Teknik Elektro", "Teknik Fisika"]'::jsonb,
 NULL, NULL, true, '2025-01-10', 'Rp 7.500.000 - Rp 10.000.000'),

(8, 'Digital Marketing Specialist', 'digital-marketing-specialist-shopee', 11, 'PT Shopee International Indonesia', 'shopee',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'Marketing', 'orange',
 'Merancang dan menjalankan strategi digital marketing untuk meningkatkan brand awareness dan user acquisition Shopee.',
 CURRENT_DATE - INTERVAL '3 days', 'Strata 1', '1-2 Tahun',
 '["S1 Marketing/Komunikasi/DKV", "Pengalaman 1-2 tahun di digital marketing", "Menguasai Google Ads, Facebook Ads, SEO/SEM", "Data-driven dan analytical mindset", "Kreatif dan inovatif"]'::jsonb,
 '["Gaji kompetitif", "Performance bonus", "Health insurance", "Learning budget", "Work from home flexibility"]'::jsonb,
 'Apply through Shopee careers website',
 'Platform e-commerce terkemuka di Asia Tenggara',
 '["Marketing", "Digital", "E-Commerce", "SEO"]'::jsonb,
 '["Marketing", "Komunikasi", "DKV"]'::jsonb,
 NULL, NULL, true, '2025-01-20', 'Rp 8.000.000 - Rp 12.000.000'),

(9, 'UI/UX Designer', 'uiux-designer-bukalapak', 10, 'PT Bukalapak', 'bukalapak',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'Design', 'green',
 'Mendesain user interface dan user experience untuk aplikasi Bukalapak yang user-friendly dan menarik.',
 CURRENT_DATE - INTERVAL '4 days', 'Strata 1', '1-3 Tahun',
 '["S1 DKV/Desain Produk/Informatika", "Portfolio UI/UX design yang kuat", "Menguasai Figma, Adobe XD, Sketch", "Memahami user research dan usability testing", "Kemampuan komunikasi yang baik"]'::jsonb,
 '["Competitive salary", "Flexible working hours", "Health & dental insurance", "Latest design tools", "Career growth opportunities"]'::jsonb,
 'Send portfolio to careers@bukalapak.com',
 'Platform e-commerce yang memberdayakan UMKM Indonesia',
 '["Design", "UI/UX", "Product Design", "Tech"]'::jsonb,
 '["DKV", "Desain Produk", "Teknik Informatika"]'::jsonb,
 NULL, NULL, true, '2025-01-18', 'Rp 9.000.000 - Rp 14.000.000'),

(10, 'Human Resources Staff', 'human-resources-staff-unilever', 15, 'PT Unilever Indonesia', 'unilever',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Tangerang', 'Banten', 'Tangerang',
 'Full Time', 'SWASTA', 'blue',
 'Menangani recruitment, employee relations, dan HR administration untuk mendukung operasional perusahaan.',
 CURRENT_DATE - INTERVAL '5 days', 'Strata 1', '0-1 Tahun',
 '["S1 Psikologi/Manajemen SDM", "IPK minimal 3.00", "Memahami proses recruitment", "Komunikatif dan detail oriented", "Menguasai MS Office"]'::jsonb,
 '["Gaji kompetitif + allowance", "Medical & life insurance", "Annual bonus", "Training & development", "Employee discounts"]'::jsonb,
 'Apply via Unilever career portal',
 'Perusahaan multinasional produsen produk konsumen terkemuka',
 '["HR", "Recruitment", "FMCG", "Swasta"]'::jsonb,
 '["Psikologi", "Manajemen", "Hukum"]'::jsonb,
 NULL, NULL, true, '2025-01-12', 'Rp 6.000.000 - Rp 8.500.000'),

(11, 'Customer Service Representative', 'customer-service-representative-xl', 18, 'PT XL Axiata', 'xl-axiata',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Bandung', 'Jawa Barat', 'Bandung',
 'Full Time', 'SWASTA', 'orange',
 'Memberikan layanan customer service terbaik untuk pelanggan XL Axiata melalui berbagai channel komunikasi.',
 CURRENT_DATE - INTERVAL '6 days', 'Strata 1', 'Fresh Graduate',
 '["Minimal D3 semua jurusan", "Fresh graduate welcome", "Komunikatif dan customer oriented", "Mampu bekerja dalam tim", "Bersedia bekerja shift"]'::jsonb,
 '["Gaji pokok + tunjangan", "Bonus performance", "BPJS lengkap", "Pelatihan berkala", "Jenjang karir"]'::jsonb,
 'Kirim CV ke hrd@xl.co.id',
 'Perusahaan telekomunikasi seluler terkemuka di Indonesia',
 '["Customer Service", "Telco", "Fresh Graduate"]'::jsonb,
 '["Semua Jurusan"]'::jsonb,
 NULL, NULL, true, '2025-01-08', 'Rp 4.500.000 - Rp 6.500.000'),

(12, 'Project Engineer', 'project-engineer-wika', 21, 'PT Wijaya Karya (WIKA)', 'wijaya-karya',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Semarang', 'Jawa Tengah', 'Semarang',
 'Full Time', 'BUMN', 'blue',
 'Mengelola proyek konstruksi infrastruktur dengan memastikan kualitas, waktu, dan budget sesuai target.',
 CURRENT_DATE - INTERVAL '7 days', 'Strata 1', '2-3 Tahun',
 '["S1 Teknik Sipil", "Pengalaman minimal 2 tahun di project konstruksi", "Memahami RAB dan manajemen proyek", "Memiliki SIM A", "Bersedia mobile ke site project"]'::jsonb,
 '["Gaji sesuai UMK + tunjangan proyek", "Asuransi kesehatan", "Tunjangan transportasi", "Bonus project completion", "Dana pensiun"]'::jsonb,
 'Daftar melalui careers.wika.co.id',
 'BUMN yang bergerak di bidang konstruksi dan infrastruktur',
 '["Engineering", "Construction", "BUMN", "Infrastructure"]'::jsonb,
 '["Teknik Sipil", "Arsitektur"]'::jsonb,
 NULL, NULL, true, '2025-01-22', 'Rp 9.000.000 - Rp 13.000.000'),

(13, 'Content Creator', 'content-creator-traveloka', 12, 'PT Traveloka Indonesia', 'traveloka',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'Marketing', 'green',
 'Membuat konten kreatif untuk social media dan marketing campaign Traveloka di berbagai platform.',
 CURRENT_DATE - INTERVAL '8 days', 'Strata 1', '1-2 Tahun',
 '["S1 Komunikasi/DKV/Broadcasting", "Pengalaman membuat konten untuk social media", "Menguasai video editing (Premiere, After Effects)", "Kreatif dan up-to-date dengan tren", "Portfolio konten yang menarik"]'::jsonb,
 '["Salary kompetitif", "Creative tools provided", "Health insurance", "Flexible working arrangement", "Annual trip"]'::jsonb,
 'Submit portfolio via Traveloka careers',
 'Platform travel dan lifestyle terbesar di Indonesia',
 '["Content", "Marketing", "Social Media", "Creative"]'::jsonb,
 '["Komunikasi", "DKV", "Broadcasting"]'::jsonb,
 NULL, NULL, true, '2025-01-16', 'Rp 7.000.000 - Rp 10.000.000'),

(14, 'Finance Officer', 'finance-officer-astra', 16, 'PT Astra International', 'astra',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'SWASTA', 'blue',
 'Mengelola laporan keuangan, budgeting, dan analysis untuk mendukung keputusan bisnis perusahaan.',
 CURRENT_DATE - INTERVAL '9 days', 'Strata 1', '1-2 Tahun',
 '["S1 Akuntansi/Manajemen Keuangan", "IPK minimal 3.00", "Memahami standar akuntansi", "Menguasai MS Excel advance", "Teliti dan analitis"]'::jsonb,
 '["Gaji menarik", "Performance bonus", "Medical insurance", "Meal allowance", "Career development program"]'::jsonb,
 'Apply through Astra recruitment portal',
 'Perusahaan konglomerasi terbesar di Indonesia',
 '["Finance", "Accounting", "Swasta", "Corporate"]'::jsonb,
 '["Akuntansi", "Manajemen", "Ekonomi"]'::jsonb,
 NULL, NULL, true, '2025-01-14', 'Rp 7.500.000 - Rp 10.500.000'),

(15, 'Quality Control Staff', 'quality-control-staff-indofood', 17, 'PT Indofood Sukses Makmur', 'indofood',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Bekasi', 'Jawa Barat', 'Bekasi',
 'Full Time', 'SWASTA', 'orange',
 'Melakukan quality control terhadap produk makanan untuk memastikan standar kualitas terpenuhi.',
 CURRENT_DATE - INTERVAL '10 days', 'Strata 1', 'Fresh Graduate',
 '["S1 Teknologi Pangan/Kimia", "IPK minimal 2.75", "Memahami HACCP dan GMP", "Teliti dan detail oriented", "Bersedia bekerja shift"]'::jsonb,
 '["Gaji UMR + tunjangan", "BPJS Kesehatan & Ketenagakerjaan", "Makan siang gratis", "Transport allowance", "Annual bonus"]'::jsonb,
 'Walk in interview atau email ke recruitment@indofood.co.id',
 'Produsen makanan dan minuman terbesar di Indonesia',
 '["Quality Control", "FMCG", "Manufacturing", "Fresh Graduate"]'::jsonb,
 '["Teknologi Pangan", "Kimia", "Pertanian"]'::jsonb,
 NULL, NULL, true, '2025-01-05', 'Rp 5.000.000 - Rp 7.000.000'),

(16, 'Business Analyst', 'business-analyst-dana', 13, 'PT Espay Debit Indonesia Koe', 'dana',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'Fresh Grad', 'blue',
 'Menganalisis data bisnis dan memberikan insight untuk pengembangan produk dan strategi bisnis DANA.',
 CURRENT_DATE - INTERVAL '11 days', 'Strata 1', 'Fresh Graduate',
 '["S1 Ekonomi/Manajemen/Statistika/TI", "IPK minimal 3.25", "Menguasai SQL dan Excel", "Analytical dan problem solving skills", "Fresh graduate atau max 1 tahun pengalaman"]'::jsonb,
 '["Competitive salary", "Health insurance", "Performance bonus", "Learning & development budget", "Hybrid working"]'::jsonb,
 'Apply via DANA career website',
 'Platform dompet digital dan pembayaran Indonesia',
 '["Business Analyst", "Fintech", "Fresh Graduate", "Data"]'::jsonb,
 '["Ekonomi", "Manajemen", "Statistika", "Teknik Informatika"]'::jsonb,
 NULL, NULL, true, '2025-01-25', 'Rp 7.000.000 - Rp 10.000.000'),

(17, 'Sales Executive', 'sales-executive-ovo', 14, 'PT Visionet Internasional', 'ovo',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Surabaya', 'Jawa Timur', 'Surabaya',
 'Full Time', 'Sales', 'orange',
 'Mengembangkan merchant partnership dan meningkatkan adopsi OVO di wilayah Surabaya.',
 CURRENT_DATE - INTERVAL '12 days', 'Strata 1', '1-2 Tahun',
 '["Minimal D3 semua jurusan", "Pengalaman sales 1-2 tahun", "Memiliki network merchant", "Target oriented", "Memiliki kendaraan dan SIM C"]'::jsonb,
 '["Basic salary + high commission", "Incentive bulanan", "Health insurance", "Phone allowance", "Transportation allowance"]'::jsonb,
 'Send CV to recruitment@ovo.id',
 'Aplikasi pembayaran dan layanan keuangan digital',
 '["Sales", "Fintech", "Partnership", "B2B"]'::jsonb,
 '["Semua Jurusan"]'::jsonb,
 NULL, NULL, true, '2025-01-11', 'Rp 6.000.000 - Rp 12.000.000'),

(18, 'Production Planning Staff', 'production-planning-staff-krakatau', 19, 'PT Krakatau Steel', 'krakatau-steel',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Cilegon', 'Banten', 'Cilegon',
 'Full Time', 'BUMN', 'blue',
 'Merencanakan dan mengatur jadwal produksi untuk memastikan efisiensi dan efektivitas produksi baja.',
 CURRENT_DATE - INTERVAL '13 days', 'Strata 1', '1-3 Tahun',
 '["S1 Teknik Industri/Metalurgi", "Pengalaman di manufacturing 1-3 tahun", "Memahami production planning system", "Menguasai SAP (nilai plus)", "Dapat bekerja dengan deadline ketat"]'::jsonb,
 '["Gaji sesuai BUMN", "Tunjangan perumahan", "Medical insurance", "Meal allowance", "Retirement benefit"]'::jsonb,
 'Apply through recruitment.krakatausteel.com',
 'Produsen baja terintegrasi terbesar di Indonesia',
 '["Production", "Manufacturing", "BUMN", "Steel Industry"]'::jsonb,
 '["Teknik Industri", "Teknik Metalurgi", "Teknik Mesin"]'::jsonb,
 NULL, NULL, true, '2025-01-19', 'Rp 8.000.000 - Rp 11.000.000'),

(19, 'Safety Officer', 'safety-officer-adaro', 20, 'PT Adaro Energy', 'adaro',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Kalimantan Selatan', 'Kalimantan Selatan', 'Tanjung',
 'Full Time', 'SWASTA', 'green',
 'Memastikan implementasi safety procedures dan regulations di area pertambangan batubara.',
 CURRENT_DATE - INTERVAL '14 days', 'Strata 1', '2-4 Tahun',
 '["S1 Teknik/K3", "Sertifikat Ahli K3 Umum", "Pengalaman 2 tahun di mining/konstruksi", "Memahami HSE management system", "Bersedia ditempatkan di site tambang"]'::jsonb,
 '["Salary menarik + site allowance", "Medical insurance untuk keluarga", "Fly in fly out", "Annual leave 12 hari", "Life insurance"]'::jsonb,
 'Email CV to hrd@adaro.com',
 'Perusahaan pertambangan batubara terbesar di Indonesia',
 '["Safety", "Mining", "K3", "HSE"]'::jsonb,
 '["Teknik", "K3", "Kesehatan Masyarakat"]'::jsonb,
 NULL, NULL, true, '2025-01-21', 'Rp 10.000.000 - Rp 15.000.000'),

(20, 'Logistics Coordinator', 'logistics-coordinator-garuda', 9, 'PT Garuda Indonesia', 'garuda',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Tangerang', 'Banten', 'Tangerang',
 'Full Time', 'BUMN', 'blue',
 'Mengelola koordinasi logistik penerbangan untuk memastikan operasional berjalan lancar dan tepat waktu.',
 CURRENT_DATE - INTERVAL '15 days', 'Strata 1', '1-2 Tahun',
 '["S1 Manajemen/Logistik/Industri", "Pengalaman di logistics/supply chain", "Memahami aviation industry (nilai plus)", "Mampu bekerja dengan deadline ketat", "Bersedia bekerja shift"]'::jsonb,
 '["Gaji BUMN + tunjangan", "Free flight tickets", "Health insurance", "Meal allowance", "Career progression"]'::jsonb,
 'Apply at garuda-indonesia.com/careers',
 'Maskapai penerbangan nasional Indonesia',
 '["Logistics", "BUMN", "Aviation", "Supply Chain"]'::jsonb,
 '["Manajemen", "Teknik Industri", "Logistik"]'::jsonb,
 NULL, NULL, true, '2025-01-17', 'Rp 7.000.000 - Rp 9.500.000'),

(21, 'Legal Officer', 'legal-officer-mandiri', 8, 'PT Bank Mandiri', 'mandiri',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'BUMN', 'blue',
 'Menangani aspek legal perbankan, kontrak, compliance, dan memberikan legal advice untuk operasional bank.',
 CURRENT_DATE - INTERVAL '16 days', 'Strata 1', '1-3 Tahun',
 '["S1 Hukum", "IPK minimal 3.00", "Pengalaman di legal corporate/banking", "Memahami peraturan perbankan", "Kemampuan drafting kontrak yang baik"]'::jsonb,
 '["Gaji kompetitif BUMN", "Medical & life insurance", "Performance bonus", "Pension fund", "12 hari cuti tahunan"]'::jsonb,
 'Register at bankmandiri.co.id/recruitment',
 'Bank terbesar di Indonesia dari sisi aset',
 '["Legal", "Banking", "BUMN", "Corporate"]'::jsonb,
 '["Hukum"]'::jsonb,
 NULL, NULL, true, '2025-01-13', 'Rp 8.500.000 - Rp 12.000.000'),

(22, 'Agronomist', 'agronomist-pupuk-indonesia', 22, 'PT Pupuk Indonesia', 'pupuk-indonesia',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Gresik', 'Jawa Timur', 'Gresik',
 'Full Time', 'BUMN', 'green',
 'Memberikan konsultasi teknis pertanian kepada petani dan distributor mengenai penggunaan pupuk yang efektif.',
 CURRENT_DATE - INTERVAL '17 days', 'Strata 1', '1-2 Tahun',
 '["S1 Pertanian/Agroteknologi", "IPK minimal 2.75", "Memahami teknik budidaya tanaman", "Komunikatif dan suka berinteraksi dengan petani", "Bersedia mobile ke lapangan"]'::jsonb,
 '["Gaji BUMN + tunjangan lapangan", "Kendaraan operasional", "BPJS lengkap", "Meal allowance", "Training rutin"]'::jsonb,
 'Send application to recruitment@pupuk-indonesia.com',
 'Holding perusahaan pupuk terbesar di Indonesia',
 '["Agriculture", "BUMN", "Consulting", "Field Work"]'::jsonb,
 '["Pertanian", "Agroteknologi", "Agribisnis"]'::jsonb,
 NULL, NULL, true, '2025-01-09', 'Rp 6.500.000 - Rp 9.000.000'),

(23, 'Mechanical Engineer', 'mechanical-engineer-semen', 23, 'PT Semen Indonesia', 'semen-indonesia',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Gresik', 'Jawa Timur', 'Gresik',
 'Full Time', 'BUMN', 'blue',
 'Bertanggung jawab terhadap maintenance dan troubleshooting mesin produksi semen di plant.',
 CURRENT_DATE - INTERVAL '18 days', 'Strata 1', '1-3 Tahun',
 '["S1 Teknik Mesin", "Pengalaman di maintenance manufacturing", "Memahami heavy equipment machinery", "Problem solving skills", "Bersedia bekerja shift"]'::jsonb,
 '["Gaji sesuai standar BUMN", "Shift allowance", "Medical insurance keluarga", "Mess/housing", "Retirement benefit"]'::jsonb,
 'Register at semenindonesia.com/careers',
 'Produsen semen terbesar di Indonesia',
 '["Engineering", "Manufacturing", "BUMN", "Maintenance"]'::jsonb,
 '["Teknik Mesin", "Teknik Industri"]'::jsonb,
 NULL, NULL, true, '2025-01-23', 'Rp 8.500.000 - Rp 12.500.000'),

(24, 'Wealth Management Associate', 'wealth-management-cimb', 24, 'PT Bank CIMB Niaga', 'bank-cimb-niaga',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'SWASTA', 'blue',
 'Memberikan advisory dan solusi investasi kepada nasabah high net worth untuk wealth management.',
 CURRENT_DATE - INTERVAL '19 days', 'Strata 1', '2-4 Tahun',
 '["S1 Ekonomi/Manajemen/Keuangan", "Pengalaman 2 tahun di banking/wealth management", "Memiliki sertifikasi WAPERD (nilai plus)", "Strong interpersonal skills", "Target oriented"]'::jsonb,
 '["Competitive salary + incentive", "Medical insurance", "Performance bonus", "Professional certification support", "Career advancement"]'::jsonb,
 'Apply through cimbniaga.co.id/careers',
 'Bank swasta terkemuka dengan layanan perbankan lengkap',
 '["Banking", "Wealth Management", "Finance", "Private Banking"]'::jsonb,
 '["Ekonomi", "Manajemen", "Akuntansi"]'::jsonb,
 NULL, NULL, true, '2025-01-24', 'Rp 10.000.000 - Rp 18.000.000'),

(25, 'Train Operations Officer', 'train-operations-officer-kai', 25, 'PT Kereta Api Indonesia', 'kai',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Yogyakarta', 'DI Yogyakarta', 'Yogyakarta',
 'Full Time', 'BUMN', 'blue',
 'Mengoperasikan dan mengawasi perjalanan kereta api untuk memastikan keselamatan dan ketepatan waktu.',
 CURRENT_DATE - INTERVAL '20 days', 'Strata 1', 'Fresh Graduate',
 '["Minimal D3 Perhubungan/Teknik", "Fresh graduate welcome", "Sehat jasmani dan rohani", "Tidak buta warna", "Bersedia bekerja shift dan mobile"]'::jsonb,
 '["Gaji BUMN + tunjangan operasional", "Medical insurance", "Free train travel", "Meal allowance", "Pension program"]'::jsonb,
 'Register at kai.id/recruitment',
 'BUMN yang mengelola perkeretaapian di Indonesia',
 '["Transportation", "BUMN", "Operations", "Fresh Graduate"]'::jsonb,
 '["Perhubungan", "Teknik", "Semua Jurusan"]'::jsonb,
 NULL, NULL, true, '2025-01-07', 'Rp 6.000.000 - Rp 8.500.000'),

(26, 'Backend Developer', 'backend-developer-tokopedia', 4, 'PT Tokopedia', 'tokopedia',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'IT', 'blue',
 'Mengembangkan dan maintain backend services untuk platform e-commerce Tokopedia yang scalable dan reliable.',
 CURRENT_DATE - INTERVAL '21 days', 'Strata 1', '2-3 Tahun',
 '["S1 Teknik Informatika/Ilmu Komputer", "Pengalaman 2 tahun backend development", "Menguasai Go/Java/Python", "Familiar dengan microservices architecture", "Experience dengan cloud services (GCP/AWS)"]'::jsonb,
 '["Competitive salary package", "Stock options", "Health insurance", "Flexible working hours", "Learning budget"]'::jsonb,
 'Apply at tokopedia.com/careers',
 'Platform e-commerce terbesar di Indonesia',
 '["Backend", "Software Engineer", "Tech", "Startup"]'::jsonb,
 '["Teknik Informatika", "Ilmu Komputer", "Sistem Informasi"]'::jsonb,
 NULL, NULL, true, '2025-01-26', 'Rp 12.000.000 - Rp 20.000.000'),

(27, 'DevOps Engineer', 'devops-engineer-gojek', 5, 'PT GoTo Gojek Tokopedia', 'gojek',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'IT', 'green',
 'Mengelola infrastructure dan automation untuk mendukung deployment aplikasi Gojek yang reliable dan scalable.',
 CURRENT_DATE - INTERVAL '22 days', 'Strata 1', '2-4 Tahun',
 '["S1 Teknik Informatika/Sistem Informasi", "Pengalaman 2 tahun sebagai DevOps", "Menguasai Kubernetes, Docker, Jenkins", "Experience dengan cloud platforms (GCP/AWS)", "Strong scripting skills (Bash/Python)"]'::jsonb,
 '["High salary package", "Stock options", "Medical & dental coverage", "Unlimited leave policy", "Latest tech tools"]'::jsonb,
 'Submit application via Gojek careers portal',
 'Super app terbesar di Indonesia',
 '["DevOps", "Infrastructure", "Cloud", "Tech"]'::jsonb,
 '["Teknik Informatika", "Sistem Informasi", "Ilmu Komputer"]'::jsonb,
 NULL, NULL, true, '2025-01-27', 'Rp 13.000.000 - Rp 22.000.000'),

(28, 'Tax Specialist', 'tax-specialist-telkom', 2, 'PT Telkom Indonesia', 'telkom',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Bandung', 'Jawa Barat', 'Bandung',
 'Full Time', 'BUMN', 'blue',
 'Mengelola perpajakan perusahaan, tax planning, dan compliance terhadap regulasi perpajakan yang berlaku.',
 CURRENT_DATE - INTERVAL '23 days', 'Strata 1', '2-3 Tahun',
 '["S1 Akuntansi/Perpajakan", "Pengalaman 2 tahun di tax", "Sertifikat Brevet A & B", "Memahami e-Faktur dan e-SPT", "Update dengan peraturan pajak terkini"]'::jsonb,
 '["Gaji BUMN kompetitif", "Medical insurance", "Performance bonus", "Professional certification support", "Pension fund"]'::jsonb,
 'Register at recruitment.telkom.co.id',
 'BUMN terbesar di bidang telekomunikasi dan jaringan',
 '["Tax", "Accounting", "BUMN", "Finance"]'::jsonb,
 '["Akuntansi", "Perpajakan", "Ekonomi"]'::jsonb,
 NULL, NULL, true, '2025-01-28', 'Rp 9.000.000 - Rp 13.000.000'),

(29, 'Internal Auditor', 'internal-auditor-pertamina', 1, 'PT Pertamina (Persero)', 'pertamina',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'BUMN', 'blue',
 'Melakukan audit internal untuk memastikan compliance dan efektivitas operational risk management di Pertamina.',
 CURRENT_DATE - INTERVAL '24 days', 'Strata 1', '2-4 Tahun',
 '["S1 Akuntansi/Manajemen", "Pengalaman 2 tahun di internal audit", "Memiliki sertifikasi QIA/CIA (nilai plus)", "Memahami ISO dan risk management", "Analytical dan detail oriented"]'::jsonb,
 '["Gaji BUMN + tunjangan", "Medical insurance keluarga", "Professional development", "Retirement benefit", "Annual bonus"]'::jsonb,
 'Apply through pertamina.com/careers',
 'BUMN terbesar di Indonesia yang bergerak di bidang energi',
 '["Audit", "BUMN", "Risk Management", "Compliance"]'::jsonb,
 '["Akuntansi", "Manajemen", "Ekonomi"]'::jsonb,
 NULL, NULL, true, '2025-01-29', 'Rp 9.500.000 - Rp 14.000.000'),

(30, 'Mobile App Developer', 'mobile-app-developer-shopee', 11, 'PT Shopee International Indonesia', 'shopee',
 'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg', 'Jakarta', 'DKI Jakarta', 'Jakarta',
 'Full Time', 'IT', 'orange',
 'Mengembangkan aplikasi mobile Shopee untuk Android/iOS dengan performa optimal dan user experience yang baik.',
 CURRENT_DATE - INTERVAL '25 days', 'Strata 1', '1-3 Tahun',
 '["S1 Teknik Informatika/Ilmu Komputer", "Pengalaman 1-3 tahun mobile development", "Menguasai Kotlin/Swift atau React Native/Flutter", "Memahami mobile app architecture", "Portfolio aplikasi mobile"]'::jsonb,
 '["Attractive salary package", "Health & wellness benefits", "Work from home flexibility", "Latest devices", "Learning opportunities"]'::jsonb,
 'Send application to careers.shopee.co.id',
 'Platform e-commerce terkemuka di Asia Tenggara',
 '["Mobile Development", "Android", "iOS", "Tech"]'::jsonb,
 '["Teknik Informatika", "Ilmu Komputer", "Sistem Informasi"]'::jsonb,
 NULL, NULL, true, '2025-01-30', 'Rp 10.000.000 - Rp 16.000.000')
ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 3. BLOG POSTS (5 posts)
-- ===========================================
INSERT INTO
    blog_posts (
        id,
        slug,
        title,
        description,
        content,
        category,
        image,
        posted_date
    )
VALUES (
        1,
        'tips-lolos-interview-bumn',
        '10 Tips Sukses Interview BUMN 2024',
        'Panduan lengkap persiapan interview di perusahaan BUMN dari tahap screening hingga final interview.',
        '<h2>Persiapan Interview BUMN</h2><p>Interview di perusahaan BUMN memiliki karakteristik tersendiri. Berikut tips yang perlu Anda perhatikan...</p><h3>1. Pahami Profil Perusahaan</h3><p>Pelajari visi, misi, dan nilai-nilai perusahaan dengan baik.</p><h3>2. Persiapkan Dokumen</h3><p>Pastikan semua dokumen lengkap dan terorganisir dengan baik.</p>',
        'Tips Karir',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        CURRENT_DATE - INTERVAL '7 days'
    ),
    (
        2,
        'cara-buat-cv-menarik',
        'Cara Membuat CV yang Menarik untuk HRD',
        'CV yang baik adalah kunci pertama membuka peluang karir. Pelajari struktur dan tips membuat CV yang eye-catching.',
        '<h2>Struktur CV yang Efektif</h2><p>CV yang baik harus memiliki struktur yang jelas dan informasi yang relevan. Berikut panduannya...</p><h3>1. Data Pribadi</h3><p>Letakkan informasi kontak yang jelas di bagian atas.</p><h3>2. Ringkasan Profesional</h3><p>Buat ringkasan singkat tentang keahlian dan pengalaman Anda.</p>',
        'Tips Karir',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        CURRENT_DATE - INTERVAL '3 days'
    ),
    (
        3,
        'skill-paling-dicari-2024',
        'Skill yang Paling Dicari Perusahaan di Tahun 2024',
        'Daftar skill teknis dan soft skill yang paling dibutuhkan perusahaan untuk fresh graduate dan profesional.',
        '<h2>Skill Teknis</h2><p>Di era digital ini, penguasaan teknologi menjadi keharusan.</p><h3>1. Programming & Data Analysis</h3><p>Python, JavaScript, dan SQL menjadi skill yang sangat dicari.</p><h3>2. Digital Marketing</h3><p>SEO, SEM, dan Social Media Marketing expertise.</p><h2>Soft Skills</h2><p>Komunikasi, problem solving, dan adaptability tetap menjadi prioritas.</p>',
        'Pengembangan Karir',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        CURRENT_DATE - INTERVAL '5 days'
    ),
    (
        4,
        'panduan-salary-negotiation',
        'Panduan Negosiasi Gaji untuk Fresh Graduate',
        'Tips dan strategi negosiasi gaji yang tepat agar mendapatkan penawaran terbaik tanpa kehilangan kesempatan.',
        '<h2>Riset Salary Range</h2><p>Sebelum negosiasi, lakukan riset salary range untuk posisi yang Anda lamar.</p><h3>1. Gunakan Platform Salary Checker</h3><p>Manfaatkan Glassdoor, Indeed, dan JobStreet untuk mengetahui range gaji.</p><h3>2. Pertimbangkan Total Compensation</h3><p>Jangan hanya fokus pada gaji pokok, tapi juga benefits dan tunjangan.</p><h2>Strategi Negosiasi</h2><p>Sampaikan ekspektasi dengan profesional dan data yang kuat.</p>',
        'Tips Karir',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        CURRENT_DATE - INTERVAL '1 days'
    ),
    (
        5,
        'cara-menonjol-di-linkedin',
        'Cara Membuat Profil LinkedIn yang Menonjol',
        'Optimasi profil LinkedIn untuk menarik perhatian recruiter dan membuka peluang karir yang lebih baik.',
        '<h2>Foto Profil Profesional</h2><p>Gunakan foto dengan background sederhana dan penampilan profesional.</p><h3>1. Headline yang Menarik</h3><p>Buat headline yang menggambarkan value proposition Anda, bukan hanya job title.</p><h3>2. Summary yang Compelling</h3><p>Ceritakan story Anda dengan fokus pada achievement dan skill.</p><h2>Konten dan Network</h2><p>Aktif berbagi konten relevan dan bangun network yang berkualitas.</p><h3>3. Endorsement dan Recommendation</h3><p>Minta endorsement untuk skill utama dan recommendation dari atasan atau rekan kerja.</p>',
        'Pengembangan Karir',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        CURRENT_DATE - INTERVAL '2 days'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 4. INTERNSHIPS
-- ===========================================
INSERT INTO
    internships (
        id,
        title,
        slug,
        company_name,
        company_slug,
        description,
        requirements,
        responsibilities,
        benefits,
        duration,
        location,
        province,
        city,
        is_remote,
        stipend,
        application_url,
        is_active
    )
VALUES (
        1,
        'Frontend Developer Intern',
        'magang-frontend-tokopedia',
        'Tokopedia',
        'tokopedia',
        'Kesempatan magang sebagai Frontend Developer menggunakan React dan TypeScript.',
        'Mahasiswa aktif semester 5-8, Menguasai HTML, CSS, JavaScript, Familiar dengan React',
        'Develop dan maintain frontend aplikasi web, Collaborate dengan designer dan backend team, Code review dan testing',
        'Uang saku bulanan, Sertifikat magang, Mentoring dari senior developer',
        '6 Bulan',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        false,
        'Rp 3.000.000 - Rp 4.000.000',
        'https://career.tokopedia.com/internship',
        true
    ),
    (
        2,
        'Data Analyst Intern',
        'magang-data-analyst-gojek',
        'Gojek',
        'gojek',
        'Bergabung dengan data team untuk menganalisis user behavior dan business metrics.',
        'Mahasiswa S1 Statistika/Matematika/TI, Menguasai SQL dan Python, Analytical thinking',
        'Analyze data to generate insights, Create reports and dashboards, Support data-driven decision making',
        'Stipend kompetitif, Project real impact, Networking dengan data professionals',
        '3-6 Bulan',
        'Jakarta',
        'DKI Jakarta',
        'Jakarta',
        false,
        'Rp 3.500.000 - Rp 5.000.000',
        'https://www.gojek.io/careers',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 5. SCHOLARSHIPS
-- ===========================================
INSERT INTO
    scholarships (
        id,
        title,
        slug,
        provider_name,
        description,
        eligibility,
        benefits,
        coverage,
        amount,
        education_level,
        application_url,
        is_active
    )
VALUES (
        1,
        'Beasiswa Unggulan Kemendikbudristek 2024',
        'beasiswa-unggulan-2024',
        'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
        'Program beasiswa penuh dari pemerintah untuk mahasiswa berprestasi.',
        'WNI berprestasi akademik/non-akademik, IPK minimal 3.25, Surat rekomendasi',
        'Biaya kuliah penuh, Biaya hidup bulanan, Tunjangan buku',
        'Full Scholarship',
        'Rp 10.000.000 - Rp 50.000.000',
        'S1, S2, S3',
        'https://beasiswaunggulan.kemdikbud.go.id',
        true
    ),
    (
        2,
        'Beasiswa LPDP S2 Luar Negeri',
        'beasiswa-lpdp-2024',
        'Lembaga Pengelola Dana Pendidikan (LPDP)',
        'Beasiswa penuh untuk studi S2 di luar negeri.',
        'Lulusan S1 IPK minimal 3.00, LoA unconditional, TOEFL/IELTS sesuai ketentuan',
        'Biaya pendidikan penuh, Biaya hidup di luar negeri, Tiket PP',
        'Full Scholarship',
        'Hingga Rp 800.000.000',
        'S2',
        'https://lpdp.kemenkeu.go.id',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 6. COURSES
-- ===========================================
INSERT INTO
    courses (
        id,
        title,
        slug,
        description,
        short_description,
        instructor_name,
        instructor_title,
        instructor_photo,
        thumbnail_image,
        preview_video_url,
        category,
        level,
        language,
        duration_hours,
        total_lessons,
        total_modules,
        is_free,
        price,
        original_price,
        has_certificate,
        enrollments_count,
        average_rating,
        reviews_count,
        is_featured,
        what_you_will_learn,
        prerequisites,
        status
    )
VALUES (
        1,
        'Fullstack Web Developer Bootcamp 2024',
        'fullstack-web-bootcamp',
        '<h2>Deskripsi</h2><p>Kursus komprehensif untuk menjadi fullstack web developer professional.</p>',
        'Belajar web development dari nol hingga mahir. HTML, CSS, JavaScript, React, Node.js.',
        'John Doe',
        'Senior Fullstack Developer',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://www.youtube.com/embed/qz0aGYrrlhU',
        'Web Development',
        'beginner',
        'Bahasa Indonesia',
        120,
        150,
        12,
        false,
        1499000,
        2999000,
        true,
        5420,
        4.8,
        342,
        true,
        ARRAY['Membuat website responsive', 'Membangun aplikasi dengan React', 'Create REST API'],
        ARRAY['Laptop/PC', 'Koneksi internet', 'Tidak perlu pengalaman coding'],
        'published'
    ),
    (
        2,
        'Data Science untuk Pemula - Python & ML',
        'data-science-pemula',
        '<h2>Tentang Kursus</h2><p>Step by step belajar Python dan machine learning basics.</p>',
        'Masuk ke dunia data science dengan Python. Belajar data analysis dan machine learning.',
        'Dr. Amanda Lee',
        'Data Scientist - Gojek',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://www.youtube.com/embed/rfscVS0vtbw',
        'Data Science',
        'beginner',
        'Bahasa Indonesia',
        80,
        120,
        10,
        false,
        999000,
        1999000,
        true,
        3890,
        4.9,
        289,
        true,
        ARRAY['Master Python untuk data science', 'Data visualization', 'Build ML models'],
        ARRAY['Laptop dengan RAM minimal 8GB', 'Basic programming knowledge (opsional)'],
        'published'
    ),
    (
        3,
        'Pengantar Programming dengan Python - Gratis',
        'python-gratis',
        '<h2>Mulai Belajar Programming</h2><p>Perfect untuk pemula absolute.</p>',
        'Kursus gratis untuk memulai journey programming. Belajar Python dari nol.',
        'Lisa Beginner',
        'Python Instructor',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg',
        'https://www.youtube.com/embed/kqtD5dpn9C8',
        'Web Development',
        'beginner',
        'Bahasa Indonesia',
        30,
        50,
        5,
        true,
        0,
        0,
        true,
        8750,
        4.9,
        567,
        true,
        ARRAY['Programming basics', 'Python syntax', 'Basic projects'],
        ARRAY['Laptop/PC', 'Tidak perlu background IT'],
        'published'
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 7. COMPETITIONS
-- ===========================================
INSERT INTO
    competitions (
        id,
        title,
        slug,
        organizer_name,
        description,
        category,
        prize_pool,
        prizes,
        eligibility,
        registration_fee,
        registration_deadline,
        competition_date,
        location,
        is_online,
        registration_url,
        is_active
    )
VALUES (
        1,
        'UI/UX Design Competition 2024',
        'uiux-design-competition-2024',
        'Tokopedia',
        'Kompetisi desain UI/UX untuk mahasiswa se-Indonesia dengan total hadiah puluhan juta rupiah.',
        'Design',
        'Rp 30.000.000',
        'Juara 1: Rp 15.000.000, Juara 2: Rp 10.000.000, Juara 3: Rp 5.000.000',
        'Mahasiswa aktif S1/D3/D4, Maksimal tim 3 orang',
        'Gratis',
        '2024-12-20',
        '2025-01-15',
        'Jakarta',
        false,
        'https://competition.tokopedia.com/uiux',
        true
    ),
    (
        2,
        'Data Science Hackathon 2024',
        'data-science-hackathon-2024',
        'Gojek',
        'Hackathon data science untuk mencari solusi inovatif menggunakan machine learning dan AI.',
        'Technology',
        'Rp 50.000.000',
        'Juara 1: Rp 25.000.000, Juara 2: Rp 15.000.000, Juara 3: Rp 10.000.000',
        'Mahasiswa dan fresh graduate, Tim maksimal 4 orang',
        'Gratis',
        '2024-12-15',
        '2025-01-20',
        'Online',
        true,
        'https://hackathon.gojek.com',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 8. WEBINARS
-- ===========================================
INSERT INTO
    webinars (
        id,
        title,
        slug,
        host_name,
        speaker_name,
        speaker_title,
        description,
        topics,
        date,
        duration,
        platform,
        registration_url,
        is_free,
        certificate_available,
        is_active
    )
VALUES (
        1,
        'Cara Sukses Interview di Perusahaan Teknologi',
        'sukses-interview-tech',
        'KabarKarir.com',
        'Budi Santoso',
        'Head of Engineering - Tokopedia',
        'Workshop interaktif tentang tips dan trik lolos interview di perusahaan teknologi ternama.',
        ARRAY['Interview Tips', 'Technical Interview', 'Career Development'],
        '2024-12-15 14:00:00',
        '2 Jam',
        'Zoom',
        'https://webinar.kabarkarir.com/interview-tech',
        true,
        true,
        true
    ),
    (
        2,
        'Membangun Portfolio Developer yang Menarik',
        'portfolio-developer',
        'KabarKarir.com',
        'Sarah Developer',
        'Senior Software Engineer - Gojek',
        'Belajar cara membuat portfolio developer yang eye-catching dan menarik perhatian recruiter.',
        ARRAY['Portfolio', 'Web Development', 'Career Tips'],
        '2024-12-20 19:00:00',
        '1.5 Jam',
        'Google Meet',
        'https://webinar.kabarkarir.com/portfolio',
        true,
        true,
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 9. RECRUITMENT EVENTS
-- ===========================================
INSERT INTO
    recruitment_events (
        id,
        slug,
        title,
        organizer,
        organizer_slug,
        event_date,
        event_time,
        location,
        province,
        city,
        type,
        is_featured,
        description,
        participating_companies,
        available_positions,
        is_active
    )
VALUES (
        1,
        'job-fair-bumn-2024',
        'Job Fair BUMN 2024',
        'Kementerian BUMN',
        'kementerian-bumn',
        '2024-12-10',
        '09:00 - 17:00',
        'Jakarta Convention Center',
        'DKI Jakarta',
        'Jakarta',
        'Job Fair',
        true,
        'Job Fair terbesar untuk perusahaan BUMN dengan 50+ perusahaan dan ribuan lowongan kerja.',
        '["PT Pertamina", "PT Telkom Indonesia", "PT Bank Negara Indonesia", "PT PLN", "PT Garuda Indonesia"]'::jsonb,
        '["Management Trainee", "IT Specialist", "Finance Officer", "Marketing Staff", "Engineer"]'::jsonb,
        true
    ),
    (
        2,
        'tech-career-expo-2024',
        'Tech Career Expo 2024',
        'Startup Indonesia',
        'startup-indonesia',
        '2024-12-18',
        '10:00 - 18:00',
        'ICE BSD',
        'Banten',
        'Tangerang',
        'Career Expo',
        true,
        'Career expo khusus untuk perusahaan teknologi dan startup dengan berbagai posisi tech.',
        '["Tokopedia", "Gojek", "Traveloka", "Bukalapak", "Tiket.com"]'::jsonb,
        '["Software Engineer", "Product Manager", "Data Scientist", "UI/UX Designer", "DevOps Engineer"]'::jsonb,
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ===========================================
-- 10. CAMPUS EVENTS
-- ===========================================
INSERT INTO
    campus_events (
        id,
        title,
        slug,
        university_name,
        event_type,
        description,
        date,
        location,
        is_online,
        registration_required,
        registration_url,
        is_free,
        is_active
    )
VALUES (
        1,
        'Campus Hiring Pertamina - UI 2024',
        'campus-hiring-pertamina-ui',
        'Universitas Indonesia',
        'Campus Hiring',
        'Program rekrutmen khusus mahasiswa UI untuk posisi Management Trainee di Pertamina.',
        '2024-12-12 09:00:00',
        'Fakultas Ekonomi & Bisnis UI, Depok',
        false,
        true,
        'https://career.ui.ac.id/pertamina',
        true,
        true
    ),
    (
        2,
        'Tech Talk Series: AI & Machine Learning',
        'tech-talk-ai-ml',
        'Institut Teknologi Bandung',
        'Seminar',
        'Seminar tentang perkembangan terkini AI dan Machine Learning bersama praktisi industri.',
        '2024-12-16 13:00:00',
        'Aula Barat ITB, Bandung',
        false,
        true,
        'https://itb.ac.id/events/tech-talk',
        true,
        true
    ) ON CONFLICT (id) DO NOTHING;

-- ================================================
-- SUMMARY:
-- ================================================
-- ✅ Companies: 25 records (BUMN & SWASTA)
-- ✅ Jobs: 30 records (Diverse positions, locations, categories)
-- ✅ Blog Posts: 5 records (SEO-optimized with slugs)
-- ✅ Internships: 2 records (MAHASISWA)
-- ✅ Scholarships: 2 records (MAHASISWA)
-- ✅ Competitions: 2 records (MAHASISWA)
-- ✅ Webinars: 2 records (MAHASISWA)
-- ✅ Recruitment Events: 2 records (USER - with slug for SEO)
-- ✅ Campus Events: 2 records (MAHASISWA)
-- ✅ Courses: 3 records (PELATIHAN)
--
-- Total: 75 dummy records siap untuk testing!
-- All images standardized to: https://mihzzrbqlgf1.cdn.shift8web.ca/wp-content/uploads/2021/12/KAI-Services.jpg
-- All blog posts and events now use SEO-friendly slugs
-- ================================================
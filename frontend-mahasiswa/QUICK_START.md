# Quick Start Guide - Frontend Mahasiswa

## ⚡ Get Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```powershell
cd d:\kabarkarir.com\frontend-mahasiswa
npm install
```

Wait for installation to complete. You'll see something like:

```
added 234 packages in 45s
```

---

### Step 2: Setup Environment Variables (1 minute)

**Option A: Copy from frontend-user (EASIEST)**

```powershell
# Copy existing .env file
copy ..\frontend-user\.env .env
```

**Option B: Create new .env file**

```powershell
# Copy template
copy .env.example .env

# Then edit .env file and add your Supabase credentials
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

To get Supabase credentials:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: Settings → API
4. Copy "Project URL" and "anon public" key

---

### Step 3: Run Development Server (1 minute)

```powershell
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5176/
  ➜  Network: use --host to expose
```

---

### Step 4: Open in Browser (10 seconds)

Open browser and go to: **http://localhost:5176**

You should see:

- ✅ KabarKarir Mahasiswa homepage
- ✅ Hero section with gradient background
- ✅ 6 colorful cards (Magang, Beasiswa, Lomba, etc.)
- ✅ Header with navigation
- ✅ Footer with links

---

### Step 5: Test Navigation (30 seconds)

Click on the menu items:

- Home → Shows homepage
- Magang → Shows "Coming Soon"
- Beasiswa → Shows "Coming Soon"
- Lomba → Shows "Coming Soon"
- All other pages → Show "Coming Soon"

**This is expected!** Pages are placeholders until we add real data.

---

## ✅ If Everything Works

**Congratulations!** Your setup is complete.

**Next Steps:**

1. Read `PROJECT_STATUS.md` for full development roadmap
2. Run database migrations (see below)
3. Add sample data
4. Implement data fetching

---

## 🗄️ Database Setup (IMPORTANT - Do This Next)

### Run Migration in Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: **SQL Editor**
4. Click: **New Query**
5. Open file: `d:\kabarkarir.com\supabase\migrations\create_mahasiswa_tables.sql`
6. Copy entire content (Ctrl+A, Ctrl+C)
7. Paste into Supabase SQL Editor (Ctrl+V)
8. Click: **Run** (or press Ctrl+Enter)

**Expected Result:**

```
Success. No rows returned
```

### Verify Tables Created

1. Go to: **Table Editor** (left sidebar)
2. You should see 6 new tables:
   - ✅ internships
   - ✅ scholarships
   - ✅ competitions
   - ✅ webinars
   - ✅ campus_events
   - ✅ freelance_jobs

---

## 📝 Add Sample Data (Optional but Recommended)

In Supabase SQL Editor, run this:

```sql
-- Add sample internship
INSERT INTO internships (
  title, slug, company_name, location, is_remote,
  type, description, requirements,
  stipend_min, stipend_max, application_url,
  deadline, posted_date, is_active,
  meta_title, meta_description, tags
) VALUES (
  'Magang Frontend Developer',
  'magang-frontend-developer-jakarta-2024',
  'PT Teknologi Indonesia',
  'Jakarta',
  true,
  'full-time',
  'Bergabung dengan tim development untuk membuat aplikasi web modern menggunakan React dan TypeScript',
  'Mahasiswa aktif S1 Informatika/Sistem Informasi, familiar dengan React dan TypeScript',
  2500000,
  3500000,
  'https://kabarkarir.com/apply/123',
  '2024-12-31',
  CURRENT_DATE,
  true,
  'Magang Frontend Developer - PT Teknologi Indonesia Jakarta',
  'Lowongan magang frontend developer di Jakarta. Stipend 2.5-3.5 juta. Remote friendly.',
  ARRAY['React', 'TypeScript', 'Frontend', 'Web Development']
);

-- Add sample scholarship
INSERT INTO scholarships (
  title, slug, provider, scholarship_type,
  education_level, countries, coverage, description,
  eligibility, application_url, deadline,
  posted_date, is_active, meta_title, meta_description, tags
) VALUES (
  'Beasiswa LPDP Tahun 2024',
  'beasiswa-lpdp-2024-s2-dalam-luar-negeri',
  'LPDP (Lembaga Pengelola Dana Pendidikan)',
  'full',
  'S2',
  ARRAY['Indonesia', 'USA', 'UK', 'Australia', 'Jepang', 'Jerman'],
  'Biaya kuliah penuh, tunjangan hidup, biaya penelitian, asuransi kesehatan',
  'Program beasiswa penuh dari pemerintah Indonesia untuk kuliah S2 di dalam dan luar negeri di universitas terbaik dunia',
  'WNI, IPK minimal 3.0, TOEFL minimal 500 atau IELTS 6.0, usia maksimal 35 tahun',
  'https://lpdp.kemenkeu.go.id',
  '2024-12-31',
  CURRENT_DATE,
  true,
  'Beasiswa LPDP 2024 - S2 Dalam dan Luar Negeri Full Scholarship',
  'Beasiswa penuh dari LPDP untuk kuliah S2. Biaya kuliah, hidup, dan penelitian ditanggung. Daftar sekarang!',
  ARRAY['LPDP', 'Beasiswa', 'S2', 'Master', 'Full Scholarship', 'Luar Negeri']
);

-- Verify data
SELECT title, company_name FROM internships;
SELECT title, provider FROM scholarships;
```

**Expected Result:**

```
✅ 1 internship added
✅ 1 scholarship added
```

---

## 🚨 Troubleshooting

### Problem: npm install fails

**Error:** `npm ERR! network request to https://registry.npmjs.org/...`
**Solution:**

```powershell
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Problem: Port 5176 already in use

**Error:** `Port 5176 is already in use`
**Solution:**

```powershell
# Kill process on port 5176 (Windows)
netstat -ano | findstr :5176
taskkill /PID <process_id> /F

# Or use different port
npm run dev -- --port 5177
```

### Problem: Blank page in browser

**Possible Causes:**

1. ❌ .env file missing → Create it (see Step 2)
2. ❌ Supabase credentials wrong → Check Supabase dashboard
3. ❌ JavaScript error → Check browser console (F12)

**Solution:** Check browser console (press F12) for error messages

### Problem: TypeScript errors in VS Code

**Error:** Red underlines everywhere saying "Cannot find module 'react'"
**This is NORMAL!** Wait for npm install to finish, then:

```powershell
# Reload VS Code window
# Press: Ctrl+Shift+P
# Type: "Reload Window"
# Press: Enter
```

### Problem: Images/Logos not showing

**This is NORMAL!** We haven't added any images yet. They'll appear when you:

1. Upload company logos to Supabase Storage, or
2. Add logo URLs in the database

---

## 📊 What's Working vs What's Not

### ✅ Currently Working

- Project structure
- Development server
- Routing (all pages accessible)
- Header navigation
- Footer
- Homepage with hero section
- SEO meta tags
- Responsive design (mobile/desktop)

### ⏳ Placeholder Only (Shows "Coming Soon")

- All content pages (Magang, Beasiswa, Lomba, etc.)
- Detail pages
- Search functionality
- Filters
- Pagination

### ❌ Not Implemented Yet

- Data fetching from Supabase
- User authentication
- Favorites functionality
- Application tracking
- Email notifications

---

## 📚 Next Reading

After you get the server running successfully:

1. **`README.md`** - Full documentation (database schema, features, deployment)
2. **`PROJECT_STATUS.md`** - Complete project roadmap (what's done, what's pending)
3. **Database schema files:**
   - `supabase/migrations/create_mahasiswa_tables.sql` (6 tables for student content)
   - `supabase/migrations/create_pelatihan_lms_tables.sql` (7 tables for LMS)

---

## 🎯 Your Immediate Goal

**Today's Objective:** Get this message in your terminal without errors:

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5176/
```

And see this in your browser at http://localhost:5176:

- ✅ Beautiful homepage with gradient hero section
- ✅ 6 colorful cards for quick navigation
- ✅ Clean header and footer
- ✅ All pages accessible (even if showing "Coming Soon")

**That's it for today!** Once that works, you have a solid foundation. Everything else is just adding features on top.

---

## 🚀 Quick Commands Reference

```powershell
# Install dependencies (first time only)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Stop server
Ctrl + C

# Check for errors
npm run lint
```

---

## 💡 Pro Tips

1. **Keep terminal open:** Don't close PowerShell while dev server is running
2. **Hot reload:** Changes to code auto-reload in browser (no need to restart server)
3. **Multiple pages:** Open multiple browser tabs to test different pages
4. **Mobile view:** Press F12 in Chrome → Click device icon → Test mobile layout
5. **VS Code terminal:** Use VS Code's integrated terminal (Ctrl+`) instead of separate PowerShell window

---

## ✨ Success Criteria

You're done with initial setup when:

- [ ] `npm install` completed successfully
- [ ] `.env` file exists with Supabase credentials
- [ ] `npm run dev` runs without errors
- [ ] Browser shows homepage at http://localhost:5176
- [ ] Navigation works (all menu items clickable)
- [ ] No red errors in terminal
- [ ] No red errors in browser console (F12)

---

**Ready? Let's do this!** 🚀

Open PowerShell, navigate to the project folder, and type: `npm install`

import { supabase } from '../lib/supabase';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, Tag, MisiSubmission } from '../types';

// Helper function to generate slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing -
};

// ============================================
// ADMIN JOBS SERVICE
// ============================================
export const adminJobsService = {
  // Get all jobs (including inactive)
  getAll: async (): Promise<Job[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
    return data as Job[];
  },

  // Create job
  create: async (job: Omit<Job, 'id'>): Promise<Job> => {
    // Generate slug from title
    const slug = job.slug || generateSlug(job.title);
    
    // Map camelCase to snake_case for database
    const dbJob: any = {
      title: job.title,
      company: job.company,
      slug: slug,
      company_slug: job.companySlug || '',
      logo: job.logo || '',
      location: job.location || '',
      province: job.province || '',
      city: job.city || '',
      type: job.type || 'Full Time',
      category: job.category || 'Swasta',
      category_color: job.categoryColor || job.category_color || 'blue',
      education: job.education || '',
      experience: job.experience || '',
      description: job.description || '',
      qualifications: job.qualifications || [],
      benefits: job.benefits || [],
      how_to_apply: job.howToApply || job.how_to_apply || '',
      about_company: job.aboutCompany || job.about_company || '',
      tags: job.tags || [],
      majors: job.majors || [],
      salary_range: job.salaryRange || job.salary_range || '',
      due_date: job.dueDate || job.due_date || '',
      pdf_embed_url: job.pdfEmbedUrl || job.pdf_embed_url || '',
      video_embed_url: job.videoEmbedUrl || job.video_embed_url || '',
      posted_date: new Date().toISOString().split('T')[0],
      is_active: true,
    };
    
    // Remove empty strings and undefined to make them optional
    Object.keys(dbJob).forEach(key => {
      if (dbJob[key] === undefined || dbJob[key] === '') delete dbJob[key];
      // Keep required fields even if empty string
      if (['title', 'company'].includes(key)) return;
    });
    
    console.log('📤 Creating job:', dbJob);
    
    const { data, error } = await supabase
      .from('jobs')
      .insert([dbJob])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Create job error:', error);
      throw error;
    }
    
    console.log('✅ Job created:', data);
    return data as Job;
  },

  // Update job
  update: async (id: number, job: Partial<Job>): Promise<Job> => {
    // Map camelCase to snake_case for database
    const dbJob: any = {};
    
    if (job.title !== undefined) dbJob.title = job.title;
    if (job.company !== undefined) dbJob.company = job.company;
    if (job.companySlug !== undefined) dbJob.company_slug = job.companySlug;
    if (job.logo !== undefined) dbJob.logo = job.logo;
    if (job.location !== undefined) dbJob.location = job.location;
    if (job.province !== undefined) dbJob.province = job.province;
    if (job.city !== undefined) dbJob.city = job.city;
    if (job.type !== undefined) dbJob.type = job.type;
    if (job.category !== undefined) dbJob.category = job.category;
    if (job.categoryColor !== undefined) dbJob.category_color = job.categoryColor;
    if (job.education !== undefined) dbJob.education = job.education;
    if (job.experience !== undefined) dbJob.experience = job.experience;
    if (job.description !== undefined) dbJob.description = job.description;
    if (job.qualifications !== undefined) dbJob.qualifications = job.qualifications;
    if (job.benefits !== undefined) dbJob.benefits = job.benefits;
    if (job.howToApply !== undefined) dbJob.how_to_apply = job.howToApply;
    if (job.aboutCompany !== undefined) dbJob.about_company = job.aboutCompany;
    if (job.tags !== undefined) dbJob.tags = job.tags;
    if (job.majors !== undefined) dbJob.majors = job.majors;
    if (job.salaryRange !== undefined) dbJob.salary_range = job.salaryRange;
    if (job.dueDate !== undefined) dbJob.due_date = job.dueDate;
    if (job.pdfEmbedUrl !== undefined) dbJob.pdf_embed_url = job.pdfEmbedUrl;
    if (job.videoEmbedUrl !== undefined) dbJob.video_embed_url = job.videoEmbedUrl;
    if (job.is_active !== undefined) dbJob.is_active = job.is_active;
    if (job.slug !== undefined) dbJob.slug = job.slug;
    
    console.log('📤 Updating job:', dbJob);
    
    const { data, error } = await supabase
      .from('jobs')
      .update(dbJob)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Update job error:', error);
      throw error;
    }
    
    console.log('✅ Job updated:', data);
    return data as Job;
  },

  // Delete job
  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Toggle active status
  toggleActive: async (id: number, isActive: boolean): Promise<Job> => {
    const { data, error } = await supabase
      .from('jobs')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Job;
  },
};

// ============================================
// ADMIN COMPANIES SERVICE
// ============================================
export const adminCompaniesService = {
  getAll: async (): Promise<CompanyProfile[]> => {
    // Use a single query with aggregation to count jobs per company
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        jobs:jobs(count)
      `)
      .order('name', { ascending: true });
    
    if (error) throw error;

    // Transform the data to include jobsAvailable
    const companiesWithCount = (data || []).map((company: any) => {
      const jobsAvailable = company.jobs?.[0]?.count || 0;
      const { jobs, ...companyData } = company;
      return { ...companyData, jobsAvailable };
    });
    
    return companiesWithCount as CompanyProfile[];
  },

  create: async (company: Omit<CompanyProfile, 'id' | 'jobsAvailable'>): Promise<CompanyProfile> => {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single();
    
    if (error) throw error;
    return { ...data, jobsAvailable: 0 } as CompanyProfile;
  },

  update: async (id: number, company: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    // Only send fields that can be updated in the database
    const updateData: any = {};
    
    if (company.name !== undefined) updateData.name = company.name;
    if (company.slug !== undefined) updateData.slug = company.slug;
    if (company.logo !== undefined) updateData.logo = company.logo;
    if (company.description !== undefined) updateData.description = company.description;
    if (company.type !== undefined) updateData.type = company.type;
    if (company.website !== undefined) updateData.website = company.website;
    
    console.log('Updating company ID:', id, 'with data:', updateData);
    
    const { data, error } = await supabase
      .from('companies')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Update error:', error);
      throw error;
    }
    
    if (!data) {
      throw new Error('No data returned from update');
    }
    
    return data as CompanyProfile;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// ============================================
// ADMIN BLOG SERVICE
// ============================================

// Helper function to map database fields to frontend interface
const mapDbToFrontend = (dbPost: any): BlogPost => ({
  id: dbPost.id,
  title: dbPost.title,
  category: dbPost.category,
  description: dbPost.description,
  content: dbPost.content,
  image: dbPost.image,
  posted: dbPost.posted_date,
});

export const adminBlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) {
      console.error('Get all blog posts error:', error);
      throw error;
    }
    
    return (data || []).map(mapDbToFrontend);
  },

  create: async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    // Create object matching actual database column names
    const dbPost: any = {
      title: post.title,
      slug: generateSlug(post.title) + '-' + Date.now(), // Add timestamp to ensure uniqueness
      category: post.category,
      posted_date: new Date().toISOString().split('T')[0],
      is_published: true
    };
    
    // Add optional fields if they have values
    if (post.content) dbPost.content = post.content;
    if (post.description) dbPost.description = post.description;
    if (post.image) dbPost.image = post.image;
    
    console.log('📤 Sending blog post data:', dbPost);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([dbPost])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Create blog post error:', error);
      throw error;
    }
    
    console.log('✅ Blog post created:', data);
    
    return mapDbToFrontend(data);
  },

  update: async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
    // Only send fields that match actual database column names
    const dbPost: any = {};
    if (post.title) dbPost.title = post.title;
    if (post.category) dbPost.category = post.category;
    if (post.content !== undefined) dbPost.content = post.content;
    if (post.image) dbPost.image = post.image;
    if (post.description !== undefined) dbPost.description = post.description;
    if (post.posted) dbPost.posted_date = post.posted;
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(dbPost)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Update blog post error:', error);
      throw error;
    }
    
    return mapDbToFrontend(data);
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// ============================================
// ADMIN EVENTS SERVICE
// ============================================
export const adminEventsService = {
  getAll: async (): Promise<RecruitmentEvent[]> => {
    const { data, error } = await supabase
      .from('recruitment_events')
      .select('*')
      .order('event_date', { ascending: false });
    
    if (error) throw error;
    return data as RecruitmentEvent[];
  },

  create: async (event: Omit<RecruitmentEvent, 'id'>): Promise<RecruitmentEvent> => {
    const { data, error } = await supabase
      .from('recruitment_events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return data as RecruitmentEvent;
  },

  update: async (id: number, event: Partial<RecruitmentEvent>): Promise<RecruitmentEvent> => {
    const { data, error } = await supabase
      .from('recruitment_events')
      .update(event)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as RecruitmentEvent;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('recruitment_events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// ============================================
// ADMIN MISI SERVICE
// ============================================
export const adminMisiService = {
  getAll: async (): Promise<MisiCuanOffer[]> => {
    const { data, error } = await supabase
      .from('misi_cuan_offers')
      .select('*')
      .order('expiry_date', { ascending: false });
    
    if (error) throw error;
    return data as MisiCuanOffer[];
  },

  create: async (misi: Omit<MisiCuanOffer, 'id'>): Promise<MisiCuanOffer> => {
    const { data, error } = await supabase
      .from('misi_cuan_offers')
      .insert([misi])
      .select()
      .single();
    
    if (error) throw error;
    return data as MisiCuanOffer;
  },

  update: async (id: number, misi: Partial<MisiCuanOffer>): Promise<MisiCuanOffer> => {
    const { data, error } = await supabase
      .from('misi_cuan_offers')
      .update(misi)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as MisiCuanOffer;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('misi_cuan_offers')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Get submissions
  getSubmissions: async (): Promise<MisiSubmission[]> => {
    const { data, error } = await supabase
      .from('misi_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data as MisiSubmission[];
  },

  // Update submission status
  updateSubmissionStatus: async (
    id: number, 
    status: 'Pending' | 'Approved' | 'Rejected',
    adminNotes?: string
  ): Promise<MisiSubmission> => {
    const { data, error } = await supabase
      .from('misi_submissions')
      .update({
        status,
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as MisiSubmission;
  },
};

// ============================================
// ADMIN PELATIHAN SERVICE
// ============================================
export const adminPelatihanService = {
  getAll: async (): Promise<PelatihanInfo[]> => {
    const { data, error } = await supabase
      .from('pelatihan')
      .select('*')
      .order('event_date', { ascending: false });
    
    if (error) throw error;
    return data as PelatihanInfo[];
  },

  create: async (pelatihan: Omit<PelatihanInfo, 'id'>): Promise<PelatihanInfo> => {
    const { data, error } = await supabase
      .from('pelatihan')
      .insert([pelatihan])
      .select()
      .single();
    
    if (error) throw error;
    return data as PelatihanInfo;
  },

  update: async (id: number, pelatihan: Partial<PelatihanInfo>): Promise<PelatihanInfo> => {
    const { data, error } = await supabase
      .from('pelatihan')
      .update(pelatihan)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as PelatihanInfo;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('pelatihan')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// ============================================
// ADMIN MAJORS & TAGS SERVICE
// ============================================
export const adminMajorsService = {
  getAll: async (): Promise<Major[]> => {
    const { data, error } = await supabase
      .from('majors')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Major[];
  },

  create: async (major: Omit<Major, 'id'>): Promise<Major> => {
    const { data, error } = await supabase
      .from('majors')
      .insert([major])
      .select()
      .single();
    
    if (error) throw error;
    return data as Major;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('majors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

export const adminTagsService = {
  getAll: async (): Promise<Tag[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Tag[];
  },

  create: async (tag: Omit<Tag, 'id'>): Promise<Tag> => {
    const { data, error } = await supabase
      .from('tags')
      .insert([tag])
      .select()
      .single();
    
    if (error) throw error;
    return data as Tag;
  },

  delete: async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// ============================================
// ACTIVITY LOGS
// ============================================
export const activityLogsService = {
  create: async (activity: {
    type: 'CREATE' | 'UPDATE' | 'DELETE';
    category: string;
    text: string;
    metadata?: any;
  }) => {
    const { data, error } = await supabase
      .from('activity_logs')
      .insert([activity])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  getRecent: async (limit: number = 10, offset: number = 0) => {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  },

  getCount: async () => {
    const { count, error } = await supabase
      .from('activity_logs')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return count || 0;
  },
};

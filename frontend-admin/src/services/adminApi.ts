import { supabase } from '../lib/supabase';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, Tag, MisiSubmission } from '../types';

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
    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        ...job,
        posted_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Job;
  },

  // Update job
  update: async (id: number, job: Partial<Job>): Promise<Job> => {
    const { data, error } = await supabase
      .from('jobs')
      .update(job)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
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
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;

    // Add jobs count
    const companiesWithCount = await Promise.all(
      (data || []).map(async (company) => {
        const { count } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('company_slug', company.slug);
        
        return { ...company, jobsAvailable: count || 0 };
      })
    );
    
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
export const adminBlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
    return data as BlogPost[];
  },

  create: async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        ...post,
        posted_date: new Date().toISOString().split('T')[0],
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  },

  update: async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as BlogPost;
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

  getRecent: async (limit: number = 10) => {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },
};

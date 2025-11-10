import { supabase } from '../lib/supabase';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, Tag } from '../types';

// ============================================
// JOBS
// ============================================
export const jobsService = {
  // Get all active jobs
  getAll: async (): Promise<Job[]> => {
    console.log('🔍 Fetching jobs from Supabase...');
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching jobs:', error);
      throw error;
    }
    
    console.log('✅ Jobs fetched:', data?.length || 0, 'items');
    if (data && data.length > 0) {
      console.log('   First job:', data[0]);
    }
    
    return data as Job[];
  },

  // Get job by ID
  getById: async (id: number): Promise<Job | null> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data as Job;
  },

  // Search jobs
  search: async (filters: {
    query?: string;
    category?: string;
    province?: string;
    city?: string;
  }): Promise<Job[]> => {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true);

    if (filters.query) {
      query = query.or(`title.ilike.%${filters.query}%,company.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
    }
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.province) {
      query = query.eq('province', filters.province);
    }
    if (filters.city) {
      query = query.eq('city', filters.city);
    }

    const { data, error } = await query.order('posted_date', { ascending: false });
    
    if (error) throw error;
    return data as Job[];
  },
};

// ============================================
// COMPANIES
// ============================================
export const companiesService = {
  // Get all companies with optional pagination and filtering
  getAll: async (options?: {
    type?: 'BUMN' | 'SWASTA' | 'INSTANSI';
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: CompanyProfile[]; total: number }> => {
    // ✅ Simplified query without JOIN for faster loading
    // ✅ SELECT only essential fields
    let query = supabase
      .from('companies')
      .select('id, name, slug, logo, type, description, website', { count: 'exact' });

    // Filter by type if specified
    if (options?.type) {
      query = query.eq('type', options.type);
    }

    // Search by name if specified
    if (options?.search) {
      query = query.ilike('name', `%${options.search}%`);
    }

    // Apply pagination if specified
    if (options?.limit !== undefined && options?.offset !== undefined) {
      query = query.range(options.offset, options.offset + options.limit - 1);
    }

    query = query.order('name', { ascending: true });
    
    const { data, error, count } = await query;
    
    if (error) throw error;

    // Add jobsAvailable as 0 (will be loaded separately if needed)
    const companiesWithCount = (data || []).map((company: any) => ({
      ...company,
      jobsAvailable: 0
    }));
    
    return {
      data: companiesWithCount as CompanyProfile[],
      total: count || 0,
    };
  },

  // Backward compatibility: Get all without pagination
  getAllSimple: async (): Promise<CompanyProfile[]> => {
    const result = await companiesService.getAll();
    return result.data;
  },

  // Get company by slug
  getBySlug: async (slug: string): Promise<CompanyProfile | null> => {
    // ✅ Use single query with JOIN instead of 2 separate queries
    // ✅ SELECT only needed fields to reduce data transfer
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        jobs:jobs(count)
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;

    // Transform data
    const jobsAvailable = data.jobs?.[0]?.count || 0;
    const { jobs, ...companyData } = data;

    return {
      ...companyData,
      jobsAvailable,
    } as CompanyProfile;
  },
};

// ============================================
// BLOG POSTS
// ============================================
export const blogService = {
  // Get all published posts
  getAll: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
    return data as BlogPost[];
  },

  // Get post by slug
  getBySlug: async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  },
};

// ============================================
// RECRUITMENT EVENTS
// ============================================
export const eventsService = {
  // Get all active events
  getAll: async (): Promise<RecruitmentEvent[]> => {
    const { data, error } = await supabase
      .from('recruitment_events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: false });
    
    if (error) throw error;
    return data as RecruitmentEvent[];
  },

  // Get event by ID
  getById: async (id: number): Promise<RecruitmentEvent | null> => {
    const { data, error } = await supabase
      .from('recruitment_events')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data as RecruitmentEvent;
  },
};

// ============================================
// MISI CUAN
// ============================================
export const misiService = {
  // Get all active misi
  getAll: async (): Promise<MisiCuanOffer[]> => {
    const { data, error } = await supabase
      .from('misi_cuan_offers')
      .select('*')
      .eq('is_active', true)
      .order('expiry_date', { ascending: false });
    
    if (error) throw error;
    return data as MisiCuanOffer[];
  },

  // Get misi by ID
  getById: async (id: number): Promise<MisiCuanOffer | null> => {
    const { data, error } = await supabase
      .from('misi_cuan_offers')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data as MisiCuanOffer;
  },

  // Submit misi
  submitMisi: async (submission: {
    misi_id: number;
    misi_title: string;
    user_name: string;
    user_email?: string;
    user_phone?: string;
    submission_data: any[];
  }) => {
    const { data, error } = await supabase
      .from('misi_submissions')
      .insert([submission])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// ============================================
// PELATIHAN
// ============================================
export const pelatihanService = {
  // Get all active pelatihan
  getAll: async (): Promise<PelatihanInfo[]> => {
    const { data, error } = await supabase
      .from('pelatihan')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: false });
    
    if (error) throw error;
    return data as PelatihanInfo[];
  },

  // Get pelatihan by ID
  getById: async (id: number): Promise<PelatihanInfo | null> => {
    const { data, error } = await supabase
      .from('pelatihan')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data as PelatihanInfo;
  },
};

// ============================================
// MAJORS & TAGS
// ============================================
export const majorsService = {
  getAll: async (): Promise<Major[]> => {
    const { data, error } = await supabase
      .from('majors')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Major[];
  },
};

export const tagsService = {
  getAll: async (): Promise<Tag[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Tag[];
  },
};

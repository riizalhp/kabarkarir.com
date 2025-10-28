import { supabase } from '../lib/supabase';
import { Job, CompanyProfile, BlogPost, RecruitmentEvent, MisiCuanOffer, PelatihanInfo, Major, Tag } from '../types';

// ============================================
// JOBS
// ============================================
export const jobsService = {
  // Get all active jobs
  getAll: async (): Promise<Job[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
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
  // Get all companies
  getAll: async (): Promise<CompanyProfile[]> => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;

    // Add jobs count for each company
    const companiesWithCount = await Promise.all(
      (data || []).map(async (company) => {
        const { count } = await supabase
          .from('jobs')
          .select('*', { count: 'exact', head: true })
          .eq('company_slug', company.slug)
          .eq('is_active', true);
        
        return {
          ...company,
          jobsAvailable: count || 0,
        };
      })
    );
    
    return companiesWithCount as CompanyProfile[];
  },

  // Get company by slug
  getBySlug: async (slug: string): Promise<CompanyProfile | null> => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;

    // Get jobs count
    const { count } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('company_slug', slug)
      .eq('is_active', true);

    return {
      ...data,
      jobsAvailable: count || 0,
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

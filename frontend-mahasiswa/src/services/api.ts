import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';
import type {
  Internship,
  Scholarship,
  Competition,
  Webinar,
  CampusEvent,
  FreelanceJob,
  BlogPost
} from '../types';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Internships Service
export const internshipsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; location?: string } = {}) {
    const { limit = 12, offset = 0, search, location } = options;
    
    let query = supabase
      .from('internships')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (location) {
      query = query.or(`location.ilike.%${location}%,province.ilike.%${location}%,city.ilike.%${location}%`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as Internship[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('internships')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as Internship;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_internship_views', { internship_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Scholarships Service
export const scholarshipsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; level?: string } = {}) {
    const { limit = 12, offset = 0, search, level } = options;
    
    let query = supabase
      .from('scholarships')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,provider_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (level) {
      query = query.eq('education_level', level);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as Scholarship[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('scholarships')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as Scholarship;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_scholarship_views', { scholarship_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Competitions Service
export const competitionsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; category?: string } = {}) {
    const { limit = 12, offset = 0, search, category } = options;
    
    let query = supabase
      .from('competitions')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,organizer_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as Competition[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as Competition;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_competition_views', { competition_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Webinars Service
export const webinarsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; isFree?: boolean } = {}) {
    const { limit = 12, offset = 0, search, isFree } = options;
    
    let query = supabase
      .from('webinars')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('date', { ascending: true });

    if (search) {
      query = query.or(`title.ilike.%${search}%,host_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (isFree !== undefined) {
      query = query.eq('is_free', isFree);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as Webinar[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('webinars')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as Webinar;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_webinar_views', { webinar_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Campus Events Service
export const campusEventsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; eventType?: string } = {}) {
    const { limit = 12, offset = 0, search, eventType } = options;
    
    let query = supabase
      .from('campus_events')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('date', { ascending: true });

    if (search) {
      query = query.or(`title.ilike.%${search}%,university_name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (eventType) {
      query = query.eq('event_type', eventType);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as CampusEvent[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('campus_events')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as CampusEvent;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_campus_event_views', { event_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Freelance Jobs Service
export const freelanceJobsService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; category?: string } = {}) {
    const { limit = 12, offset = 0, search, category } = options;
    
    let query = supabase
      .from('freelance_jobs')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as FreelanceJob[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('freelance_jobs')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data as FreelanceJob;
  },

  async incrementViews(id: number) {
    const { error } = await supabase.rpc('increment_freelance_job_views', { job_id: id });
    if (error) console.error('Error incrementing views:', error);
  }
};

// Blog Service
export const blogService = {
  async getAll(options: { limit?: number; offset?: number; search?: string; category?: string } = {}) {
    const { limit = 12, offset = 0, search, category } = options;
    
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('posted_date', { ascending: false });

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as BlogPost[], total: count || 0 };
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data as BlogPost;
  }
};

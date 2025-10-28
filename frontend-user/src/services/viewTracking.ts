import { supabase } from '../lib/supabase';

export const viewTrackingService = {
  // Track company view
  trackCompanyView: async (companyId: number) => {
    try {
      const { error } = await supabase.rpc('increment_company_views', {
        company_id: companyId
      });
      
      if (error) {
        console.error('Error tracking company view:', error);
      }
    } catch (error) {
      console.error('Error tracking company view:', error);
    }
  },

  // Track event view
  trackEventView: async (eventId: number) => {
    try {
      const { error } = await supabase.rpc('increment_event_views', {
        event_id: eventId
      });
      
      if (error) {
        console.error('Error tracking event view:', error);
      }
    } catch (error) {
      console.error('Error tracking event view:', error);
    }
  },

  // Track blog post view
  trackBlogPostView: async (postId: number) => {
    try {
      const { error } = await supabase.rpc('increment_blog_views', {
        post_id: postId
      });
      
      if (error) {
        console.error('Error tracking blog post view:', error);
      }
    } catch (error) {
      console.error('Error tracking blog post view:', error);
    }
  },

  // Get trending companies based on views
  getTrendingCompanies: async (limit: number = 4) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting trending companies:', error);
      return [];
    }
  },

  // Get trending events based on views
  getTrendingEvents: async (limit: number = 5) => {
    try {
      const { data, error } = await supabase
        .from('recruitment_events')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting trending events:', error);
      return [];
    }
  },

  // Get trending blog posts based on views
  getTrendingBlogPosts: async (limit: number = 5) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting trending blog posts:', error);
      return [];
    }
  },
};

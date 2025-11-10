import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

/**
 * Blog Service - Clean implementation with field mapping
 * Maps database fields to frontend interface
 */

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Replace multiple hyphens with single
    .trim()
    .substring(0, 100);            // Limit length
};

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

export const blogService = {
  /**
   * Get all blog posts
   */
  getAll: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) {
      console.error('❌ Get all blog posts error:', error);
      throw error;
    }
    
    console.log('✅ Fetched blog posts:', data?.length || 0);
    return (data || []).map(mapDbToFrontend);
  },

  /**
   * Create new blog post
   */
  create: async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const title = String(post.title || '');
    
    // Create object matching database column names
    const cleanPost: any = {
      title: title,
      slug: generateSlug(title) + '-' + Date.now(), // Add timestamp to ensure uniqueness
      category: String(post.category || 'Tips Karir'),
      posted_date: new Date().toISOString().split('T')[0],
      is_published: true
    };
    
    // Add optional fields if they have values
    if (post.content) cleanPost.content = String(post.content);
    if (post.description) cleanPost.description = String(post.description);
    if (post.image) cleanPost.image = String(post.image);
    
    console.log('📤 Creating blog post with data:', cleanPost);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([cleanPost])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Create blog post error:', error);
      throw error;
    }
    
    console.log('✅ Blog post created successfully:', data);
    return mapDbToFrontend(data);
  },

  /**
   * Update existing blog post
   */
  update: async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
    // Create clean object with ONLY allowed fields (match database column names)
    const cleanPost: Record<string, any> = {};
    
    if (post.title !== undefined) cleanPost.title = String(post.title);
    if (post.category !== undefined) cleanPost.category = String(post.category);
    if (post.content !== undefined) cleanPost.content = String(post.content);
    if (post.description !== undefined) cleanPost.description = String(post.description);
    if (post.image !== undefined) cleanPost.image = String(post.image);
    if (post.posted !== undefined) cleanPost.posted_date = String(post.posted);
    
    console.log('📤 Updating blog post', id, 'with data:', cleanPost);
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(cleanPost)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Update blog post error:', error);
      throw error;
    }
    
    console.log('✅ Blog post updated successfully:', data);
    return mapDbToFrontend(data);
  },

  /**
   * Delete blog post
   */
  delete: async (id: number): Promise<void> => {
    console.log('🗑️ Deleting blog post:', id);
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('❌ Delete blog post error:', error);
      throw error;
    }
    
    console.log('✅ Blog post deleted successfully');
  },
};

export default blogService;

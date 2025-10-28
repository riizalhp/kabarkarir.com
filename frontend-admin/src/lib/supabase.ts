import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'kabarkarir-admin-auth',
  },
});

// Admin authentication helpers
export const adminAuth = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Verify user has admin role in user_metadata
    const adminRole = data.user?.user_metadata?.role;
    if (adminRole !== 'admin') {
      await supabase.auth.signOut();
      throw new Error('Unauthorized: Admin access required');
    }

    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },

  // Check if user is admin
  isAdmin: async () => {
    const user = await adminAuth.getUser();
    return user?.user_metadata?.role === 'admin';
  },

  // Get admin role (Super Admin or Content Manager)
  getAdminRole: async () => {
    const user = await adminAuth.getUser();
    return user?.user_metadata?.admin_role || 'Content Manager';
  },
};

export default supabase;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import AppRoutes from './AppRoutes';
import { adminAuth, supabase } from './lib/supabase';

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate('/login');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session && session.user) {
          const userRole = session.user.user_metadata?.role;
          if (userRole === 'admin') {
            setIsLoggedIn(true);
            const adminRole = session.user.user_metadata?.admin_role || 'Content Manager';
            setCurrentUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
              role: adminRole,
            });
          }
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const session = await adminAuth.getSession();
      if (session && session.user) {
        // Verify admin role
        const userRole = session.user.user_metadata?.role;
        if (userRole === 'admin') {
          setIsLoggedIn(true);
          const adminRole = session.user.user_metadata?.admin_role || 'Content Manager';
          setCurrentUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
            role: adminRole,
          });
        } else {
          // Not admin, sign out
          await adminAuth.signOut();
          setIsLoggedIn(false);
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } else {
        setIsLoggedIn(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear potentially corrupted session
      await adminAuth.signOut().catch(() => {});
      setIsLoggedIn(false);
      setCurrentUser(null);
      if (location.pathname !== '/login') {
        navigate('/login');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuth.signOut();
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-poppins min-h-screen">
      <AppRoutes 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={(loggedIn: boolean, user?: any) => {
          setIsLoggedIn(loggedIn);
          if (user) setCurrentUser(user);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <ToastContainer />
    </div>
  );
};

export default App;

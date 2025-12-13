import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../resources/config/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      let authTimeout: ReturnType<typeof setTimeout> | null = null;
      try {
        if (!config.supabaseClient) {
          console.error("Supabase client is not initialized");
          navigate("/login");
          return;
        }

        const supabase = config.supabaseClient;
        const waitForAuthRestore = () =>
          new Promise<null>((resolve) => {
            const {
              data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
              if (session?.user) {
                subscription?.unsubscribe();
                resolve(null);
              }
            });
            authTimeout = setTimeout(() => {
              subscription?.unsubscribe();
              resolve(null);
            }, 1200);
          });

        // Check if user is authenticated (give Safari/iOS a brief window to restore session)
        let { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          await waitForAuthRestore();
          ({ data: { session } } = await supabase.auth.getSession());
        }

        const user = session?.user;
        if (!user || !user.email) {
          navigate("/login");
          return;
        }

        // Check if user has completed onboarding
        const { data: onboardingData } = await supabase
          .from('onboarding_data')
          .select('is_completed, current_step')
          .eq('user_id', user.id)
          .maybeSingle();

        // If user hasn't completed onboarding and is NOT on an onboarding page, redirect to onboarding
        const isOnOnboardingPage = location.pathname.startsWith('/onboarding/');
        
        if (!onboardingData || !onboardingData.is_completed) {
          // User must complete onboarding first
          if (!isOnOnboardingPage) {
            console.log('Redirecting to onboarding - not completed yet');
            navigate('/onboarding/step-1');
            return;
          }
        }

        // User is authenticated and has completed onboarding (or is on onboarding page)
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error checking auth and onboarding:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
        if (authTimeout) {
          clearTimeout(authTimeout);
        }
      }
    };

    checkAuthAndOnboarding();
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect, so return nothing
  }

  return <>{children}</>;
};

export default ProtectedRoute;

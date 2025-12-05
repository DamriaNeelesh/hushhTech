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
      try {
        if (!config.supabaseClient) {
          console.error("Supabase client is not initialized");
          navigate("/login");
          return;
        }

        // Check if user is authenticated
        const { data: { user } } = await config.supabaseClient.auth.getUser();
        
        if (!user || !user.email) {
          // User is not authenticated, redirect to login
          navigate("/login");
          return;
        }

        // Check if user has completed onboarding
        const { data: onboardingData } = await config.supabaseClient
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

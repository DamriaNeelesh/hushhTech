import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../resources/config/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthAndRegistration = async () => {
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

        // User is authenticated and (if required) has completed registration
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error checking auth and registration:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndRegistration();
  }, [navigate]);

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

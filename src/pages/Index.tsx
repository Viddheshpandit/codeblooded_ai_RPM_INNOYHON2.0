
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, isLoading } = useAuth();

  // This component just redirects to the dashboard if logged in, or login page if not
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-health-primary border-r-health-primary border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect based on authentication state
  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default Index;

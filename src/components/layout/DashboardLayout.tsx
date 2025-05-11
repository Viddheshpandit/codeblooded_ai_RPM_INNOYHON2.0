
import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

const DashboardLayout = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-health-primary border-r-health-primary border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-health-primary">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

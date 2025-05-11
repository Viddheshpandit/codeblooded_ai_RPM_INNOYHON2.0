
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, BarChart3, Calendar, FileText, Home, Users, Shield, Settings, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  const { user } = useAuth();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  
  useEffect(() => {
    // Define navigation items based on user role
    const allNavItems: NavItem[] = [
      { 
        title: 'Dashboard', 
        href: '/dashboard', 
        icon: Home,
        roles: ['admin', 'doctor', 'patient']
      },
      {
        title: 'Patients',
        href: '/patients',
        icon: Users,
        roles: ['admin', 'doctor']
      },
      {
        title: 'Health Monitoring',
        href: '/health-monitoring',
        icon: Activity,
        roles: ['admin', 'doctor', 'patient']
      },
      {
        title: 'AI Predictions',
        href: '/predictions',
        icon: BarChart3,
        roles: ['admin', 'doctor', 'patient']
      },
      {
        title: 'Appointments',
        href: '/appointments',
        icon: Calendar,
        roles: ['doctor', 'patient']
      },
      {
        title: 'Medical Records',
        href: '/records',
        icon: FileText,
        roles: ['admin', 'doctor', 'patient']
      },
      {
        title: 'User Management',
        href: '/users',
        icon: Shield,
        roles: ['admin']
      },
      {
        title: 'Alert System',
        href: '/alerts',
        icon: AlertTriangle,
        roles: ['admin', 'doctor']
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        roles: ['admin', 'doctor', 'patient']
      }
    ];

    // Filter items based on user role
    if (user?.role) {
      setNavItems(allNavItems.filter(item => !item.roles || item.roles.includes(user.role)));
    }
  }, [user]);

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 lg:w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-center h-16 border-b border-gray-200">
          {isOpen ? (
            <h2 className="font-bold text-lg text-health-primary whitespace-nowrap">Health Compass</h2>
          ) : (
            <span className="text-health-primary font-bold text-lg lg:block hidden">HC</span>
          )}
        </div>
        
        <div className="flex-grow overflow-y-auto pt-5">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center px-2 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-health-light text-health-primary" 
                    : "text-gray-600 hover:bg-gray-100",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon className={cn("h-5 w-5", !isOpen ? "mx-auto" : "mr-3")} />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className={cn(
            "rounded-lg bg-health-light p-3",
            !isOpen && "lg:flex lg:items-center lg:justify-center"
          )}>
            {isOpen ? (
              <div className="text-xs text-gray-600">
                <p className="font-medium text-health-primary">Health Compass AI</p>
                <p className="mt-1">Version 1.0.0</p>
              </div>
            ) : (
              <span className="text-health-primary text-xs font-bold hidden lg:block">HC</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

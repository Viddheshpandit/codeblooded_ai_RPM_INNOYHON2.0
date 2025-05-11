
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import PatientDashboard from '@/components/dashboard/PatientDashboard';

// Mock data for AI alerts
const mockAlerts = [
  {
    id: '1',
    title: 'Abnormal Heart Rate Pattern',
    description: 'AI detected an irregular heart rate pattern that may indicate potential arrhythmia. Recommended action: Schedule a follow-up appointment.',
    severity: 'high',
    time: '10 minutes ago',
    riskScore: 75,
    patientId: 'p001',
    patientName: 'Jane Smith'
  },
  {
    id: '2',
    title: 'Blood Pressure Fluctuation',
    description: 'Unusual blood pressure fluctuations observed over the past 24 hours. May require medication adjustment.',
    severity: 'medium',
    time: '3 hours ago',
    riskScore: 45,
    patientId: 'p002',
    patientName: 'John Williams'
  },
  {
    id: '3',
    title: 'Sleep Pattern Analysis',
    description: 'AI analysis indicates disrupted sleep patterns which may be affecting recovery rate. Consider sleep hygiene recommendations.',
    severity: 'low',
    time: '2 days ago',
    riskScore: 25,
    patientId: 'p001',
    patientName: 'Jane Smith'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<typeof mockAlerts>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard isLoading={isLoading} alerts={alerts} />;
      case 'doctor':
        return <DoctorDashboard isLoading={isLoading} alerts={alerts} />;
      case 'patient':
        return <PatientDashboard userId={user?.id} userName={user?.name} isLoading={isLoading} />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {renderDashboardByRole()}
    </div>
  );
};

export default Dashboard;

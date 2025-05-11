
import React from 'react';
import { Activity, Calendar, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from '@/components/dashboard/StatCard';
import VitalSigns from '@/components/charts/VitalSigns';
import HealthScoreBox from '@/components/dashboard/HealthScoreBox';
import WaterNotification from '@/components/dashboard/WaterNotification';
import HealthInsights from '@/components/dashboard/HealthInsights';
import AIHealthPrediction from '@/components/dashboard/AIHealthPrediction';

interface PatientDashboardProps {
  userId?: string;
  userName?: string;
  isLoading: boolean;
}

const PatientDashboard = ({ userId, userName, isLoading }: PatientDashboardProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Heart Rate"
          value="72 bpm"
          icon={<Activity className="h-5 w-5 text-health-primary" />}
          description="Average today"
          isLoading={isLoading}
        />
        <StatCard
          title="Blood Pressure"
          value="120/80"
          icon={<Activity className="h-5 w-5 text-health-info" />}
          description="Last reading"
          isLoading={isLoading}
        />
        <StatCard
          title="Next Appointment"
          value="May 10"
          icon={<Calendar className="h-5 w-5 text-health-secondary" />}
          description="With Dr. Smith"
          isLoading={isLoading}
        />
        <StatCard
          title="Health Score"
          value="86/100"
          icon={<Brain className="h-5 w-5 text-health-secondary" />}
          trend={{ value: 4, isPositive: true }}
          description="AI Generated"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <VitalSigns />
        <HealthScoreBox userId={userId} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <HealthInsights />
        <WaterNotification userName={userName || 'Patient'} />
      </div>

      <div className="mb-6">
        <AIHealthPrediction />
      </div>
    </>
  );
};

export default PatientDashboard;

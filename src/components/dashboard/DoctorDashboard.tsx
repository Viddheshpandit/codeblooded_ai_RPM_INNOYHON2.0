
import React from 'react';
import { Users, AlertTriangle, Calendar, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from '@/components/dashboard/StatCard';
import VitalSigns from '@/components/charts/VitalSigns';
import PatientList from '@/components/dashboard/PatientList';
import AlertList from '@/components/dashboard/AlertList';

interface DoctorDashboardProps {
  isLoading: boolean;
  alerts: any[];
}

const DoctorDashboard = ({ isLoading, alerts }: DoctorDashboardProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Assigned Patients"
          value="32"
          icon={<Users className="h-5 w-5 text-health-primary" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Pending Reviews"
          value="8"
          icon={<AlertTriangle className="h-5 w-5 text-health-warning" />}
          trend={{ value: 2, isPositive: false }}
          isLoading={isLoading}
        />
        <StatCard
          title="Upcoming Appointments"
          value="5"
          icon={<Calendar className="h-5 w-5 text-health-secondary" />}
          description="Today"
          isLoading={isLoading}
        />
        <StatCard
          title="AI Insights"
          value="17"
          icon={<Brain className="h-5 w-5 text-health-info" />}
          trend={{ value: 9, isPositive: true }}
          description="New predictions"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <VitalSigns />
        <Card>
          <CardHeader>
            <CardTitle>Patient Status Overview</CardTitle>
            <CardDescription>Current status of your assigned patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stable</span>
                <span className="text-sm font-bold text-green-500">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Needs Attention</span>
                <span className="text-sm font-bold text-amber-500">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Critical</span>
                <span className="text-sm font-bold text-red-500">2</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">View All Patients</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">My Patients</h2>
        <PatientList />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Patient Alerts</h2>
        <AlertList isLoading={isLoading} alerts={alerts} />
      </div>
    </>
  );
};

export default DoctorDashboard;

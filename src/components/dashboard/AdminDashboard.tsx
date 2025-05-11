
import React, { useState, useEffect } from 'react';
import { Users, Activity, Brain, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from '@/components/dashboard/StatCard';
import VitalSigns from '@/components/charts/VitalSigns';
import AIAlertCard from '@/components/dashboard/AIAlertCard';
import PatientList from '@/components/dashboard/PatientList';

interface AdminDashboardProps {
  isLoading: boolean;
  alerts: any[];
}

const AdminDashboard = ({ isLoading, alerts }: AdminDashboardProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Patients"
          value="245"
          icon={<Users className="h-5 w-5 text-health-primary" />}
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Active Monitors"
          value="178"
          icon={<Activity className="h-5 w-5 text-health-secondary" />}
          description="Connected IoT devices"
          isLoading={isLoading}
        />
        <StatCard
          title="AI Predictions"
          value="1,420"
          icon={<Brain className="h-5 w-5 text-health-info" />}
          trend={{ value: 8, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Active Alerts"
          value="7"
          icon={<AlertTriangle className="h-5 w-5 text-health-warning" />}
          trend={{ value: 3, isPositive: false }}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <VitalSigns />
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
            <CardDescription>Overall system performance and usage metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ML Model Accuracy</span>
                <span className="text-sm font-bold">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">API Response Time</span>
                <span className="text-sm font-bold">187ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Utilization</span>
                <span className="text-sm font-bold">42%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active IoT Connections</span>
                <span className="text-sm font-bold">178/200</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Patient Management</h2>
        <PatientList />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Latest AI Alerts</h2>
        <AlertList isLoading={isLoading} alerts={alerts} />
      </div>
    </>
  );
};

export default AdminDashboard;

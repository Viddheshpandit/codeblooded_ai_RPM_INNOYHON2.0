
import React from 'react';
import { Card } from "@/components/ui/card";
import AIAlertCard from '@/components/dashboard/AIAlertCard';

interface AlertListProps {
  isLoading: boolean;
  alerts: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    time: string;
    riskScore: number;
    patientId?: string;
    patientName?: string;
  }>;
}

const AlertList = ({ isLoading, alerts }: AlertListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="p-6 pb-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </div>
            <div className="p-6 pt-0">
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {alerts.map(alert => (
        <AIAlertCard
          key={alert.id}
          title={alert.title}
          description={alert.description}
          severity={alert.severity}
          time={alert.time}
          riskScore={alert.riskScore}
          patientId={alert.patientId}
          patientName={alert.patientName}
        />
      ))}
    </div>
  );
};

export default AlertList;

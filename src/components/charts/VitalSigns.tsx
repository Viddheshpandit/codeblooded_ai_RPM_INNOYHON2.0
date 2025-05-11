
import { TooltipProps } from 'recharts';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";


// Mock data for vital signs
const generateMockData = (baseValue: number, variance: number, length: number) => {
  return Array.from({ length }).map((_, i) => {
    const hour = i % 24;
    const time = `${hour}:00`;
    const random = Math.random() * variance * 2 - variance;
    return {
      time,
      value: baseValue + random
    };
  });
};

const heartRateData = generateMockData(72, 10, 24);
const bloodPressureSystolic = generateMockData(120, 15, 24);
const bloodPressureDiastolic = generateMockData(80, 10, 24);
const oxygenSaturation = generateMockData(98, 2, 24);
const glucoseLevel = generateMockData(100, 20, 24);

interface VitalSignsProps {
  patientId?: string;
}

const VitalSigns = ({ patientId }: VitalSignsProps) => {
  const [selectedVital, setSelectedVital] = useState<{
    name: string;
    data: { time: string; value: number }[];
    color: string;
    unit: string;
    normalRange: string;
  }>({
    name: 'Heart Rate',
    data: heartRateData,
    color: '#F44336',
    unit: 'bpm',
    normalRange: '60-100 bpm'
  });

  const vitalOptions = [
    {
      name: 'Heart Rate',
      data: heartRateData,
      color: '#F44336',
      unit: 'bpm',
      normalRange: '60-100 bpm'
    },
    {
      name: 'Blood Pressure (Systolic)',
      data: bloodPressureSystolic,
      color: '#2196F3',
      unit: 'mmHg',
      normalRange: '90-120 mmHg'
    },
    {
      name: 'Blood Pressure (Diastolic)',
      data: bloodPressureDiastolic,
      color: '#03A9F4',
      unit: 'mmHg',
      normalRange: '60-80 mmHg'
    },
    {
      name: 'Oxygen Saturation',
      data: oxygenSaturation,
      color: '#4CAF50',
      unit: '%',
      normalRange: '95-100%'
    },
    {
      name: 'Glucose Level',
      data: glucoseLevel,
      color: '#FF9800',
      unit: 'mg/dL',
      normalRange: '70-140 mg/dL'
    }
  ];

  const handleVitalChange = (vital: typeof selectedVital) => {
    setSelectedVital(vital);
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<any , any>) => {
    if (active && payload && payload.length) {
      return (
        <div className="...">
          <p className="...">{`Time: ${payload[0].payload.time}`}</p>
          <p style={{ color: selectedVital.color }}>
            {selectedVital.name}: {payload[0].value.toFixed(1)} {selectedVital.unit}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{selectedVital.name}</CardTitle>
            <CardDescription>
              24-hour monitoring chart | Normal Range: {selectedVital.normalRange}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedVital.name} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {vitalOptions.map((vital) => (
                <DropdownMenuItem 
                  key={vital.name} 
                  onClick={() => handleVitalChange(vital)}
                  className="cursor-pointer"
                >
                  {vital.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={selectedVital.data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id={`color${selectedVital.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={selectedVital.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={selectedVital.color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={selectedVital.color}
                fillOpacity={1}
                fill={`url(#color${selectedVital.name})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalSigns;

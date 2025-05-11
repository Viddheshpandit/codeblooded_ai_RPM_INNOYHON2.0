
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Calendar as CalendarIcon, Clock, Upload, RefreshCw } from 'lucide-react';
import VitalSigns from '@/components/charts/VitalSigns';

// Mock data
const generateDataForPastDays = (days: number, baseValue: number, variance: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    // Create more natural looking patterns
    const dayVariance = Math.sin(i * 0.5) * variance * 0.5;
    const randomVariance = (Math.random() - 0.5) * variance;
    
    return {
      date: formattedDate,
      value: baseValue + dayVariance + randomVariance
    };
  });
};

const heartRateHistoryData = generateDataForPastDays(14, 72, 15);
const bloodPressureSystolicHistory = generateDataForPastDays(14, 120, 20);
const bloodPressureDiastolicHistory = generateDataForPastDays(14, 80, 15);
const oxygenSaturationHistory = generateDataForPastDays(14, 97, 4);
const glucoseLevelHistory = generateDataForPastDays(14, 105, 25);

const sleepData = [
  { date: 'Mon', deep: 2.1, light: 4.3, rem: 1.6 },
  { date: 'Tue', deep: 1.8, light: 4.7, rem: 1.5 },
  { date: 'Wed', deep: 2.3, light: 3.9, rem: 1.8 },
  { date: 'Thu', deep: 1.5, light: 4.2, rem: 1.3 },
  { date: 'Fri', deep: 1.9, light: 4.0, rem: 1.9 },
  { date: 'Sat', deep: 2.5, light: 5.1, rem: 2.2 },
  { date: 'Sun', deep: 2.7, light: 4.8, rem: 2.0 }
];

const activityData = [
  { date: 'Mon', steps: 6500, calories: 320 },
  { date: 'Tue', steps: 8200, calories: 380 },
  { date: 'Wed', steps: 7300, calories: 350 },
  { date: 'Thu', steps: 9100, calories: 420 },
  { date: 'Fri', steps: 5800, calories: 280 },
  { date: 'Sat', steps: 10500, calories: 510 },
  { date: 'Sun', steps: 4200, calories: 220 }
];

const HealthMonitoring = () => {
  const [activeVital, setActiveVital] = useState<string>('heart-rate');
  const [timeframe, setTimeframe] = useState<string>('14d');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDataUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  const formatDataForTimeframe = (data: any[], timeframe: string) => {
    switch (timeframe) {
      case '7d':
        return data.slice(-7);
      case '30d':
        return data;
      case '3m':
        return data;
      default:
        return data;
    }
  };

  const renderVitalChart = () => {
    let data;
    let dataKey = 'value';
    let color = '';
    let unit = '';
    let name = '';
    
    switch (activeVital) {
      case 'heart-rate':
        data = formatDataForTimeframe(heartRateHistoryData, timeframe);
        color = '#F44336';
        unit = 'bpm';
        name = 'Heart Rate';
        break;
      case 'blood-pressure':
        data = formatDataForTimeframe(bloodPressureSystolicHistory, timeframe);
        color = '#2196F3';
        unit = 'mmHg';
        name = 'Blood Pressure (Systolic)';
        break;
      case 'oxygen':
        data = formatDataForTimeframe(oxygenSaturationHistory, timeframe);
        color = '#4CAF50';
        unit = '%';
        name = 'Oxygen Saturation';
        break;
      case 'glucose':
        data = formatDataForTimeframe(glucoseLevelHistory, timeframe);
        color = '#FF9800';
        unit = 'mg/dL';
        name = 'Glucose Level';
        break;
      default:
        data = heartRateHistoryData;
        color = '#F44336';
        unit = 'bpm';
        name = 'Heart Rate';
    }

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
            <p className="font-medium">{`Date: ${payload[0].payload.date}`}</p>
            <p style={{ color }}>{`${name}: ${payload[0].value.toFixed(1)} ${unit}`}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id={`color${activeVital}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={`url(#color${activeVital})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Health Monitoring</h1>
          <p className="text-gray-600">Track and analyze your health metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleDataUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Sync Device Data
              </>
            )}
          </Button>
          <Button className="bg-health-primary hover:bg-health-dark">
            <Clock className="mr-2 h-4 w-4" />
            Real-time Monitor
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Analysis</TabsTrigger>
          <TabsTrigger value="activity">Activity Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vital Signs History</CardTitle>
                  <CardDescription>Track your vital metrics over time</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="inline-flex items-center rounded-md border border-input bg-background p-1 text-sm text-muted-foreground">
                    <Button 
                      variant={timeframe === '7d' ? 'default' : 'ghost'} 
                      className="rounded-sm px-2 py-1 h-auto text-xs"
                      onClick={() => setTimeframe('7d')}
                    >
                      7D
                    </Button>
                    <Button 
                      variant={timeframe === '14d' ? 'default' : 'ghost'} 
                      className="rounded-sm px-2 py-1 h-auto text-xs"
                      onClick={() => setTimeframe('14d')}
                    >
                      14D
                    </Button>
                    <Button 
                      variant={timeframe === '30d' ? 'default' : 'ghost'} 
                      className="rounded-sm px-2 py-1 h-auto text-xs"
                      onClick={() => setTimeframe('30d')}
                    >
                      30D
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-2 mb-4">
                <Button 
                  variant={activeVital === 'heart-rate' ? 'default' : 'outline'}
                  onClick={() => setActiveVital('heart-rate')}
                  className={activeVital === 'heart-rate' ? 'bg-health-primary hover:bg-health-dark' : ''}
                  size="sm"
                >
                  Heart Rate
                </Button>
                <Button 
                  variant={activeVital === 'blood-pressure' ? 'default' : 'outline'}
                  onClick={() => setActiveVital('blood-pressure')}
                  className={activeVital === 'blood-pressure' ? 'bg-health-primary hover:bg-health-dark' : ''}
                  size="sm"
                >
                  Blood Pressure
                </Button>
                <Button 
                  variant={activeVital === 'oxygen' ? 'default' : 'outline'}
                  onClick={() => setActiveVital('oxygen')}
                  className={activeVital === 'oxygen' ? 'bg-health-primary hover:bg-health-dark' : ''}
                  size="sm"
                >
                  Oxygen Level
                </Button>
                <Button 
                  variant={activeVital === 'glucose' ? 'default' : 'outline'}
                  onClick={() => setActiveVital('glucose')}
                  className={activeVital === 'glucose' ? 'bg-health-primary hover:bg-health-dark' : ''}
                  size="sm"
                >
                  Glucose Level
                </Button>
              </div>
              
              {renderVitalChart()}
            </CardContent>
          </Card>
          
          <VitalSigns />
        </TabsContent>
        
        <TabsContent value="sleep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-health-primary" />
                Sleep Analysis
              </CardTitle>
              <CardDescription>Weekly sleep patterns and quality metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sleepData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="deep" stackId="1" stroke="#3F51B5" fill="#3F51B5" name="Deep Sleep" />
                    <Area type="monotone" dataKey="light" stackId="1" stroke="#03A9F4" fill="#03A9F4" name="Light Sleep" />
                    <Area type="monotone" dataKey="rem" stackId="1" stroke="#009688" fill="#009688" name="REM Sleep" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium mb-1">Average Sleep Duration</h4>
                  <p className="text-2xl font-bold text-health-dark">7.8 hrs</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <h4 className="text-sm font-medium mb-1">Sleep Quality Score</h4>
                  <p className="text-2xl font-bold text-health-primary">83/100</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <h4 className="text-sm font-medium mb-1">Deep Sleep %</h4>
                  <p className="text-2xl font-bold text-teal-600">23%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sleep Insights</CardTitle>
              <CardDescription>AI-generated analysis of your sleep patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-2">Sleep Pattern Analysis</h3>
                  <p className="text-sm text-gray-700">
                    Your sleep patterns show good consistency in sleep and wake times. 
                    However, your deep sleep percentage is slightly below optimal levels.
                    Consider reducing screen time before bed to improve sleep quality.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-2">Factors Affecting Sleep</h3>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Evening physical activity (positive impact)</li>
                      <li>Screen time before bed (negative impact)</li>
                      <li>Ambient temperature (optimal)</li>
                      <li>Caffeine consumption (moderate impact)</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                      <li>Reduce screen time 1 hour before bed</li>
                      <li>Maintain consistent sleep schedule</li>
                      <li>Continue evening walking routine</li>
                      <li>Consider sleep-supporting supplements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity Tracking</CardTitle>
              <CardDescription>Steps, calories, and activity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activityData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} name="Steps" />
                    <Line yAxisId="right" type="monotone" dataKey="calories" stroke="#82ca9d" name="Calories Burned" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="text-sm font-medium mb-1">Avg. Daily Steps</h4>
                  <p className="text-2xl font-bold text-purple-700">7,371</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-medium mb-1">Weekly Calories Burned</h4>
                  <p className="text-2xl font-bold text-green-600">2,480</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-medium mb-1">Activity Score</h4>
                  <p className="text-2xl font-bold text-amber-600">76/100</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg border">
                <h3 className="font-medium mb-3">Activity Insights</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Your activity level is moderate with good consistency throughout the week. 
                  Weekend activity peaks suggest dedicated exercise time. Consider adding more 
                  movement during weekday evenings to reach optimal health targets.
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress to Weekly Goal</span>
                  <span>74%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-health-primary h-2.5 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthMonitoring;

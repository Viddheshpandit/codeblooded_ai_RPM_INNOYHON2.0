import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Footprints, Timer, Moon, Activity } from "lucide-react";
import IoTWatchSimulator, { HealthData } from "@/services/IoTWatchSimulator";

interface HealthScoreProps {
  userId?: string;
}

const getScoreColor = (score: number): string => {
  if (score < 40) return "text-red-500";
  if (score < 70) return "text-amber-500";
  return "text-green-500";
};

const getScoreDescription = (score: number): string => {
  if (score < 40) return "Needs Improvement";
  if (score < 70) return "Good";
  if (score < 90) return "Very Good";
  return "Excellent";
};

const HealthScoreBox = ({ userId }: HealthScoreProps) => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iotSimulator = IoTWatchSimulator.getInstance();

  useEffect(() => {
    setIsLoading(true);
    
    // Start IoT simulator if not already running
    if (!iotSimulator.isRunning() && userId) {
      iotSimulator.start(userId);
    }
    
    // Get initial data
    const initialData = iotSimulator.getCurrentData();
    setHealthData(initialData);
    setScore(iotSimulator.calculateHealthScore());
    setIsLoading(false);
    
    // Subscribe to data updates
    const unsubscribe = iotSimulator.subscribeToUpdates((data) => {
      setHealthData(data);
      setScore(iotSimulator.calculateHealthScore());
    });
    
    return () => {
      unsubscribe();
      // Note: We don't stop the simulator on component unmount
      // because it should keep running in the background
    };
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="w-full h-64 animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-7 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </CardHeader>
        <CardContent>
          <div className="h-28 bg-gray-200 rounded mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!healthData) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-health-light pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Daily Health Score</span>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </span>
        </CardTitle>
        <CardDescription>Based on your IoT watch data</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="mb-4">
          <Progress value={score} className="h-2.5"/>
          <p className="text-right text-sm mt-1 font-medium">{getScoreDescription(score)}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
            <Footprints className="h-6 w-6 text-blue-600 mb-1" />
            <span className="text-lg font-bold">{healthData.steps}</span>
            <span className="text-xs text-gray-500">Steps</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
            <Timer className="h-6 w-6 text-green-600 mb-1" />
            <span className="text-lg font-bold">{healthData.activeMinutes}</span>
            <span className="text-xs text-gray-500">Active Min</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
            <Moon className="h-6 w-6 text-purple-600 mb-1" />
            <span className="text-lg font-bold">{healthData.sleepHours}h</span>
            <span className="text-xs text-gray-500">Sleep</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium mb-2 text-sm">Vital Signs</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col p-2 bg-red-50 rounded-lg">
              <span className="text-xs text-gray-500">Heart Rate</span>
              <span className="text-sm font-bold flex items-center">
                <Activity className="h-3 w-3 text-red-500 mr-1" />
                {healthData.heartRate} bpm
              </span>
            </div>
            <div className="flex flex-col p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-gray-500">Blood Pressure</span>
              <span className="text-sm font-bold">
                {healthData.bloodPressure.systolic}/{healthData.bloodPressure.diastolic}
              </span>
            </div>
            <div className="flex flex-col p-2 bg-green-50 rounded-lg">
              <span className="text-xs text-gray-500">Oxygen</span>
              <span className="text-sm font-bold">{healthData.oxygenLevel}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScoreBox;

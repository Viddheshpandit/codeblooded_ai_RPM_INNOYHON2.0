
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, Wifi, Watch, Battery } from "lucide-react";

interface IoTWatchStatusProps {
  userId?: string;
  deviceCount?: number;
}

const IoTWatchStatus = ({ userId, deviceCount = 5 }: IoTWatchStatusProps) => {
  const [connectedDevices, setConnectedDevices] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate IoT device data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Random number of connected devices, but not more than deviceCount
      const connected = Math.floor(Math.random() * (deviceCount + 1));
      setConnectedDevices(connected);
      setIsLoading(false);
    }, 1200);
    
    // Simulate occasional device connection/disconnection
    const interval = setInterval(() => {
      setConnectedDevices((prev) => {
        // Random chance to change connection status
        if (Math.random() > 0.7) {
          // Ensure connected devices is within range
          const newValue = prev + (Math.random() > 0.5 ? 1 : -1);
          return Math.min(deviceCount, Math.max(0, newValue));
        }
        return prev;
      });
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [deviceCount]);

  const getDeviceStatus = (index: number) => {
    // Devices with index less than connectedDevices are connected
    const isConnected = index < connectedDevices;
    
    // Simulate battery levels and data transmission
    const batteryLevel = Math.floor(Math.random() * 100);
    const dataTransmission = isConnected && Math.random() > 0.2;
    
    return {
      isConnected,
      batteryLevel,
      dataTransmission,
      lastSync: isConnected ? 
        `${Math.floor(Math.random() * 10) + 1} min ago` : 
        `${Math.floor(Math.random() * 24) + 1}h ago`
    };
  };

  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>IoT Watch Status</CardTitle>
            <CardDescription>
              {connectedDevices} of {deviceCount} devices connected
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={connectedDevices > 0 ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}
          >
            <Wifi className="h-3 w-3 mr-1" />
            {connectedDevices > 0 ? "Online" : "Offline"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Array.from({ length: deviceCount }).map((_, index) => {
            const status = getDeviceStatus(index);
            return (
              <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center">
                  <Watch className="h-5 w-5 text-health-primary mr-2" />
                  <div>
                    <div className="font-medium text-sm">
                      Device {String(index + 1).padStart(2, '0')}
                      <span className="ml-2 text-xs">
                        {status.isConnected ? 
                          <Badge variant="outline" className="bg-green-50 text-green-700 ml-2 py-0 h-5">Connected</Badge> : 
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 ml-2 py-0 h-5">Disconnected</Badge>
                        }
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Last sync: {status.lastSync}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Battery className={`h-4 w-4 ${
                      status.batteryLevel > 50 ? 'text-green-500' : 
                      status.batteryLevel > 20 ? 'text-amber-500' : 
                      'text-red-500'
                    } mr-1`} />
                    <span className="text-xs">{status.batteryLevel}%</span>
                  </div>
                  
                  {status.isConnected && (
                    <div className="flex items-center">
                      {status.dataTransmission ? (
                        <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                      ) : (
                        <Cpu className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default IoTWatchStatus;

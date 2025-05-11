
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import WaterIntakeService from "@/services/WaterIntakeService";

interface WaterNotificationProps {
  userName: string;
}

const WaterNotification = ({ userName }: WaterNotificationProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [interval, setInterval] = useState<string>("60");
  const waterService = WaterIntakeService.getInstance();

  useEffect(() => {
    // Check if the notification service is already running
    if (waterService.isRunning()) {
      setIsEnabled(true);
    }
    
    return () => {
      // No need to clean up as the service is a singleton
    };
  }, []);

  const handleToggleNotifications = (checked: boolean) => {
    setIsEnabled(checked);
    
    if (checked) {
      waterService.setNotificationInterval(parseInt(interval));
      waterService.start(userName);
    } else {
      waterService.stop();
    }
  };

  const handleIntervalChange = (value: string) => {
    setInterval(value);
    if (isEnabled) {
      waterService.setNotificationInterval(parseInt(value));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Droplet className="h-5 w-5 text-blue-500 mr-2" />
          Water Intake Reminders
        </CardTitle>
        <CardDescription>Get notifications to stay hydrated throughout the day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Label htmlFor="water-notifications">Enable notifications</Label>
          <Switch
            id="water-notifications"
            checked={isEnabled}
            onCheckedChange={handleToggleNotifications}
          />
        </div>
        
        <div className="mb-4">
          <Label htmlFor="interval-select" className="mb-2 block">Reminder frequency</Label>
          <Select
            value={interval}
            onValueChange={handleIntervalChange}
            disabled={!isEnabled}
          >
            <SelectTrigger id="interval-select" className="w-full">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Every 30 minutes</SelectItem>
              <SelectItem value="60">Every hour</SelectItem>
              <SelectItem value="120">Every 2 hours</SelectItem>
              <SelectItem value="240">Every 4 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-1">Daily water intake recommendation</h4>
          <p className="text-sm text-gray-600">
            For optimal health, aim to drink 8-10 glasses (2-2.5 liters) of water daily.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterNotification;

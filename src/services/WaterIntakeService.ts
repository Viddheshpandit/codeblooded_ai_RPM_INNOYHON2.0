
import { toast } from "sonner";

class WaterIntakeService {
  private static instance: WaterIntakeService;
  private intervalId: number | null = null;
  private isActive: boolean = false;
  private lastNotificationTime: number = 0;
  private notificationInterval: number = 60 * 60 * 1000; // 1 hour in milliseconds
  private userName: string = "";

  private constructor() {}

  public static getInstance(): WaterIntakeService {
    if (!WaterIntakeService.instance) {
      WaterIntakeService.instance = new WaterIntakeService();
    }
    return WaterIntakeService.instance;
  }

  public start(userName: string): void {
    if (this.isActive) return;
    
    this.userName = userName;
    this.isActive = true;
    this.lastNotificationTime = Date.now();
    
    // Check every 5 minutes if it's time for a notification
    this.intervalId = window.setInterval(() => this.checkAndNotify(), 5 * 60 * 1000);
    
    // Show initial notification after 3 seconds
    setTimeout(() => this.sendNotification(), 3000);
  }

  public stop(): void {
    if (!this.isActive) return;
    
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isActive = false;
  }

  public setNotificationInterval(minutes: number): void {
    this.notificationInterval = minutes * 60 * 1000;
  }

  public isRunning(): boolean {
    return this.isActive;
  }

  private checkAndNotify(): void {
    const currentTime = Date.now();
    if (currentTime - this.lastNotificationTime >= this.notificationInterval) {
      this.sendNotification();
      this.lastNotificationTime = currentTime;
    }
  }

  private sendNotification(): void {
    // Use sonner toast for modern notifications
    toast("Stay hydrated!", {
      description: `${this.userName}, it's time to drink some water.`,
      action: {
        label: "Thanks",
        onClick: () => console.log("Water intake acknowledged")
      },
      icon: "💧",
      position: "top-right",
      duration: 10000
    });
  }
}

export default WaterIntakeService;


import { toast } from "sonner";

export interface HealthData {
  steps: number;
  activeMinutes: number;
  sleepHours: number;
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenLevel: number;
}

class IoTWatchSimulator {
  private static instance: IoTWatchSimulator;
  private intervalId: number | null = null;
  private isActive: boolean = false;
  private updateInterval: number = 60 * 1000; // 1 minute in milliseconds
  private userId: string = "";
  private currentData: HealthData;
  private dataUpdateCallbacks: ((data: HealthData) => void)[] = [];

  private constructor() {
    this.currentData = this.generateRandomData();
  }

  public static getInstance(): IoTWatchSimulator {
    if (!IoTWatchSimulator.instance) {
      IoTWatchSimulator.instance = new IoTWatchSimulator();
    }
    return IoTWatchSimulator.instance;
  }

  public start(userId: string): void {
    if (this.isActive) return;
    
    this.userId = userId;
    this.isActive = true;
    
    // Generate new data every minute
    this.intervalId = window.setInterval(() => this.updateHealthData(), this.updateInterval);
    
    // Initial data generation
    this.updateHealthData();
    
    toast.info("IoT Watch Connected", {
      description: "Your health data is now being monitored in real-time.",
      duration: 5000
    });
  }

  public stop(): void {
    if (!this.isActive) return;
    
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isActive = false;
    
    toast("IoT Watch Disconnected", {
      description: "Your health data is no longer being monitored.",
      duration: 5000
    });
  }

  public getCurrentData(): HealthData {
    return {...this.currentData};
  }

  public subscribeToUpdates(callback: (data: HealthData) => void): () => void {
    this.dataUpdateCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.dataUpdateCallbacks = this.dataUpdateCallbacks.filter(cb => cb !== callback);
    };
  }

  public isRunning(): boolean {
    return this.isActive;
  }

  private updateHealthData(): void {
    // Generate new health data with slight variations from previous data
    const newData = this.generateUpdatedData();
    this.currentData = newData;
    
    // Notify all subscribers of new data
    this.dataUpdateCallbacks.forEach(callback => callback(newData));
  }

  private generateRandomData(): HealthData {
    return {
      steps: Math.floor(Math.random() * 1000) + 500,
      activeMinutes: Math.floor(Math.random() * 30) + 10,
      sleepHours: parseFloat((Math.random() * 2 + 5).toFixed(1)),
      heartRate: Math.floor(Math.random() * 20) + 60,
      bloodPressure: {
        systolic: Math.floor(Math.random() * 30) + 110,
        diastolic: Math.floor(Math.random() * 20) + 70
      },
      oxygenLevel: Math.floor(Math.random() * 5) + 95
    };
  }

  private generateUpdatedData(): HealthData {
    const currentData = this.currentData;
    
    // Simulate realistic changes in health data
    return {
      steps: currentData.steps + Math.floor(Math.random() * 200) - 50,
      activeMinutes: currentData.activeMinutes + Math.floor(Math.random() * 5) - 2,
      sleepHours: currentData.sleepHours,
      heartRate: currentData.heartRate + Math.floor(Math.random() * 5) - 2,
      bloodPressure: {
        systolic: currentData.bloodPressure.systolic + Math.floor(Math.random() * 6) - 3,
        diastolic: currentData.bloodPressure.diastolic + Math.floor(Math.random() * 4) - 2
      },
      oxygenLevel: Math.min(100, Math.max(90, currentData.oxygenLevel + Math.floor(Math.random() * 3) - 1))
    };
  }

  // Simulate AI health score calculation
  public calculateHealthScore(): number {
    const data = this.currentData;
    
    // Simplified algorithm to calculate health score (0-100)
    const stepsScore = Math.min(data.steps / 100, 40); // max 40 points
    const activeScore = Math.min(data.activeMinutes * 0.8, 30); // max 30 points
    const sleepScore = Math.min(data.sleepHours * 3, 30); // max 30 points
    
    let score = Math.round(stepsScore + activeScore + sleepScore);
    
    // Factor in vitals for minor adjustments
    if (data.heartRate > 100 || data.heartRate < 50) score -= 5;
    if (data.bloodPressure.systolic > 140 || data.bloodPressure.diastolic > 90) score -= 5;
    if (data.oxygenLevel < 95) score -= 5;
    
    // Ensure score is within bounds
    return Math.min(100, Math.max(0, score));
  }
}

export default IoTWatchSimulator;

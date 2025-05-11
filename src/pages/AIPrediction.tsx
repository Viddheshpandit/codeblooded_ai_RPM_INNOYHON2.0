
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart3, Download, Share2, Wind, Bell, BellOff } from "lucide-react";
import HealthScoreBox from '@/components/dashboard/HealthScoreBox';

const AIPrediction = () => {
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleGenerateReport = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Report generated successfully!", {
        description: "Your health prediction report is ready to download.",
        action: {
          label: "Download",
          onClick: () => handleDownloadReport()
        }
      });
    }, 1500);
  };
  
  const handleDownloadReport = () => {
    toast.success("Report downloaded", {
      description: "Your health prediction report has been saved to your device."
    });
  };
  
  const handleShareReport = () => {
    uiToast({
      title: "Share Health Report",
      description: "Your health report sharing link has been copied to clipboard.",
    });
  };
  
  const toggleAlertSubscription = () => {
    setIsSubscribed(prev => !prev);
    
    if (!isSubscribed) {
      toast.success("Alerts enabled", {
        description: "You will now receive health prediction alerts."
      });
    } else {
      toast("Alerts disabled", {
        description: "You will no longer receive health prediction alerts."
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">AI Health Predictions</h1>
          <p className="text-gray-600">AI-powered health analysis and predictions based on your data</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={toggleAlertSubscription}>
            {isSubscribed ? (
              <>
                <BellOff className="mr-2 h-4 w-4" />
                Disable Alerts
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" />
                Enable Alerts
              </>
            )}
          </Button>
          <Button className="bg-health-primary hover:bg-health-dark" onClick={handleGenerateReport} disabled={isLoading}>
            {isLoading ? (
              <>
                <BarChart3 className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="current">Current Assessment</TabsTrigger>
              <TabsTrigger value="historical">Historical Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <CardTitle>AI Health Assessment</CardTitle>
                  <CardDescription>Analysis based on your most recent health data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Wind className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-700">Overall Health: Good</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Based on your recent vitals and activity data, our AI predicts your overall health is good.
                            Your cardiovascular metrics and sleep patterns are within healthy ranges.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Key Health Indicators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Card className="bg-blue-50 border-blue-100">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium mb-1">Cardiovascular</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-blue-600">92%</span>
                              <span className="text-xs px-2 py-1 bg-blue-100 rounded text-blue-700">Excellent</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-green-50 border-green-100">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium mb-1">Metabolic</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-green-600">85%</span>
                              <span className="text-xs px-2 py-1 bg-green-100 rounded text-green-700">Good</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-amber-50 border-amber-100">
                          <CardContent className="p-4">
                            <h4 className="text-sm font-medium mb-1">Recovery</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-amber-600">78%</span>
                              <span className="text-xs px-2 py-1 bg-amber-100 rounded text-amber-700">Fair</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">AI Recommendations</h3>
                      <div className="space-y-3">
                        <div className="bg-white p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <h4 className="text-sm font-medium">Continue Regular Exercise</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 pl-4">
                            Your current activity patterns are beneficial. Maintain 30+ minutes of moderate exercise 5 times per week.
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                            <h4 className="text-sm font-medium">Sleep Improvement</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 pl-4">
                            Consider improving sleep consistency. Your deep sleep percentage is below optimal levels.
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 border rounded-md">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <h4 className="text-sm font-medium">Hydration</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 pl-4">
                            Increase daily water intake by 500ml to optimize metabolic processes and improve recovery.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={handleDownloadReport} className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" onClick={handleShareReport} className="flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share with Doctor
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="historical">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Health Trends</CardTitle>
                  <CardDescription>Analysis of your health data over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      This view shows how your health metrics have changed over the past 6 months,
                      providing insights into long-term trends and the effectiveness of lifestyle changes.
                    </p>
                    
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md border">
                      <p className="text-gray-400">Historical trend charts will appear here</p>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium mb-2">Long-term Observations</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                        <li>Cardiovascular health has improved by 12% over the last 3 months</li>
                        <li>Resting heart rate has decreased from an average of 76 to 72 BPM</li>
                        <li>Sleep efficiency has fluctuated with seasonal changes</li>
                        <li>Stress levels show correlation with work schedule patterns</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <HealthScoreBox userId={user?.id} />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AI Prediction Accuracy</CardTitle>
              <CardDescription>How accurate our AI has been for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last prediction accuracy</span>
                  <span className="text-sm font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-gray-500">
                  Based on comparing our predictions with your actual health outcomes
                </p>
                
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-sm font-medium mb-2">About AI Health Models</h4>
                  <p className="text-xs text-gray-600">
                    Our AI health prediction models are trained on anonymized data from millions of patients 
                    and continuously improve as they learn from new data. The recommendations are not medical 
                    advice and should be discussed with your healthcare provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;

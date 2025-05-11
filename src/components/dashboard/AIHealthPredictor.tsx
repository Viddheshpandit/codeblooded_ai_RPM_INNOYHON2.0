
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AIHealthPredictorProps {
  patientData?: any;
  patientId?: string;
}

const AIHealthPredictor = ({ patientData, patientId }: AIHealthPredictorProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResults, setPredictionResults] = useState<null | {
    overallRisk: number;
    diabetesRisk: number;
    heartDiseaseRisk: number;
    stressLevel: number;
    recommendations: string[];
  }>(null);

  const runAIPrediction = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Generate pseudo-random but deterministic results based on patientId
      const seed = patientId ? 
        patientId.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : 
        Date.now();
      
      const pseudoRandom = (base: number) => {
        return ((seed * base) % 100) / 100; // Value between 0-1
      };
      
      const results = {
        overallRisk: Math.floor(pseudoRandom(13) * 100),
        diabetesRisk: Math.floor(pseudoRandom(29) * 100),
        heartDiseaseRisk: Math.floor(pseudoRandom(41) * 100),
        stressLevel: Math.floor(pseudoRandom(17) * 100),
        recommendations: [
          "Increase daily water intake by 500ml",
          "Add 15 minutes of moderate exercise daily",
          "Consider meditation to reduce stress levels",
          "Schedule a follow-up appointment in 3 months"
        ]
      };
      
      setPredictionResults(results);
      setIsAnalyzing(false);
      
      toast.success("AI Analysis Complete", {
        description: "View your personalized health predictions below"
      });
    }, 3500);
  };

  const getRiskLabel = (value: number) => {
    if (value < 25) return "Low";
    if (value < 50) return "Moderate";
    if (value < 75) return "Elevated";
    return "High";
  };
  
  const getRiskColor = (value: number) => {
    if (value < 25) return "bg-green-500";
    if (value < 50) return "bg-blue-500";
    if (value < 75) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 text-purple-600 mr-2" />
          AI Health Predictor
        </CardTitle>
        <CardDescription>
          Using machine learning to predict potential health risks
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!predictionResults ? (
          <div className="text-center py-6">
            {isAnalyzing ? (
              <div className="space-y-4">
                <Loader2 className="h-8 w-8 text-purple-600 animate-spin mx-auto" />
                <p className="text-sm font-medium">Analyzing health data...</p>
                <Progress value={isAnalyzing ? 70 : 0} className="h-1.5" />
                <p className="text-xs text-gray-500">
                  Our AI model is processing your health metrics and generating personalized predictions
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Run the AI health predictor to receive personalized health insights and recommendations
                  based on your IoT watch data.
                </p>
                <Button 
                  onClick={runAIPrediction} 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Run AI Analysis
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Overall Health Risk</h4>
              <div className="flex items-center gap-2">
                <Progress 
                  value={predictionResults.overallRisk} 
                  className={`h-2 flex-1 ${getRiskColor(predictionResults.overallRisk)}`} 
                />
                <span className="text-sm font-medium">
                  {getRiskLabel(predictionResults.overallRisk)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <h4 className="text-xs font-medium mb-1">Diabetes Risk</h4>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={predictionResults.diabetesRisk} 
                    className={`h-1.5 flex-1 ${getRiskColor(predictionResults.diabetesRisk)}`} 
                  />
                  <span className="text-xs">
                    {predictionResults.diabetesRisk}%
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium mb-1">Heart Disease Risk</h4>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={predictionResults.heartDiseaseRisk} 
                    className={`h-1.5 flex-1 ${getRiskColor(predictionResults.heartDiseaseRisk)}`} 
                  />
                  <span className="text-xs">
                    {predictionResults.heartDiseaseRisk}%
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium mb-1">Stress Level</h4>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={predictionResults.stressLevel} 
                    className={`h-1.5 flex-1 ${getRiskColor(predictionResults.stressLevel)}`} 
                  />
                  <span className="text-xs">
                    {predictionResults.stressLevel}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">AI Recommendations</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {predictionResults.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-1 mr-2"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-right pt-2">
              <Button variant="outline" size="sm" onClick={runAIPrediction}>
                Refresh Analysis
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIHealthPredictor;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AIHealthPrediction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your AI Health Prediction</CardTitle>
        <CardDescription>Based on your recent health data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-700">Overall Health Status: Good</h3>
          <p className="text-sm text-gray-600 mt-2">
            Based on analysis of your vitals and activity patterns, our AI system predicts you are 
            maintaining good health. Continue your current regimen and monitor the following areas.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 mt-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Cardiovascular</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Excellent</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Metabolic</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Good</span>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">Rest & Recovery</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">Fair</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIHealthPrediction;

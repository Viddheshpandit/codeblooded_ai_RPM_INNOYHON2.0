
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HealthInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Insights</CardTitle>
        <CardDescription>AI-powered health recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-health-primary">Trending Well</h4>
          <p className="text-sm text-gray-600">
            Your sleep patterns have improved by 15% over the past week.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-amber-500">Areas to Monitor</h4>
          <p className="text-sm text-gray-600">
            Blood pressure readings show slight elevation in the evenings.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-health-secondary">Recommendations</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Consider reducing sodium intake</li>
            <li>Maintain your current exercise routine</li>
            <li>Continue tracking sleep patterns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthInsights;

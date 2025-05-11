
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AIAlertProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
  riskScore: number;
  patientId?: string;
  patientName?: string;
}

const AIAlertCard = ({
  title,
  description,
  severity,
  time,
  riskScore,
  patientId,
  patientName
}: AIAlertProps) => {
  const [resolved, setResolved] = useState(false);

  const handleResolve = () => {
    setResolved(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 30) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <Card className={resolved ? 'border-green-200 bg-green-50' : ''}>
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="outline" className={getSeverityColor(severity)}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)} Risk
            </Badge>
            {resolved && (
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Resolved
              </Badge>
            )}
          </div>
          <CardDescription className="mt-1">
            {patientName && `Patient: ${patientName} | `}Detected {time}
          </CardDescription>
        </div>
        {!resolved && <AlertTriangle className="h-5 w-5 text-amber-500" />}
        {resolved && <Check className="h-5 w-5 text-green-500" />}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Risk Score</span>
            <span className="font-medium">{riskScore}%</span>
          </div>
          <Progress value={riskScore} className={getRiskColor(riskScore)} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!resolved ? (
          <>
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button onClick={handleResolve} size="sm" className="bg-health-primary hover:bg-health-dark">
              Mark as Resolved
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" className="ml-auto">
            View History <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AIAlertCard;

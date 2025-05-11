
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  isLoading = false
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
            ) : (
              <div className="flex items-end space-x-1 mt-1">
                <h3 className="text-2xl font-bold">{value}</h3>
                {trend && (
                  <span
                    className={cn(
                      "text-xs font-medium mb-1",
                      trend.isPositive ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {trend.isPositive ? "+" : "-"}
                    {Math.abs(trend.value)}%
                  </span>
                )}
              </div>
            )}
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          </div>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

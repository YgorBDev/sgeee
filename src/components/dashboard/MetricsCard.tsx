import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  variant?: "default" | "primary" | "accent" | "warning";
  icon?: React.ReactNode;
}

export function MetricsCard({ 
  title, 
  value, 
  subtitle, 
  variant = "default",
  icon 
}: MetricsCardProps) {
  const variants = {
    default: "bg-card border-border",
    primary: "bg-gradient-primary text-white border-0",
    accent: "bg-gradient-accent text-white border-0", 
    warning: "bg-gradient-warning text-white border-0"
  };

  return (
    <Card className={cn("relative overflow-hidden", variants[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant !== "default" ? "text-white/90" : "text-muted-foreground"
        )}>
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "h-4 w-4",
            variant !== "default" ? "text-white/80" : "text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold",
          variant !== "default" ? "text-white" : ""
        )}>
          {value.toLocaleString()}
        </div>
        {subtitle && (
          <p className={cn(
            "text-xs",
            variant !== "default" ? "text-white/80" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
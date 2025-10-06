
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isValid?: boolean;
  hasData?: boolean;
  icon?: React.ReactNode;
}

export function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false, 
  isValid = true, 
  hasData = false,
  icon 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn(
      "shadow-sm border-border-c transition-all duration-200 animate-scale-in",
      isOpen && "shadow-md"
    )}>
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between p-0 h-auto hover:bg-transparent"
        >
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <div className="flex items-center gap-2">
              {hasData && (
                <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
              )}
              {isValid ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <AlertCircle className="w-4 h-4 text-warning" />
              )}
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </Button>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0 animate-fade-in">
          {children}
        </CardContent>
      )}
    </Card>
  );
}

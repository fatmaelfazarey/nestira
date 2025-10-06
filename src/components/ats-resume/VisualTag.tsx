
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VisualTagProps {
  label: string;
  variant?: 'industry' | 'skill' | 'tool' | 'certification';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

export function VisualTag({ 
  label, 
  variant = 'skill', 
  removable = false, 
  onRemove, 
  className 
}: VisualTagProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'industry':
        return 'bg-info-light text-info border-info/20';
      case 'skill':
        return 'bg-success-light text-success border-success/20';
      case 'tool':
        return 'bg-warning-light text-warning border-warning/20';  
      case 'certification':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted-c text-muted-c-foreground border-border-c';
    }
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 hover:shadow-sm",
      getVariantStyles(),
      className
    )}>
      <span>{label}</span>
      {removable && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-4 w-4 p-0 hover:bg-transparent"
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
}

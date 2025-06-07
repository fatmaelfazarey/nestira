
import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
  label?: string
  compact?: boolean
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(({ 
  value, 
  size = 80, 
  strokeWidth = 6, 
  className, 
  showPercentage = true,
  label,
  compact = false,
  ...props 
}, ref) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (value / 100) * circumference
  
  const getColor = (score: number) => {
    if (score >= 80) return 'stroke-green-500'
    if (score >= 60) return 'stroke-orange-500'
    return 'stroke-red-500'
  }

  const getLabelColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  // Dynamic text sizing based on circle size
  const getTextSize = () => {
    if (size <= 40) return 'text-xs'
    if (size <= 60) return 'text-sm'
    return 'text-lg'
  }

  const getLabelSize = () => {
    if (size <= 40) return 'text-xs'
    return 'text-xs'
  }

  return (
    <div 
      ref={ref}
      className={cn("relative inline-flex flex-col items-center justify-center", className)}
      {...props}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-500", getColor(value))}
          />
        </svg>
        
        {/* Percentage in center */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-bold text-gray-900", getTextSize())}>
              {value}%
            </span>
          </div>
        )}
      </div>
      
      {/* Label below the circle - only show if not compact */}
      {label && !compact && (
        <span className={cn("font-medium mt-1", getLabelSize(), getLabelColor(value))}>
          {label}
        </span>
      )}
    </div>
  )
})

CircularProgress.displayName = "CircularProgress"

export { CircularProgress }

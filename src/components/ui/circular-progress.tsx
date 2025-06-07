
import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  showPercentage?: boolean
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

  // Dynamic text sizing based on circle size
  const getTextSize = () => {
    if (size <= 40) return 'text-xs'
    if (size <= 60) return 'text-sm'
    return 'text-lg'
  }

  return (
    <div 
      ref={ref}
      className={cn("relative inline-flex items-center justify-center", className)}
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
        
        {/* Percentage in center - only show the score number */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-bold text-gray-900", getTextSize())}>
              {value}
            </span>
          </div>
        )}
      </div>
    </div>
  )
})

CircularProgress.displayName = "CircularProgress"

export { CircularProgress }

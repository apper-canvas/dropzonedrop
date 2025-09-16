import React from "react";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress = 0, 
  className = "",
  showLabel = true,
  size = "md",
  variant = "primary"
}) => {
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  
  const variants = {
    primary: "bg-primary-500",
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
  };
  
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizes[size]
      )}>
        <div
          className={cn(
            "progress-fill rounded-full transition-all duration-300 ease-out",
            variants[variant]
          )}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
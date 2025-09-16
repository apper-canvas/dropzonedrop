import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import ProgressBar from "@/components/atoms/ProgressBar";

const UploadProgress = ({ 
  totalFiles, 
  completedFiles, 
  currentProgress, 
  className = "" 
}) => {
  const overallProgress = totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0;
  const isCompleted = completedFiles === totalFiles && totalFiles > 0;
  
  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
      isCompleted && "success-pulse",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200",
            isCompleted ? "bg-success-500 text-white" : "bg-primary-100 text-primary-600"
          )}>
            <ApperIcon 
              name={isCompleted ? "CheckCircle" : "Upload"} 
              size={24}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {isCompleted ? "Upload Complete!" : "Uploading Files"}
            </h3>
            <p className="text-sm text-gray-500">
              {completedFiles} of {totalFiles} files completed
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(overallProgress)}%
          </div>
          <div className="text-xs text-gray-500">
            Overall Progress
          </div>
        </div>
      </div>
      
      <ProgressBar 
        progress={overallProgress}
        variant={isCompleted ? "success" : "primary"}
        size="lg"
        showLabel={false}
      />
      
      {!isCompleted && currentProgress > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          Current file: {currentProgress}%
        </div>
      )}
    </div>
  );
};

export default UploadProgress;
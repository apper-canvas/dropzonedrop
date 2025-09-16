import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  className = "" 
}) => {
  return (
    <div className={cn("max-w-md mx-auto text-center py-12", className)}>
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="AlertCircle" size={40} className="text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Upload Error
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm mx-auto">
        {message}. Please check your connection and try again.
      </p>
      
      {onRetry && (
        <div className="space-y-4">
          <Button
            variant="primary"
            onClick={onRetry}
            className="min-w-32"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>If the problem persists, try:</p>
            <ul className="mt-2 space-y-1 text-left max-w-xs mx-auto">
              <li>• Check your internet connection</li>
              <li>• Refresh the page</li>
              <li>• Try uploading smaller files</li>
              <li>• Contact support if issues continue</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Error;
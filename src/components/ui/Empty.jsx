import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No files uploaded yet",
  message = "Get started by uploading your first files",
  actionText = "Choose Files",
  onAction,
  className = "" 
}) => {
  return (
    <div className={cn("max-w-md mx-auto text-center py-16", className)}>
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="Upload" size={48} className="text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        {message}. Drag and drop files or click the button below to get started.
      </p>
      
      {onAction && (
        <div className="space-y-6">
          <Button
            variant="primary"
            size="lg"
            onClick={onAction}
          >
            <ApperIcon name="FolderOpen" size={18} className="mr-2" />
            {actionText}
          </Button>
          
          <div className="text-sm text-gray-400">
            <p className="mb-3">Supported features:</p>
            <div className="flex justify-center gap-8 text-xs">
              <div className="flex items-center gap-1">
                <ApperIcon name="Image" size={14} />
                <span>Images</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="FileText" size={14} />
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="Archive" size={14} />
                <span>Archives</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empty;
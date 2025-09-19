import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ProgressBar from "@/components/atoms/ProgressBar";
import { formatFileSize, getFileTypeIcon } from "@/utils/fileUtils";

const FileItem = ({ 
  uploadFile, 
  onRemove, 
  className = "" 
}) => {
  const getStatusVariant = (status) => {
    const statusMap = {
      pending: "pending",
      uploading: "primary",
      completed: "success",
      error: "error",
    };
    return statusMap[status] || "default";
  };
  
  const getStatusText = (status) => {
    const statusMap = {
      pending: "Pending",
      uploading: "Uploading",
      completed: "Completed",
      error: "Error",
    };
    return statusMap[status] || status;
  };

  return (
    <div className={cn(
      "file-item-enter bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200",
      uploadFile.status === "completed" && "bg-green-50 border-green-200",
      uploadFile.status === "error" && "bg-red-50 border-red-200",
      className
    )}>
      <div className="flex items-start gap-3">
        {/* File Icon or Preview */}
        <div className="flex-shrink-0">
          {uploadFile.preview ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={uploadFile.preview} 
                alt={uploadFile.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <ApperIcon 
                name={getFileTypeIcon(uploadFile.type)} 
                size={20}
                className="text-gray-500"
              />
            </div>
          )}
        </div>
        
        {/* File Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {uploadFile.name}
</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatFileSize(uploadFile.size)}
              </p>
{uploadFile.type.startsWith('image/') && (
                <p className="text-xs text-blue-600 mt-1 italic">
                  {uploadFile.isAnalyzing ? (
                    <span className="animate-pulse">Analyzing image...</span>
                  ) : uploadFile.description ? (
                    uploadFile.description
                  ) : uploadFile.status === 'completed' ? (
                    'Description unavailable'
                  ) : null}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge 
                variant={getStatusVariant(uploadFile.status)}
                size="sm"
              >
                {getStatusText(uploadFile.status)}
              </Badge>
              
              {uploadFile.status === "pending" && onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(uploadFile.id)}
                  className="p-1 h-6 w-6"
                >
                  <ApperIcon name="X" size={14} />
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          {uploadFile.status === "uploading" && (
            <div className="mt-3">
              <ProgressBar 
                progress={uploadFile.progress}
                size="sm"
                showLabel={false}
              />
            </div>
          )}
          
          {/* Error Message */}
          {uploadFile.status === "error" && uploadFile.error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
              {uploadFile.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileItem;
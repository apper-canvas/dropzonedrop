import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DropZone = ({ 
  onFileSelect, 
  accept = "*/*", 
  multiple = true,
  disabled = false,
  className = "" 
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter === 1) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer",
        "border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50",
        isDragOver && "drop-zone-active border-primary-500 bg-primary-100 scale-[1.02]",
        disabled && "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-gray-50",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div className="space-y-4">
        <div className={cn(
          "mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200",
          isDragOver && "bg-primary-500 text-white scale-110"
        )}>
          <ApperIcon 
            name={isDragOver ? "Upload" : "Upload"} 
            size={32}
            className={isDragOver ? "text-white" : "text-primary-500"}
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {isDragOver ? "Drop files here" : "Drop files to upload"}
          </h3>
          <p className="text-sm text-gray-500">
            or click to browse from your computer
          </p>
        </div>
        
        <Button
          variant="primary"
          size="lg"
          className="mt-6"
          onClick={(e) => {
            e.stopPropagation();
            openFileDialog();
          }}
          disabled={disabled}
        >
          <ApperIcon name="FolderOpen" size={18} className="mr-2" />
          Choose Files
        </Button>
      </div>
    </div>
  );
};

export default DropZone;
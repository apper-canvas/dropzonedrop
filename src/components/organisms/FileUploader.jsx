import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUploadConfig, uploadFile } from "@/services/api/uploadService";
import { createFilePreview, validateFile } from "@/utils/fileUtils";
import ApperIcon from "@/components/ApperIcon";
import FileItem from "@/components/molecules/FileItem";
import UploadProgress from "@/components/molecules/UploadProgress";
import DropZone from "@/components/molecules/DropZone";
import Button from "@/components/atoms/Button";

const FileUploader = () => {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [config, setConfig] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    total: 0,
    completed: 0,
    currentProgress: 0
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const uploadConfig = await getUploadConfig();
      setConfig(uploadConfig);
    } catch (error) {
      toast.error("Failed to load upload configuration");
    }
  };

  const handleFileSelect = async (files) => {
    if (!config) return;
    
    const newFiles = [];
    
    for (const file of files) {
      // Check if file already exists
      const exists = uploadFiles.some(uf => uf.name === file.name && uf.size === file.size);
      if (exists) {
        toast.warning(`File "${file.name}" is already in the queue`);
        continue;
      }
      
      // Validate file
      const errors = validateFile(file, config);
      if (errors.length > 0) {
        toast.error(`${file.name}: ${errors.join(", ")}`);
        continue;
      }
      
      // Check total file limit
      if (uploadFiles.length + newFiles.length >= config.maxFiles) {
        toast.warning(`Maximum ${config.maxFiles} files allowed`);
        break;
      }
      
// Create preview if it's an image
      const preview = await createFilePreview(file);
      const uploadFileObj = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "pending",
        progress: 0,
        file: file,
        preview: preview,
        error: null,
        description: null,
        isAnalyzing: false
      };
      
      newFiles.push(uploadFileObj);
    }
    
    if (newFiles.length > 0) {
      setUploadFiles(prev => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added to queue`);
    }
  };

  const removeFile = (fileId) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
    toast.info("File removed from queue");
  };

  const clearCompleted = () => {
    setUploadFiles(prev => prev.filter(f => f.status !== "completed"));
    toast.info("Completed files cleared");
  };

  const clearAll = () => {
    if (isUploading) {
      toast.warning("Cannot clear files while uploading");
      return;
    }
    setUploadFiles([]);
    setUploadStats({ total: 0, completed: 0, currentProgress: 0 });
    toast.info("All files cleared");
  };

  const startUpload = async () => {
    const pendingFiles = uploadFiles.filter(f => f.status === "pending");
    
    if (pendingFiles.length === 0) {
      toast.warning("No files to upload");
      return;
    }
    
    setIsUploading(true);
    setUploadStats({
      total: pendingFiles.length,
      completed: 0,
      currentProgress: 0
    });
    
let completed = 0;
    
    for (const fileToUpload of pendingFiles) {
      try {
        // Update file status to uploading
        setUploadFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? { ...f, status: "uploading", progress: 0, error: null }
            : f
        ));
// Upload file with progress tracking
        const uploadedFile = await uploadFile(fileToUpload.file, (progress) => {
          setUploadFiles(prev => prev.map(f => 
            f.id === fileToUpload.id 
              ? { ...f, progress: progress }
              : f
          ));
          setUploadStats(prev => ({ ...prev, currentProgress: progress }));
        });

        // Update file with server response including AI description
        setUploadFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? { 
                ...f, 
                status: "completed",
                description: uploadedFile.description,
                isAnalyzing: uploadedFile.isAnalyzing
              }
            : f
        ));
        
        // Mark as completed
        setUploadFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? { ...f, status: "completed", progress: 100 }
            : f
        ));
        
        completed++;
        setUploadStats(prev => ({ ...prev, completed: completed }));
        
      } catch (error) {
        // Mark as error
        setUploadFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? { ...f, status: "error", error: error.message }
            : f
        ));
        toast.error(`Failed to upload ${fileToUpload.name}: ${error.message}`);
      }
    }
    
    setIsUploading(false);
    setUploadStats(prev => ({ ...prev, currentProgress: 0 }));
    
    if (completed > 0) {
      toast.success(`Successfully uploaded ${completed} file(s)`);
    }
  };

  const pendingFiles = uploadFiles.filter(f => f.status === "pending");
  const completedFiles = uploadFiles.filter(f => f.status === "completed");
  const hasFiles = uploadFiles.length > 0;
  const canUpload = pendingFiles.length > 0 && !isUploading;

  if (!config) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Drop Zone */}
      <DropZone 
        onFileSelect={handleFileSelect}
        disabled={isUploading}
        accept={config.allowedTypes.join(",")}
        multiple={true}
      />
      
      {/* Upload Progress */}
      {isUploading && (
        <UploadProgress 
          totalFiles={uploadStats.total}
          completedFiles={uploadStats.completed}
          currentProgress={uploadStats.currentProgress}
        />
      )}
      
      {/* File List */}
      {hasFiles && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Upload Queue ({uploadFiles.length})
            </h3>
            
            <div className="flex items-center gap-3">
              {canUpload && (
                <Button
                  variant="primary"
                  onClick={startUpload}
                  disabled={isUploading}
                >
                  <ApperIcon name="Upload" size={16} className="mr-2" />
                  Upload {pendingFiles.length} File{pendingFiles.length !== 1 ? "s" : ""}
                </Button>
              )}
              
              {completedFiles.length > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearCompleted}
                  disabled={isUploading}
                >
                  <ApperIcon name="Check" size={16} className="mr-1" />
                  Clear Completed
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                disabled={isUploading}
              >
                <ApperIcon name="X" size={16} className="mr-1" />
                Clear All
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {uploadFiles.map(uploadFile => (
              <FileItem
                key={uploadFile.id}
                uploadFile={uploadFile}
                onRemove={uploadFile.status === "pending" ? removeFile : null}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Upload Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <ApperIcon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Upload Guidelines:</p>
            <ul className="space-y-1 text-blue-600">
              <li>• Maximum file size: {Math.round(config.maxFileSize / (1024 * 1024))}MB</li>
              <li>• Maximum files: {config.maxFiles} files at once</li>
              <li>• Supported formats: Images, PDFs, Documents, Archives</li>
              <li>• Drag and drop multiple files or click to browse</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
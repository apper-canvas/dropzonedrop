import uploadConfig from "@/services/mockData/uploadConfig.json";
import { convertImageToBase64 } from "@/utils/fileUtils";

let uploadHistory = [];
let currentUploads = new Map();

const simulateUpload = async (file, onProgress) => {
  return new Promise(async (resolve, reject) => {
    const uploadId = Math.random().toString(36).substr(2, 9);
    let progress = 0;
    
    // Random upload duration between 2-8 seconds
    const duration = Math.random() * 6000 + 2000;
    const interval = 100; // Update every 100ms
    const increment = (100 * interval) / duration;
    
    const timer = setInterval(async () => {
      progress += increment + Math.random() * 5; // Add some randomness
      progress = Math.min(progress, 100);
      
      onProgress(Math.floor(progress));
      
      if (progress >= 100) {
        clearInterval(timer);
        currentUploads.delete(uploadId);
        
        // Simulate 5% failure rate
        if (Math.random() < 0.05) {
          reject(new Error("Upload failed due to network error"));
        } else {
          const uploadedFile = {
            id: uploadHistory.length + 1,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString(),
            url: URL.createObjectURL(file),
            description: null,
            isAnalyzing: false
          };

        uploadHistory.push(uploadedFile);

        // Analyze image if it's an image file
if (file.type.startsWith('image/')) {
          uploadedFile.isAnalyzing = true;
          
          try {
            // Convert image to base64
            const imageBase64 = await convertImageToBase64(file);
            
            // Initialize ApperClient for edge function calls
            const { ApperClient } = window.ApperSDK;
            const apperClient = new ApperClient({
              apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
              apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
            });

            // Call AI analysis edge function
            const result = await apperClient.functions.invoke(import.meta.env.VITE_ANALYZE_IMAGE, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                imageBase64: imageBase64,
                fileName: file.name
              })
            });

            if (result.success) {
              uploadedFile.description = result.description;
            } else {
              console.warn('AI analysis failed:', result.error);
              uploadedFile.description = 'Image analysis unavailable';
            }
          } catch (error) {
            console.error('Image analysis error:', error);
            uploadedFile.description = 'Image analysis failed';
          } finally {
            uploadedFile.isAnalyzing = false;
          }
        }

        resolve(uploadedFile);
      }
      }
    }, interval);
    
    currentUploads.set(uploadId, { timer, file });
    
    // Store the uploadId for potential cancellation
    return uploadId;
  });
};

export const uploadFile = async (file, onProgress = () => {}) => {
  // Add small delay to show loading state
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return simulateUpload(file, onProgress);
};

export const uploadMultipleFiles = async (files, onProgress = () => {}) => {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const result = await uploadFile(file, (progress) => {
        onProgress(i, progress);
      });
      results.push({ file, result, success: true });
    } catch (error) {
      results.push({ file, error: error.message, success: false });
    }
  }
  
  return results;
};

export const getUploadConfig = async () => {
  // Add small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return uploadConfig;
};

export const getUploadHistory = async () => {
  // Add small delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return [...uploadHistory];
};

export const cancelUpload = (uploadId) => {
  const upload = currentUploads.get(uploadId);
  if (upload) {
    clearInterval(upload.timer);
    currentUploads.delete(uploadId);
    return true;
  }
  return false;
};
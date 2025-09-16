export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const getFileTypeIcon = (type) => {
  if (type.startsWith("image/")) return "Image";
  if (type.startsWith("video/")) return "Video";
  if (type.startsWith("audio/")) return "Music";
  if (type === "application/pdf") return "FileText";
  if (type.includes("document") || type.includes("word")) return "FileText";
  if (type.includes("spreadsheet") || type.includes("excel")) return "Sheet";
  if (type.includes("presentation") || type.includes("powerpoint")) return "Presentation";
  if (type.includes("zip") || type.includes("rar") || type.includes("7z")) return "Archive";
  return "File";
};

export const isImageFile = (type) => {
return type.startsWith("image/");
};

// Convert image file to base64 for OpenAI API
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // Extract base64 data (remove data:image/...;base64, prefix)
      const base64 = e.target.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (isImageFile(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
};

export const validateFile = (file, config) => {
  const errors = [];
  
  if (file.size > config.maxFileSize) {
    errors.push(`File size exceeds ${formatFileSize(config.maxFileSize)}`);
  }
  
  if (config.allowedTypes.length > 0 && !config.allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }
  
  return errors;
};
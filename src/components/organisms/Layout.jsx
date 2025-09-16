import React from "react";
import { Outlet } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Upload" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  Drop Zone
                </h1>
                <p className="text-xs text-gray-500">File Upload Center</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <ApperIcon name="Shield" size={16} className="text-green-500" />
                  <span>Secure Upload</span>
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Zap" size={16} className="text-blue-500" />
                  <span>Fast Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Your Files
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Drag and drop files or click to browse. Fast, secure, and reliable file uploading 
              with real-time progress tracking and comprehensive format support.
            </p>
          </div>
          
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2024 Drop Zone. Built for seamless file uploading.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ApperIcon name="Lock" size={14} />
                Secure
              </span>
              <span className="flex items-center gap-1">
                <ApperIcon name="Smartphone" size={14} />
                Mobile-Friendly
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
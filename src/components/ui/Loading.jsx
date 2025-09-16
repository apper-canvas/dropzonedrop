import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className = "" }) => {
  return (
    <div className={cn("max-w-4xl mx-auto p-6", className)}>
      <div className="animate-pulse space-y-8">
        {/* Drop Zone Skeleton */}
        <div className="h-64 bg-gray-200 rounded-xl border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 rounded w-48"></div>
              <div className="h-4 bg-gray-300 rounded w-64"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
          </div>
        </div>
        
        {/* File List Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-300 rounded w-24"></div>
              <div className="h-10 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-300 rounded w-48"></div>
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                      </div>
                      <div className="h-6 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Info Box Skeleton */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-300 rounded flex-shrink-0 mt-0.5"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
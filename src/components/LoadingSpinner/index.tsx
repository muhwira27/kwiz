import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-40">
      <div className="flex flex-col items-center space-y-2">
        <div className="border-t-border-b-2 mb-4 h-20 w-20 animate-spin rounded-full border-b-2 border-gray-300"></div>
        <p className="text-lg text-white">Loading...</p>
      </div>
    </div>
  );
}

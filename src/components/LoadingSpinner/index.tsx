import React from 'react';

export default function LoadingSpinner({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-600/40">
      <div className="flex flex-col items-center space-y-2">
        <div className="mb-4 h-20 w-20 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
        {text ? <p className="text-lg text-white">{text}</p> : null}
      </div>
    </div>
  );
}

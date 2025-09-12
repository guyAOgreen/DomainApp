import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  );
};

export default Loader;
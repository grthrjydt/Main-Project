
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
        <div className="relative w-24 h-24">
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-white"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-full bg-red-600"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-black"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-black"></div>
            <div className="animate-spin absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-500"></div>
        </div>
    </div>
  );
};

export default Loader;

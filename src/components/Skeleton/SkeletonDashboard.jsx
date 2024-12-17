import React from 'react';
import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';

const SkeletonDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" /> {/* Title */}
        <Skeleton className="h-4 w-[300px]" /> {/* Subtitle */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill(null).map((_, i) => (
          <div key={`stat-${i}`} className="p-4 border rounded-lg">
            <Skeleton className="h-4 w-20 mb-2" /> {/* Stat Label */}
            <Skeleton className="h-8 w-24" /> {/* Stat Value */}
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(null).map((_, i) => (
          <SkeletonCard key={`card-${i}`} />
        ))}
      </div>

      {/* Activity Section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-[150px]" /> {/* Section Title */}
        <div className="space-y-3">
          {Array(5).fill(null).map((_, i) => (
            <div key={`activity-${i}`} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full max-w-[300px]" /> {/* Activity text */}
                <Skeleton className="h-3 w-24" /> {/* Timestamp */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;

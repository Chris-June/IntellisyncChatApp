import React from 'react';
import Skeleton from './Skeleton';

const SkeletonCard = () => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/2" /> {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" /> {/* Content line 1 */}
          <Skeleton className="h-3 w-4/5" /> {/* Content line 2 */}
          <Skeleton className="h-3 w-2/3" /> {/* Content line 3 */}
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" /> {/* Name */}
            <Skeleton className="h-3 w-32" /> {/* Role */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

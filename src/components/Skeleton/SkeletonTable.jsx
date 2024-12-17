import React from 'react';
import Skeleton from './Skeleton';

const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex space-x-4">
          {Array(columns).fill(null).map((_, i) => (
            <Skeleton
              key={`header-${i}`}
              className="h-4 w-24"
            />
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="space-y-4 pt-4">
        {Array(rows).fill(null).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-4">
            {Array(columns).fill(null).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-4 w-24"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;

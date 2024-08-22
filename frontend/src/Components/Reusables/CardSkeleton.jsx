import React from 'react';
import Skeleton from './Skeleton'
import Shimmer from './Shimmer';

function CardSkeleton() {
    return (
      <div className="md:w-[18.4%] w-[49%] min-w-[150px] px-2 py-2  relative transition-all h-auto bg-[#1a1a1a]   overflow-hidden duration-300 ease-in rounded-lg">
            <Skeleton type="img" />
            <Skeleton type="title" />
            <Skeleton type="text" />
        <Shimmer />
      </div>
    );
}

export default CardSkeleton
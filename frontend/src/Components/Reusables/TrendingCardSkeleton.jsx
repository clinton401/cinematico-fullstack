import React from 'react'

import Skeleton from "./Skeleton";
import Shimmer from "./Shimmer";
function TrendingCardSkeleton() {
  return (
    <div className="w-full  px-2 py-2  relative transition-all h-auto bg-[#1a1a1a]   overflow-hidden duration-300 ease-in rounded-lg">
      <Skeleton type="img2" />
      <Skeleton type="title" />
      <Skeleton type="text" />
      <Shimmer />
    </div>
  );
}

export default TrendingCardSkeleton

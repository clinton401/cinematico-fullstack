import React from 'react'
import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

function VideoCardSkeleton() {
  return (
    <div className="w-full min-h-[500px] h-dvh px-[2.5%] pb-8 pt-[70px] max-h-[1300px] xl:pt-[90px]  relative transition-all  rounded-lg overflow-hidden  duration-300 ease-in ">
      <div className="w-full h-full relative overflow-hidden">
        <Skeleton type="video_img" />
        <Shimmer />
      </div>
    </div>
  );
}

export default VideoCardSkeleton;

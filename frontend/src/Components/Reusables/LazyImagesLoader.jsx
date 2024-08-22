import React from 'react'
import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

function LazyImagesLoader({classes}) {
    const class1 =
      " w-full aspect-[1/0.75] 	 overflow-hidden  object-cover	mb-[10px] rounded ";
    const class2 =
        " w-full aspect-[1/0.5] object-center	 overflow-hidden  object-cover	mb-[10px] rounded";
    const class3 = "w-2/4 rounded-md overflow-hidden  shadow";
    const class4 = "w-full aspect-[1/0.5] block xl:hidden object-cover  overflow-hidden rounded-md shadow";
    const class5 = " w-full  object-cover  overflow-hidden rounded h-[400px]";
  return (
    <div
      className={`${classes === "class1" ? class1 : ""} ${
        classes === "class2" ? class2 : ""
        } ${classes === "class3" ? class3 : ""}
        ${
        classes === "class4" ? class4 : ""
      } 
        ${
        classes === "class5" ? class5 : ""
      } 
      ${
        classes === "iframe"
          ? "w-full xl:w-3/4 aspect-video xl:max-h-[500px] min-h-[250px] "
          : ""
      } relative`}
    >
      {classes === "class1" && <Skeleton type="img" />}
      {classes === "class2" && <Skeleton type="im2" />}
      {classes === "class3" && <Skeleton type="video_img" />}
      {classes === "iframe" && <Skeleton type="iframe" />}
      {classes === "class4" && <Skeleton type="class4" />}
      {classes === "class5" && <Skeleton type="class5" />}
      <Shimmer />
    </div>
  );
}

export default LazyImagesLoader

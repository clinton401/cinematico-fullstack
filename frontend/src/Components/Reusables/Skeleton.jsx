import React from 'react'
import Shimmer from './Shimmer';

function Skeleton({type}) {
    const classes = `skeleton ${type}`;
  return (
    <div
      className={`${classes} ${
      (  type === "iframe" || type === "class4" || type === "class5")
          ? "w-full h-full "
          : ""
      }`}
    >
      <Shimmer />
    </div>
  );
}

export default Skeleton

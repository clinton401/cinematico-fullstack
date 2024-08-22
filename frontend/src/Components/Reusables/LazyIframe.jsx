import React from 'react'

function LazyIframe({videoUrl}) {
  return (
    <iframe
      src={videoUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full xl:w-3/4 aspect-video xl:max-h-[500px] min-h-[250px]  "
    ></iframe>
  );
}

export default LazyIframe

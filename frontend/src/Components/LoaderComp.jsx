import React from 'react'
import Loader from './Reusables/Loader';

function LoaderComp() {
  return (
    <section
      className="w-full flex items-center px-[2.5%]  justify-center 
    bg-primary ipad:max-h-[900px] h-dvh min-h-[400px] "
      >
      <Loader />
    </section>
  );
}

export default LoaderComp

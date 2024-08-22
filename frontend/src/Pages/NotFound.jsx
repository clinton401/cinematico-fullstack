import React from 'react'
import NotFoundView from '../Components/Reusables/NotFoundView';
function NotFound() {
  return (
    <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
      <NotFoundView />
    </section>
  );
}

export default NotFound

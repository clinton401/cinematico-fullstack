import React from 'react'
import tmdb from '../assets/tmdb-logo.svg'
function Footer() {
  return (
    <footer className="w-full px-4 pb-10 flex flex-col gap-2 items-center justify-center">
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer "
        className="text-white flex flex-col gap-1 items-center justify-center font-xs"
      >
        <p>Powered by</p>
        <img src={tmdb} alt="tmdb logo" className="w-[150px]" />
      </a>
    </footer>
  );
}

export default Footer

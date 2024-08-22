import React, { createContext, useContext, useEffect, useState } from 'react'
import { myContext } from '../App'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
export const movieContext = createContext();
function Movie() {
     const { scrollToTop } =
       useContext(myContext);
    const { movieId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        scrollToTop()
    }, [])
    useEffect(() => {
        if (!movieId) {
    navigate("popular")
}
      }, [movieId])
  
    const movieValues = {
        movieId: movieId && movieId.toLowerCase()
    }
  return (
    <main className="min-h-500px  px-5half  w-full ">
      <movieContext.Provider value={movieValues}>
        <Outlet  />
      </movieContext.Provider>
      
    </main>
  );
}

export default Movie

import React, { createContext, useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import { Outlet, useNavigate, useParams } from "react-router-dom";
export const genresContext = createContext();
function Genres() {
  const { scrollToTop, movieType } = useContext(myContext);
  const { genresId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
      if (!genresId) {
          if (movieType === 'movie') { navigate("28") } else {navigate("10759");}
    }
  }, [genresId]);
  const genresValues = {
    genresId: genresId && genresId.toLowerCase(),
  };
  return (
    <main className="min-h-500px  px-5half  w-full ">
      <genresContext.Provider value={genresValues}>
        <Outlet />
      </genresContext.Provider>
    </main>
  );
}

export default Genres;

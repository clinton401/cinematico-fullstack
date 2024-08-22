import React, { createContext, useContext, useEffect } from "react";
import { myContext } from "../App";
import { Outlet, useNavigate, useParams } from "react-router-dom";
export const tvContext = createContext();
function TvShow() {
  const { scrollToTop } =
    useContext(myContext);
  const { tvId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    if (!tvId) {
      navigate("popular");
    }
  }, [tvId]);
  
  const tvValues = {
    tvId: tvId && tvId.toLowerCase(),
  };
  return (
    <main className="min-h-500px  px-5half  w-full ">
      <tvContext.Provider value={tvValues}>
        <Outlet />
      </tvContext.Provider>
      
    </main>
  );
}

export default TvShow;

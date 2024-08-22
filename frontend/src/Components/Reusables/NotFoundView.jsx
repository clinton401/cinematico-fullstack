import React from "react";

import { useNavigate } from "react-router-dom";
function NotFoundView() {
  const navigate = useNavigate();
  return (
    <>
      
 
      <h2 className="font-[900] text-2xl font-cinzel text-white text-center w-full">
        404 - PAGE NOT FOUND
      </h2>
      <p className="w-full ipad:w-3/4  text-white text-center">
        The page you are looking for might have been removed had its name
        changes or is temporary unavailable{" "}
      </p>
      <button
        className="button2 text-lg" 
        id="active"
        onClick={() => {
          navigate(`/`);
        }}
      >
        GO TO HOMEPAGE
      </button>
    </>
  );
}

export default NotFoundView;

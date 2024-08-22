import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import LazyImagesLoader from "./LazyImagesLoader";
const LazyImages = React.lazy(() => import("./LazyImages"));
function TrendingCard({title, img, year, type, id, count}) {
    const navigate = useNavigate()
    const newType = type.charAt(0).toUpperCase() + type.slice(1);
     const routeHandler = () => navigate(`/details/${type}/${id}`);
  return (
    <button
      className="w-full  px-2 py-2  relative transition-all h-auto hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:shadow-lg hover:shadow-lg outline-none   overflow-hidden duration-300 ease-in rounded-lg"
      onClick={routeHandler}
    >
      <Suspense fallback={<LazyImagesLoader classes="class2" />}>
        <LazyImages
          imageUrl={img}
          title={title}
          styles="w-full aspect-[1/0.5] object-center	 object-cover	mb-[10px] rounded "
        />
      </Suspense>
      

      <ul className="flex items-center text-xs gap-6">
        <li className="list-none text-base">{count}</li>
        {year && <li className="list-disc">{year}</li>}

        {newType === "Movie" ? (
          <li className="list-disc	">
            {" "}
            <FontAwesomeIcon icon={faFilm} className="text-[12px]" />
          </li>
        ) : (
          <li className="list-disc	">
            {" "}
            <FontAwesomeIcon icon={faTv} className="text-[12px]" />
          </li>
        )}
        <li className="list-disc	">{newType}</li>
      </ul>

      <h2 className="text-xl font-black text-left w-full ellipsis_container">
        {title}
      </h2>
    </button>
  );
}

export default TrendingCard

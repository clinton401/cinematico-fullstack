import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LazyImagesLoader from "./LazyImagesLoader";
const LazyImages = React.lazy(() => import('./LazyImages'))
function Card({ title, img, year, type, id }) {
  const navigate = useNavigate();
  const newType = type.charAt(0).toUpperCase() + type.slice(1);
  const routeHandler = () => navigate(`/details/${type}/${id}`);

  return (
    <button
      className="md:w-[18.4%] w-[49%] min-w-[150px] px-2 py-2  relative transition-all h-auto hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] focus:shadow-lg hover:shadow-lg outline-none   duration-300 ease-in rounded-lg"
      onClick={routeHandler}
    >
      <Suspense fallback={<LazyImagesLoader classes='class1' />}>
        <LazyImages
          imageUrl={img}
          title={title}
          styles="w-full aspect-[1/0.75] object-center	 object-cover	mb-[10px] rounded "
        />
      </Suspense>
    
      <ul className="flex items-center text-xs gap-6">
        {year && <li className="list-none">{year}</li>}

        {newType === "Movie" ? (
          <li className={`${year ? "list-disc" : "list-none"}	`}>
            {" "}
            <FontAwesomeIcon icon={faFilm} className="text-[12px]" />
          </li>
        ) : (
          <li className={`${year ? "list-disc" : "list-none"}	`}>
            {" "}
            <FontAwesomeIcon icon={faTv} className="text-[12px]" />
          </li>
        )}
        <li className="list-disc	">{newType}</li>
      </ul>

      <h2 className="text-lg font-black text-left w-full ellipsis_container">
        {title}
      </h2>
    </button>
  );
}

export default Card;

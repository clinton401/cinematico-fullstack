import React , {useState, useEffect, Suspense} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import LazyImagesLoader from "./LazyImagesLoader";
const LazyImages = React.lazy(() => import("./LazyImages"));
function VideoCard({ type, img, title, details, year, img2, id }) {
    const [backgroundImage, setBackgroundImage] = useState(img2);
    const navigate = useNavigate()
    const newType = type.charAt(0).toUpperCase() + type.slice(1);
     const routeHandler = () => navigate(`/details/${type}/${id}`);
 useEffect(() => {
   function handleResize() {
     if (window.innerWidth >= 1000) {
       setBackgroundImage(img);
     } else {
       setBackgroundImage(img2);
     }
   }
handleResize()
   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
 }, []);
  return (
    <div
      className="w-full min-h-[500px] h-dvh px-[2.5%]  py-[70px] max-h-[1300px] xl:pt-[90px]  relative transition-all bg-cover xl:bg-repeat bg-no-repeat bg-center overflow-hidden duration-300 ease-in mb-8  flex gap-4 justify-center flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-0 left-0 flex px-[2.5%] pb-8 pt-[70px] w-full h-full z-10  items-center xl:pt-[90px] ">
        <section className="justify-center flex flex-col gap-4   xl:w-2/4">
          <h1 className="text-3xl text-white font-black font-cinzel ">
            {title}
          </h1>
          <div className="flex gap-4 items-center ">
            {" "}
            <span className="bg-white py-1 px-2 text-black text-sm rounded-sm">
              {newType}
            </span>
            {year && (
              <p>
                {" "}
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />{" "}
                {year}
              </p>
            )}
          </div>
          <p className="font-xs">{details.substring(0, 200)}</p>
          <span>
            <button className="button2" onClick={routeHandler}>
              More info
            </button>
          </span>
        </section>
        <section className="xl:w-2/4 hidden xl:flex items-center justify-center">
          <Suspense fallback={<LazyImagesLoader classes="class3" />}>
            <LazyImages
              imageUrl={img2}
              title={title}
              styles="w-2/4 rounded-md shadow"
            />
          </Suspense>
        
        </section>
      </div>

      <div className="absolute  top-0 left-0 w-full h-full bg-[#00000080] xl:backdrop-blur-[2px] z-[1]"></div>
    </div>
  );
}

export default VideoCard

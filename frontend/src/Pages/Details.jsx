import React, { useContext, useState, useEffect, Suspense } from "react";
import { myContext } from "../App";
import { useParams } from "react-router-dom";
import NotFoundView from "../Components/Reusables/NotFoundView";
import axios from "axios";
import Loader from "../Components/Reusables/Loader";
import moviePoster from "../assets/movie poster.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faStar,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  faImdb,
} from "@fortawesome/free-brands-svg-icons";
import Card from "../Components/Reusables/Card";
import LazyImagesLoader from "../Components/Reusables/LazyImagesLoader";
const LazyIframe = React.lazy(() =>
  import("../Components/Reusables/LazyIframe")
);
const LazyImages = React.lazy(() =>
  import("../Components/Reusables/LazyImages")
);
function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [detailsError, setDetailsError] = useState(false);
  const [detailsImagesData, setDetailsImagesData] = useState([]);
  const [detailsImagesLoading, setDetailsImagesLoading] = useState(true);
  const [detailsImagesError, setDetailsImagesError] = useState(false);
  const [detailsCreditData, setDetailsCreditData] = useState([]);
  const [detailsCreditLoading, setDetailsCreditLoading] = useState(true);
  const [detailsCreditError, setDetailsCreditError] = useState(false);
  const [detailsVideosData, setDetailsVideosData] = useState([]);
  const [detailsVideosLoading, setDetailsVideosLoading] = useState(true);
  const [detailsVideosError, setDetailsVideosError] = useState(false);
  const [detailsSimilarData, setDetailsSimilarData] = useState([]);
  const [detailsSimilarLoading, setDetailsSimilarLoading] = useState(true);
  const [detailsSimilarError, setDetailsSimilarError] = useState(false);
  const [detailsOfficialVideos, setDetailsOfficialVideos] = useState([]);
  const {
    movieType,
    authParams,
    imgUrl,
    scrollToTop,
    setDocumentTitle,
    setMovieType,
  } = useContext(myContext);

  const { detailsId, detailsType } = useParams();
  const filters = ["movie", "tv"];
  const url =
    "https://api.themoviedb.org/3/tv/2734/similar?language=en-US&page=1";
  const url2 =
    "https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1";
  const fetchDetailsSimilarData = async () => {
    const url = `https://api.themoviedb.org/3/${detailsType}/${detailsId}/similar?language=en-US&page=1`;
    try {
      setDetailsSimilarLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setDetailsSimilarData(data);
        setDetailsSimilarError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setDetailsSimilarData([]);
      setDetailsSimilarError(true);
    } finally {
      setDetailsSimilarLoading(false);
    }
  };
  const fetchDetailsVideosData = async () => {
    const url = `https://api.themoviedb.org/3/${detailsType}/${detailsId}/videos?language=en-US`;
    try {
      setDetailsVideosLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setDetailsVideosData(data);
        setDetailsVideosError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setDetailsVideosData([]);
      setDetailsVideosError(true);
    } finally {
      setDetailsVideosLoading(false);
    }
  };
  const fetchDetailsCreditData = async () => {
    const url = `https://api.themoviedb.org/3/${detailsType}/${detailsId}/credits?language=en-US`;
    try {
      setDetailsCreditLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.cast;
        setDetailsCreditData(data);
        setDetailsCreditError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setDetailsCreditData([]);
      setDetailsCreditError(true);
    } finally {
      setDetailsCreditLoading(false);
    }
  };
  const fetchDetailsImagesData = async () => {
    const url = `https://api.themoviedb.org/3/${detailsType}/${detailsId}/images`;
    try {
      setDetailsImagesLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.backdrops;
        setDetailsImagesData(data);
        setDetailsImagesError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setDetailsImagesData([]);
      setDetailsImagesError(true);
    } finally {
      setDetailsImagesLoading(false);
    }
  };
  const fetchDetailsData = async () => {
    const url = `https://api.themoviedb.org/3/${detailsType}/${detailsId}?language=en-US`;
    try {
      setDetailsLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data;
        setDetailsData(data);
        setDetailsError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setDetailsData(null);
      setDetailsError(true);
    } finally {
      setDetailsLoading(false);
    }
  };
  useEffect(() => {
    if (detailsData && !dataError) {
      setDocumentTitle(
        `${
          detailsType === "movie" ? detailsData.title : detailsData.name
        } | Cinematico`
      );
    } else {
      setDocumentTitle("Cinematico");
    }
  }, [detailsData, dataError]);
  useEffect(() => {
    if (
      filters.includes(detailsType) &&
      !detailsError &&
      !detailsImagesError &&
      !detailsCreditError &&
      !detailsVideosError &&
      !detailsSimilarError
    ) {
      setDataError(false);
    } else {
      setDataError(true);
    }
  }, [
    detailsType,
    detailsError,
    detailsImagesError,
    detailsCreditError,
    detailsVideosError,
    detailsSimilarError,
  ]);
  useEffect(() => {
    if (
      !detailsLoading &&
      !detailsImagesLoading &&
      !detailsCreditLoading &&
      !detailsVideosLoading &&
      !detailsSimilarLoading
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [
    detailsLoading,
    detailsImagesLoading,
    detailsCreditLoading,
    detailsVideosLoading,
    detailsSimilarLoading,
  ]);
  useEffect(() => {
    if (detailsType && detailsId) {
      scrollToTop();
      fetchDetailsData();
      fetchDetailsImagesData();
      fetchDetailsCreditData();
      fetchDetailsVideosData();
      fetchDetailsSimilarData();
    }
  }, [detailsId, detailsType]);
  useEffect(() => {
    if (detailsVideosData.length > 0) {
      const filtered = detailsVideosData.filter((video) =>
        video.name.includes("Official Trailer")
      );
      setDetailsOfficialVideos(filtered);
    } else {
            setDetailsOfficialVideos([]);

    }
  }, [detailsVideosData]);

  return (
    <main className="w-full text-white px-5half ">
      {!dataError && !isLoading && (
        <>
          <section className="w-full pt-[150px] relative bg-no-repeat bg-cover bg-center pb-10 items-center flex justify-center ">
            {!detailsOfficialVideos.length > 0 &&
              !detailsVideosData.length > 0 &&
              detailsImagesData.length > 0 && (
                <Suspense fallback={<LazyImagesLoader classes="class4" />}>
                  <LazyImages
                    imageUrl={`${imgUrl}${detailsImagesData[0].file_path}`}
                    title={movieType}
                    styles="w-full block xl:hidden object-cover rounded-md shadow "
                  />
                </Suspense>
               
              )}
            {!detailsOfficialVideos.length > 0 &&
              !detailsVideosData.length > 0 &&
              !detailsImagesData.length > 0 && (
                <Suspense fallback={<LazyImagesLoader classes="class4" />}>
                  <LazyImages
                    imageUrl={moviePoster}
                    title={movieType}
                    styles="w-full block xl:hidden object-cover rounded-md shadow "
                  />
                </Suspense>
          
              )}
            {!detailsOfficialVideos.length > 0 &&
              detailsVideosData.length > 0 && (
                <Suspense fallback={<LazyImagesLoader classes="iframe" />}>
                  <LazyIframe
                    videoUrl={`https://www.youtube.com/embed/${detailsVideosData[0].key}`}
                  />
                </Suspense>
               
              )}
            {detailsOfficialVideos.length > 0 && (
              <Suspense fallback={<LazyImagesLoader classes="iframe" />}>
                <LazyIframe
                  videoUrl={`https://www.youtube.com/embed/${detailsOfficialVideos[0].key}`}
                />
              </Suspense>
           
            )}
          </section>
          <section className="w-full  flex items-center justify- pb-10   flex-wrap">
            <div className="xl:w-[20%] xl:block hidden">
              <Suspense fallback={<LazyImagesLoader classes="class5" />}>
                <LazyImages
                  imageUrl={
                    detailsData && detailsData.poster_path
                      ? `${imgUrl}${detailsData.poster_path}`
                      : moviePoster
                  }
                  title={movieType}
                  styles="w-full object-cover rounded h-[400px]"
                />
              </Suspense>
          
            </div>
            <div className="xl:w-[80%]  w-full  flex flex-col gap-4 justify-center pl-5half ">
              <span className="w-full flex items-center justify-between ">
                <h2 className="font-cinzel font-black    text-center text-2xl">
                  {detailsData && detailsType === "movie" && detailsData.title}
                  {detailsData && detailsType === "tv" && detailsData.name}
                </h2>
              </span>
              <div className="w-full flex items-center text-xs gap-4 flex-wrap ">
                {detailsData && (
                  <>
                    {detailsData.genres && detailsData.genres.length > 0 && (
                      <>
                        {detailsData.genres.map((gre) => (
                          <h6
                            className="p-2 rounded-lg bg-white text-black text-xs font-black"
                            key={gre.name}
                          >
                            {gre.name}
                          </h6>
                        ))}
                      </>
                    )}
                    {detailsType === "tv" &&
                      detailsData.first_air_date &&
                      detailsData.first_air_date.length > 3 && (
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="mr-1"
                          />{" "}
                          {detailsData.first_air_date.substring(0, 4)}
                        </p>
                      )}
                    {detailsType === "movie" &&
                      detailsData.release_date &&
                      detailsData.release_date.length > 3 && (
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="mr-2"
                          />{" "}
                          {detailsData.release_date.substring(0, 4)}
                        </p>
                      )}
                    {detailsType === "movie" && detailsData.runtime && (
                      <p>
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        {detailsData.runtime} mins
                      </p>
                    )}
                    {detailsType === "tv" && detailsData.number_of_seasons && (
                      <p>
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        {detailsData.number_of_seasons} seasons
                      </p>
                    )}
                    {detailsData.vote_average && detailsData.vote_average > 0 && (
                      <p >
                        <FontAwesomeIcon icon={faStar} className="mr-2" />
                        {Number(detailsData.vote_average).toFixed(1)}
                      </p>
                    )}
                  </>
                )}
              </div>
              {detailsData && detailsData.overview && (
                <p className="w-full ">{detailsData.overview}</p>
              )}
              <ul className="w-full list-none flex flex-col text-sm gap-2">
                {detailsData.genres && detailsData.genres.length > 0 && (
                  <li className="flex gap-1 flex-wrap font-light">
                    <p>
                      Genre <strong className="px-1"> :</strong>{" "}
                    </p>
                    {detailsData.genres.map((gnr, index) => {
                      return (
                        <React.Fragment key={gnr.name}>
                          <span className="flex">
                            <p>{gnr.name}</p>
                            {index < detailsData.genres.length - 1 && (
                              <span className="pr-[2px]">,</span>
                            )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </li>
                )}
                { detailsData.status && (
                  <li className=" flex    font-light">
                    Status <strong className="px-2"> :</strong>{" "}
                    {detailsData.status}
                  </li>
                )}
                {detailsType === "tv" && detailsData.first_air_date && (
                  <li className=" flex    font-light">
                    Date Released <strong className="px-2"> :</strong>{" "}
                    {detailsData.first_air_date}
                  </li>
                )}
                {detailsType === "movie" && detailsData.release_date && (
                  <li className=" flex  font-light">
                    Date Released <strong className="px-2"> :</strong>{" "}
                    {detailsData.release_date}
                  </li>
                )}

                {detailsData.production_companies &&
                  detailsData.production_companies.length > 0 && (
                    <li className="flex gap-1 flex-wrap  font-light">
                      {" "}
                      <p>
                        Production <strong className="px-1"> :</strong>{" "}
                      </p>
                      {detailsData.production_companies.map((gnr, index) => {
                        return (
                          <React.Fragment key={gnr.name}>
                            <span className="flex">
                              <p>{gnr.name}</p>
                              {index <
                                detailsData.production_companies.length - 1 && (
                                <span className="pr-[2px]">,</span>
                              )}
                            </span>
                          </React.Fragment>
                        );
                      })}
                    </li>
                  )}
                {detailsCreditData.length > 0 && (
                  <li className="flex gap-1 flex-wrap font-light">
                    {" "}
                    <p>
                      Cast <strong className="px-1"> :</strong>{" "}
                    </p>
                    {detailsCreditData.map((gnr, index) => {
                      return (
                        <React.Fragment key={gnr.name}>
                          <span className="flex ">
                            <p>{gnr.name}</p>
                            {index < detailsCreditData.length - 1 && (
                              <span className="pr-[2px]">,</span>
                            )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </li>
                )}
              </ul>
              {movieType === "movie" && detailsData && (
                <section className="w-full flex items-center flex-wrap gap-4">
                  {detailsData.homepage && detailsData.homepage.length > 0 && (
                    <a
                      className="button flex items-center gap-4 justify-center  active_btn"
                      href={detailsData.homepage}
                      target="_blank"
                      rel="noopener noreferrer "
                    >
                      Website <FontAwesomeIcon icon={faLink} />
                    </a>
                  )}
                  {movieType !== "tv" &&
                    detailsData.imdb_id &&
                    detailsData.imdb_id.length > 0 && (
                      <a
                        className="button justify-center  flex items-center gap-4   active_btn"
                        href={`https://www.imdb.com/title/${detailsData.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer "
                      >
                        Imdb <FontAwesomeIcon icon={faImdb} />
                      </a>
                    )}
                </section>
              )}
            </div>
          </section>
          {detailsSimilarData.length > 0 && (
            <section className="w-full  flex flex-col gap-4 justify- pb-10   ">
              <h2 className="font-bold text-xl text-left w-full">
                You may also like
              </h2>
              <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
                {detailsSimilarData.slice(0, 10).map((movie) => {
                  const releaseDate1 =
                    detailsType === "movie" &&
                    movie.release_date &&
                    movie.release_date.length > 3 &&
                    movie.release_date.substring(0, 4);
                  const releaseDate2 =
                    detailsType === "tv" &&
                    movie.first_air_date &&
                    movie.first_air_date.length > 3 &&
                    movie.first_air_date.substring(0, 4);
                  return (
                    <Card
                      key={movie.id}
                      img={
                        movie.poster_path
                          ? `${imgUrl}${movie.poster_path}`
                          : moviePoster
                      }
                      title={detailsType === "movie" ? movie.title : movie.name}
                      year={
                        detailsType === "movie" ? releaseDate1 : releaseDate2
                      }
                      id={movie.id}
                      type={detailsType}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}
      {!dataError && isLoading && (
        <section className="w-full flex items-center justify-center h-dvh max-h-[1300px] min-h-[500px] ">
          <Loader />
        </section>
      )}
      {dataError && (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
          <NotFoundView />
        </section>
      )}
    </main>
  );
}

export default Details;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import bgImage from "../assets/wide-image.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardSkeleton from "../Components/Reusables/CardSkeleton";
import VideoCardSkeleton from "../Components/Reusables/VideoCardSkeleton";
import Skeleton from "../Components/Reusables/Skeleton";
import TrendingCardSkeleton from "../Components/Reusables/TrendingCardSkeleton";
import VideoCard from "../Components/Reusables/VideoCard";
import { myContext } from "../App";
import Card from "../Components/Reusables/Card";
import TrendingCard from "../Components/Reusables/TrendingCard";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moviePoster from '../assets/movie poster.avif'
function Home() {


  const [dataError, setDataError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
  const [nowPlayingError, setNowPlayingError] = useState(false);
  const [trendingData, setTrendingData] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [trendingError, setTrendingError] = useState(false);
  const [topRatedData, setTopRatedData] = useState([]);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [topRatedError, setTopRatedError] = useState(false);
  const [popularData, setPopularData] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [popularError, setPopularError] = useState(false);
  const [upcomingData, setUpcomingData] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [upcomingError, setUpcomingError] = useState(false);
  const {
    authParams,
    imgUrl,
    scrollToTop,
    setDocumentTitle,
    movieType,
    setMovieType,
  } = useContext(myContext);
    const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  async function getNowPlaying() {
    const url =
      movieType === "movie"
        ? `https://api.themoviedb.org/3/${movieType}/now_playing?language=en-US&page=1`
        : "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
    try {
      setNowPlayingLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setNowPlayingData(data);
        setNowPlayingError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setNowPlayingData([]);
      setNowPlayingError(true);
    } finally {
      setNowPlayingLoading(false);
    }
  }
  async function getUpcoming() {
    const url =
      movieType === "movie"
        ? "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
        : "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1";
    try {
      setUpcomingLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setUpcomingData(data);
        setUpcomingError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setUpcomingData([]);
      setUpcomingError(true);
    } finally {
      setUpcomingLoading(false);
    }
  }
  async function getTopRated() {
    const url = `https://api.themoviedb.org/3/${movieType}/top_rated?language=en-US&page=1`;
    try {
      setTopRatedLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setTopRatedData(data);
        setTopRatedError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setTopRatedData([]);
      setTopRatedError(true);
    } finally {
      setTopRatedLoading(false);
    }
  }
  async function getTrending() {
    const url =
      `https://api.themoviedb.org/3/trending/${movieType}/day?language=en-US`;
    try {
      setTrendingLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setTrendingData(data);
        setTrendingError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setTrendingData([]);
      setTrendingError(true);
    } finally {
      setTrendingLoading(false);
    }
  }
  async function getPopular() {
    const url =
      `https://api.themoviedb.org/3/${movieType}/popular?language=en-US&page=1`;
    try {
      setPopularLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        setPopularData(data);
        setPopularError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setPopularData([]);
      setPopularError(true);
    } finally {
      setPopularLoading(false);
    }
  }
  useEffect(() => {
    setDocumentTitle('Cinematico')
  }, [])
  useEffect(() => {
    scrollToTop();
      getTrending();
      getPopular();
    getNowPlaying();
    getUpcoming();
    getTopRated();
    
    
  }, [movieType]);

  useEffect(() => {
    if (!nowPlayingLoading && !trendingLoading && !popularLoading && !upcomingLoading && !topRatedLoading ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [nowPlayingLoading, trendingLoading, popularLoading, upcomingLoading, topRatedLoading]);
  useEffect(() => {
    if (
      !nowPlayingError &&
      !trendingError &&
      !popularError &&
      !upcomingError &&
      !topRatedError
    ) {
      setDataError(false);
    } else {
      setDataError(true);
    }
  }, [
    nowPlayingError,
    trendingError,
    popularError,
    upcomingError,
    topRatedError,
  ]);
  function movieTypeHandler(param) {
    if (movieType !== param) {
      setIsLoading(true)
    setMovieType(param);
      
    }
  }
  
  return (
    <main className="   pb-10   text-white  max w-full ">
      {dataError && (
        <section className="w-full px-[2.5%] flex flex-col  max-h-[1300px] items-center justify-center gap-4 h-dvh min-h-[500px] ">
          <h1 className="text-xl font-[900] text-center w-full  pt-8 text-white sm:text-4xl">
            Something went wrong
          </h1>
          <div className="flex justify-center items-center">
            <button className="button2 text-lg " id="active" onClick={refreshHandler}>
              Click to refresh
            </button>
          </div>
        </section>
      )}
      {!dataError && isLoading && (
        <>
          <section className="w-full  ">
            <VideoCardSkeleton />
          </section>
          <section className="flex px-[2.5%] flex-wrap  gap-x-4 pb-8 items-center">
            <Skeleton type="btn" />
            <Skeleton type="btn" />
          </section>
          <section className="w-full px-[2.5%] pb-8">
            <div className="flex  justify-between items-center  ">
              <Skeleton type="title2" />
              <Skeleton type="title2" />
            </div>
            <div className="w-full sp_cont block sm:hidden">
              {" "}
              <Swiper
                pagination={{
                  type: "progressbar",
                }}
                spaceBetween={30}
                slidesPerView={1.3}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper flex items-center gap-20"
              >
                {numbers.map((nm) => {
                  return (
                    <SwiperSlide key={nm} className="w-[80%]">
                      <TrendingCardSkeleton />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="w-full sp_cont hidden sm:block">
              {" "}
              <Swiper
                pagination={{
                  type: "progressbar",
                }}
                spaceBetween={30}
                slidesPerView={3.3}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper flex items-center gap-20"
              >
                {numbers.map((nm) => {
                  return (
                    <SwiperSlide key={nm} className="w-[30%]">
                      <TrendingCardSkeleton />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </section>

          <section className="w-full px-[2.5%] pb-8">
            <div className="flex justify-between items-center  ">
              <Skeleton type="title2" />
              <Skeleton type="title2" />
            </div>
            <div className="w-full flex  flex-wrap  justify-center overflow-x-hidden gap-y-4 items-center gap-x-[2%]">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </section>
          <section className="w-full px-[2.5%] pb-8">
            <div className="flex justify-between items-center  ">
              <Skeleton type="title2" />
              <Skeleton type="title2" />
            </div>
            <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
              {" "}
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </section>
        </>
      )}
      {!dataError && !isLoading && (
        <>
          {nowPlayingData.length > 0 && (
            <section className="w-full pb-8"  id="home_nowplaying">
              <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {nowPlayingData.slice(0, 10).map((movie) => {
                  const releaseDate =
                    movieType === "movie"
                      ? movie.release_date.substring(0, 4)
                      : movie.first_air_date.substring(0, 4); 
                  return (
                    <SwiperSlide key={movie.id}>
                      <VideoCard
                        id={movie.id}
                        img={
                          movie.backdrop_path
                            ? `${imgUrl}${movie.backdrop_path}`
                            : moviePoster
                        }
                        img2={
                          movie.poster_path
                            ? `${imgUrl}${movie.poster_path}`
                            : moviePoster
                        }
                        title={movieType === "movie" ? movie.title : movie.name}
                        year={releaseDate}
                        type={movieType}
                        details={movie.overview}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          )}
          <section className="flex px-[2.5%] flex-wrap  gap-4 pb-8 items-center">
            <button
              className={`button2 ${movieType === "movie" ? "active" : ''}`}
              id={movieType === "movie" ? "active" : ''}
              onClick={() => movieTypeHandler("movie")}
            >
              Movies
            </button>
            <button
              className={`button2 ${movieType === "tv" ? "active" : ''}`}
              id={movieType === "tv" ? "active" : ''}
              onClick={() => movieTypeHandler("tv")}
            >
              Tv shows
            </button>
          </section>
          {trendingData.length > 0 && (
            <section className="w-full px-[2.5%] pb-8">
              <div className="flex flex-wrap justify-between pb-4 items-center">
                <h2 className="font-cinzel font-black flex  items-center text-lg xl:text-2xl">
                  Trending |{" "}
                  <span className="font-merri ml-2 text-sm ">
                    {movieType.charAt(0).toUpperCase() + movieType.slice(1)}
                  </span>
                </h2>
                <Link
                  to={`${movieType}/trending`}
                  className="text-sm focus:underline hover:underline outline-none font-merri"
                >
                  {" "}
                  More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
              <div className="w-full sp_cont block sm:hidden">
                {" "}
                <Swiper
                  pagination={{
                    type: "progressbar",
                  }}
                  spaceBetween={5}
                  slidesPerView={1.3}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper flex items-center gap-20"
                >
                  {trendingData.map((td, index) => {
                   const releaseDate =
                     movieType === "movie"
                       ? td.release_date.substring(0, 4)
                       : td.first_air_date.substring(0, 4); 

                    return (
                      <SwiperSlide key={td.id} className="w-[80%]">
                        <TrendingCard
                          id={td.id}
                          img={
                            td.poster_path
                              ? `${imgUrl}${td.poster_path}`
                              : moviePoster
                          }
                          title={movieType === "movie" ? td.title : td.name}
                          year={releaseDate}
                          type={movieType}
                          count={index + 1}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="w-full sp_cont hidden sm:block">
                {" "}
                <Swiper
                  pagination={{
                    type: "progressbar",
                  }}
                  spaceBetween={5}
                  slidesPerView={3.3}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper flex items-center gap-20"
                >
                  {trendingData.map((td, index) => {
                   const releaseDate =
                     movieType === "movie"
                       ? td.release_date.substring(0, 4)
                       : td.first_air_date.substring(0, 4); 

                    return (
                      <SwiperSlide key={td.id} className="w-[80%]">
                        <TrendingCard
                          id={td.id}
                          img={
                            td.poster_path
                              ? `${imgUrl}${td.poster_path}`
                              : moviePoster
                          }
                          title={movieType === "movie" ? td.title : td.name}
                          year={releaseDate}
                          type={movieType}
                          count={index + 1}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </section>
          )}
          {popularData.length > 0 && (
            <section className="w-full px-[2.5%] pb-8">
              <div className="flex flex-wrap justify-between pb-4 items-center">
                <h2 className="font-cinzel font-black flex  items-center text-lg xl:text-2xl">
                  Popular |{" "}
                  <span className="font-merri ml-2 text-sm ">
                    {movieType.charAt(0).toUpperCase() + movieType.slice(1)}
                  </span>
                </h2>
                <Link
                  to={`${movieType}/popular`}
                  className="text-sm focus:underline hover:underline outline-none font-merri"
                >
                  {" "}
                  More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
              <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
                {popularData.slice(0, 10).map((movie) => {
             const releaseDate =
               movieType === "movie"
                 ? movie.release_date.substring(0, 4)
                 : movie.first_air_date.substring(0, 4); 
                  return (
                    <Card
                      key={movie.id}
                      img={
                        movie.poster_path
                          ? `${imgUrl}${movie.poster_path}`
                          : moviePoster
                      }
                      title={movieType === "movie" ? movie.title : movie.name}
                      year={releaseDate}
                      id={movie.id}
                      type={movieType}
                    />
                  );
                })}
              </div>
            </section>
          )}
          {upcomingData.length > 0 && (
            <section className="w-full px-[2.5%] pb-8">
              <div className="flex flex-wrap justify-between pb-4 items-center">
                <h2 className="font-cinzel font-black flex  items-center text-lg xl:text-2xl">
                  Upcoming |{" "}
                  <span className="font-merri ml-2 text-sm ">
                    {movieType.charAt(0).toUpperCase() + movieType.slice(1)}
                  </span>
                </h2>
                <Link
                  to={`${movieType}/upcoming`}
                  className="text-sm focus:underline hover:underline outline-none font-merri"
                >
                  {" "}
                  More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
              <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
                {upcomingData.slice(0, 10).map((movie) => {
             const releaseDate =
               movieType === "movie"
                 ? movie.release_date.substring(0, 4)
                 : movie.first_air_date.substring(0, 4); 
                  return (
                    <Card
                      key={movie.id}
                      img={
                        movie.poster_path
                          ? `${imgUrl}${movie.poster_path}`
                          : moviePoster
                      }
                      title={movieType === "movie" ? movie.title : movie.name}
                      year={releaseDate}
                      id={movie.id}
                      type={movieType}
                    />
                  );
                })}
              </div>
            </section>
          )}
          {topRatedData.length > 0 && (
            <section className="w-full px-[2.5%] pb-8">
              <div className="flex flex-wrap justify-between pb-4 items-center">
                <h2 className="font-cinzel font-black flex  items-center text-lg xl:text-2xl">
                  Top rated |{" "}
                  <span className="font-merri ml-2 text-sm ">
                    {movieType.charAt(0).toUpperCase() + movieType.slice(1)}
                  </span>
                </h2>
                <Link
                  to={`${movieType}/top-rated`}
                  className="text-sm focus:underline hover:underline outline-none font-merri"
                >
                  {" "}
                  More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
              <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
                {topRatedData.slice(0, 10).map((movie) => {
             const releaseDate =
               movieType === "movie"
                 ? movie.release_date.substring(0, 4)
                 : movie.first_air_date.substring(0, 4); 
                  return (
                    <Card
                      key={movie.id}
                      img={
                        movie.poster_path
                          ? `${imgUrl}${movie.poster_path}`
                          : moviePoster
                      }
                      title={movieType === "movie" ? movie.title : movie.name}
                      year={releaseDate}
                      id={movie.id}
                      type={movieType}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      
    </main>
  );
}

export default Home;

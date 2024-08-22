import React, { useContext, useEffect, useState } from "react";
import Loader from "../Components/Reusables/Loader";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import NotFoundView from "./Reusables/NotFoundView";
import { movieContext } from "../Pages/Movie";
import axios from "axios";
import Card from "./Reusables/Card";
import LoaderMini from "./Reusables/LoaderMini";
import moviePoster from '../assets/movie poster.avif';
function MovieComp() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [miniLoading, setMiniLoading] = useState(false);
  const [miniError, setMinierror] = useState(false);
  const [searchUrl, setSearchUrl] = useState(null);
  const pathArray = [
    "popular",
    "now-playing",
    "top-rated",
    "upcoming",
    "trending",
  ];
//   let page = 1;

  const [totalPages, setTotalPages] = useState(1);
    const [pages, setPages] = useState(1);
      const [isNearBottom, setIsNearBottom] = useState(false);
  const { authParams, imgUrl, scrollToTop, setDocumentTitle } =
    useContext(myContext);
  const { movieId } = useContext(movieContext);
  const navigate = useNavigate();
    const trendingUrl =
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pages}`;
  const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pages}`;
  const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pages}`;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pages}`;
  const routeHandler = (path) => {
    if (path !== movieId) {
      setPages(1);
      navigate(`/movie/${path}`);
    }
     
  
  };
  async function getData() {
    try {
      setIsLoading(true);
      const response = await axios.get(searchUrl, authParams);
      if (response.status === 200) {
        const data = response.data.results;
        const tpg = response.data.total_pages
       
        setMovieData(data);
          setDataError(false);
          setTotalPages(tpg)
                  setPages(2);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
        setMovieData([]);
        setDataError(true);
        setTotalPages(0)
    } finally {
      setIsLoading(false);
    }
  }
    async function getNewData() {
        let newSearchUrl;
          const newpopularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pages}`;
          const newnowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pages}`;
          const newupcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pages}`;
          const newtopRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pages}`;
        if (movieId === "popular") { 
          newSearchUrl = newpopularUrl;
        } else if (movieId === "now-playing") {
          newSearchUrl = newnowPlayingUrl;
        } else if (movieId === "upcoming") {
          newSearchUrl = newupcomingUrl;
        } else if (movieId === "top-rated") {
          newSearchUrl = newtopRatedUrl;
        } else if (movieId === "trending") {
          newSearchUrl = trendingUrl;
        }

      if(pages <= totalPages && newSearchUrl) {
try {
  setMiniLoading(true);
  const response = await axios.get(newSearchUrl, authParams);
  if (response.status === 200) {
    const data = response.data;
    setMinierror(false);
    setMovieData((prevState) => [...prevState, ...data.results]);
    if (pages < totalPages +  1) {
     setPages(prev => prev + 1);
    }
  } else {
    throw new Error("Failed to fetch data");
  }
} catch (error) {
  console.log(error);
  //   setTopRatedData([]);
  setMinierror(true);
} finally {
  setMiniLoading(false);
}
      }
    
    }
    useEffect(() => {
        if (!dataError) {
            setDocumentTitle(
              `${
                movieId && movieId.charAt(0).toUpperCase() + movieId.slice(1)
              } | Movies`
            );
        } else {
            setDocumentTitle("Cinematico");
        }
      
    }, [movieId, dataError]);
    useEffect(() => {
      function handleScroll() {
          if (!dataError && !isLoading && movieId !== 'trending') {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we are within 100px from the bottom of the page
            if (documentHeight - (scrollPosition + windowHeight) <= 300) {
              setIsNearBottom(true);
            } else {
              setIsNearBottom(false);
            }
          }
        }
       
handleScroll()
      // Add scroll event listener when component mounts
      window.addEventListener("scroll", handleScroll);

      // Clean up event listener when component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [dataError, isLoading, movieId]);
    useEffect(() => {
        if(isNearBottom) {
            getNewData()
        }
    }, [isNearBottom])
useEffect(() => {
    if(searchUrl)
    {
      setPages(1)
        getData()
  }
}, [searchUrl])
  useEffect(() => {
    scrollToTop();
   
    if (!pathArray.includes(movieId)) {
      setDataError(true);
    } else if (movieId === "popular") {
      setSearchUrl(popularUrl);
    } else if (movieId === "trending") {
      setSearchUrl(trendingUrl);
    } else if (movieId === "top-rated") {
      setSearchUrl(topRatedUrl);
    } else if (movieId === "now-playing") {
      setSearchUrl(nowPlayingUrl);
    } else if (movieId === "upcoming") {
      setSearchUrl(upcomingUrl);
    }
  }, [movieId]);
  function refreshHandler() {
    window.location.reload();
  }
 
  return (
    <>
      {/* <h1>Movie</h1> */}
      {!dataError && !miniError && isLoading && (
        <section className="w-full flex items-center justify-center h-dvh max-h-[1300px] min-h-[500px] ">
          <Loader />
        </section>
      )}
      {!dataError && !miniError && !isLoading && (
        <>
          <section className="w-full justify-center pb-8 flex items-center gap-4 flex-wrap pt-[120px]">
            <button
              className="button2"
              id={movieId === "popular" ? "active" : ""}
              onClick={() => routeHandler("popular")}
            >
              Popular
            </button>
            <button
              className="button2"
              id={movieId === "trending" ? "active" : ""}
              onClick={() => routeHandler("trending")}
            >
              Trending
            </button>
            <button
              className="button2"
              id={movieId === "top-rated" ? "active" : ""}
              onClick={() => routeHandler("top-rated")}
            >
              Top-rated
            </button>
            <button
              className="button2"
              id={movieId === "upcoming" ? "active" : ""}
              onClick={() => routeHandler("upcoming")}
            >
              Upcoming
            </button>
            <button
              className="button2"
              id={movieId === "now-playing" ? "active" : ""}
              onClick={() => routeHandler("now-playing")}
            >
              Now playing
            </button>
          </section>
          <section className="w-full flex flex-col pb-16 text-white gap-4">
            <h2 className="font-cinzel font-black flex  items-center text-2xl">
              {movieId.charAt(0).toUpperCase() + movieId.slice(1)} Movies
            </h2>
            <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
              {movieData.map((movie, index) => {
                const releaseDate = movie.release_date.substring(0, 4);
                return (
                  <Card
                    key={index}
                    img={
                      movie.poster_path
                        ? `${imgUrl}${movie.poster_path}`
                        : moviePoster
                    }
                    title={movie.title}
                    year={releaseDate}
                    id={movie.id}
                    type={"movie"}
                  />
                );
              })}
            </div>
          
            {miniLoading && <LoaderMini />}
          </section>
        </>
      )}
      {!dataError && miniError && (
        <section className="w-full px-[2.5%] flex flex-col  max-h-[1300px] items-center justify-center gap-4 h-dvh min-h-[500px] ">
          <h1 className="text-xl font-[900] font-cinzel text-center w-full  pt-8 text-white sm:text-4xl">
            Something went wrong
          </h1>
          <div className="flex justify-center items-center">
            <button
              className="button2 text-lg "
              id="active"
              onClick={refreshHandler}
            >
              Click to refresh
            </button>
          </div>
        </section>
      )}
      {dataError && (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
          <NotFoundView />
        </section>
      )}
    </>
  );
}

export default MovieComp;

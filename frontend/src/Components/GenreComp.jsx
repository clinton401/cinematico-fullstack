import React, { useContext, useEffect, useState } from "react";
import Loader from "../Components/Reusables/Loader";
import { myContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
import NotFoundView from "./Reusables/NotFoundView";
import { movieContext } from "../Pages/Movie";
import axios from "axios";
import Card from "./Reusables/Card";
import LoaderMini from "./Reusables/LoaderMini";
import moviePoster from "../assets/movie poster.avif";
import { genresContext } from "../Pages/Genres";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronDown,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
};
function GenreComp() {
  //   const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState(false);
  const [movieFilter, setMovieFilter] = useState("popularity.desc");
  const [genresData, setGenresData] = useState([]);
  const [genreLoading, setGenreLoading] = useState(true);
  const [genreError, setGenreError] = useState(false);
  const [miniLoading, setMinioading] = useState(false);
  const [miniError, setMinierror] = useState(false);
  const [titleName, setTitleName] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  // const [searchUrl, setSearchUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [isNearBottom, setIsNearBottom] = useState(false);
  const [pages, setPages] = useState(1);
  const {
    authParams,
    imgUrl,
    scrollToTop,
    setDocumentTitle,
    movieType,
    setMovieType,
  } = useContext(myContext);
  const { genresId } = useContext(genresContext);
  const navigate = useNavigate();
  async function getGenres() {
    const url = `https://api.themoviedb.org/3/genre/${movieType}/list?language=en`;
    try {
      setGenreLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data.genres;

        setGenresData(data);
        setGenreError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setGenresData([]);
      setGenreError(true);
    } finally {
      setGenreLoading(false);
    }
  }
  async function getData() {
    let searchUrl;
    if (movieType === "movie") {
      searchUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pages}&sort_by=${movieFilter}&with_genres=${genresId} `;
    } else {
      searchUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=en-US&page=${pages}&sort_by=${movieFilter}&with_genres=${genresId}
`;
    }
    try {
      setMovieLoading(true);
      const response = await axios.get(searchUrl, authParams);
      if (response.status === 200) {
        const data = response.data.results;

        const tpg = response.data.total_pages;
        if (data.length > 0) {
          setMovieData(data);
          setMovieError(false);
          if (tpg < 500) {
            setTotalPages(tpg);
          } else {
            setTotalPages(500);
          }

          // if (pages === 1) {
          setPages(2);
          // }
        } else {
          throw new Error("Failed to fetch data");
        }
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      setMovieData([]);
      setMovieError(true);
      setPages(1);
      setTotalPages(0);
    } finally {
      setMovieLoading(false);
    }
  }
  async function getNewData() {
    let newSearchUrl;
    if (movieType === "movie") {
      newSearchUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pages}&sort_by=${movieFilter}&with_genres=${genresId} `;
    } else {
      newSearchUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=true&language=en-US&page=${pages}&sort_by=${movieFilter}&with_genres=${genresId}
`;
    }

    if (pages <= totalPages && newSearchUrl) {
      try {
        setMinioading(true);
        const response = await axios.get(newSearchUrl, authParams);
        if (response.status === 200) {
          const data = response.data;
          setMinierror(false);
          setMovieData((prevState) => [...prevState, ...data.results]);
          if (pages < totalPages) {
            setPages((prev) => prev + 1);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);

        setMinierror(true);
      } finally {
        setMinioading(false);
      }
    }
  }
  useEffect(() => {
    if (genresId) {
      setPages(1);
      getData();
    }
  }, [movieType, genresId, movieFilter]);
  useEffect(() => {
    if (genresId) {
      getGenres();
    }
  }, [movieType]);
  useEffect(() => {
    if (!movieError && !genreError) {
      setDataError(false);
    } else {
      setDataError(true);
    }
  }, [movieError, genreError]);
  useEffect(() => {
    function handleScroll() {
      if (
        !dataError &&
        !genreLoading &&
        !movieLoading &&
        movieData.length > 0 &&
        !miniError
      ) {
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

    handleScroll();
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataError, genreLoading, movieLoading, movieData, miniError]);
  useEffect(() => {
    if (isNearBottom) {
      getNewData();
    }
  }, [isNearBottom]);
  useEffect(() => {
    if (titleName) {
      setDocumentTitle(
        `${titleName} ${movieType === "movie" ? "Movies" : "Tv shows"}`
      );
    } else {
      setDocumentTitle("Cinematico");
    }
  }, [titleName]);
  useEffect(() => {
    if (genresId && genresData.length > 0) {
      const filtered = genresData.filter(
        (movie) => movie.id.toString() === genresId
      );
      if (filtered.length > 0) {
        setTitleName(filtered[0].name);
      }
    }
  }, [genresData, genresId]);
  useEffect(() => {
    function filterClose() {
      if (filterOpen) {
        setFilterOpen(false);
      } else if (categoryOpen) {
        setCategoryOpen(false);
      }
    }

    document.addEventListener("click", filterClose);

    return () => {
      document.removeEventListener("click", filterClose);
    };
  }, [filterOpen, categoryOpen]);

  function movieTypeHandler(param) {
    if (movieType !== param) {
      setMovieType(param);
      navigate("/genre");
    }
  }
  const handleCheckboxChange = (param) => {
    setMovieFilter(param);

    if (param !== movieFilter) {
      setPages(1);
      setFilterOpen(false);
    }
  };

  function refreshHandler() {
    window.location.reload();
  }
  const linksHandler = (linkName) => {
    setTitleName(linkName);
    if (linkName !== titleName) {
      setPages(1);
      setCategoryOpen(false);
    }
  };
  return (
    <>
      {!dataError && (
        <main className="w-full flex flex-wrap items-center min-h-dvh justify-center  ">
          <section
            className={` w-full pt-[120px] xl:pt-0 xl:w-[20%]  ${
              genreLoading ? "flex items-center justify-center " : ""
            }  xl:h-full `}
          >
            {genreLoading && <Loader />}
            {!genreLoading && genresData.length > 0 && (
              <>
                <div className="w-full flex xl:hidden relative items-center justify-center">
                  <button
                    className="flex items-center border text-center rounded-md justify-center font-black  bg-white hover:text-black transition-all ease-in duration-300 p-4 xl-max-w-[340px] w-[80%] min-w-[150px] "
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryOpen(!categoryOpen);
                    }}
                  >
                    Select category{" "}
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                  </button>
                  <AnimatePresence>
                    {categoryOpen && genresData.length > 0 && (
                      <motion.ul
                        variants={popupVariants}
                        initial="hidden"
                        animate={"visible"}
                        exit="exit"
                        key="category"
                        className="absolute  text-white font-cinzel left-0 right-0 mx-auto top-[110%] h-[400px] overflow-y-auto overflow-x-hidden bg-[#1a1a1a] w-full  iphone:w-[300px] rounded p-2 flex flex-col gap-2 z-10   "
                      >
                        {genresData.map((movie, index) => {
                          return (
                            <li
                              key={index}
                              className="w-full "
                              id="genre_li_links"
                            >
                              <NavLink
                                to={`/genre/${movie.id}`}
                                className="flex items-center border text-center rounded justify-center hover:bg-white hover:text-black transition-all ease-in duration-300 p-4 w-full"
                                onClick={() => linksHandler(movie.name)}
                              >
                                {movie.name}
                              </NavLink>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {categoryOpen && !genresData.length > 0 && (
                      <span.ul
                        variants={popupVariants}
                        initial="hidden"
                        animate={"visible"}
                        exit="exit"
                        key="category"
                        className="absolute right-2 top-full bg-[#1a1a1a] w-full  iphone:w-[300px] rounded p-2 flex flex-col gap-2 z-10   "
                      >
                        <h2 className="font-cinzel font-black flex  items-center text-2xl">
                          No genres found
                        </h2>
                      </span.ul>
                    )}
                  </AnimatePresence>
                </div>

                <ul
                  className="w-[19%] hidden fixed  top-[120px]  bg-[#1a1a1a] ul_scroll rounded-md text-white font-cinzel font-black p-2 left-5half xl:flex flex-col gap-2 max-w-[340px] overflow-x-hidden overflow-y-auto min-h-[500px] "
                  style={{ height: "calc(100dvh - 120px)" }}
                >
                  {genresData.map((movie, index) => {
                    return (
                      <li key={index} className="w-full " id="genre_li_links">
                        <NavLink
                          to={`/genre/${movie.id}`}
                          className="flex items-center border text-center rounded justify-center hover:bg-white hover:text-black transition-all ease-in duration-300 p-4 w-full"
                          onClick={() => {
                            scrollToTop();
                            linksHandler(movie.name);
                          }}
                        >
                          {movie.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {!genreLoading && !genresData.length > 0 && (
              <h2 className="font-cinzel font-black flex  items-center text-2xl">
                No genres found
              </h2>
            )}
          </section>
          <section
            className={` w-full xl:w-[80%]  ${
              movieLoading ? "flex items-center justify-center " : ""
            } min-h-dvh `}
          >
            {movieLoading && <Loader />}
            {!movieLoading && (
              <>
                <section className="flex xl:pl-5p justify-center pt-8 xl:pt-[120px] flex-wrap  gap-4 pb-8 items-center">
                  <button
                    className={`button2 ${
                      movieType === "movie" ? "active" : ""
                    }`}
                    id={movieType === "movie" ? "active" : ""}
                    onClick={() => movieTypeHandler("movie")}
                  >
                    Movies
                  </button>
                  <button
                    className={`button2 ${movieType === "tv" ? "active" : ""}`}
                    id={movieType === "tv" ? "active" : ""}
                    onClick={() => movieTypeHandler("tv")}
                  >
                    Tv shows
                  </button>
                </section>
                <section className="w-full xl:pl-5p flex flex-col pb-16 text-white gap-4">
                  <div className="flex  justify-between relative text-white flex-wrap watch:flex-nowrap    gap-4 mb-6 pb-2 items-center">
                    <h2 className="font-cinzel font-black flex  items-center w-[85%] text-2xl xl:text-4xl">
                      {titleName}
                    </h2>
                    <button
                      className="p-2 flex items-center min-w-[36px]  justify-center tooltip-container"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFilterOpen(!filterOpen);
                      }}
                    >
                      <span className="tooltip">Filters</span>
                      <FontAwesomeIcon icon={faSliders} className="text-xl" />
                    </button>
                    <AnimatePresence>
                      {filterOpen && (
                        <motion.ul
                          variants={popupVariants}
                          initial="hidden"
                          animate={"visible"}
                          exit="exit"
                          key="modal"
                          className="absolute right-2 top-full bg-[#1a1a1a] w-full  iphone:w-[300px] rounded p-2 flex flex-col gap-2 z-10   "
                        >
                          <li className="w-full ">
                            <button
                              className={`flex items-center border gap-2 ${
                                movieFilter === "popularity.desc"
                                  ? "text-black bg-white"
                                  : ""
                              }  rounded  hover:bg-white text-sm hover:text-black transition-all ease-in duration-300 p-4 w-full`}
                              onClick={() =>
                                handleCheckboxChange("popularity.desc")
                              }
                            >
                              <input
                                type="checkbox"
                                checked={
                                  movieFilter === "popularity.desc"
                                    ? true
                                    : false
                                }
                                onChange={() =>
                                  handleCheckboxChange("popularity.desc")
                                }
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                              Popular
                            </button>
                          </li>
                          <li className="w-full ">
                            <button
                              className={`flex items-center border gap-2 ${
                                movieType === "movie" &&
                                movieFilter === "title.desc"
                                  ? "text-black bg-white"
                                  : ""
                              }  ${
                                movieType === "tv" &&
                                movieFilter === "name.desc"
                                  ? "text-black bg-white"
                                  : ""
                              }  rounded text-sm hover:bg-white hover:text-black transition-all ease-in duration-300 p-4 w-full`}
                              onClick={() =>
                                movieType === "movie"
                                  ? handleCheckboxChange("title.desc")
                                  : handleCheckboxChange("name.desc")
                              }
                            >
                              {movieType === "movie" ? (
                                <input
                                  type="checkbox"
                                  checked={
                                    movieFilter === "title.desc" ? true : false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange("title.desc")
                                  }
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={
                                    movieFilter === "name.desc" ? true : false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange("name.desc")
                                  }
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                              Alphabetical (A - Z)
                            </button>
                          </li>
                          <li className="w-full ">
                            <button
                              className={`flex items-center border text-sm gap-2 ${
                                movieType === "movie" &&
                                movieFilter === "title.asc"
                                  ? "text-black bg-white"
                                  : ""
                              }  ${
                                movieType === "tv" && movieFilter === "name.asc"
                                  ? "text-black bg-white"
                                  : ""
                              }  rounded  hover:bg-white hover:text-black transition-all ease-in duration-300 p-4 w-full`}
                              onClick={() =>
                                movieType === "movie"
                                  ? handleCheckboxChange("title.asc")
                                  : handleCheckboxChange("name.asc")
                              }
                            >
                              {movieType === "movie" ? (
                                <input
                                  type="checkbox"
                                  checked={
                                    movieFilter === "title.asc" ? true : false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange("title.asc")
                                  }
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={
                                    movieFilter === "name.asc" ? true : false
                                  }
                                  onChange={() =>
                                    handleCheckboxChange("name.asc")
                                  }
                                  style={{
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                              Alphabetical (Z - A)
                            </button>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  {movieData.length > 0 && miniError && (
                    <div className="w-full  flex flex-col  items-center justify-center gap-4 ">
                      <h1 className="text-xl font-[900] font-cinzel text-center w-full   text-white sm:text-4xl">
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
                    </div>
                  )}
                  {movieData.length > 0 && !miniError && (
                    <div className="w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]">
                      {movieData.map((movie, index) => {
                        const releaseDate =
                          movieType === "movie"
                            ? movie.release_date.substring(0, 4)
                            : movie.first_air_date.substring(0, 4);
                        return (
                          <Card
                            key={index}
                            img={
                              movie.poster_path
                                ? `${imgUrl}${movie.poster_path}`
                                : moviePoster
                            }
                            title={
                              movieType === "movie" ? movie.title : movie.name
                            }
                            year={releaseDate}
                            id={movie.id}
                            type={movieType}
                          />
                        );
                      })}
                    </div>
                  )}

                  {miniLoading && <LoaderMini />}
                </section>
              </>
            )}
            {/* {!movieLoading && !movieData.length > 0 && <h2 className="font-cinzel font-black flex  items-center text-2xl"> No movies found</h2>} */}
          </section>
        </main>
      )}
      {/* {!dataError && !movieError && isLoading && (
        <main className="w-full flex items-center justify-center h-dvh max-h-[1300px] min-h-[500px] ">
       
          <section className="w-[20%] relative items-center justify-center flex  h-full border">   <Loader /></section>
          <section className="w-[80%] h-full items-center justify-center flex    border">   <Loader /></section>
        </main>
      )} */}
      {dataError && (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
          <NotFoundView />
        </section>
      )}
    </>
  );
}

export default GenreComp;

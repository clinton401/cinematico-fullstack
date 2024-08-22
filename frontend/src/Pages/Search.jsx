import React, { useContext, useState, useEffect, useRef } from "react";
import { myContext } from "../App";
import { useSearchParams } from "react-router-dom";
import NotFoundView from "../Components/Reusables/NotFoundView";
import { debounce } from "lodash";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Reusables/Loader";
import Card from "../Components/Reusables/Card";
import moviePoster from "../assets/movie poster.avif";
import LoaderMini from "../Components/Reusables/LoaderMini";
import { useDebouncedCallback } from "use-debounce";
function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => {
    const refreshedParam = searchParams.get("query");

    if (refreshedParam) {
      //   setInputFocused(true);
      return refreshedParam;
    } else {
      //   setInputFocused(false);
      return "";
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [miniLoading, setMiniLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [isNearBottom, setIsNearBottom] = useState(false);
  const [pages, setPages] = useState(1);
  const inputRef = useRef();

  const { movieType, authParams, imgUrl, scrollToTop, setMovieType } =
    useContext(myContext);
  const refreshedQuery = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (searchQuery) => {
    const url = `https://api.themoviedb.org/3/search/${movieType}?query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=${pages}`;
    try {
      setIsLoading(true);
      const response = await axios.get(url, authParams);
      if (response.status === 200) {
        const data = response.data;
        setSearchResults(data.results);
        setTotalPages(data.total_pages);
        setPages(2);
        setDataError(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataError(true);
      setPages(1);
    } finally {
      setIsLoading(false);
    }
  };
  async function fetchNewData() {
    let newSearchUrl = `https://api.themoviedb.org/3/search/${movieType}?query=${encodeURIComponent(
      inputValue
    )}&include_adult=false&language=en-US&page=${pages}`;

    if (pages <= totalPages && newSearchUrl) {
      try {
        setMiniLoading(true);
        const response = await axios.get(newSearchUrl, authParams);
        if (response.status === 200) {
          const data = response.data;
          setDataError(false);
          setSearchResults((prevState) => [...prevState, ...data.results]);
          if (pages < totalPages + 1) {
            setPages((prev) => prev + 1);
          }
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
        //   setTopRatedData([]);
        setDataError(true);
      } finally {
        setMiniLoading(false);
      }
      }
  }
  // Debounce the fetchData function to be called only after 500 milliseconds of inactivity
  const debouncedFetchData = useDebouncedCallback(fetchData, 500);
  // useEffect((), [inputValue])
  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    function handleScroll() {
      if (!dataError && !isLoading && searchResults.length > 0) {
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
  }, [dataError, isLoading, searchResults]);
  useEffect(() => {
    if (isNearBottom) {
      fetchNewData();
    }
  }, [isNearBottom]);
  useEffect(() => {
    if (refreshedQuery) {
      setInputValue(refreshedQuery);
    }
  }, []);
  useEffect(() => {
    if (inputValue.length > 0) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  }, [inputValue]);
  useEffect(() => {
    if (inputValue.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [inputValue]);
  useEffect(() => {
    if (inputValue.length > 0) {
        setPages(1)
      debouncedFetchData(inputValue);
    }
  }, [inputValue]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  function movieTypeHandler(param) {
    if (movieType !== param) {
      setInputValue("");
      setSearchResults([])
      setMovieType(param);
    }
  }
  function refreshHandler() {
    window.location.reload();
  }
  function clearInputHandler() {
    setInputValue("");
    inputRef.current.focus();
  }
  return (
    <main
      className={`min-h-500px ${
        !dataError ? "pt-[110px]" : ""
      }  px-5half  w-full`}
    >
      {!dataError && (
        <>
          <section className="w-full flex flex-col gap-8">
            <form
              className="w-full flex search relative text-white items-center"
              id="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="w-full outline-none pr-[35px] bg-transparent border-b py-2 placeholder:text-base text-white placeholder:italic xl:placeholder:text-5xl placeholder:font-cinzel  font-medium text-lg xl:text-4xl"
                placeholder={`Search for ${
                  movieType === "movie" ? "movies" : "Tv shows"
                }`}
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
              />
              {inputValue.length > 0 && (
                <button
                  className="absolute right-0 top-2/4 text-lg rounded  w-[30px] aspect-square items-center justify-center translate-y-[-50%] "
                  onClick={clearInputHandler}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </form>
            <div className="flex  justify-center   flex-wrap  gap-4 pb-8 items-center">
              <button
                className={`button2 ${movieType === "movie" ? "active" : ""}`}
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
            </div>
            {!showResults && <div className="w-full h-[70dvh]"></div>}
          </section>
          {showResults && isLoading && (
            <section className="w-full h-[70dvh] flex justify-center pt-16">
              <Loader />
            </section>
          )}
          {showResults &&
            !isLoading &&
            inputValue.length > 0 &&
            searchResults.length > 0 && (
              <section className="flex flex-col pb-16 text-white gap-4 min-h-[70dvh] w-full ">
                <div className="w-full flex overflow-x-hidden flex-wrap  justify-center   gap-y-4  gap-x-[2%]">
                  {searchResults.map((movie, index) => {
                    //   const releaseDate =
                    //     movieType === "movie"
                    //       ? movie.release_date.substring(0, 4)
                    //       : movie.first_air_date.substring(0, 4);
                    return (
                      <Card
                        key={index}
                        img={
                          movie.poster_path
                            ? `${imgUrl}${movie.poster_path}`
                            : moviePoster
                        }
                        title={movieType === "movie" ? movie.title : movie.name}
                        //   year={releaseDate}
                        id={movie.id}
                        type={movieType}
                      />
                    );
                  })}
                </div>
                {miniLoading && <LoaderMini />}
              </section>
            )}

          {showResults && !isLoading && !searchResults.length > 0 && (
            <section className="w-full h-[70dvh] min-h-[500px] flex flex-col items-center  ">
              <h3 className="w-full font-[700] text-xl text-center text-white pb-3">
                No results found for {`"${inputValue}"`}
              </h3>
              <p className="w-full font-[600] text-base text-center text-white ">
                Please make sure your words are spelled correctly, or use fewer
                or different keywords.
              </p>
            </section>
          )}
        </>
      )}
      {dataError && (
        <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
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
    </main>
  );
}

export default Search;

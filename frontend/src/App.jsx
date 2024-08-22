import { createContext, useState, useEffect } from "react";
import Footer from "./Layout/Footer";
import NavBar from "./Layout/NavBar";
import Routess from "./Routess";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { matchPath, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./CustomHooks/useAuth";

export const myContext = createContext();
function App() {
  const [documentTitle, setDocumentTitle] = useState("Cinematico");
  const [movieType, setMovieType] = useState(() => {
    const movieTypeParsed = window.localStorage.getItem("movieType");

    if (movieTypeParsed !== null && movieTypeParsed !== undefined) {
      return movieTypeParsed;
    } else {
      return "movie";
    }
  });
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routePaths = [
    "/",
    // "/login",
    // "/signup",
    "/search",
    "/details/:detailsType/:detailsId",
    // "/verify-otp/:userId",
    "/user",
    "/movie/:movieId",
    "/tv/:tvId",
    "/genre/:genresId",
    // "/forgot-password",
  ];
  const secondRoutePaths = [
    "/login",
    "/signup",
    "/verify-otp/:userId",
    "/forgot-password",
    // "/user",
  ];
  function isUnAuthRouteValid(pathname) {
    if (typeof pathname !== "string") return false;
    return secondRoutePaths.some((route) =>
      matchPath({ path: route, exact: true }, pathname)
    );
  }
  const isVerifyOtp = isUnAuthRouteValid(pathname);
  function isRouteValid(pathname) {
    if (typeof pathname !== "string") return false;
    return routePaths.some((route) =>
      matchPath({ path: route, exact: true }, pathname)
    );
  }

  const API_KEY = import.meta.env.VITE_REACT_API_KEY;
  const authUrl = "";
  const authParams = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop()
  }, [pathname])

  const toastHandler = (success, message) => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    if (!isLoggedIn && !isVerifyOtp) {
      if(pathname === "/" ) {
        navigate("/login")
      } else {
      const encodedPathname = encodeURIComponent(pathname);
      navigate(`/login?redirects=${encodedPathname}`);
      }
    }
  }, [isLoggedIn, isVerifyOtp]);
  const logOut = async (signal, isNavbar) => {
    try {
      setLogoutLoading(true);
      const response = await fetch(`${authUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
        signal,
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(
          error.msg || "Something went wrong. Please try again later."
        );
      }

      const data = await response.json();
      setIsLoggedIn(false);
      if ( !isVerifyOtp) {
        if(pathname === "/" ) {
          navigate("/login")
        } else {
        const encodedPathname = encodeURIComponent(pathname);
        navigate(`/login?redirects=${encodedPathname}`);
        }
      }
      if (isNavbar) {
        toastHandler(true, data.msg || "Logout successful");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      if (isNavbar) {
        toastHandler(
          false,
          error.message ||
            error.msg ||
            "Something went wrong. Please try again later."
        );
      }
    } finally {
      setLogoutLoading(false);
    }
  };
  const fetchData = async (signal) => {
    try {
      setUserDataLoading(true);

      const response = await fetch(`${authUrl}/auth/user`, {
        method: "GET",
        credentials: "include",
        signal,
      });

      if (response.status === 401) {
        navigate("/login");
        setUserData(null);
        setIsLoggedIn(false);
      } else if (response.ok) {
        const { data } = await response.json();
        setUserData(data);
        setUserError(null)
      } else {
        const { error } = await response.json();
        throw new Error(
          error.msg || "Something went wrong. Please try again later."
        );
      }
    } catch (error) {
      setUserError(error.message || "Something went wrong. Please try again later.")
      console.error("Error checking authentication:", error);
    } finally {
      setUserDataLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    

    if (isLoggedIn) {
      fetchData(signal);
    } else {
      logOut(signal);
      setUserData(null);
    }

    return () => {
      controller.abort();
    };
  }, [isLoggedIn]);
  useEffect(() => {
    window.localStorage.setItem("movieType", movieType);
  }, [movieType]);
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);


  const contextValues = {
    imgUrl,
    authParams,
    scrollToTop,
    setDocumentTitle,
    movieType,
    setMovieType,
    toastHandler,
    isRouteValid,
    setIsLoggedIn,
    logoutLoading,
    isLoggedIn,
    logOut,
    userDataLoading,
    userData,
    fetchData,
    userError,
    authUrl
  };
  return (
    <div className="bg-dark max-w-[1800px] fixed_margin  font-merri w-full min-h-dvh">
      <myContext.Provider value={contextValues}>
        <NavBar />
        <Routess />
        <Footer />
      </myContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;

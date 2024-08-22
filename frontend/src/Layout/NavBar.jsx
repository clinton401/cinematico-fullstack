import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/watch-movie.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouse,
  faTv,
  faFilm,
  faVideo,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import { myContext } from "../App";

const containerVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      // delay: 0.5,
      staggerChildren: 0.5,
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const textAnimation = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
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
function NavBar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isUserBtnOpen, setIsUserBtnOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logoutLoading, logOut, isLoggedIn, userDataLoading, userData } = useContext(myContext);
  const isVerifyOtp =
    pathname.includes("verify-otp") ||
    pathname.includes("forgot-password") ||
    pathname.includes("signup") ||
    pathname.includes("login");
  useEffect(() => {
    function btnOpenHandler() {
      if (isUserBtnOpen) {
        setIsUserBtnOpen(false);
      }
    }

    document.addEventListener("click", btnOpenHandler);

    return () => {
      document.removeEventListener("click", btnOpenHandler);
    };
  }, [isUserBtnOpen]);

  return (
    <header className="fixed fixed_margin max-w-[1800px] z-30 top-0 left-2/4  translate-x-[-50%] w-full flex flex-wrap gap-x-1 gap-y-2 justify-between blurred items-center  text-white px-5half  py-4">
      <nav className=" flex gap-1  relative">
        <button
          className="flex xl:hidden absolute z-[200]  top-[-10px] "
          onClick={() => setNavOpen(!navOpen)}
        >
          <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
        </button>
        <Link
          to="/"
          className="flex gap-1 iphone:gap-2 ml-[52px] xl:ml-0 font-bold text-sm sm:text-xl font-cinzel  items-center "
          aria-label="site logo "
        >
          <img src={logo} alt="logo" className="w-[30px] aspect-square " />
          <p className="ttl ">Cinematico</p>
        </Link>
      </nav>

      <ul className="font-cinzel xl:flex items-center hidden gap-8  header_ul  font-medium">
        <li className=" items-center flex justify-center ">
          <NavLink to="/" className="flex items-center gap-2">
            {" "}
            <FontAwesomeIcon icon={faHouse} className="text-[12px]" />
            HOME
          </NavLink>
        </li>
        <li className=" items-center flex justify-center ">
          <NavLink to="/movie/popular" className="flex items-center gap-2">
            {" "}
            <FontAwesomeIcon icon={faFilm} className="text-[12px]" /> MOVIE
          </NavLink>
        </li>
        <li className=" items-center flex justify-center ">
          <NavLink to="/tv/popular" className="flex items-center gap-2">
            {" "}
            <FontAwesomeIcon icon={faTv} className="text-[12px]" />
            TV SHOW
          </NavLink>
        </li>
        <li className=" items-center flex justify-center ">
          <NavLink to="/genre" className="flex items-center gap-2">
            {" "}
            <FontAwesomeIcon icon={faVideo} className="text-[12px]" />
            GENRE
          </NavLink>
        </li>
      </ul>
      {/* </nav> */}
      <nav className="flex items-center gap-1 sm:gap-6  relative ">
        <button className="p-1" onClick={() => navigate("/search")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        
       
        {!isLoggedIn &&  <button className="button" onClick={() => {
          if(pathname === "/" || isVerifyOtp ) {
            navigate("/login")
          } else {
            const encodedPathname = encodeURIComponent(pathname);
            navigate(`/login?redirects=${encodedPathname}`);
          }
          }}>
          Sign in
        </button>}
        {isLoggedIn && !userDataLoading && <button
          className=" button2 border  max-w-[70px] iphone:max-w-[150px] flex items-center justify-center gap-2  "
          onClick={(e) => {
            e.stopPropagation();
            setIsUserBtnOpen(!isUserBtnOpen);
          }}
        >
          <span className="w-[80%]   truncate">{userData && userData.username? userData.username : "User"} </span>
          <FontAwesomeIcon icon={isUserBtnOpen ? faCaretUp : faCaretDown} />
        </button>}
        {isLoggedIn && userDataLoading && <div className="flex items-center justify-center py-3  w-[70px] iphone:w-[125px]"> <span className="loader navbar ml-1  navbar_loading" id="loader"></span></div>}
        
       
        <AnimatePresence>
          {isUserBtnOpen && (
            <motion.ul
              variants={popupVariants}
              initial="hidden"
              animate={"visible"}
              exit="exit"
              key="modal"
              className=" navbar_user_btn iphone:max-w-[200px] text-black shadow-xl divide-y divide-black text-sm  rounded-md absolute right-0 top-[150%] bg-white "
            >
              <li>
                <button
                  className="p-4 w-full text-left"
                  onClick={() => navigate("/user")}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="p-4 w-full text-left flex items-center"
                  onClick={() => logOut(null, true)}
                >
                  Logout{" "}
                  {logoutLoading && (
                    <div className="loader navbar ml-1" id="loader"></div>
                  )}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            className="fixed fixed_margin z-[150] top-0 left-0 pt-[70px] max-w-[1800px] flex items-center justify-center min-h-[400px] w-full h-dvh blurred"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="modal"
          >
            <ul className=" w-full flex flex-col items-center justify-center gap-6 header_ul">
              <motion.li
                onClick={() => {
                  setNavOpen(!navOpen);
                  setOpen(false);
                }}
                variants={textAnimation}
                className=" items-center flex justify-center "
              >
                <NavLink to="/" className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon icon={faHouse} className="text-[12px]" />
                  HOME
                </NavLink>
              </motion.li>
              <motion.li
                onClick={() => {
                  setNavOpen(!navOpen);
                  setOpen(false);
                }}
                variants={textAnimation}
                className=" items-center flex justify-center "
              >
                <NavLink to="/movie/popular" className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon icon={faFilm} className="text-[12px]" />{" "}
                  MOVIE
                </NavLink>
              </motion.li>
              <motion.li
                onClick={() => {
                  setNavOpen(!navOpen);
                  setOpen(false);
                }}
                variants={textAnimation}
                className=" items-center flex justify-center "
              >
                <NavLink to="/tv/popular" className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon icon={faTv} className="text-[12px]" />
                  TV SHOW
                </NavLink>
              </motion.li>
              <motion.li
                onClick={() => {
                  setNavOpen(!navOpen);
                  setOpen(false);
                }}
                variants={textAnimation}
                className=" items-center flex justify-center "
              >
                <NavLink to="/genre" className="flex items-center gap-2">
                  {" "}
                  <FontAwesomeIcon icon={faVideo} className="text-[12px]" />
                  GENRE
                </NavLink>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;

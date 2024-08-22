import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MovieComp from "./Components/MovieComp";
import TvShowComp from "./Components/TvShowComp";
import GenreComp from "./Components/GenreComp";
import LoaderComp from "./Components/LoaderComp";
import EmailOtpVerification from "./Pages/EmailOtpVerification";
const TvShow = React.lazy(() => import("./Pages/TvShow"));
const Genres = React.lazy(() => import("./Pages/Genres"));
const Movie = React.lazy(() => import("./Pages/Movie"));
const Search = React.lazy(() => import("./Pages/Search"));
const Details = React.lazy(() => import("./Pages/Details"));
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
function Routess() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="/details/:detailsType/:detailsId"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Details />
            </Suspense>
          }
        />
        <Route
          path="/verify-otp/:userId"
          element={
            <Suspense fallback={<LoaderComp />}>
              <EmailOtpVerification />
            </Suspense>
          }
        />
        <Route
          path="/user"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<LoaderComp />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="/movie"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Movie />
            </Suspense>
          }
        >
          <Route path=":movieId" element={<MovieComp />} />
        </Route>
        <Route
          path="/tv"
          element={
            <Suspense fallback={<LoaderComp />}>
              <TvShow />
            </Suspense>
          }
        >
          <Route path=":tvId" element={<TvShowComp />} />
        </Route>
        <Route
          path="/genre"
          element={
            <Suspense fallback={<LoaderComp />}>
              <Genres />
            </Suspense>
          }
        >
          <Route path=":genresId" element={<GenreComp />} />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<LoaderComp />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default Routess;

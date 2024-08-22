import { useState, useEffect, useContext } from "react";
import logo from "../assets/watch-movie.png";
import { myContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import useVerifiedRedirects from "../CustomHooks/useVerifiedRedirects";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [errorsObj, setErrorsObj] = useState({
    emailErr: null,
    passwordErr: null,
  });
  const { toastHandler, isRouteValid, isLoggedIn, authUrl } = useContext(myContext);
  const navigate = useNavigate();
 
  const verifiedRedirects = useVerifiedRedirects();
  const { emailErr, passwordErr } = errorsObj;
  const { email, password } = formDetails;
  function formDetailsHandler(type, details) {
    if (type && details !== undefined) {
      setFormDetails((prevFormDetails) => ({
        ...prevFormDetails,
        [type]: details,
      }));
    }
  }
  useEffect(() => {
    if(isLoggedIn) {
      navigate("/")
    }
  }, []);
  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${authUrl}/auth/login`, {
        method: "POST",
        credentials: 'include', // Use POST for registration
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          verifiedRedirects
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setErrorsObj({
          emailErr: null,
          passwordErr: null,
          usernameErr: null,
        });
        setFormDetails({
          email: "",
          password: "",
        });
        window.location.href = data.redirectUrl;
      
        
       
        toastHandler(true, data.msg || "Login successful");
      } else {
        const { error } = await response.json();
        

        if (typeof error.msg === "object") {
          setErrorsObj({
            emailErr: error.msg.email,
            passwordErr: error.msg.password,
          });
        } else {
          setErrorsObj({
            emailErr: null,
            passwordErr: null,
          });

          throw new Error(
            error.msg || "Something went wrong. Please try again later."
          );
        }
      }
    } catch (err) {
      console.error(err);
      toastHandler(
        false,
        err.message ||
          err.msg ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }
 

  return (
    <main className="w-full flex flex-col  gap-8 items-center justify-center px-5half min-h-dvh pb-10 pt-[150px] ">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-[400px] shadow-lg text-white bg-black  rounded-md flex flex-col gap-6 p-4"
      >
        <h2 className="font-cinzel font-black flex  items-center pb-2 text-2xl">
          Login
        </h2>
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            required
            name="email"
            onChange={({ target }) => formDetailsHandler("email", target.value)}
            value={email}
            className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
            placeholder="Email address"
          />
          {emailErr && <span className="text-xs text-red-700">{emailErr}</span>}
        </div>

        <div className="w-full flex flex-col gap-2  mb-2">
          <span className="w-full relative">
            <input
              onChange={({ target }) =>
                formDetailsHandler("password", target.value)
              }
              name="password"
              type={!showPassword ? "password" : "text"}
              className="w-full outline-none  bg-transparent border-b  pr-[35px] placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
              placeholder="Password"
              required
              value={password}
            />
            {password.length > 0 && (
              <FontAwesomeIcon
                icon={!showPassword ? faEye : faEyeSlash}
                className="w-[20px] aspect-square cursor-pointer flex items-center justify-center absolute right-0 top-2/4  translate-y-[-50%]"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </span>

          {passwordErr && (
            <span className="text-xs text-red-700">{passwordErr}</span>
          )}
        </div>
        <Link
            to={`/forgot-password${
              verifiedRedirects
                ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                : ""
            }`}
            className=" text-[#FFD700] text-sm w-full text-right outline-none hover:underline focus:underline"
          >
           Forgot password{" "}
          </Link>
        <button className="w-full button flex items-center justify-center">
         Login{" "}
          {isLoading && <div className="loader ml-1" id="loader"></div>}
        </button>
        <p className="w-full text-center flex-wrap flex  text-xs items-center justify-center ">
          Don't have an account?{" "}
          <Link
            to={`/signup${
              verifiedRedirects
                ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                : ""
            }`}
            className="pl-2 text-[#FFD700]  outline-none hover:underline focus:underline"
          >
            Sign up{" "}
          </Link>{" "}
        </p>
      </form>
    </main>
  );
}
export default Login;

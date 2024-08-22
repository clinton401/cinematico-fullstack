import { useState, useContext, useEffect } from "react";
import logo from "../assets/watch-movie.png";
import {myContext} from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";
import useVerifiedRedirects from "../CustomHooks/useVerifiedRedirects";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorsObj, setErrorsObj] = useState({
    emailErr: null,
    passwordErr: null,
    usernameErr: null,
  });
  const {toastHandler, isLoggedIn, authUrl} = useContext(myContext)
  const { emailErr, passwordErr, usernameErr } = errorsObj;
  const { email, username, password } = formDetails;
const navigate = useNavigate();
  const verifiedRedirects = useVerifiedRedirects();
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
  function isObject(item) {
    return Object.prototype.toString.call(item) === "[object Object]";
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await fetch(`${authUrl}/auth/register`, {
        method: "POST", // Use POST for registration
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          verifiedRedirects,
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
          username: "",
          password: "",
        });
        navigate(data.redirectUrl);
        toastHandler(true, data.msg || "User registered successfully");
       
      } else {
        const { error } = await response.json();
 

        if (typeof error.msg === "object") {
          setErrorsObj({
            emailErr: error.msg.email,
            usernameErr: error.msg.username,
            passwordErr: error.msg.password,
          });
        } else {
          setErrorsObj({
            emailErr: null,
            passwordErr: null,
            usernameErr: null,
          })
          // toastHandler(false, error.msg || "An error occurred");
          throw new Error(error.msg || "Something went wrong. Please try again later.")
          
        }
      }
    } catch (err) {
      console.error(err); 
      toastHandler(false, err.message || err.msg || "Something went wrong. Please try again later.");
  }
   finally {
      setIsLoading(false)
    }
  }
  return (
    <main className="w-full flex flex-col gap-8 items-center justify-center px-5half min-h-dvh pb-10 pt-[150px] ">
     
      <form
        onSubmit={submitHandler}
        className="w-full max-w-[400px] shadow-lg text-white bg-black  rounded-md flex flex-col gap-6 p-4"
      >
        <h2 className="font-cinzel font-black flex  items-center pb-2 text-2xl">
          Sign Up
        </h2>
        <div className="w-full flex flex-col gap-2">
          <input
            type="text"
            required
            name="username"
            value={username}
            onChange={({ target }) =>
              formDetailsHandler("username", target.value)
            }
            className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
            placeholder="Username"
          />
          {usernameErr && (
            <span className="text-xs text-red-700">{usernameErr}</span>
          )}
        </div>
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

        <button className="w-full button flex items-center justify-center">Create account {isLoading &&  <div className="loader ml-1" id="loader"></div>}</button>
        <p className="w-full text-center flex-wrap flex  text-xs items-center justify-center ">
          Already have an account?{" "}
          <Link
            to={`/login${
              verifiedRedirects
                ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                : ""
            }`}
            className="pl-2 text-[#FFD700]  outline-none hover:underline focus:underline"
          >
            Login{" "}
          </Link>{" "}
        </p>
      </form>
    </main>
  );
}
export default Signup;

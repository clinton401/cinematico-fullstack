import { useState, useEffect, useContext } from "react";
import { myContext } from "../App";
import logo from "../assets/watch-movie.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import useVerifiedRedirects from "../CustomHooks/useVerifiedRedirects";
import useCountdown from "../CustomHooks/useCountdown";
import { motion, AnimatePresence } from "framer-motion";
const popupVariants = {
  hidden: {
    opacity: 0,
    // scale: 0.8,
  },
  visible: {
    opacity: 1,
    // scale: 1,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    // scale: 0,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
};
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeVerifierLoading, setIsCodeVerifierLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null);
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { isNewClicked, setIsNewClicked, countdown } = useCountdown();
  const verifiedRedirects = useVerifiedRedirects();
  const { toastHandler, authUrl } = useContext(myContext);
  async function forgotPasswordHandler(e) {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading to true when the operation starts

      const response = await fetch(
        `${authUrl}/auth/forgot-password`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsEmailSent(true);
        setUserId(data._id);
        setVerifiedEmail(data.email);
        toastHandler(true, "OTP sent successfully");
      } else {
        const { error } = await response.json();

        throw new Error(
          error.msg || "Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.log(err);
      setUserId(null);
      setVerifiedEmail(null);
      setIsEmailSent(false);
      toastHandler(
        false,
        err.message ||
          err.msg ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false); // Set loading to false after the operation ends
    }
  }
  async function resetPasswordHandler(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      toastHandler(false, "The OTP must be exactly 6 characters.");
      return;
    }
    try {
      setIsCodeVerifierLoading(true);

      const response = await fetch(
        `${authUrl}/auth/reset-password`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
            newPassword,
            userId,
            verifiedRedirects,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate(data.redirectUrl);
        toastHandler(true, data.msg || "Password reset successfully");
      } else {
        const { error } = await response.json();

        throw new Error(
          error.msg || "Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.log(err);
      setIsNewClicked(false);

      toastHandler(
        false,
        err.message ||
          err.msg ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setIsCodeVerifierLoading(false);
    }
  }
  async function resendOtpHandler() {
    if (countdown > 0 && isNewClicked) {
      toastHandler(false, `Wait ${countdown} seconds`);
      return;
    }
    try {
      setRegenerateLoading(true);
      const response = await fetch(
        `${authUrl}/auth/forgot-password`,
        {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsNewClicked(true);
        setUserId(data._id);
        setVerifiedEmail(data.email);
        toastHandler(true, "OTP sent successfully");
      } else {
        const { error } = await response.json();

        throw new Error(
          error.msg || "Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.log(err);
      setUserId(null);
      setVerifiedEmail(null);
      setIsNewClicked(false);

      toastHandler(
        false,
        err.message ||
          err.msg ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setRegenerateLoading(false);
    }
  }

  useEffect(() => {
    if (isEmailSent) {
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isEmailSent]);
  return (
    <main className="w-full  text-white px-5half pt-[150px] pb-10 min-h-dvh flex items-center flex-col justify-center gap-4">
      <img src={logo} alt="website logo" className="w-[50px] aspect-square " />
      <div className="flex items-center flex-col gap-2 *:text-center">
        <h1 className="font-cinzel text-2xl font-black"> Reset Password</h1>
        <p className="text-sm">Enter email for verification</p>
      </div>
      <form
        onSubmit={forgotPasswordHandler}
        className="sm:w-1/2 w-full flex flex-col gap-4 items-center "
      >
        <input
          type="text"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
          placeholder="Enter email"
          required
        />

        <button
          type="submit"
          className=" button flex items-center justify-center"
        >
          Verify {isLoading && <div className="loader ml-1" id="loader"></div>}{" "}
        </button>
      </form>

      <button
        onClick={() =>
          navigate(
            `/login${
                verifiedRedirects
                  ? `?redirects=${encodeURIComponent(verifiedRedirects)}`
                  : ""
              }`
          )
        }
        className="text-xs text-gray-300 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to Sign in
      </button>
      <AnimatePresence>
        {isEmailSent && (
          <motion.section
            variants={popupVariants}
            initial="hidden"
            animate={"visible"}
            exit="exit"
            key="modal"
            className="w-full fixed top-0 left-0 items-center flex-col gap-6 blurred3 z-[300] flex  justify-center  min-h-dvh"
          >
            <form
              className="w-full max-w-[400px]  shadow-lg text-white  bg-black  rounded-md flex flex-col gap-6 p-4"
              onSubmit={resetPasswordHandler}
            >
              <div className="flex items-center flex-col gap-2 *:text-center">
                <h1 className="font-cinzel text-2xl font-black">
                  {" "}
                  Enter verification code
                </h1>
                <p className="text-sm">
                  We've sent a code to{" "}
                  {verifiedEmail ? verifiedEmail : "your email"}
                </p>
              </div>
              <input
                type="text"
                required
                name="code"
                onChange={({ target }) => setOtp(target.value)}
                value={otp}
                className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
                placeholder="Enter code"
              />
              <span className="w-full relative">
                <input
                  onChange={({ target }) => setNewPassword(target.value)}
                  name="password"
                  type={!showPassword ? "password" : "text"}
                  className="w-full outline-none  bg-transparent border-b  pr-[35px] placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
                  placeholder="Enter new password"
                  required
                  value={newPassword}
                />
                {newPassword.length > 0 && (
                  <FontAwesomeIcon
                    icon={!showPassword ? faEye : faEyeSlash}
                    className="w-[20px] aspect-square cursor-pointer flex items-center justify-center absolute right-0 top-2/4  translate-y-[-50%]"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </span>
              <div className="flex  flex-wrap gap-2 justify-center items-center">
                <p className="text-xs text-gray-300">Didn't send code yet? </p>

                <button
                  type="button"
                  className="text-[#FFD700] text-sm p-2 flex  "
                  disabled={countdown > 0 && isNewClicked}
                  onClick={resendOtpHandler}
                >
                  {" "}
                  {countdown > 0 && isNewClicked
                    ? `Wait ${countdown} seconds`
                    : "Resend code"}{" "}
                  {regenerateLoading && (
                    <div className="loader ml-1" id="loader"></div>
                  )}
                </button>
              </div>
              <button
                type="submit"
                className=" button flex items-center justify-center"
              >
                Verify{" "}
                {isCodeVerifierLoading && (
                  <div className="loader ml-1" id="loader"></div>
                )}{" "}
              </button>
            </form>

            <button
              onClick={() => {
                setIsEmailSent(false);
                setUserId(null);
                setVerifiedEmail(null);
                setNewPassword("");
              }}
              className=" text-sm text-white flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Go back
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default ForgotPassword;

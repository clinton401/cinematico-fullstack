import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../App";
import useVerifiedRedirects from "../CustomHooks/useVerifiedRedirects";
import useCountdown from "../CustomHooks/useCountdown";
function EmailOtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  
  const { toastHandler, authUrl } = useContext(myContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const verifiedRedirects = useVerifiedRedirects();
 const {isNewClicked, setIsNewClicked, countdown} = useCountdown()

  async function otpVerifier(e) {
    e.preventDefault();

    if (otp.length !== 6) {
      toastHandler(false, "The OTP must be exactly 6 characters.");
      return; // Prevent further execution if OTP is not valid
    }

    try {
      setIsLoading(true); // Set loading to true when the operation starts

      const response = await fetch(`${authUrl}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userId,
          otp,
          verifiedRedirects
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.redirectUrl;
        toastHandler(true, data.msg || "Email verified successfully");
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
      setIsLoading(false); // Set loading to false after the operation ends
    }
  }

  const resendOtpHandler = async () => {
    if (countdown > 0 && isNewClicked) {
      toastHandler(false, `Wait ${countdown} seconds`);
      return; // Early return to prevent further execution
    }

    try {
      setRegenerateLoading(true);
      const response = await fetch(
        `${authUrl}/auth/generate-verification-otp/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsNewClicked(true);
        toastHandler(true, data.msg || "OTP sent successfully");
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
      setRegenerateLoading(false);
    }
  };
  return (
    <main className="w-full text-white px-5half pt-[150px] pb-10 min-h-dvh flex items-center flex-col justify-center gap-4">
      <p className="sm:w-3/4 w-full text-center">
        A verification code has been sent to your email. Please check your inbox
        (and spam folder) and enter the code to verify your email address. The
        code will expire in 1 hour.
      </p>
      <form
        onSubmit={otpVerifier}
        className="sm:w-1/2 w-full flex flex-col gap-4 items-center "
      >
        <input
          type="text"
          name="code"
          value={otp}
          onChange={({ target }) => setOtp(target.value)}
          className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
          placeholder="Enter code"
          required
        />
        <button className=" button flex items-center justify-cente">
          Verify {isLoading && <div className="loader ml-1" id="loader"></div>}{" "}
        </button>
      </form>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xs text-gray-300">Didn't send code yet? </p>

        <button
          className="text-[#FFD700] text-sm p-2 flex  "
          disabled={countdown > 0 && isNewClicked}
          onClick={resendOtpHandler}
        >
          {" "}
          {countdown > 0 && isNewClicked
            ? `Wait ${countdown} seconds`
            : "Resend code"}{" "}
          {regenerateLoading && <div className="loader ml-1" id="loader"></div>}
        </button>
      </div>
    </main>
  );
}

export default EmailOtpVerification;

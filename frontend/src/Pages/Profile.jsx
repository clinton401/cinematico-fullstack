import {useEffect, useState, useContext} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { myContext } from "../App";
import LoaderComp from "../Components/LoaderComp";
import { useNavigate } from "react-router-dom";
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
const Profile = () => {
const [formDetails, setFormDetails ] = useState({
    username: "",
    email: "",
    password: ""
});
const [isEditOpen, setIsEditOpen] = useState(false)
const [isEditLoading, setIsEditLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [verifyEmailLoading, setVerifyEmailLoading] = useState(false);
const [deleteLoading, setDeleteLoading] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false)
const [accountCreationDate, setAccountCreationDate] = useState({
    day: null,
    month: null,
    year: null
})
const {  userDataLoading,
    userData,
    fetchData, toastHandler, userError, setIsLoggedIn, authUrl} = useContext(myContext)
const {username, email, password} = formDetails;
const {day, month, year} = accountCreationDate;

const navigate = useNavigate()
function formDetailsHandler(type, details) {
    if (type && details !== undefined) {
      setFormDetails((prevFormDetails) => ({
        ...prevFormDetails,
        [type]: details,
      }));
    }
  }
  
  
useEffect(() => {
    if(userData && userData.date) {
        const date = new Date(userData.date);
  const acctYear = date.getFullYear();
const acctMonth = date.getMonth() + 1;
const acctDay = date.getDate();
setAccountCreationDate({
    day: acctDay,
    month: acctMonth,
    year: acctYear
})
    } else {
        setAccountCreationDate({
            day: null,
            month: null,
            year: null
        })
    }
}, [userData])
async function editDetailsHandler(e) {
    e.preventDefault();
    if (username.length < 3 && email.length < 3 && password.length < 3 ) {
        toastHandler(false, "At least one field must have 3+ characters.");
        return;
    }
    try {
        setIsEditLoading(true);
        const response = await fetch(`${authUrl}/auth/edit-details`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username.length > 0? username: null, email: email.length > 0? email: null, password: password.length > 0? password: null }),
        });

        if (response.status === 401) {
            navigate("/login");
            setIsLoggedIn(false);
        } else if (response.ok) {
            const data = await response.json();
            setIsEditOpen(false);
                setFormDetails({
                    username: "",
                    password: "",
                    email: ""
                })
            fetchData();
            toastHandler(true, data.msg || "User details updated successfully");
        } else {
            const { error } = await response.json();
            throw new Error(error.msg || "Something went wrong. Please try again later.");
        }

    } catch (err) {
        console.error(err);
        toastHandler(
          false,
          err.message || "Something went wrong. Please try again later."
        );
    } finally {
        setIsEditLoading(false);
    }
}

async function deleteAccount () {
    try {
        setDeleteLoading(true);
        const response = await fetch(`${authUrl}/auth/delete-account`, {
            method: "DELETE",
            credentials: "include"
        });
        if (response.status === 401) {
            navigate("/login");
            setIsLoggedIn(false);
            setIsDeleteOpen(false);
        } else if (response.ok) {
            const data = await response.json();
            navigate("/login");
            setIsLoggedIn(false);
            setIsDeleteOpen(false);
            toastHandler(true, data.msg || "User account deleted successfully");
        }else {
            const { error } = await response.json();
            throw new Error(error.msg || "Something went wrong. Please try again later.");
        }

    } catch (err) {
        console.error(err);
        toastHandler(
          false,
          err.message || "Something went wrong. Please try again later."
        );
    } finally {
        setDeleteLoading(false)
    }
}
async function verifyEmail() {
    if (!userData || !userData._id) {
        toastHandler(false, "User not found");
        return;
    }
    try {
        setVerifyEmailLoading(true);
        const response = await fetch(`${authUrl}/auth/generate-verification-otp/${userData._id}`, {
            method: "POST",
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            navigate(`/verify-otp/${userData._id}?redirects=${encodeURIComponent("/user")}`);
            toastHandler(true, data.msg || "OTP sent successfully");
            
        } else {
            const { error } = await response.json();
            throw new Error(error.msg || "Something went wrong. Please try again later.");
        }
    } catch (err) {
        console.error(err);
        toastHandler(
          false,
          err.message || "Something went wrong. Please try again later."
        );
    } finally {
        setVerifyEmailLoading(false);
    }
}

  function refreshHandler() {
    window.location.reload();
  }

  if(userDataLoading) return <><LoaderComp/></>
  if(userError) return  <section className="w-full px-[2.5%] flex flex-col  max-h-[1300px] items-center justify-center gap-4 h-dvh min-h-[500px] ">
  <h1 className="text-xl font-[900] text-center w-full  pt-8 text-white sm:text-4xl">
    Something went wrong
  </h1>
  <p className="text-center text-white">{userError}</p>
  <div className="flex justify-center items-center">
    <button className="button2 text-lg " id="active" onClick={refreshHandler}>
      Click to refresh
    </button>
  </div>
</section>;



    return <main className="w-full min-h-dvh text-white pt-[150px] px-5half pb-10 flex flex-col gap-10 items-center   ">
        {userData ? <><section className="flex flex-col gap-4 items-center"> <h2 className="text-3xl font-black font-cinzel">User Details</h2>
        <ul className="flex gap-2 flex-col">
            <li>Username: {userData.username}</li>
            <li>Email: {userData.email}</li>
            <li>Account creation date: {day}-{month}-{year}</li>
            <li className="flex items-center"> Email is {userData.verification.verified === false? "not": ""} verified {userData.verification.verified === false && <button className="ml-2 button flex items-center justify-center" onClick={verifyEmail}>
         Verify email{" "}
          {verifyEmailLoading && <div className="loader ml-1" id="loader"></div>}
        </button>}</li>
        </ul>
        <button className="button2" onClick={()=>setIsEditOpen(true)}>Edit details</button></section>
        <section>
            <h2 className="text-center text-3xl font-black font-cinzel">Bookmarks</h2>
            <p className="text-center">Currently  unavailable</p>
        </section>
        <AnimatePresence>
        {isEditOpen && (
          <motion.section
            variants={popupVariants}
            initial="hidden"
            animate={"visible"}
            exit="exit"
            key="modal"
            className="w-full fixed top-0 left-0 px-5half items-center flex-col gap-6 blurred3 z-[300] flex  justify-center  min-h-dvh"
          >
            <form
              className="w-full max-w-[400px]  shadow-lg text-white  bg-black  rounded-md flex flex-col gap-6 p-4"
              onSubmit={editDetailsHandler}
            >
              <div className="flex items-center flex-col gap-2 *:text-center">
                <h3 className="font-cinzel text-2xl font-black">
                  {" "}
                  Enter details to be changed
                </h3>
               
              </div>
              <input
                type="text"
                
                name="username"
                onChange={({ target }) => formDetailsHandler("username", target.value)}
                value={username}
                className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
                placeholder="Enter new username"
              />
              <input
                type="text"
                
                name="email"
                onChange={({ target }) => formDetailsHandler("email", target.value)}
                value={email}
                className="w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
                placeholder="Enter new email"
              />
              <span className="w-full relative">
                <input
                  onChange={({ target }) => formDetailsHandler("password", target.value)}
                  name="password"
                  type={!showPassword ? "password" : "text"}
                  className="w-full outline-none  bg-transparent border-b  pr-[35px] placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg "
                  placeholder="Enter new password"
                  
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
            
              <button
                type="submit"
                className=" button flex items-center justify-center"
              >
                Edit details
                {isEditLoading && (
                  <div className="loader ml-1" id="loader"></div>
                )}{" "}
              </button>
            </form>

            <button
              onClick={() => {
                setIsEditOpen(false);
                setFormDetails({
                    username: "",
                    password: "",
                    email: ""
                })
              }}
              className="text-sm text-white flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Go back
            </button>
          </motion.section>
        )}
      </AnimatePresence>
      <button
                
                className=" button flex items-center justify-center"
                onClick={()=>setIsDeleteOpen(true)}
              >
               Delete account
               
              </button>
              {isDeleteOpen && <motion.section
            variants={popupVariants}
            initial="hidden"
            animate={"visible"}
            exit="exit"
            key="modal"
            className="w-full fixed top-0 left-0 items-center px-5half flex-col gap-6 blurred3 z-[300] flex  justify-center  min-h-dvh"
          >
          <div className="w-full max-w-[400px]  shadow-lg text-white  bg-black  rounded-md flex flex-col gap-4 p-4">
          <h3 className="font-cinzel text-2xl font-black">Are you absolutely sure?</h3>
          <p className="text-xs text-gray-300 ">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
          <span className="flex gap-2 items-center flex-wrap justify-end">
          <button
              className="button2"
              id="delete_btn"
              onClick={()=>setIsDeleteOpen(false)}
              
            >
              Cancel
            </button>
          <button
              className="button2 active flex items-center"
              id="delete_btn"
              onClick={deleteAccount}
            >
              Continue
              {deleteLoading && (
                  <div className="loader ml-1" id="loader"></div>
                )}
            </button>
          </span>
          </div>
          </motion.section>}
      </> : <h1 className="text-3xl font-black font-cinzel">User details not found</h1>}

    </main>
}
export default Profile
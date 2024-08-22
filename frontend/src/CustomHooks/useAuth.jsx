import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Install with `npm install js-cookie`
import {useLocation} from "react-router-dom"
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
const {pathname} = useLocation();
console.log(Cookies.get('isAuthenticated'))
    const checkAuth = () => {
   
        const isAuth = Cookies.get('isAuthenticated') === 'true';
        setIsLoggedIn(isAuth);
    };

    // Initial check and event listener setup
    useEffect(() => {
        checkAuth(); // Initial check

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                
                checkAuth();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);


    useEffect(() => {
        let intervalId;

        if (isLoggedIn) {
            
            intervalId = setInterval(() => {
               
                checkAuth();
            },  30 * 1000);
        }

        return () => {
            
            clearInterval(intervalId);
        };
    }, [isLoggedIn]);
    useEffect(() => {
        checkAuth()
    }, [pathname]);

    return { isLoggedIn, setIsLoggedIn };
};

export default useAuth;

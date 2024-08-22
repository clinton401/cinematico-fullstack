import {useState, useEffect} from 'react'

function useCountdown() {
    const [isNewClicked, setIsNewClicked] = useState(false);
    const [countdown, setCountdown] = useState(60);
    useEffect(() => {
        let interval;
        if (isNewClicked) {
          interval = setInterval(() => {
            setCountdown((prevCountdown) => {
              if (prevCountdown > 1) {
                return prevCountdown - 1;
              } else {
                clearInterval(interval);
                setIsNewClicked(false);
                return 60;
              }
            });
          }, 1000);
        }
    
        return () => clearInterval(interval);
      }, [isNewClicked]);
  return {isNewClicked, setIsNewClicked, countdown}
}

export default useCountdown

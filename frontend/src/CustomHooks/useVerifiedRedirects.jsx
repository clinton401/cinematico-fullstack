import { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import useQuery from "./useQuery";
function useVerifiedRedirects() {
    const [verifiedRedirects, setVerifiedRedirects] = useState(null);
    const queryParams = useQuery();

    const redirects = queryParams.get("redirects");
const {isRouteValid} = useContext(myContext)
    useEffect(() => {
        if (typeof redirects !== 'string') {
            return setVerifiedRedirects(null);
        }
        
        if (redirects && redirects.length > 0 && isRouteValid(redirects)) {
            setVerifiedRedirects(redirects);
        } else {
            setVerifiedRedirects(null); 
        }
    }, [redirects]);

    return verifiedRedirects;
}

export default useVerifiedRedirects;
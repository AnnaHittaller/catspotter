import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { Outlet, Navigate, useLocation} from "react-router-dom"
import Spinner from "../features/Spinner"

export default function ProtectedLayout (props) {
    const { state } = useContext(AppContext)
    const location = useLocation()
    const [tokenChecked, setTokenChecked] = useState(false);

 
  useEffect(() => {
		const checkToken = async () => {
			// Wait until state.user._id is available
			while (!state.user._id) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}

 			// Perform additional checks if needed
 			//const isValidToken = true;
			setTokenChecked(true);
		};

		checkToken();
	}, [state.user._id]);

	if (!tokenChecked) {
		// Token validation is in progress
		return <Spinner />; 
	}

    if(state.user._id) {
        localStorage.setItem("abandonedAddress", location.pathname)
        return <Outlet/>
    } 
    return <Navigate to="/login"/>
    
}
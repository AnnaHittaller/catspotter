import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Outlet, Navigate, useLocation} from "react-router-dom"

export default function ProtectedLayout (props) {
    const { state } = useContext(AppContext)
    const location = useLocation()
    //const [tokenChecked, setTokenChecked] = useState(false);

 
//   useEffect(() => {
// 		const checkToken = async () => {
// 			// Wait until state.user._id is available
// 			while (!state.user._id) {
// 				await new Promise((resolve) => setTimeout(resolve, 100));
// 			}

// 			// Perform additional checks if needed
// 			const isValidToken = true; // Replace with your token validation logic, may not be needed

// 			setTokenChecked(true);
// 		};

// 		checkToken();
// 	}, [state.user._id]);

// 	if (!tokenChecked) {
// 		// Token validation is in progress, show a loading state or skeleton screen if desired
// 		return <div>Loading...</div> ; //this has to be a spinner
// 	}

    if(state.user._id) {
        localStorage.setItem("abandonedAddress", location.pathname)
        return <Outlet/>
    } 
    return <Navigate to="/login"/>
    
}
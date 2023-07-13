import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Outlet, Navigate, useLocation} from "react-router-dom"

export default function ProtectedLayout () {
    const { state } = useContext(AppContext)
    const location = useLocation()

    if(state.user._id) {
        localStorage.setItem("abandonedAddress", location.pathname)
        return <Outlet/>
    } 
    return <Navigate to="/login"/>
    
}
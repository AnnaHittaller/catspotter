import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Outlet, Navigate, useLocation} from "react-router-dom"

export default function ProtectedLayout () {
    const { state } = useContext(AppContext)

    if(state.user._id) {
        return <Outlet/>
        localStorage.setItem("abandonedAddress", location.pathname)
    } 
    return <Navigate to="/login"/>
    
}
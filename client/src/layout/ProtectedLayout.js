import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Outlet, Navigate } from "react-router-dom"

export default function ProtectedLayout () {
    const { state } = useContext(AppContext)

    if(state.user._id) {
        return <Outlet/>
    } 
    return <Navigate to="/login"/>
    
}
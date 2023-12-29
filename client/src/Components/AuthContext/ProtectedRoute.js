import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";


export function ProtectedRoute({children}) {
    const {user, loadingUser} = useAuth()
    
    if(loadingUser) return null
    if(!user) return <Navigate  to={"/"} />


    return <>{children}</>
}
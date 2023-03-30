
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";



export default function NotLoggedin () {
    const users = useSelector ((user) => user.LogIn.login);
   return users ? <Navigate to="/" /> : <Outlet/>
}



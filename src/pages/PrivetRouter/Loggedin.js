
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../Login";


export default function Loggedin () {
    const users = useSelector ((user) => user.LogIn.login);
    return users ? <Outlet/> : <Login/>
}
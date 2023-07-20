import React from 'react'
import Sidebaricons from './Sidebaricons';
import "./style.css";
import { HiLogout } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { LogingUser } from '../../features/counter/UserSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Popup from '../Modal';
import { useState } from 'react';

const Sidebar = () => {
    const users = useSelector((user) => user.LogIn.login);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const auth = getAuth();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {

        signOut(auth)
            .then(() => {
                localStorage.removeItem("users")
                dispatch(LogingUser(null));
                navigate("/login")
            })
            .catch((error) => {

            });
    };

    const handlOpen = () => {
        setOpen(true);
    };


    return (
        <>

            <div className="sidebar">

                <div className="sidebar_wrapper">

                    <div className="profile_info">

                        <div className="profile_pic" onClick={handlOpen} >
                            <picture>
                                {
                                    users.photoURL ? <img src={users.photoURL} alt="" /> : <img src="./img/pavater.png" alt="" />
                                }

                            </picture>
                            <div className="profile_overlay">
                                <AiOutlineCloudUpload />
                            </div>
                        </div>
                        <div className='users_name'>
                            <h4>{users.displayName}</h4>
                        </div>
                    </div>


                    <div className="others_page">
                        <Sidebaricons />
                    </div>

                    <div className="logout" onClick={handleLogout}>
                        <HiLogout />
                    </div>

                </div>
            </div>
            <Popup open={open} setOpen={setOpen} />
        </>
    )
};

export default Sidebar;
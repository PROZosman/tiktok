import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { RxGear } from 'react-icons/rx';
import {  NavLink } from 'react-router-dom';


const Sidebaricons = () => {
  return (
    <div className='sidebaricons'>

      <NavLink className="icons" to="/">
        <AiOutlineHome />
      </NavLink>

      <NavLink className="icons" to="/message">
        <FaComment />
      </NavLink>

      <div className="icons">
        <IoMdNotifications />
      </div>

      <NavLink className="icons" to="/accountinfo">
        <RxGear />
      </NavLink>

    </div>
  )
}

export default Sidebaricons;

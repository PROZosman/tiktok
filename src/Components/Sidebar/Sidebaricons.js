import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { RxGear } from 'react-icons/rx';


const Sidebaricons = () => {
  return (
    <div className='sidebaricons'>

      <div className="icons">
        <AiOutlineHome />
      </div>

      <div className="icons">
        <FaComment />
      </div>

      <div className="icons">
        <IoMdNotifications />
      </div>

      <div className="icons">
        <RxGear />
      </div>

    </div>
  )
}

export default Sidebaricons;

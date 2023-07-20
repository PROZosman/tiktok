import React from 'react'
import "./style.css";
import { BsSearch } from 'react-icons/bs';

const Searchbox = () => {
    return (
        <div className='Search_wrapper'>

            <div className='search_icons'> <BsSearch /></div>
            <div className='search_fildes'><input type="text" placeholder='Search Hare' /></div>

        </div>

    )
}

export default Searchbox;

import React from 'react';
import "./style.css";
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { Thememode } from '../../features/counter/themeSlice';

const Darkmode = () => {
  const theme = useSelector((state) => state.themechange.Darkmode);
  const dispatch = useDispatch();

 const handleTheme = (e) =>{
if(e.target.checked){
  dispatch(Thememode(true));
  localStorage.setItem("mode", true);
} 
else {
  dispatch(Thememode(false));
  localStorage.removeItem("mode", false);
}
 };

  return (
    <>
    <div className='themes_part'>
    <Switch onChange={handleTheme} checked={theme} />
    </div>
    
    </>
  )
}

export default Darkmode;
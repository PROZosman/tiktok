import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const Rootlayout = () => {
  return (
    <div>
        <Grid container>

        <Grid xs={1}>
         <Sidebar />
        </Grid>

        <Grid xs={11}>
       <Outlet />
        </Grid>

      </Grid>
    </div>
  )
};

export default Rootlayout;


import React from 'react';
import "./style.css";
import Grid from '@mui/material/Grid';
import Msggrp from '../../Components/msggrp';
import Friends from '../../Components/Friends';
import Chatting from '../../Components/chatting';

const Message = () => {
  return (
    <div>

<Grid container justifyContent="space-between" marginTop={2}>

        <Grid item xs={4} className='msggrp_items' >
          <Msggrp/> 
           <Friends/>
          </Grid>

        <Grid item xs={8} >
          <Chatting/>
          </Grid>
        
</Grid>

    </div>
  )
}

export default Message;
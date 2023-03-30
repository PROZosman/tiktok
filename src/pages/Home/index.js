
import React from 'react';
import "./home.css";
import Grid from '@mui/material/Grid';
import Searchbox from '../../Components/Searchbox';
import Grouplist from '../../Components/Grouplist';
import FriendRequest from '../../Components/FriendRequest';
import Friends from '../../Components/Friends';
import Mygroups from '../../Components/Mygroups';
import Userlist from '../../Components/Userlist/index.';
import Block from '../../Components/Block';


const Home = () => {
  return (
    <>
      <Grid container className='home_pages'>
        <Grid item xs={4} className="home_items">
          <div>
            <Searchbox />
          </div>
          <div>
            <Grouplist />
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friends />
          </div>
          <div>
            <Mygroups />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Userlist />
          </div>
          <div>
            <Block />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

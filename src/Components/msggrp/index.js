import React, { useEffect, useState } from 'react';
import "./style.css";
import Button from '@mui/material/Button';
import { ref,getDatabase,onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { activeChat } from '../../features/counter/activeChatSlice';

const Msggrp = () => {
    const [msgGrp, setMsgGrp] = useState ([]);
    const db = getDatabase();
    const dispatch = useDispatch();

    useEffect(()=> {
    
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let grpArr=[]
            snapshot.forEach((item)=>{
                grpArr.push({...item.val(), id: item.key});
          });
          setMsgGrp(grpArr);
        });
    
    }, [])



    // Active  Group

const handleActiveGroup = (item) => {
    dispatch(
        activeChat({
            status:"group",
            id: item.id,
            name : item.groupname,
            adminname : item.adminname,
            adminid: item.adminid,
            
        })
    )
}




    return (
    <>
    <div className='msggps'>
    <div className="msggps_header">
        <h4>All Groups</h4>
     </div>

     {

    msgGrp.map((item,i)=>(

    <div className="msggps_wrapper" key={i} onClick={()=> handleActiveGroup (item)}>
                    <div className='msggps_images'></div>
                    <div className='msggps_name'>
                        <h5>{item.groupname}</h5>
                        <span>letz enjoy</span>
                    </div>
                    <div className='msggps_btn'>
                        <Button variant="contained">message</Button>
                       
                    </div>
                </div>
  
    ))

    }
      
</div>



    
    </>
    
  )
}

export default Msggrp;
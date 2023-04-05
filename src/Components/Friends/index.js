import React, { useEffect, useState } from 'react'
import "./style.css";
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import { Block } from '@mui/icons-material';


const Friends = () => {

  const [frndlist, setfrndlist] = useState([]);
  const db = getDatabase();
  const user = useSelector ((users) => users.LogIn.login);



  useEffect ( ()=> {
    
        const starCountRef = ref(db, 'Friends');
        onValue(starCountRef, (snapshot) => {
            let frndArr=[]
            snapshot.forEach((item)=>{
               frndArr.push({...item.val(), id:item.key});
          });
          setfrndlist(frndArr);
        });
    
    }, [])


 

    // Block 

    const handleBlock = (item) => {
  if (user.uid == item.senderid){
   
    set(push(ref(db,"block")),{

        block : item.recivername,
        blockid : item.reciverid,
        blockedby : item.sendername,
        blockbyid :  item.senderid,
    }).then(()=>{
        remove(ref(db, "Friends/" + item.id))
    })
}};

 // handleUnfriend 

 const handleUnfriend = (item) => {
    remove(ref(db, "Friends/" + item.id));
 }

    return (
        <div className='friends'>
            <div className="friends_header">
                <h4>Friends</h4>
            </div>


            {

 frndlist.map((item, i)=>(

    <div className="friends_wrapper" key={i}>
                <div className='friends_images'></div>
                <div className='friends_name'> 
                    <h5>{user.uid == item.senderid ? item.recivername : item.sendername}</h5>
                </div>
                <div className='friends_btn'>
                    <Button variant="contained" onClick={()=>handleUnfriend(item)}>Unfriend</Button>
                    <Button variant="contained" onClick={()=>handleBlock(item)}>Block</Button>
                </div>
            </div>


))

            }

        </div>
    )
}

export default Friends;

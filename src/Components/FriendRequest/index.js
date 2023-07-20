import React, { useEffect, useState } from 'react'
import "./style.css"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {

    const [friendreq,setFriendreq] = useState([]);
    const user = useSelector ((users) => users.LogIn.login);
    const db = getDatabase();
    const [friendCancle, setFriendCancle] = useState([]);

// show friendrequest

useEffect(()=> {
    
    const starCountRef = ref(db, 'friendrequest');
    onValue(starCountRef, (snapshot) => {
        let reqArr=[]
        snapshot.forEach((item)=>{
            if(item.val().reciverid == user.uid) {
                reqArr.push({...item.val(), id: item.key});
            }
      });
      setFriendreq(reqArr);
    });

}, [])


// acceptrequest
const handleAccept = (data) => {

    set(push(ref(db, "Friends")), {
        ...data,
      }).then(() => {
        remove(ref(db, "friendrequest/" + data.id));
      });
   
};

// Rejectrequest

const handleReject = (data) => {

    remove(ref(db, "friendrequest/" + data.id));
}


    return (
        <>
            <div className="friendRequest">
                <div className="friendRequest_header">
                    <h4>Friend Request</h4>
                </div>
                
              {

                friendreq.map((item, i)=> (
                    <div key={i} className="friendRequest_wrapper">
                    <div className='friendRequest_images'>
                    <picture>
                    <img src={item.senderprofilepic || "./img/pavater.png"}  alt="" />
                </picture>
                    </div>
                    <div className='friendRequest_name'>
                        <h5>{item.sendername}</h5>
                    </div>
                    <div className='friendRequest_btn'>
                        <Button variant="contained"onClick={()=>handleAccept(item)} >Accept</Button>
                        <Button variant="contained" onClick={()=>handleReject(item)}>Reject</Button>
                    </div>
                </div>
                ))
                
                }


              
                
            </div>
        </>
    )
}

export default FriendRequest;

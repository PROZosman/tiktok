import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { getDatabase,ref, onValue,push,set,remove,} from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { Block } from "@mui/icons-material";
import { activeChat } from "../../features/counter/activeChatSlice";



const Friends = () => {
  const [frndlist, setfrndlist] = useState([]);
  const db = getDatabase();
  const dispatch = useDispatch ();
  const activeChatName = useSelector ((active) => active.activechat.active);
  const user = useSelector((users) => users.LogIn.login);

  useEffect(() => {
    const starCountRef = ref(db, "Friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val(). reciverid || user.uid == item.val().senderid) {
          frndArr.push({ ...item.val(), id: item.key });
        }
        
      });
      setfrndlist(frndArr);
    });
  }, []);

  // Block

    const handleBlock = (item) => {
  if (user.uid == item.senderid){
   
    set(push(ref(db,"block")),{

        block : item.recivername,
        blockid : item.reciverid,

        blockedby : item.sendername,
        blockbyid :  item.senderid,
        senderprofilepic : item.senderprofilepic,
        reciverprofilePicture : item.reciverprofilePicture
    }).then(()=>{
        remove(ref(db, "Friends/" + item.id));
    });
} else {
  set(push(ref(db,"block/")),{

    block : item.sendername,
    blockid : item.senderid,
    blockedby : item.recivername,
    blockbyid :  item.reciverid,
    senderprofilepic : item.senderprofilepic,
    reciverprofilePicture : item.reciverprofilePicture
  

}).then(()=>{
    remove(ref(db, "Friends/" + item.id));
});
} 

 };

 // handleUnfriend 

  const handleUnfriend = (data) => {
    remove(ref(db, "Friends/" + data.id));
  };


  // activesinglefriends

  const handleActiveSingle = (item) => {
if(item.reciverid == user.uid) {
  dispatch(
    activeChat({
    status : "Single",
    id : item.senderid,
    name: item.sendername,
  
  }));
}
else {
  dispatch(
    activeChat({
    status : "Single",
    id : item.reciverid,
    name: item.recivername,
  }))
}
localStorage.setItem("activeChat", JSON.stringify(activeChatName));
  };
  

  return (

    
    <div className="friends">
      <div className="friends_header">
        <h4>Friends</h4>
      </div>


            {

frndlist.map((item, i)=>(

    <div className="friends_wrapper" key={i}  onClick={()=> handleActiveSingle (item)}   >
                <div className='friends_images'>
                
                <picture>
                    {
                    
                   user.uid == item.senderid
                   ?
                   (
                    <img src={item.reciverprofilePicture || "./img/pavater.png"}  alt="" />
                    
                         
                   )
              :
              (
  
                <img src={item.senderprofilepic || "./img/pavater.png"}  alt="" />
                   
                )


                    }
                </picture>

                </div>
                <div className='friends_name'> 
                    <h5>{user.uid === item.senderid ? item.recivername : item.sendername}</h5>
                </div>
                <div className='friends_btn'>
                    <Button variant="contained" onClick={()=>handleUnfriend(item)}>Unfriend</Button>
                    <Button variant="contained" onClick={()=>handleBlock(item)}>Block</Button>
                </div>
            </div>


))}

        </div>
      )}
  
 

export default Friends;

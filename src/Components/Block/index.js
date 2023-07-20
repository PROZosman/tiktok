import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import "./style.css";
import {getDatabase,ref,onValue, remove,set, push} from "firebase/database";
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { AiOutlineInfoCircle } from 'react-icons/ai';



const Block = () => {
const [BlockUser, setBlockUser] = useState([]);
    const db = getDatabase();
    const user = useSelector ((users) => users.LogIn.login);

    useEffect(() => {
        const starCountRef = ref(db, "block");
        onValue(starCountRef, (snapshot) => {
          let BlockArr=[]
          snapshot.forEach((item)=>{
           if (item.val().blockbyid == user.uid) {
            BlockArr.push({
               id: item.key,
               block: item.val().block,
               blockid : item.val().blockid,
               reciverprofilePicture : item.val().reciverprofilePicture,
               senderprofilepic : item.val().senderprofilepic,

            });
           }
           else {
            BlockArr.push({
                id: item.key,
                blockedby: item.val().blockedby,
                blockbyid : item.val().blockbyid,
                senderprofilepic : item.val().senderprofilepic,
                reciverprofilePicture : item.val().reciverprofilePicture,
             });
           }
          });
          setBlockUser(BlockArr)
        });
    }, []);

    
// unblock code
   
const handleUnblock = (item) => {
remove(ref(db, "block/" + item.id))
}



    return (
       
            <>
                <div className='Block'>
                    <div className="Block_header">
                        <h4>Block</h4>
                    </div>

                    {

BlockUser.map((item, i)=>(

    <div key={i} className="Block_wrapper">

    <div className='Block_images'>   

                <picture>
                    {
                       item.blockid 
                      ?
                      (<img src={item.senderprofilepic || "./img/pavater.png"}  alt="" />)
                      :
                      (<img src={item.reciverprofilePicture || "./img/pavater.png"}  alt="" />)
                    }
                </picture>

    </div>
    <div className='Block_name'> 
        <h5>{item.block}</h5>
        <h5>{item.blockedby}</h5>
    </div>

    
{
    <div className="Block_btn">
    {item.blockid 
    ? 
    (
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          handleUnblock(item);
        }}
      >
        Unblock
      </Button>
    )
     : 
    (
      "You Are Blocked"
    )}
  </div>
}


</div>
))

} 
                </div>
            </>
      
    )
}

export default Block;

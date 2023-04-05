import React, { useEffect, useState } from 'react';
import "./style.css";
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelect } from '@mui/base';
import { useSelector } from 'react-redux';



const Userlist = () => {
    const [userlists, setUserlists] = useState([]);
    const [friendreq,setFriendreq] = useState([]);
    const [frndlist,setFrndlist] = useState([]);
    const db = getDatabase();
    const user = useSelector ((users) => users.LogIn.login);
    


    

    useEffect(() => {
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const userarr = [];
            snapshot.forEach((userlists) => {
                if( user.uid != userlists.key) {
                    userarr.push({...userlists.val(), id: userlists.key});
                }
            });
            setUserlists(userarr);
        });
    }, []);




    //sentrequest
 
const handleSentRequest = (item) => {
   
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
     senderid : user.uid,
     recivername : item.username,
     reciverid : item.id,
    });
}


// // handleCancleRequest 

// const handleCancleRequest = (data) => {
//     remove(ref(db, "friendrequest/" + data.id));
// }


///friendlist show

useEffect(()=>{

    const starCountRef = ref(db, 'Friends/');
    onValue(starCountRef, (snapshot) => {
        let frndArr=[]
        snapshot.forEach((item)=>{
            frndArr.push(item.val().reciverid + item.val().senderid)
      });
      setFrndlist(frndArr);
    });

}, [])



//  showfriendrequest

useEffect(()=> {
    
    const starCountRef = ref(db, 'friendrequest/');
    onValue(starCountRef, (snapshot) => {
        let reqArr=[]
        snapshot.forEach((item)=>{
         reqArr.push(item.val().reciverid + item.val().senderid);
      });
      setFriendreq(reqArr);
    });

}, [])

    
    return (
        <>
            <div className='Userlist'>
                <div className="Userlist_header">
                    <h4>User List</h4>
                </div>
                {
                    userlists.map((item, i) => (
                        <div key={i} className="Userlist_item_wrapper">
                            <div className='Userlist_images'></div>
                            <div className='Userlist_name'>
                                <h5>{item.username}</h5>
                            </div>
                            

                            <div className='Userlist_btn'>



{

frndlist.includes (item.id + user.uid) || frndlist.includes(user.uid + item.id ) 

? 

<Button variant="contained" disabled >Friends</Button>
 
 :

 friendreq.includes (item.id + user.uid) || friendreq.includes(user.uid + item.id ) 

?


<Button variant="contained" disabled >Cancle Friends</Button>

:

<Button variant="contained" onClick={()=> handleSentRequest(item)}>Sent Request</Button>

}

          </div>           
            </div>
                    ))
                }

            </div>
        </>
    )
}

export default Userlist;

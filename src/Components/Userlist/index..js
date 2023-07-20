import React, { useEffect, useState } from 'react';
import "./style.css";
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import Alert from '@mui/material/Alert';
import { current } from '@reduxjs/toolkit';


const Userlist = () => {
    const [userlists, setUserlists] = useState([]);
    const [friendreq,setFriendreq] = useState([]);
    const [frndlist,setFrndlist] = useState([]);
    const [filteruser,setFilteruser] = useState([]);
    const [cancle,setCancle] = useState([]);
    const storage = getStorage();
    const [remove, setRemove] = useState(false);

   
    const db = getDatabase();
    const user = useSelector ((users) => users.LogIn.login);
    


    

    useEffect(() => {
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const userarr = [];
            snapshot.forEach((userlists) => {
                if( user.uid != userlists.key) {  
                    getDownloadURL(Ref(storage, userlists.key)).then((url)=>{
                        userarr.push({...userlists.val(), id: userlists.key, profilePicture: url});
                    }).catch((error)=>{
                        userarr.push({...userlists.val(), id: userlists.key, profilePicture: null});
                    }).then(()=>{
                        setUserlists([...userarr])
                    }) ;
                }
            });
            setUserlists(userarr);
        });
    }, []);





    //sentrequest
 
const handleSentRequest = (item) => {
   
   if (user.photoURL || item.reciverprofilePicture  ) {
    set(push(ref(db, "friendrequest")), {
        
        sendername: user.displayName,
         senderid : user.uid,
         senderprofilepic : user.photoURL,
         
    
         recivername : item.username,
         reciverid : item.id,
         reciverprofilePicture : item.profilePicture,
       
      
        });
   } 

    else if (!user.photoURL) {
        set(push(ref(db, "friendrequest")), {
        
            sendername: user.displayName,
             senderid : user.uid,
             senderprofilepic : null,
             
        
             recivername : item.username,
             reciverid : item.id,
             reciverprofilePicture : item.profilePicture,
           
            });
    }


   else  {
    set(push(ref(db, "friendrequest")), {
        
        sendername: user.displayName,
         senderid : user.uid,
         senderprofilepic :user.photoURL,
    
         recivername : item.username,
         reciverid : item.id,
         reciverprofilePicture : null,
       
      
        });
   }
}


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
        let cancleArr=[]
        snapshot.forEach((item)=>{
         reqArr.push(item.val().reciverid + item.val().senderid);
         cancleArr.push({...item.val(),id:item.key})
      });
      setFriendreq(reqArr);
      setCancle(cancleArr);
    });

}, [])

// search  


const handleSerach = (e) => {
    let arr = [];

    // if (e.target.value.length === 0 ) {
    //     setFilteruser([]);
    // }

    userlists.filter((item) => {
      if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(item);setFilteruser(arr);
      } else  {
        setFilteruser(arr);
        setRemove(true);
      }
    });
  };

  

//cancle rqst 

const handleCancle = (data) => {
   cancle.map((item)=>{
if(data.id == item.reciverid) {
    remove(ref(db, "friendrequest/" + item.id))
}
   })
}


    
    return (
        <>
            <div className='Userlist'>
                <div className="Userlist_header">
                    <h4>User List</h4>
                    <div className='Search_wrapper'>

            <div className='search_icons'> <BsSearch /></div> 
            <div className='search_fildes'>
                <input onChange={handleSerach} type="text" placeholder='Search Hare' />
            </div>

        </div>
         </div>

        

{
    filteruser.length > 0
    
    ?
    filteruser.map((item, i) => (
        <div key={i} className="Userlist_item_wrapper">
            <div className='Userlist_images'>
            <picture>
                    <img src={item.profilePicture || "./img/pavater.png"}  alt="" />
                </picture>
            </div>
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

    : 
    remove && filteruser.length == 0 
    ? 
      (
        <Alert severity="info">This User is Not Exit!</Alert>
      )
    :

    userlists.map((item, i) => (
        <div key={i} className="Userlist_item_wrapper">
            <div className='Userlist_images'>
                <picture>
                    <img src={item.profilePicture || "./img/pavater.png"} alt="" />
                </picture>
            </div>
            <div className='Userlist_name'>
                <h5>{item.username}</h5>
            </div>
            

            <div className='Userlist_btn'>



{

frndlist.includes (item.id + user.uid) || frndlist.includes(user.uid + item.id ) 

? 

<Button variant="contained">Friends</Button>

:

friendreq.includes (item.id + user.uid)  

?

<Button variant="contained" onClick={()=>handleCancle(item)} >Cancle Friends</Button>

:

friendreq.includes(user.uid + item.id)

? 

 <Button variant="contained" size="small">pending</Button>
  
:

<Button variant="contained" onClick={()=> handleSentRequest(item)}>Sent Request</Button>

}

</div>           
</div>
    ))


    
}

                {}

            </div>
        </>
    )
}

export default Userlist;

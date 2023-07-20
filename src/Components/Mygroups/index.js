import React, { useEffect, useState } from 'react';
import "./style.css";
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
 

const Mygroups = () => {
  
    const [mygrouplist, setMygrouplist] = useState([]);

    const [grpreqlist, setGrpreqlist] = useState([]);

    const [member, setMember] = useState(false);

    const [grpmember, setGrpmember] = useState([]);
    
    const db = getDatabase();
    const [show, setShow] = useState(false);
    const user = useSelector ((users) => users.LogIn.login);

    useEffect(() => {
        const starCountRef = ref(db, "groups");
        onValue(starCountRef, (snapshot) => {
          let groupArr=[]
          snapshot.forEach((item)=>{
         if ( user.uid == item.val().adminid) {
            groupArr.push({...item.val(), id:item.key}); 
         }
          });
          setMygrouplist(groupArr);
        });
      }, []);

const handleReqShow = (gitem) =>{
    setShow(true)
    const starCountRef = ref(db, "groupjoinrequest");
    onValue(starCountRef, (snapshot) => {
      let groupreqArr=[]
      snapshot.forEach((item)=>{
        if ( user.uid == item.val().adminid && item.val().groupid == gitem.id) {
            groupreqArr.push({...item.val(), id:item.key}); 

         }
      });
      setGrpreqlist(groupreqArr)
    });
};

const handleAccept = (item) => {
    set(push(ref(db, "groupmembers")),{
        adminid : item.adminid,
        groupid : item.groupid,
        userid : item.userid,
        adminname : item.adminname,
        username : item.username,
        groupname : item.groupname,
      
     }).then(()=>{
        remove(ref(db, "groupjoinrequest/" + item.id));
     })

    
};



 const handleMembershow = (grpmember) => {
setMember(true);
const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      let memberArr=[]
      snapshot.forEach((item)=>{
      if (user.uid == grpmember.adminid && grpmember.id == item.val().groupid) {
      }
      memberArr.push({...item.val(), id: item.key})
      });
      setGrpmember(memberArr)
    });
 };


 // handle grp frndrqst
 
const handlegrpfrndrqst = (item) => {
    remove(ref(db, "groupmembers/" + item.id));
}



    return (
        <div className='Mygroups'>
            <div className="Mygroups_header">
                <h4>Mygroups</h4>
            </div>

            {
                show && <Button variant="contained" onClick={()=>setShow(false)}>Go back</Button>
            }
            {
                member && <Button variant="contained" onClick={()=>setMember(false)}>Go back</Button>
            }


{
    mygrouplist.length == 0 
    ?
     <Alert severity="error">"No groups created yet"</Alert>
     : 
     show ? 
   grpreqlist.length == 0 ? 
   <Alert severity="error">"No rqest show"</Alert>
    :   
    grpreqlist.map((item, i)=>(
    <div key={i} className="Mygroups_wrapper">
    <div className='Mygroups_images'>
   
    </div>
    <div className='Mygroups_name'> 
        <h4>{item.username}</h4>
    </div>
    <div className="Mygroups_btn">
    <Button variant="contained" onClick={()=>handleAccept(item)}>Accept</Button>
    <Button variant="contained">Reject</Button>
    </div>
</div>

    ))
      : 
      (
member 
?
(
    grpmember.map((item, i)=>(
<div key={i} className="Mygroups_wrapper">
        <div className='Mygroups_images'>
        </div>
        <div className='Mygroups_name'> 
            <h4>{item.username}</h4>
        </div>
    
        <div className="handlegrpfrndrqst">
    <Button variant="contained" onClick={()=>handlegrpfrndrqst(item)}>remove</Button>
    </div>
      
    </div>
    ))
)

:

(
    mygrouplist.map((item, i)=>(
        <div key={i} className="Mygroups_wrapper">
        <div className='Mygroups_images'></div>
        <div className='Mygroups_name'> 
        <span>Admin : {item.adminname}</span>
            <h4>{item.groupname}</h4>
            <span>{item.grouptag}</span>
        </div>
        <div className="Mygroups_btn">
        <Button variant="contained" onClick={() => handleMembershow (item)}>Info</Button>
        <Button variant="contained" onClick={()=>handleReqShow(item)}>Request</Button>
        </div>
    </div>
    ))
 )
      )
}

 
        </div>
    )
}

export default Mygroups;
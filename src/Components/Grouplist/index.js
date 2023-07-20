import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import "../../index.css";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Grouplist = () => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const db = getDatabase();
  const [groupname, setGroupname] = useState("")
  const [grouptag, setGrouptag] = useState("")
  const [randomgroup, setRandomgroup] = useState([]);
  const user = useSelector ((users) => users.LogIn.login);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleCreate = () => {
    set(push(ref(db, "groups")),{
     groupname : groupname,
     grouptag : grouptag,
     adminname : user.displayName,
     adminid : user.uid,
  }).then (()=>{
    setOpen(false);
  });
  };

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let groupArr=[]
      snapshot.forEach((item)=>{
     if ( user.uid !== item.val().adminid) {
        groupArr.push({...item.val(), id:item.key}); 
     }
      });
      setRandomgroup(groupArr);
    });
  }, []);
 

  const handleJoingroup = (item) => {
    set(push(ref(db, "groupjoinrequest")),{
      groupid : item.id,
      groupname : item.groupname,
      grouptag : item.grouptag,
      adminid : item.adminid,
      adminname : item.adminname,
      userid : user.uid,
      username : user.displayName,
     
      
   })
  };


  return (
    
    <div className="grouplist">
      <div className="grouplist_header">
        <h4>Group List</h4>
        <div className="groups_creation">
        <Button variant="contained" onClick={handleOpen}>Create Group</Button>
        </div>
      </div>

      <div className="scroll">

{
  randomgroup.length == 0 ? <Alert severity="error">"No groups created yet"</Alert> 
  :
  (
    randomgroup.map((item, i)=>(

      <div key={i} className="group_item_wrapper">
      <div className="group_images"></div>
      <div className="groups_name">
        <span>Admin : {item.adminname}</span>
        <h5>{item.groupname}</h5>
        <span>{item.grouptag}</span>
      </div>
      <div className="grouplist_btn">
        <Button variant="contained" onClick={()=>handleJoingroup(item)}>Join</Button>
      </div>
    </div>

    ))
  )
    

}

        

      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Groupe
          </Typography>
          <TextField id="outlined-basic" onChange={(e)=>setGroupname(e.target.value)} margin="normal" label="Group Name" fullWidth variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=>setGrouptag(e.target.value)} margin="normal" label="Group Tagline" fullWidth variant="outlined" />
          <Button variant="contained" className="create_btn" onClick={handleCreate}>Create Your Group</Button>
        </Box>
      </Modal>

    </div>  
  );
};

export default Grouplist;

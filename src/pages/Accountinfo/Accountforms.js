import React from 'react';
import "./style.css";
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { getDatabase, ref, update } from 'firebase/database';
import { getAuth, updatePassword, updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { LogingUser } from '../../features/counter/UserSlice';


const Accountforms = () => {

  const db = getDatabase();
  const dispatch = useDispatch();
  const auth = getAuth();
  const currentuser = auth.currentUser;

  const users = useSelector ((user) => user.LogIn.login);


  const formik = useFormik({

    initialValues: {  fullname: users.displayName, email: users.email, password: "" },

    
    onSubmit: () => {

    handleUpdateProfile ();

    },

  });
  


const handleUpdateProfile = async () => { 

  await updateProfile(auth.currentUser,{
    displayName:formik.values.fullname,
  }).then(async()=>{

    const userInfo = {

      displayName : auth.currentUser.displayName
     
    };
    
    await update(ref(db, "users/" + users.uid),{
      username:userInfo.displayName,
    });

    await updatePassword(currentuser, formik.values.password).then(()=> {
    console.log("password change done ");
  })

    dispatch(LogingUser({...users, displayName: formik.values.fullname}));
    localStorage.setItem("users", JSON.stringify({...users, displayName: formik.values.fullname}))
  });

};

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <TextField  name="fullname" type="text" fullWidth label="Full Name" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname}/>
      <TextField  name="email" type="email" fullWidth margin='normal' label="Email" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} disabled/>
      <TextField  name="password" type="password" fullWidth margin='normal' label="New Password" variant="outlined" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
      <Button className='update_btn' variant="contained" type='submit' fullWidth >Update Account</Button>
      </form>
    </div>
  );
};

export default Accountforms;
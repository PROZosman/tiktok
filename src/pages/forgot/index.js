import React from 'react'
import "./style.css"
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';


const Forgot = () => {

  const auth = getAuth();
  
  const formik = useFormik ({
    initialValues : { email : ""} ,

    onSubmit : () => {

      sendPasswordResetEmail(auth, formik.values.email) 
    .then (()=> {
      toast.success( "Reset done check your email", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false, 
        }); 
        formik.resetForm(); 
    })

    .catch ( (error) => {
      toast.error('Invalid Email!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        });
  });
    
    },
    });

   

  return (
   <>
   <ToastContainer/>

   <div className='forgot-box'>
   <div className="inner_forgot">

   <div className="forgot-header">
    <h4>Reset your password</h4>
   </div>

  <div className="forgot_user">
    <form onSubmit={formik.handleSubmit}>
      <TextField className='login-input-design' name="email"  type="email" label="Email Address" variant="standard" value={formik.values.email} onChange={formik.handleChange} /> 
      <Button className='forgot-btn' variant="contained"  type='submit'>Reset</Button>
      
      </form>
     
     
      
  </div>

   </div>
   </div>
   </>
  )
}

export default Forgot

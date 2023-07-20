import React, { useState } from 'react';
import Container from '@mui/material/Container';
import BeatLoader from "react-spinners/BeatLoader";
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

import "./style.css";
import TextField from '@mui/material/TextField';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import Button from '@mui/material/Button';
import { signUp } from "../../validation"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const db = getDatabase();
  const [showPass, setShowpass] = useState("password");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleShowpass = () => {
    if (showPass === "password") {
      setShowpass("text");
    }
    else {
      setShowpass("password");
    }
  };


  const formik = useFormik({

    initialValues: { fullname: "", email: "", password: "", confirmpassword: "" },

    validationSchema: signUp,
    
    onSubmit: () => {

      setLoading(true);
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)

        .then(({ user }) => {
          updateProfile(auth.currentUser, {
            displayName: formik.values.fullname,
          })
          
            .then(() => {
              setLoading(false);
              sendEmailVerification(auth.currentUser).then(() => {
                set(ref(db, 'users/' + user.uid), {
                  username: user.displayName,
                  email: user.email,
                })

                  .then(() => {
                    toast.success("Please Verify Your Email Address", {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                    });
                    formik.resetForm({ values: "" });
                    setLoading(false)
                    setTimeout(() => {
                      navigate("/login")
                    }, 3100);
                  })
              });
            });
        })

        .catch((error) => {

          toast.error('Email already in use!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setLoading(false)
        });

    },

  });


  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className='box' container spacing={2}>
          <Grid item xs={6}>
            <div className='froms'>
              <div className='reg-header'>
                <h3>Get started with easily register</h3>
                <p>Free register and you can enjoy it</p>
              </div>
              <div className='inputs-from'>

                <form onSubmit={formik.handleSubmit}>

                  <TextField className='input-design' name="fullname" value={formik.values.fullname} type="text" label="Full Name" variant="outlined" onChange={formik.handleChange} />
                  {formik.errors.fullname ? <p className='errors'>{formik.errors.fullname}</p> : null}

                  <TextField className='input-design' name="email" value={formik.values.email} type="email" label="Email Address" variant="outlined" onChange={formik.handleChange} />
                  {formik.errors.email && formik.touched.email ? <p className='errors'>{formik.errors.email}</p> : null}



                  <div className='reg-password'>

                    <TextField className='input-design' name="password" value={formik.values.password} type={showPass} label="Password" variant="outlined" onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <p className='errors'>{formik.errors.password}</p> : null}

                    <div className='reg-eyes' onClick={handleShowpass}>
                      {showPass === "password" ? <AiFillEyeInvisible /> : <AiFillEye fill='red' />}
                    </div>
                  </div>




                  <TextField className='input-design' name='confirmpassword' value={formik.values.confirmpassword} type={showPass} label="Confirm Password" variant="outlined" onChange={formik.handleChange} />
                  {formik.errors.confirmpassword && formik.touched.confirmpassword ? <p className='errors'>{formik.errors.confirmpassword}</p> : null}

                  {
                    loading ? <Button className='reg-buttons' variant="contained" type='submit'><BeatLoader size={15} color="#fff" /></Button> : <Button className='reg-buttons' variant="contained" type='submit'>Sign Up</Button>
                  }

                </form>

                <div className='reg-link'>
                  <p> Already  have an account ? <Link to="/login">Sign In</Link>{" "} </p>
                </div>

              </div>
            </div>
          </Grid>


          <Grid item xs={6}>

            <div className='signup_img'>
              <picture>
                <img src="./img/signup.png" alt="" />
              </picture>
            </div>

          </Grid>
        </Grid>

      </Container>
    </>
  );
};

export default Registration



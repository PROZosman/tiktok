import React, { useState } from 'react';
import Container from '@mui/material/Container';
import BeatLoader from "react-spinners/BeatLoader";
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

import "./style.css";
import TextField from '@mui/material/TextField';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../validation';
import { useDispatch } from 'react-redux';
import { LogingUser } from '../../features/counter/UserSlice';



const Login = () => {

  const [showPass, setShowpass] = useState("password");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  // googleauthentication 
  const googleprovider = new GoogleAuthProvider();

  const handleGoogleauth = () => {
    signInWithPopup(auth, googleprovider)
    .then ((g)=>{
      dispatch(LogingUser(g.user));
        localStorage.setItem("users", JSON.stringify(g.user));
        navigate("/");
    })
      
  };

  // facebookauthentication 

  const facebookprovider = new FacebookAuthProvider();
  const handleFacebookauth = () => {
    signInWithPopup(auth, facebookprovider)
      .then(() => { navigate("/") })
  };





  const handleShowpass = () => {
    if (showPass === "password") {
      setShowpass("text");
    }
    else {
      setShowpass("password");
    }
  };


  const formik = useFormik({
    
    initialValues: { email: "", password: "" },
    validationSchema: signIn,

    onSubmit: () => {

      setLoading(true);
      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)


        .then(({ user }) => {

          if (auth.currentUser.emailVerified === true) {
            
            dispatch(LogingUser(user));
            localStorage.setItem("users", JSON.stringify(user));

            setLoading(false)
            setTimeout(() => {
              navigate("/")
            }, 1000);
          } else {

            toast.error('email not varified', {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            });
            setLoading(false);
          }
        })

        .catch((error) => {

          toast.error('Invalid Email! or Password', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setLoading(false);
        });
    },
  });





  return (
    <>
      <Container fixed>
        <ToastContainer />
        <Grid className='box' container spacing={2}>

          <Grid item xs={6}>

            <div className='signup_img'>
              <picture>
                <img src="./img/login.png" alt="" />
              </picture>


            </div>

          </Grid>

          <Grid item xs={6}>
            
            <div className='froms'>

              <div className='login-header'>
                <div className='avater'>
                  <picture>
                    <img src="./img/avater.png" alt="avater" />
                  </picture>
                </div>
                <h3>Login to your account!</h3>
                <div className="login-auth">
                  <div className='authentication' onClick={handleGoogleauth}>
                    <div className='auth-pic'>
                      <picture>
                        <img src="./img/google.png" alt="google" />
                      </picture>
                    </div>
                    <div className='auth-text'>
                      <p>Login with Google</p>
                    </div>
                  </div>
                  <div className='authentication' onClick={handleFacebookauth}>
                    <div className='auth-pic'>
                      <picture>
                        <img src="./img/facebook.png" alt="facebook" />
                      </picture>
                    </div>
                    <div className='auth-text'>
                      <p>Login with Facebook</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className='login-form'>

                <form onSubmit={formik.handleSubmit} >

                  <TextField className='login-input-design' name="email" type="email" label="Email Address" variant="standard" value={formik.values.email} onChange={formik.handleChange} 
                  // sx={{
                  //   '& .MuiOutlinedInput-root.Mui-focused': {
                  //     '& > fieldset': {
                  //      borderColor : "var(--body-colour)",
                  //     },
                  //   },
                  //     '& .MuiInputLabel-root.Mui-focused': {
                  //       color: 'var(--black)',
                  //     },
                  // }} 
                  />
                  {formik.errors.email && formik.touched.email ? <p className='errors'>{formik.errors.email}</p> : null}

                  <div className='login-password'>

                    <TextField className='login-input-design' name="password" type={showPass} label="Password" variant="standard" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <p className='errors'>{formik.errors.password}</p> : null}

                    <div className='login-eyes' onClick={handleShowpass}>
                      {showPass === "password" ? <AiFillEyeInvisible /> : <AiFillEye fill='red' />}
                    </div>
                  </div>

                  {
                    loading ? <Button className='login-buttons' variant="contained" type='submit'><BeatLoader size={15} color="#fff" /></Button> : <Button className='login-buttons' variant="contained" type='submit'>Sign In</Button>
                  }

                </form>

                <div className='login-link'>
                  <div className="forgot">
                    <Link to="./forgot">Forgot password</Link>
                  </div>
                  <p> Already  have an account ? <Link to="/registration">Sign Up</Link>{" "} </p>
                </div>

              </div>

            </div>
          </Grid>

        </Grid>

      </Container>
    </>
  )
};

export default Login

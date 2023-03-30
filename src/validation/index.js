import * as Yup from "yup";


export const signUp = Yup.object({
    fullname : Yup.string().min(3).max(15).required("Please Enter your full name"),
    email: Yup.string().email().required("Please Enter a valid email"),
    password : Yup.string().min(6).required("Please enter your password"),
    confirmpassword : Yup.string().oneOf([Yup.ref("password"), null],"Passwoord must be matched").required("please give a confirm password"),
});

export const signIn = Yup.object ({
    email: Yup.string().email().required("Please Enter a valid email"),
    password : Yup.string().min(6).required("Please enter your password"),
});
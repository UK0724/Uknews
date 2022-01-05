import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fireDB from '../config';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { Button, FormControl, FormHelperText, TextField } from '@material-ui/core';
import { Alert } from '@mui/material';


function Login(props) {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ emailerror,setEmailError] = useState('');
    const [ passerror,setPassError] = useState('');


    let checkDetails = async(e) => {
        e.preventDefault();
        if(email === ""||password===""){
            if(email === "")
            {   
                setEmailError("Field Should not be Empty Enter The Email")
                setPassError("")
            }
            else if(password === "")
            {
                setPassError("Field Should not be Empty Enter The Password")
                setEmailError("")
            }
            return
        }
        try {
            const result = await signInWithEmailAndPassword (auth, email, password)
            localStorage.setItem('CurnetUser',JSON.stringify(result))
            toast.success("Login Sucess")
            window.location.href ='/UKnews'
        }
        catch (error) {
            console.log(error);
            setPassError("Enter the correct Password")
            setEmailError("Enter the correct Email")
            toast.error("Login Failed")
        }
    }
    return (
        <><Header/>
        <div className='container'>
            <form onSubmit={checkDetails}>
                <h3>Sign In</h3>

                <FormControl>
                    <TextField  id="standard-basic" onChange={(e) => setEmail(e.target.value)} type="email" className="form-control Email" placeholder="Enter email..." label="Email address" variant="standard" /><br />
                    <FormHelperText id="emailerror">{emailerror}</FormHelperText>
                </FormControl><br/><br/>

                <FormControl className="form-group">
                    <TextField  id="standard-basic" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control Password" placeholder="Password..." label="Password" variant="standard" /><br />
                    <FormHelperText id="passerror">{passerror}</FormHelperText>
                </FormControl><br/> <br/>


                <Button color="success" type="submit" className="btn btn-primary btn-block" variant="contained">Sign In</Button><br /><br />
                <p className="forgot-password text-right">
                    Not Yet Registered? <Link className='link' to='/SignUp'>SignUp</Link>
                </p>
            </form>
        </div>
        </>
    );
}

export default Login;
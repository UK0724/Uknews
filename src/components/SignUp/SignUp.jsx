import { Button, FormControl, FormHelperText, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../SignUp/SignUp.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import fireDB from '../config';
import Header from '../Header/Header';

function SignUp(props) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [ emailerror,setEmailError] = useState('');
    const [ passerror,setPassError] = useState('');
    const [ cpasserror,setCPassError] = useState('');
    const auth = getAuth();


    let checkValidation = async(e) => {
        e.preventDefault();
        if(email ==="" || password === "" || confirmpassword ===""){
            if(email === "")
            {   
                setEmailError("Field Should not be Empty Enter The Email")
                setPassError("")
                setCPassError("")
            }
            else if(password === "")
            {
                setPassError("Field Should not be Empty Enter The Password")
                setEmailError("")
                setCPassError("")
            }
            else if(confirmpassword === "")
            {
                setPassError("")
                setEmailError("")
                setCPassError("Field Should not be Empty Enter The Password")
            }
            return
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log(result)
            setEmailError("")
            toast.success("Registration Sucess")
            window.location.href="/"
        }
        catch (error) {
            console.log(error);
            setCPassError("")
            setPassError("")
            setEmailError('Email already registered')
            toast.error("Registration Failed")
        }
    }



    return (
        <>
        <Header/>
        <div className='container'>
            <form  className='form' onSubmit={checkValidation}>
                <h2 className='h2'>Sign Up</h2>


                
                <FormControl>
                    <TextField  id="standard-basic" onChange={(e) => setEmail(e.target.value)} type="email" className="form-control Email" placeholder="Enter email..." label="Email address" variant="standard" /><br />
                    <FormHelperText id="emailerror">{emailerror}</FormHelperText>
                </FormControl><br/><br/>

                <FormControl className="form-group">
                    <TextField  id="standard-basic" onChange={(e) => setPassword(e.target.value)} type="password" className="form-control Password" placeholder="Password..." label="Password" variant="standard" /><br />
                    <FormHelperText id="passerror">{passerror}</FormHelperText>
                </FormControl><br/> <br/>

                <FormControl className="form-group">
                    <TextField  id="standard-basic" onChange={(e) => setConfirmPassword(e.target.value)} type="text" className="form-control" placeholder="Confirm Password..." label="Confirm Password" variant="standard" /><br />
                    <FormHelperText id="cpasserror">{cpasserror}</FormHelperText> 
                </FormControl><br /><br/>

                <Button color="success" type="submit" className="btn btn-primary btn-block" variant="contained">Sign Up</Button><br /><br />
                <p className="forgot-password text-right">
                    Already registered? <Link className='link' to='/'>Signin</Link>
                </p>
            </form>
        </div>
        </>
    );
}

export default SignUp;
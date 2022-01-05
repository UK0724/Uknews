import React, { useEffect, useState } from 'react';
import '../Profile/Profile.css'
import NavBar from '../NavBar/NavBar1';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container } from '@material-ui/core';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import fireDB from '../config';
import Likes from './Likes';
import "../NewsCard/NewsCard.css"

function Profile(props) {
    const user = JSON.parse(localStorage.getItem('CurnetUser'));
    const Email = user.user.email;
    const [arr, setArr] = useState([])
    const val = []
    const id = []

    let data=async()=>{
    try{
    const Docref = await getDocs(collection(fireDB, 'Likes'))
    Docref.forEach(element => {
        if(Email === element.data().email){
            if (!(val.includes(element.data().title))){
                setArr(arr=> [...arr,element.data()])
                val.push(element.data().title);
                id.push(element.id);
            }
        }
    });
    }
    catch(ele){
        console.log(ele);
    }
}

    useEffect(()=>{
        data();
        //estlint-disable-next-line
    },[])
    
        return (
            <div className='main'>
                <NavBar />
                <Container maxWidth="md">
                    <AccountCircleIcon className='profileicon' />
                    <strong className='email'>{Email} </strong><strong>{arr.length}  Likes</strong>
                    {arr.map(newsItem=>(
                    <Likes data={newsItem} key={newsItem.title}/>
                ))}
                </Container>
                
            </div>
        );
    }

export default Profile;
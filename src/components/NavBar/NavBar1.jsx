import React from 'react';
import '../NavBar/NavBar.css';
import HamburgerDrawer from '../Hamburger/HamburgerDrawer.jsx'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


function NavBar(props) {
    const [show, setIsShown] = useState(false);
    const { user } = JSON.parse(localStorage.getItem('CurnetUser'))
    const email = user.email;

    let logout =() =>{
        console.log('clicked');
        let toggleMenu = document.querySelector('.log');
        toggleMenu.classList.toggle('activew')
        console.log(toggleMenu);
    }
    
    return (
        <div className='nav'>
            <img className="img" style={{ cursor: "pointer" }} src="./Uknews.png" alt="logo" height='80%' />
            <Link to="/Uknews" className='Home'>Home</Link>
            <Link className='Menu' to="/profile">Menu</Link>
            <div className='Profile'>
                <AccountCircleIcon className='iconpr' onMouseEnter={() => setIsShown(prev=>{
                    prev=true
                    let toggleMenu = document.querySelector('.user');
                    toggleMenu.classList.add('active')
                })}
                    onMouseLeave={() => setIsShown(prev =>{
                        prev = false
                        let toggleMenu = document.querySelector('.user');
                        toggleMenu.classList.remove('active')
                })}>
                </AccountCircleIcon>
                <div className='user'>{user.email.substring(0, user.email.length - 10)}</div>
                <ArrowDropDownCircleIcon className='dropdown' onClick={logout}></ArrowDropDownCircleIcon>
                <button className='log' onClick={()=>{
                    window.location.href="/"
                }}>LogOut</button>
            </div>
        </div>
    );
}

export default NavBar;
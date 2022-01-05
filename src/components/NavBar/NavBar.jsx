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
    let setValue = (e) => {
        let v = document.getElementById('search').value;
        props.setCategory(ele => ele = v);
        axios.get(`https://newsapi.org/v2/everything?q=${v}&apiKey=d209475b0cb24fc792fc97885fdc2860`)
            .then(res => {
                props.setNewsArray(res.data.articles)
            })
            .catch(err=>console.log(err))
    }
    let logout =() =>{
        console.log('clicked');
        let toggleMenu = document.querySelector('.log');
        toggleMenu.classList.toggle('activew')
        console.log(toggleMenu);
    }

    return (
        <div className='nav'>
            <div className="icon">
                <HamburgerDrawer className="ham" setCategory={props.setCategory} />
            </div>
            <img className='img' src="./Uknews.png" alt="logo" height='80%' />
            <input type="text" name="" id="search" placeholder='Search For News ...' />
            <SearchIcon className='se' onClick={setValue} />
            <Link  to="/profile" className='Menu'>
                Menu
            </Link>
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
import './menu.css'
import React, { useState, useEffect } from 'react';
import Logo from '../images/doctor.png';
import BottomArrow from '../images/bottom_arrow.svg';
import routes from '../routing/routes';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import useLocalStorage from '../utilities/use_location';

const Menu = () => {
    const [loginFlag, setLoginFlag] = useState(true);
    const [token, _] = useLocalStorage("token", localStorage.getItem("token"));
    const [openMenuFlag, setOpenMenu] = useState(false);
    console.log(openMenuFlag)
    const navigate = useNavigate();

    // useEffect(() => {
    //     setLoginFlag(true)
    // }, [])

    function onNext() {
        navigate(routes.login);
    }

    const openMenu = () => {
        openMenuFlag ? setOpenMenu(false) : setOpenMenu(true)
    }

    const myAppointments = () => {
        console.log("hi")
    }
    return (
        <div className="navbar">
            <img src={Logo} alt="logo" className="logo" />
            {
                token ?
                    <div className="nav-wrapper">
                        <nav>
                            <ul>
                                <li ><Link className="link" to={routes.login}>Doctor</Link></li>
                                <li ><Link className="link" to={routes.login}>Insurance</Link></li>
                                <li ><Link className="link" to={routes.login}>Patient</Link></li>
                            </ul>
                        </nav>
                        <div className="menu-wrapper">
                            <div className="menu-main-section">
                                <button className="menu-icon-wrapper" onClick={openMenu}>
                                    <img src={Logo} alt="menu icon" className="menu-icon" />
                                </button>
                                <button className="arrow-button" onClick={openMenu}>
                                    <img src={BottomArrow} alt="arrow" />
                                </button>
                            </div>
                            {
                                openMenuFlag ?
                                    <div className="menu-dropdown-wrapper">
                                        <div className="menu-dropdown-wrapper-inner">
                                            <Paper>
                                                <MenuList>
                                                    <MenuItem onClick={myAppointments} className="menu-item">My Appointments</MenuItem>
                                                    <MenuItem className="menu-item">My account</MenuItem>
                                                    <MenuItem className="menu-item">Logout</MenuItem>
                                                </MenuList>
                                            </Paper>
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                        </div>
                    </div>
                    :
                    <div className="login-button-wrapper">
                        <button type="button" className="login-button" onClick={onNext}>Login</button>
                    </div>
            }
        </div >
    )
}

export default Menu
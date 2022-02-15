import './menu.css'
import React, { useState, useEffect } from 'react';
import logo from '../images/doctor.png';
import { Login } from '@mui/icons-material';

const Menu = () => {
    const [loginFlag, setLoginFlag] = useState(false);

    // useEffect(() => {
    //     setLoginFlag(true)
    // }, [])


    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="logo" />
            {
                loginFlag ?
                    <div className="nav-wrapper">
                        <nav>
                            <ul>
                                <li ><a href="" >Doctor</a></li>
                                <li ><a href="" >Insurance</a></li>
                                <li ><a href="" >Patient</a></li>
                            </ul>
                        </nav>
                        <img src={logo} alt="menu icon" className="menu-icon" />
                    </div>
                    :
                    <div className="login-button-wrapper">
                        <button type="button" className="login-button">Login</button>
                    </div>
            }
        </div>
    )
}

export default Menu
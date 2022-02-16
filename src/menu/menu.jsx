import './menu.css'
import React, { useState, useEffect } from 'react';
import logo from '../images/doctor.png';
import routes from '../routing/routes';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const [loginFlag, setLoginFlag] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setLoginFlag(true)
    // }, [])

    function onNext(){        
        navigate(routes.login);
    }

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
                        <button type="button" className="login-button" onClick={onNext}>Login</button>
                    </div>
            }
        </div>
    )
}

export default Menu
import './menu.css'
import React, { useState, useRef, useEffect, useContext } from 'react';
import Logo from '../images/logo.png';
import Doctor from '../images/doctor.png';
import {IoIosArrowDown} from 'react-icons/io';
import routes from '../routing/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logout from '../auth/logout';
import { LoginStateContext } from '../contexts';

const Menu = () => {
    const location = useLocation();
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginStateContext);
    const [openMenuFlag, setOpenMenu] = useState(false);
    const isPatient = localStorage.getItem("user_type_id") == "1";
    const navigate = useNavigate();

    // to close the menu when clicked outside
    // TODO: Create utility function to use here and in dropdown component
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);

    function onClickOutside(){
        setOpenMenu(false);
    }
    // -----------------------------------------

    const onOptionClick = (option) => {
        if (option == 'account'){
            navigate(routes.my_appointments);
        }
        else if (option == 'appointments') {
            navigate(routes.update_profile);
        }
        else if (option == 'logout') {
            onLogout();
        }
        setOpenMenu(false);
    }

    const onLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate(routes.login);
    }

    function renderButton() {
        if (location.pathname == routes.login) {
            return (
                <button type="button" className="login-button" onClick={() => navigate(routes.signup)}>Signup</button>
            );
        }
        return (
            <button type="button" className="login-button" onClick={() => navigate(routes.login)}>Login</button>
        );
    }

    return (
        <div className="navbar">
            <img src={Logo} alt="logo" className="logo" onClick={() => navigate(routes.home)}/>
            {
                isLoggedIn
                ? <div className="nav-wrapper">
                        { isPatient && <nav>
                            <ul>
                                <li><Link className="link" to={routes.pat_book_appointment}>Doctor</Link></li>
                                <li><Link className="link" to={routes.home}>Insurance</Link></li>
                            </ul>
                        </nav>}
                        <div ref={ref} className='menu_wrapper'>
                            
                            <div className="avatar" onClick={() => setOpenMenu(!openMenuFlag)}>
                                <img src={Doctor} alt="avatar" className="profile_img" />
                                <IoIosArrowDown size={14}/>
                            </div>
                            {openMenuFlag && 
                                    <div className="menu_options">
                                        <div className="menu_option" onClick={() => onOptionClick('account')}>My Appointments</div>
                                        <div className="menu_option" onClick={() => onOptionClick('appointments')}>My Account</div>
                                        <div className="menu_option" onClick={() => onOptionClick('logout')}>Logout</div>
                                    </div>
                                }
                        </div>
                    </div>
                : renderButton()
            }
        </div >
    )
}

export default Menu
import './menu.css'
import React, { useState, useRef, useEffect, useContext } from 'react';
import Logo from '../images/logo.svg';
import {IoIosArrowDown} from 'react-icons/io';
import routes from '../routing/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logout from '../auth/logout';
import { LoginStateContext, ProfileImageContext } from '../contexts';

const Menu = (props) => {
    const location = useLocation();
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginStateContext);
    const [openMenuFlag, setOpenMenu] = useState(false);
    const isPatient = localStorage.getItem("user_type_id") == "1";
    const {globalProfileImage, setGlobalProfileImage} = useContext(ProfileImageContext);
    const navigate = useNavigate();

    // to close the menu when clicked outside
    // TODO: Create utility function to use here and in dropdown component
    const ref = useRef(null);
    useEffect(() => {
        window.onLogout = onLogout;
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
        else if (option == 'switch_theme'){
            props.setTheme(props.theme == 'light' ? 'dark' : 'light');
        }
        setOpenMenu(false);
    }

    const onLogout = () => {
        logout();
        setIsLoggedIn(false);
        setGlobalProfileImage(null);
        navigate(routes.login);
    }

    const getUserInitials = () => {
        const firstName = localStorage.getItem('first_name');
        const lastName = localStorage.getItem('last_name');
        if (firstName == null || lastName == null) {
            return 'U';
        }
        return (firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase());
    }

    function renderButton() {
        if (location.pathname == routes.login) {
            return (
                <button type="button" className="login-button" onClick={() => navigate(routes.user_type)}>Signup</button>
            );
        }
        return (
            <button type="button" className="login-button" onClick={() => navigate(routes.login)}>Login</button>
        );
    }

    return (
        <div className="navbar">
            <img src={Logo} alt="logo" className="logo" onClick={() => navigate(routes.home)}/>
            { (isPatient && isLoggedIn) && <nav>
                            <ul>
                                <li><Link className="link" to={routes.book_appointment}>Doctor</Link></li>
                                <li><Link className="link" to={routes.search_package_patient}>Insurance</Link></li>
                            </ul>
                        </nav>}
            {
                isLoggedIn
                ? <div className="nav-wrapper">
                        <div ref={ref} className='menu_wrapper'>
                            
                            <div className="avatar" onClick={() => setOpenMenu(!openMenuFlag)}>
                                {/* <div className="profile_img">{getUserInitials}</div> */}
                                <img src={globalProfileImage == null ? `https://placehold.jp/120/cccccc/ffffff/250x250.png?text=${localStorage.getItem("email").toUpperCase().charAt(0)}` : globalProfileImage} alt="avatar" className="profile_img" />
                                <IoIosArrowDown size={14} color='var(--text-primary)'/>
                            </div>
                            {openMenuFlag && 
                                    <div className="menu_options">
                                        {isPatient && <div className="menu_option" onClick={() => onOptionClick('account')}>My Appointments</div>}
                                        <div className="menu_option" onClick={() => onOptionClick('appointments')}>My Account</div>
                                        <div className="menu_option" onClick={() => onOptionClick('switch_theme')}>Light/Dark Mode</div>
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
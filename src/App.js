import './App.css';
import { RouteStack, LoggedInRouteStack } from './routing/routing'
import React, { useState } from 'react';
import Menu from './menu/menu';
import { LoginStateContext, ProfileImageContext } from './contexts';
import useLocalStorage from 'use-local-storage';
import GroupChat from './components/chat/group_chat';
import { IoIosArrowUp } from 'react-icons/io';
import ReCAPTCHA from 'react-google-recaptcha';
// localstorage variables
// - email
// - user_type
// - user_id
// - token




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [globalProfileImage, setGlobalProfileImage] = useState(localStorage.getItem("profile_image"));
  const defaultDark = window.matchMedia('(prefers-color-scheme: light)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  function onChange(value) {
    console.log('Captcha value:', value);
    setCaptchaVerified(value ? true : false);
  }

  return (
    <LoginStateContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <ProfileImageContext.Provider value={{ globalProfileImage, setGlobalProfileImage }}>
        <div className="App" data-theme={theme}>
                <Menu theme={theme} setTheme={setTheme} />
                {
                  isLoggedIn
                    ? <div>
                      {localStorage.getItem('user_type_id') == '2' && (<div>{showChatPopup && <div className='chat_popup'><GroupChat /></div>} <div className='chat_popup_show' onClick={() => setShowChatPopup(!showChatPopup)}>{showChatPopup ? 'Hide' : 'Show'} Group Chat <IoIosArrowUp color='white' /> </div></div>)}
                      <LoggedInRouteStack />
                    </div>
                    : <RouteStack />
                }

        </div>
      </ProfileImageContext.Provider>
    </LoginStateContext.Provider>
  );
}

export default App;
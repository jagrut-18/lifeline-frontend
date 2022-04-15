import './App.css';
import {RouteStack, LoggedInRouteStack} from './routing/routing'
import React, { useState } from 'react';
import Menu from './menu/menu';
import { LoginStateContext } from './contexts';
import useLocalStorage from 'use-local-storage';
// localstorage variables
// - email
// - user_type
// - user_id
// - token



function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem("token") ? true : false);
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  return (
    <LoginStateContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <div className="App" data-theme={theme}>
      <Menu theme={theme} setTheme={setTheme}/>
      {
        isLoggedIn
        ? <LoggedInRouteStack />
        : <RouteStack />
      }
    </div>
    </LoginStateContext.Provider>
  );
}

export default App;
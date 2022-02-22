import './App.css';
import {RouteStack, LoggedInRouteStack} from './routing/routing'
import React, { useState } from 'react';
import Menu from './menu/menu';
import { LoginStateContext } from './contexts';
// localstorage variables
// - email
// - user_type
// - user_id
// - token



function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(localStorage.getItem("token") ? true : false);

  return (
    <LoginStateContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <div className="App">
      <Menu />
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
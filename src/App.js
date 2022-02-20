import './App.css';
import {RouteStack, LoggedInRouteStack} from './routing/routing'
import React, { useEffect, useState } from 'react';
import useLocalStorage from './utilities/use_location';

// localstorage variables
// - email
// - user_type
// - user_id
// - token

function App() {
  // const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [token, _] = useLocalStorage("token", localStorage.getItem("token"));

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // });

  return (
    <div className="App">
      {
        token
        ? <LoggedInRouteStack />
        : <RouteStack />
      }
    </div>
  );
}

export default App;

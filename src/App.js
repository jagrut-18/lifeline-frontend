import './App.css';
import {RouteStack, LoggedInRouteStack} from './routing/routing'
import React, { useEffect, useState } from 'react';

// localstorage variables
// - email
// - user_type
// - user_id
// - token

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  });

  return (
    <div className="App">
      {
        isLoggedIn
        ? <LoggedInRouteStack />
        : <RouteStack />
      }
    </div>
  );
}

export default App;

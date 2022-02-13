import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LandingScreen from '../screens/landing/landing'
import SignupScreen from "../screens/signup/signup";

function RouteStack() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
            </Routes>
        </div>
    );
}

export default RouteStack
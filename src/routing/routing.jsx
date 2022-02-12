import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LandingScreen from '../screens/landing/landing'

function RouteStack() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingScreen />} />
                {/* <Route path="about" element={<About />} /> */}
            </Routes>
        </div>
    );
}

export default RouteStack
import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LandingScreen from '../screens/landing/landing'
import OnboardingScreen1 from "../screens/onboarding1/onboarding1";
import OnboardingScreen2 from "../screens/onboarding2/onboarding2";
import OnboardingScreen3 from "../screens/onboarding3/onboarding3";
import LoginScreen from "../screens/login/login";
import SignupScreen from "../screens/signup/signup";
import UserTypeScreen from "../screens/user_type/user_type";
import routes from "./routes";

function RouteStack() {
    return (
        <div>
            <Routes>
                <Route path={routes.landing} element={<LandingScreen />} />
                <Route path={routes.user_type} element={<UserTypeScreen />} />
                <Route path={routes.signup} element={<SignupScreen />} />
                <Route path={routes.login} element={<LoginScreen />} />
                <Route path={routes.onboarding1} element={<OnboardingScreen1 />} />
                <Route path={routes.onboarding2} element={<OnboardingScreen2 />} />
                <Route path={routes.onboarding3} element={<OnboardingScreen3 />} />
            </Routes>
        </div>
    );
}

export default RouteStack
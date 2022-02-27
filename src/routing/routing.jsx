import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import LandingScreen from '../screens/landing/landing'
import OnboardingScreen1 from "../screens/onboarding1/onboarding1";
import OnboardingScreen2 from "../screens/onboarding2/onboarding2";
import OnboardingScreen3 from "../screens/onboarding3/onboarding3";
import LoginScreen from "../screens/login/login";
import SignupScreen from "../screens/signup/signup";
import UserTypeScreen from "../screens/user_type/user_type";
import HomeScreen from "../screens/home/home";
import routes from "./routes";
import UpdateProfileScreen from "../screens/update_profile/update_profile";
import AppointmentDetailsScreen from "../screens/appointment_details/appointment_details_screen";

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
                <Route path={routes.home} element={<HomeScreen />} />
            </Routes>
        </div>
    );
}

function LoggedInRouteStack() {
    return (
        <div>
            <Routes>
                <Route path={routes.onboarding1} element={<OnboardingScreen1 />} />
                <Route path={routes.onboarding2} element={<OnboardingScreen2 />} />
                <Route path={routes.onboarding3} element={<OnboardingScreen3 />} />
                <Route path={routes.home} element={<HomeScreen />} />
                <Route path={routes.update_profile} element={<UpdateProfileScreen />} />
                <Route path={routes.appointment_details} element={<AppointmentDetailsScreen />} />
            </Routes>
        </div>
    )
}

export { RouteStack, LoggedInRouteStack }
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
import PatientBookAppointment from "../screens/patbookappointments/patbookappointments";
import AppointmentDetailsScreen from "../screens/appointment_details/appointment_details_screen";
import MyAppointmentsScreen from "../screens/my_appointments/my_appointments";
import ForgotPasswordScreen from "../screens/forgot_password/forgot_password";
import SearchPackagePatient from "../screens/search_package_patient/searchpackagepatient";
import CreateInsurancePackage from "../screens/create_insurance_package/create_insurance_package";
import BookAppointmentScreen from "../screens/book_appointment/book_appointment";
import YourPackagesScreen from "../screens/your_packages/your_packages_screen";

function RouteStack() {
    return (
        <div>
            <Routes>
                <Route path={routes.landing} element={<LandingScreen />} />
                <Route path={routes.user_type} element={<UserTypeScreen />} />
                <Route path={routes.signup} element={<SignupScreen />} />
                <Route path={routes.login} element={<LoginScreen />} />
                <Route path={routes.forgot_password} element={<ForgotPasswordScreen />} />
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
                <Route path={routes.pat_book_appointment} element={<PatientBookAppointment />} />
                <Route path={routes.appointment_details} element={<AppointmentDetailsScreen />} />
                <Route path={routes.my_appointments} element={<MyAppointmentsScreen />} />
                <Route path={routes.search_package_patient} element={<SearchPackagePatient />} />
                <Route path={routes.create_insurance_package} element={<CreateInsurancePackage />} />
                <Route path={routes.book_appointment} element={<BookAppointmentScreen />} />
                <Route path={routes.your_packages} element={<YourPackagesScreen />} />
            </Routes>
        </div>
    )
}

export { RouteStack, LoggedInRouteStack }
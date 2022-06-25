import { getDoctorAppointments } from "./apis/doctor_appointments";
import getDoctorAppointmentDetails from "./apis/doctor_appointment_details";
import getPatientAppointmentDetails from "./apis/patient_appointment_details";
import { hospitalsAutoComplete } from "./apis/hospitals_autocomplete";
import { locationAutoComplete } from "./apis/location_autocomplete";
import { login } from "./apis/login";
import { onboarding } from "./apis/onboarding";
import getPatientAppointments from "./apis/patient_appointments";
import { doctorSearch } from "./apis/doctor_search";
import { bookAppointment } from "./apis/book_appointment";
import { uploadFile } from "./apis/aws";
import { createPackage } from './apis/create_package';
import { filterPackages } from "./apis/filter_packages";
import { fetchInsurancePackages } from "./apis/fetch_insurance_packages";
import { makeInsurancePackagePayment } from "./apis/make_insurance_package_payment";
import { togglePackage } from "./apis/toggle_package";
import { getEnrolledPatients } from './apis/get_enrolled_patients'
import { suggestPackage } from "./apis/suggest_package";
import { forgotPassword } from "./apis/forgot_passord";
import { updatePassword } from "./apis/update_password"
import { updateAppointmentDoneFlag } from "./apis/update_appointment_done_flag"
import { updateReviewsRatings } from "./apis/update_reviews_ratings"
import { signup } from "./apis/signup";
import { fetchData } from "./apis/fetch_data";
import { updating } from "./apis/updating";


export const API = {
    login: (formData) => login(formData),
    signup: (formData) => signup(formData),
    forgotPassword: (formData) => forgotPassword(formData),
    updatePassword: (formData) => updatePassword(formData),
    onboarding: (formData) => onboarding(formData),
    locationAutocomplete: (query) => locationAutoComplete(query),
    hospitalsAutocomplete: (query) => hospitalsAutoComplete(query),
    getDoctorAppointments: () => getDoctorAppointments(),
    getPatientAppointments: () => getPatientAppointments(),
    getDoctorAppointmentDetails: (formData) => getDoctorAppointmentDetails(formData),
    getPatientAppointmentDetails: (formData) => getPatientAppointmentDetails(formData),
    doctorSearch: (formData) => doctorSearch(formData),
    bookAppointment: (formData) => bookAppointment(formData),
    uploadFile: (file) => uploadFile(file),
    createPackage: (formData) => createPackage(formData),
    filterPackages: (formData) => filterPackages(formData),
    fetchInsurancePackages: (formData) => fetchInsurancePackages(formData),
    makeInsurancePackagePayment: (formData) => makeInsurancePackagePayment(formData),
    togglePackage: (formData) => togglePackage(formData),
    getEnrolledPatients: (formData) => getEnrolledPatients(formData),
    suggestPackage: (formData) => suggestPackage(formData),
    updateAppointmentDoneFlag: (formData) => updateAppointmentDoneFlag(formData),
    updateReviewsRatings: (formData) => updateReviewsRatings(formData),
    fetchData: (formData) => fetchData(formData),
    updating: (formData) => updating(formData),
};
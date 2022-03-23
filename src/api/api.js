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
import {createPackage} from './apis/create_package';
import { filterPackages } from "./apis/filter_packages";
import { fetchInsurancePackages } from "./apis/fetch_insurance_packages";


export const API = {
    login: (formData) => login(formData),
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
};
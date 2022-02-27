import './appointment_details.css';
import DoctorAppointmentView from './doctor/doctor';
import PatientAppointmentView from './patient/patient';

export default function AppointmentDetailsScreen(props) {
    const isDoctor = localStorage.getItem("user_type_id") == "2" ? true : false
    
    return (
        <div className="app_details_container">
            {
                isDoctor
                ? <DoctorAppointmentView />
                : <PatientAppointmentView />
            }
        </div>
    );
}
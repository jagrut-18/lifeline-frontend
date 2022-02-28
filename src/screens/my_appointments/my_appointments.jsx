import './my_appointments.css';
import PatientMyAppointments from './patient/patient';

export default function MyAppointmentsScreen(props) {
    return (
        <div>
            {
                localStorage.getItem("user_type_id") == "1"
                ? <PatientMyAppointments />
                : <div>DoctorMyAppointments</div>
            }
        </div>
    );
}
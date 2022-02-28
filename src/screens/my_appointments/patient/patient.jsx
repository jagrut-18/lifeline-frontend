import Heading from '../../../components/heading/heading';
import PatientAppointment from '../../../components/patient_appointment/patient_appointment';
import Spacer from '../../../components/spacer';
import './patient.css';

export default function PatientMyAppointments(props){
    const data = {
        doctor_name: "Dr. John Doe",
        date: "Feb 26, 2022",
        time: "10:30 AM - 11:00 AM",
    }
    return (
        <div className="my_appointments_container">
            <Heading text="Your upcoming appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
                <PatientAppointment appointment={data} />
            </div>
            <Spacer height={20}/>
            <Heading text="Your past appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
                <PatientAppointment appointment={data} />
            </div>
        </div>
    );
}
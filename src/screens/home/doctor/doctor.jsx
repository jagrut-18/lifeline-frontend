import './doctor.css';
import DoctorAppointment from "./doctor_appointment";

export default function DoctorHome() {
    const data = [
        {
            appointmentTime: "10:30 AM - 11:00 AM",
            patientName: "John Doe",
            patientAge: "22 Years",
            onClick: null,
        },
        {
            appointmentTime: "10:30 AM - 11:00 AM",
            patientName: "John Doe",
            patientAge: "22 Years",
            onClick: null,
        },
        {
            appointmentTime: "10:30 AM - 11:00 AM",
            patientName: "John Doe",
            patientAge: "22 Years",
            onClick: null,
        },
    ]
    return (
        <div className="doctor_home_container">
            {data.map((value) => {
                return <DoctorAppointment {...value} />
            })}
        </div>
    );
}
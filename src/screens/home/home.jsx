
import './home.css'
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/homepatient/homepatient';
import DoctorHome from './doctor/doctor';
import Heading from '../../components/heading/heading';
import Spacer from '../../components/spacer';
import PatientAppointment from '../../components/patient_appointment/patient_appointment';

const HomeScreen = () => {
    const navigate = useNavigate();
    let user_type = JSON.parse(localStorage.getItem('user_type_id'))

    const data = {
        doctor_name: "Dr. John Doe",
        date: "Feb 26, 2022",
        time: "10:30 AM - 11:00 AM",
    }

    if (localStorage.getItem("user_type_id") == "2") {
        return (
            <div className="container-home">
                <DoctorHome />
            </div>
        );
    }

    return (
        <div className="container-home">
            <Heading text="Your upcoming appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
                <PatientAppointment appointment={data} />
            </div>
            <div className="row">
                <div className="col-1">
                    <h2>LifeLine.</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
            {
                user_type == "1" ?
                    <HomePatient/>
                :
                null
            }
        </div>
    );
};

export default HomeScreen

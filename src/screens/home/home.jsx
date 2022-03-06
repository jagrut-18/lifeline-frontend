
import './home.css'
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/homepatient/homepatient';
import DoctorHome from './doctor/doctor';
import Heading from '../../components/heading/heading';
import Spacer from '../../components/spacer';
import PatientAppointment from '../../components/patient_appointment/patient_appointment';
import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import Loader from '../../components/loader/loader';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    let user_type = JSON.parse(localStorage.getItem('user_type_id'))

    useEffect(() => {
        if (user_type == "1"){
            getPatientAppointments();
        }
    }, []);

    if (localStorage.getItem("user_type_id") == "2") {
        return (
            <div className="container-home">
                <DoctorHome />
            </div>
        );
    }

    async function getPatientAppointments() {
        setLoading(true);
        const response = await API.getPatientAppointments();
        if (response.success) {
            setPatientAppointments(response.data.scheduled_appointments);
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container-home">
            <Heading text="Your upcoming appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
                {
                    patientAppointments.map((data, index) => {
                        return <PatientAppointment key={index} appointment={data} />
                    })
                }
            </div>
            <Spacer height={30}/>
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

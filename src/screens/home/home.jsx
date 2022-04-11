
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
import YourPackagesScreen from '../your_packages/your_packages_screen';
import Description from '../../components/description/description';

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
    if (localStorage.getItem("user_type_id") == "3") {
        return (
            <div className="container-home">
                <YourPackagesScreen />
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
            {patientAppointments.length > 0 && <Heading text="Your upcoming appointments" />}
            {patientAppointments.length > 0 && <Spacer height={10}/>}
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
                    <Heading text="Find Doctors and Insurance Packages..." style={{fontSize: 28}}/> 
                    <Description text="Whether finding a doctor, setting up an appointment, or just helping you get more from your plan, our platform provides everything. Plus, we’ve made it easier to talk to a doctor quickly. So, you can spend less time searching for answers and more time doing what you actually want." style={{fontSize: 16}}/>
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


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
import PatientSectionTwo from './patient_section_two'

const HomeScreen = () => {
    const navigate = useNavigate();
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    let user_type = JSON.parse(localStorage.getItem('user_type_id'))

    useEffect(() => {
        if (user_type == "1") {
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
        <div className={`${localStorage.getItem("user_type_id") == "1" && 'container-home-patient'} container-home`}>
            <div className="home-screen-section-1">
                <div className="home-screen-section-1-inner">
                    {patientAppointments.length > 0 && <Heading text="Your upcoming appointments" />}
                    {patientAppointments.length > 0 && <Spacer height={10} />}
                    <div className="appointments_container">
                        {
                            patientAppointments.map((data, index) => {
                                return <PatientAppointment key={index} appointment={data} />
                            })
                        }
                    </div>
                    <Spacer height={30} />
                    <div className="row">
                        <div className="col-1">
                            <Heading text="Find Doctors and Insurance Packages..." style={{ fontSize: 28 }} />
                            <Description text="Whether finding a doctor, setting up an appointment, or just helping you get more from your plan, our platform provides everything. Plus, we’ve made it easier to talk to a doctor quickly. So, you can spend less time searching for answers and more time doing what you actually want." style={{ fontSize: 16 }} />
                        </div>
                    </div>
                    {
                        user_type == "1" ?
                            <HomePatient />
                            :
                            null
                    }
                </div>
            </div>
            <div className="home-screen-section-2">
                <Description text={"Covid-19 related articles"} />
                <Spacer height={10} />
                <PatientSectionTwo title={"WHO: Coronavirus disease (COVID-19)"} description={"Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus."} url={"https://www.who.int/health-topics/coronavirus#tab=tab_1"} />
                <Spacer height={20} />
                <PatientSectionTwo title={"CDC: Symptoms of COVID-19"} description={"People with COVID-19 have had a wide range of symptoms reported – ranging from mild symptoms to severe illness."} url={"https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"} />
                <Spacer height={20} />
                <PatientSectionTwo title={"Vaccine Information and Planning"} description={"COVID-19 Vaccination in Indiana"} url={"https://www.coronavirus.in.gov/vaccine/"} />
                <Spacer height={20} />
                <PatientSectionTwo title={"Treating COVID-19 at home: Care tips for you and others"} description={"If you have coronavirus disease 2019 (COVID-19) and you're caring for yourself at home or you're caring for a loved one with COVID-19 at home, you might have questions"} url={"https://www.mayoclinic.org/diseases-conditions/coronavirus/in-depth/treating-covid-19-at-home/art-20483273"} />
            </div>
        </div>
    );
};

export default HomeScreen

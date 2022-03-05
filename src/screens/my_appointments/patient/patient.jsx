import { useEffect, useState } from 'react';
import { API } from '../../../api/api';
import Heading from '../../../components/heading/heading';
import PatientAppointment from '../../../components/patient_appointment/patient_appointment';
import Spacer from '../../../components/spacer';
import './patient.css';

export default function PatientMyAppointments(props){
    const [scheduled, setScheduled] = useState([]);
    const [past, setPast] = useState([]);

    useEffect(() => {
        getPatientAppointments();
    }, []);

    async function getPatientAppointments() {
        const response = await API.getPatientAppointments();
        if (response.success) {
            setScheduled(response.data.scheduled_appointments);
            setPast(response.data.past_appointments);
        }
        else {
            alert(response.error);
        }
    }
    return (
        <div className="my_appointments_container">
            <Heading text="Your upcoming appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
            {
                    scheduled.map((data, index) => {
                        return <PatientAppointment key={index} appointment={data} />
                    })
                }
            </div>
            <Spacer height={20}/>
            <Heading text="Your past appointments" />
            <Spacer height={10}/>
            <div className="appointments_container">
            {
                    past.map((data, index) => {
                        return <PatientAppointment key={index} appointment={data} />
                    })
                }
            </div>
        </div>
    );
}
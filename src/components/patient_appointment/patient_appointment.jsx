import './patient_appointment.css';
import { IoIosArrowForward } from 'react-icons/io';
import Description from '../description/description';
import Spacer from '../spacer';
import getDateString from '../../utilities/date_string';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PatientAppointment(props) {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date(props.appointment.date))

    function dateString(date){
        const d = new Date(date);
        d.setHours(d.getHours() + (d.getTimezoneOffset() / 60));
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`;
    }

    useEffect(() => {
        const tempDate = date;
        tempDate.setHours(tempDate.getHours() + (tempDate.getTimezoneOffset() / 60));
        setDate(tempDate)
        console.log({tempDate})
        console.log('abc', { date })
    }, [])


    function goToAppointment() {
        console.log(props.appointment.appointment_id)
        navigate(`/appointment_details/${props.appointment.appointment_id}`);
    }

    return (
        <div className="appointment_container">
            <div className="date_container">
                {props.appointment.doctor_name}
                <div onClick={goToAppointment} className="arrow_container">
                    <IoIosArrowForward color='white' />
                </div>
            </div>
            <Spacer height={10} />
            <Description text={`Date: ${dateString(props.appointment.date)}`} />
            <Spacer height={5} />
            <Description text={`Time: ${props.appointment.time}`} />
        </div>
    );
}
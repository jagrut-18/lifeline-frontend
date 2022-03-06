import './patient_appointment.css';
import { IoIosArrowForward } from 'react-icons/io';
import Description from '../description/description';
import Spacer from '../spacer';
import getDateString from '../../utilities/date_string';
import { useNavigate } from 'react-router-dom';

export default function PatientAppointment(props) {
    const navigate = useNavigate();

    function goToAppointment() {
        console.log(props.appointment.appointment_id)
        navigate(`/appointment_details/${props.appointment.appointment_id}`);
    }

    return (
        <div className="appointment_container">
            <div className="date_container">
                {props.appointment.doctor_name}
                <div onClick={goToAppointment} className="arrow_container">
                    <IoIosArrowForward color='white'/>
                </div>
            </div>
            <Spacer height={10}/>
            <Description text={`Date: ${getDateString(props.appointment.date)}`} />
            <Spacer height={5}/>
            <Description text={`Time: ${props.appointment.time}`} />
        </div>
    );
}
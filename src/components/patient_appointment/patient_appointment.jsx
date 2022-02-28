import './patient_appointment.css';
import { IoIosArrowForward } from 'react-icons/io';
import Description from '../description/description';
import Spacer from '../spacer';

export default function PatientAppointment(props) {
    return (
        <div className="appointment_container">
            <div className="date_container">
                {props.appointment.doctor_name}
                <div className="arrow_container">
                    <IoIosArrowForward color='white'/>
                </div>
            </div>
            <Spacer height={10}/>
            <Description text={`Date: ${props.appointment.date}`} />
            <Spacer height={5}/>
            <Description text={`Age: ${props.appointment.time}`} />
        </div>
    );
}
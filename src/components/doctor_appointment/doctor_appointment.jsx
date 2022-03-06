import './doctor_appointment.css';
import Heading from '../heading/heading'
import { IoIosArrowForward } from 'react-icons/io';
import Description from '../description/description';
import Spacer from '../spacer';
import { useNavigate } from 'react-router-dom';

export default function DoctorAppointment(props) {
    const navigate = useNavigate();

    function goToAppointment() {
        console.log(props.appointment.id)
        navigate(`/appointment_details/${props.appointment.id}`);
    }

    return (
        <div className="appointment_container">
            <div className="date_container">
                {props.appointment.time}
                <div onClick={goToAppointment} className="arrow_container">
                    <IoIosArrowForward color='white'/>
                </div>
            </div>
            <Spacer height={10}/>
            <Heading text={props.appointment.patient_name} style={{fontSize: 18}}/>
            <Description text={`Age: ${props.appointment.patient_age}`} />
        </div>
    );
}
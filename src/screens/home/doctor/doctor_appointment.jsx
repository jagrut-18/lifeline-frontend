import './doctor_appointment.css';
import Heading from '../../../components/heading/heading'
import { IoIosArrowForward } from 'react-icons/io';
import Description from '../../../components/description/description';
import Spacer from '../../../components/spacer';

export default function DoctorAppointment(props) {
    return (
        <div className="appointment_container">
            <div className="date_container">
                {props.appointmentTime}
                <div className="arrow_container">
                    <IoIosArrowForward color='white'/>
                </div>
            </div>
            <Spacer height={10}/>
            <Heading text={props.patientName} style={{fontSize: 18}}/>
            <Description text={`Age: ${props.patientAge}`} />
        </div>
    );
}
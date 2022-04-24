import './patient_book_appointment_card.css';
import Doctor from '../../../images/doctor.svg';
import Heading from '../../../components/heading/heading';
import {AiFillStar} from 'react-icons/ai';
import HighlightedContent from '../../../components/highlighted_content/highlighted_content';
import Description from '../../../components/description/description';
import OutlineButton from '../../../components/outline_button/outline_button';
import Spacer from '../../../components/spacer';
import AppointmentModal from '../appointment_modal/appointment_modal';
import { useState } from 'react';
import ReviewsModal from '../reviews_modal/reviews_modal';

export default function PatientBookAppointmentCard(props) {
    const {doctor_name, specialization, covid_care, hospital_name, hospital_address, total_rating, reviews_rating, profile_image_url} = props.data;

    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

    function onAppointmentBooked(doctorId, bookedDate, bookedSlot){
        setIsAppointmentModalOpen(false);
        props.onAppointmentBooked(doctorId, bookedDate, bookedSlot);
    }

    return (
        <>
            {isAppointmentModalOpen && <AppointmentModal isOpen={isAppointmentModalOpen} setIsOpen={setIsAppointmentModalOpen} data={props.data} allAppointments={props.allAppointments} onAppointmentBooked={onAppointmentBooked} currentInsuranceDetails={props.currentInsuranceDetails} />}
            {isReviewsModalOpen && <ReviewsModal isOpen={isReviewsModalOpen} setIsOpen={setIsReviewsModalOpen} reviewsRatings={reviews_rating} />}
            <div className="patient_book_appointment_container">
                <div style={{ backgroundImage: `url(${profile_image_url == null ? `https://placehold.jp/50/cccccc/ffffff/250x250.png?text=${doctor_name.split(" ")[0].charAt(0)}${doctor_name.split(" ")[1].charAt(0)}` : profile_image_url})` }} className="patient_book_appointment_doctor_image" />
                <div className="appointment_doctor_details">
                    <div className="name_row">
                        <Heading text={doctor_name} style={{fontSize: 18}}/>
                        {total_rating && <div className="rating_bubble" onClick={() => setIsReviewsModalOpen(true)}>{parseInt(total_rating)}<AiFillStar color='white' size={20}/></div>}
                    </div>
                    <div className="highlight_row">
                        <HighlightedContent backgroundColor={"rgba(184, 64, 94, 0.13)"} textColor={"#B8405E"} text={specialization} />
                        { covid_care == "Yes"
                            && <HighlightedContent backgroundColor={"rgba(76, 175, 80, 0.13)"} textColor={"#4CAF50"} text={"Covid Care"} />
                        }
                    </div>
                    <Spacer height={10} />
                    <div className="hospital_row">
                        <div className="book_appointment_hospital_details">
                            <Heading text={hospital_name} style={{fontSize: 16}}/>
                            <Description text={hospital_address} style={{fontSize: 16}}/>
                        </div>
                        <OutlineButton text="View Slots" onClick={() => {setIsAppointmentModalOpen(true)}}/>
                    </div>
                </div>
            </div>
        </>
    );
}
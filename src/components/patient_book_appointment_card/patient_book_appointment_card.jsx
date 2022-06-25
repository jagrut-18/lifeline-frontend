import './patient_book_appointment_card.css'
import React from 'react'
import Doctor from '../../images/doctor.svg'
import Star from '../../images/star.svg'
import HighlightedContent from '../../components/highlighted_content/highlighted_content'

function PatientBookAppointmentCard(props) {
    return (
        <div className="search-box">
            {/* image div */}
            <div style={{ backgroundImage: `url(${Doctor})` }} className="doctor-image" />
            {/* <img src={Doctor} alt="Doctor Image" /> */}
            {/* info div */}
            <div className="doctor-info">
                <div className="doctor-info-section-1">
                    <div className="doctor-title">
                        <h3>{props.data.doctor_name}</h3>
                    </div>
                    {
                        props.data.reviews_rating != "" ?
                            <button className="ratings" onClick={() => { props.openReviewsRatings(props.data.reviews_rating) }}>
                                <span>{props.data.total_rating}</span>
                                <img src={Star} alt="rating" />
                            </button>
                            :
                            null
                    }
                </div>
                <div className="doctor-info-section-2">
                    <HighlightedContent backgroundColor={"rgba(184, 64, 94, 0.13)"} textColor={"#B8405E"} text={props.data.specialization} />
                    <div className="seperator" />
                    {
                        props.data.covid_care == "Yes"
                        && <HighlightedContent backgroundColor={"rgba(76, 175, 80, 0.13)"} textColor={"#4CAF50"} text={"Covid Care"} />
                    }
                    {/* <div className="display-info"><span>{props.data.specialization}</span></div>
                    <div className="display-info-2"><span>{props.data.covid_care}</span></div> */}
                </div>
                <div className="doctor-info-section-3">
                    <div className="section-3-description">
                        <h3>{props.data.hospital_name}</h3>
                        <p>{props.data.hospital_address}</p>
                    </div>
                    <div className="section-3-button">
                        <div className="button-wrapper">
                            <button className="button" onClick={() => { props.bookSlot(props.data.appointments, props.data.doctor_id) }}>
                                {/* <button className='button' style={style} onClick={props.onClick}> */}
                                View Slots
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PatientBookAppointmentCard
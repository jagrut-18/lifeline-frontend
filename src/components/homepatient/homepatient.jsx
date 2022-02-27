import React from 'react'
import './homepatient.css'
import Doctor from '../../images/home_page_doctor.svg';
import Box from '../../components/card1/card1'
import Insurance from '../../images/home_page_insurance.svg';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes.js';

function HomePatient() {
    const navigate = useNavigate();

    const onClick = () => {
        console.log("his")
        navigate(routes.pat_book_appointment);
    }

    return (
        <div className="row-boxes">
            <Box onClick={onClick} image={Doctor} header={"Patients"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Find Appointments"} />
            <Box image={Insurance} header={"Insurance Packages"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Explore Plans"} />
            <div className="box-display-none" />
        </div>
    )
}

export default HomePatient
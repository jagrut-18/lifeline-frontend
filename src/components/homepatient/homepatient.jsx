import React from 'react'
import './homepatient.css'
import Doctor from '../../images/home_page_doctor.svg';
import Box from '../../components/card1/card1'
import Insurance from '../../images/home_page_insurance.svg';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes.js';

function HomePatient() {
    const navigate = useNavigate();

    const onClick = (routeName) => {
        if (routeName == "pat_book_appointment") {
            navigate(routes.book_appointment);
        } else if (routeName == "search_package_patient") {
            navigate(routes.search_package_patient);
        }
    }

    return (
        <div className="row-boxes">
            <Box onClick={onClick} routeName={"pat_book_appointment"} image={Doctor} header={"Doctors"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Find Appointments"} />
            <Box onClick={onClick} routeName={"search_package_patient"} image={Insurance} header={"Insurance Packages"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Explore Plans"} />
            {/* <div className="box-display-none" /> */}
        </div>
    )
}

export default HomePatient
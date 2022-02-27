
import './home.css'
import routes from '../../routing/routes';
import Doctor from '../../images/home_page_doctor.svg';
import Box from '../../components/card1/card1'
import Insurance from '../../images/home_page_insurance.svg';
import { useNavigate } from 'react-router-dom';
import DoctorHome from './doctor/doctor';

const HomeScreen = () => {
    const navigate = useNavigate();

    const navigateNext = () => {
        navigate(routes.user_type);
    }

    if (localStorage.getItem("user_type_id") == "2") {
        return (
            <div className="container-home">
                <DoctorHome />
            </div>
        );
    }

    return (
        <div className="container-home">
            <div className="row">
                <div className="col-1">
                    <h2>LifeLine.</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
            <div className="row-boxes">
                <Box image={Doctor} header={"Patients"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Find Appointments"} />
                <Box image={Insurance} header={"Insurance Packages"} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"} buttonText={"Explore Plans"} />
                <div className="box-display-none" />
            </div>
        </div>
    );
};

export default HomeScreen

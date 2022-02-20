
import './home.css'
import routes from '../../routing/routes';
import Doctor from '../../images/home_page_doctor.svg';
import Menu from '../../menu/menu'
import Box from '../../components/card1/card1'
import Insurance from '../../images/home_page_insurance.svg';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    const navigateNext = () => {
        navigate(routes.user_type);
    }

    return (
        <div className="container-home">
            <Menu />
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

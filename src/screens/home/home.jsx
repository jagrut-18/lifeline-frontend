
import './home.css'
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/homepatient/homepatient';
import DoctorHome from './doctor/doctor';

const HomeScreen = () => {
    const navigate = useNavigate();
    localStorage.setItem('user_type_id', "1")
    let user_type = JSON.parse(localStorage.getItem('user_type_id'))
    console.log(user_type)

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
            {
                user_type == "1" ?
                    <HomePatient/>
                :
                null
            }
        </div>
    );
};

export default HomeScreen

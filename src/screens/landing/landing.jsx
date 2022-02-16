
import './landing.css'
import { useEffect } from 'react';
import routes from '../../routing/routes';
import logo from '../../images/doctor.png';
import doctor from '../../images/doctor_landing.svg';
import Card from '@mui/material/Card';
import Menu from '../../menu/menu'
import { useNavigate } from 'react-router-dom';

const LandingScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // axios.get('http://3.220.183.182:5000/')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
        //     .then(function () {
        //         // always execute
        //     });

    }, [])

    const navigateNext = () => {
        navigate(routes.user_type);
    }

    return (
        <div className="container-landing">
            <Menu />
            <div className="row">
                <div className="col-1">
                    <h2>Lorem Ipsum is simply dummy text.</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <button type="button" onClick={navigateNext}>Get Started</button>
                </div>
                <div className="col-2">
                    <img src={doctor} alt="doctor" />
                </div>
                <div className="box">
                    <div className="box-col">
                        <div><span>P</span></div>
                        <h2>Patients</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                    </div>
                    <div className="box-col">
                        <div><span>D</span></div>
                        <h2>Doctors</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                    </div>
                    <div className="box-col">
                        <div><span>I</span></div>
                        <h2>Insurance Providers</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen

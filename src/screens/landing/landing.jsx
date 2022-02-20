
import './landing.css'
import { useEffect } from 'react';
import routes from '../../routing/routes';
import logo from '../../images/doctor.png';
import doctor from '../../images/doctor_landing.svg';
import Card from '@mui/material/Card';
import Menu from '../../menu/menu'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://3.220.183.182:5000/')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always execute
            });

    }, [])

    const navigateNext = () => {
        navigate(routes.user_type);
    }

    return (
        <div className="container-landing">
            <Menu />
            <div className="row">
                <div className="col-1">
                    <h2>LifeLine</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <button type="button" onClick={navigateNext}>Get Started</button>
                </div>
                <div className="col-2">
                    <img src={doctor} alt="doctor" />
                </div>
                <div className="box">
                    <div className="box-col">
                        <div className="heading-wrapper"><span>P</span></div>
                        <h2>Patients</h2>
                        <p>Stay on top of your heath and wellness. Book appointments, have regular checkups, chat with doctors any time, get medical insurance. All at one place!</p>
                    </div>
                    <div className="box-col">
                        <div className="heading-wrapper"><span>D</span></div>
                        <h2>Doctors</h2>
                        <p>Manager your schedule, appointments, meet pateints and get access to thier medical records here!</p>
                    </div>
                    <div className="box-col">
                        <div className="heading-wrapper"><span>I</span></div>
                        <h2>Insurance Providers</h2>
                        <p>Log in with your company details and start providing your instant afforable packages to our customers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen

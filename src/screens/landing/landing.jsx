
import './landing.css'
import routes from '../../routing/routes';
import doctor from '../../images/doctor_landing.svg';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';

const LandingScreen = () => {
    const navigate = useNavigate();

    const data = [
        {
            name: 'Patient',
            description: 'Stay on top of your heath and wellness. Book appointments, have regular checkups, chat with doctors any time, get medical insurance. All at one place!',
        },
        {
            name: 'Doctor',
            description: 'Manager your schedule, appointments, meet pateints and get access to thier medical records here!',
        },
        {
            name: 'Insurance Provider',
            description: 'Log in with your company details and start providing your instant afforable packages to our customers.',
        },
    ]

    const navigateNext = () => {
        navigate(routes.user_type);
    }

    return (
        <div className="container-landing">
            <div className="row">
                <div className="col-1">
                    <Heading text="Find Doctors and Insurance Packages" style={{fontSize: 40}} />
                    <p>Whether finding a doctor, setting up an appointment, or just helping you get more from your plan, our platform provides everything. Plus, we’ve made it easier to talk to a doctor quickly. So, you can spend less time searching for answers and more time doing what you actually want.</p>
                    <button type="button" onClick={navigateNext}>Get Started</button>
                </div>
                <div className="col-2">
                    <img src={doctor} alt="doctor" />
                </div>
                <div className="box">
                    {
                        data.map((item) => (
                            <div key={item.name} className="box-col">
                                <div className="heading-wrapper"><span>{item.name.charAt(0)}</span></div>
                                <Spacer height={5} />
                                <Heading text={item.name} style={{fontSize: 18}}/>
                                <Description text={item.description} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LandingScreen

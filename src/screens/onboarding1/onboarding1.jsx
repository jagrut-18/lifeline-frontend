import './onboarding1.css';
import { useState } from 'react';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';

/* props:
    
*/

export default function OnboardingScreen1(props) {
    const navigate = useNavigate();
    
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const [phone, setPhone] = useState();

    function onNext(){
        var data = {
            'first_name': first,
            'last_name': last,
            'phone': phone,
        }
        console.log(data);
        navigate(routes.onboarding2);
    }

    return (
        <div className="container">
            <Card>
                <Heading text="Enter your details" fontSize={24} />
                <Description text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                <Spacer height={30}/>
                <div className="form">
                <Textfield placeholder="First Name" value={first} onChange={setFirst}/>
                <Spacer height={15}/>
                <Textfield placeholder="Last Name" value={last} onChange={setLast}/>
                <Spacer height={15}/>
                <Textfield type="number" placeholder="Phone Number" value={phone} onChange={setPhone}/>
                <Spacer height={15}/>
                <Button text="Next" onClick={onNext}/>
                </div>
            </Card>
        </div>
    )
}
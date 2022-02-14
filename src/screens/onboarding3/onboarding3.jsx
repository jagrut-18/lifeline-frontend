import './onboarding3.css';
import Card from '../../components/card/card';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import { useState } from 'react';

export default function OnboardingScreen3(props) {
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipcode, setZipcode] = useState();
    
    function onSubmit() {
        const data = {
            'address': address,
            'city': city,
            'state': state,
            'zipcode': zipcode,
        }

        console.log(data);
    }

    return (
        <div className="container">
            <Card>
                <Heading text="Where do you live?" fontSize={24} />
                <Description text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                <Spacer height={30}/>
                <div className="form">
                <Textfield placeholder="Address" value={address} onChange={setAddress} />
                <Spacer height={15}/>
                <div className="onboarding_row">
                    <Textfield placeholder="City" value={city} onChange={setCity} />                    
                    <Textfield placeholder="State" value={state} onChange={setState} />                    
                </div>
                <Spacer height={15}/>
                <Textfield type="number" placeholder="Zipcode" style={{width: "calc(50% - 5px)"}} value={zipcode} onChange={setZipcode}/>                
                <Spacer height={20}/>
                <Button text="Next" onClick={onSubmit} />
                </div>
            </Card>
        </div>
    )
}
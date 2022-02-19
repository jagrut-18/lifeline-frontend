import './onboarding3.css';
import Card from '../../components/card/card';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import { useState } from 'react';
import ErrorComponent from '../../components/error/error';

export default function OnboardingScreen3(props) {
    // field hooks
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState();
    const userType = null

    function validate() {
        const fields = [address, city, state, zipcode]
        if (fields.some((field) => field == '')) {
            setError("Please fill all the details");
            return false;
        }
        return true;
    }

    function onSubmit() {
        if (!validate()) return;
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
            {
                userType == null ?
                    <Card>
                        <Heading text="Where is you company located?" fontSize={24} />
                        <Description text={userType == null ? "Lorem Ipsum" : "Lorem Ipsum"} />
                        <Spacer height={30} />
                        <div className="form">
                            <Textfield placeholder="Address" value={address} onChange={setAddress} />
                            <Spacer height={15} />
                            <div className="onboarding_row">
                                <Textfield placeholder="City" value={city} onChange={setCity} />
                                <Textfield placeholder="State" value={state} onChange={setState} />
                            </div>
                            <Spacer height={15} />
                            <Textfield type="number" placeholder="Zipcode" style={{ width: "calc(50% - 5px)" }} value={zipcode} onChange={setZipcode} />
                            <Spacer height={20} />
                            {error && <ErrorComponent message={error} />}
                            <Button text="Next" onClick={onSubmit} />
                        </div>
                    </Card>
                    :
                    <Card>
                        <Heading text="Where do you live?" fontSize={24} />
                        <Description text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                        <Spacer height={30} />
                        <div className="form">
                            <Textfield placeholder="Address" value={address} onChange={setAddress} />
                            <Spacer height={15} />
                            <div className="onboarding_row">
                                <Textfield placeholder="City" value={city} onChange={setCity} />
                                <Textfield placeholder="State" value={state} onChange={setState} />
                            </div>
                            <Spacer height={15} />
                            <Textfield type="number" placeholder="Zipcode" style={{ width: "calc(50% - 5px)" }} value={zipcode} onChange={setZipcode} />
                            <Spacer height={20} />
                            {error && <ErrorComponent message={error} />}
                            <Button text="Next" onClick={onSubmit} />
                        </div>
                    </Card>

            }
        </div>
    )
}
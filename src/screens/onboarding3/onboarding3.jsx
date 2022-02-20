import './onboarding3.css';
import Card from '../../components/card/card';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import { useState } from 'react';
import ErrorComponent from '../../components/error/error';
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';

export default function OnboardingScreen3(props) {
    // field hooks
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState();
    const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'))
    const navigate = useNavigate();

    function validate() {
        const fields = [address, city, state, zipcode]
        if (fields.some((field) => field == '')) {
            setError("Please fill all the details");
            return false;
        }
        return true;
    }

    async function onSubmit() {
        if (!validate()) return;

        let onboardingData = JSON.parse(localStorage.getItem('onboardingData'))
        let formData = new FormData();
        const userId = localStorage.getItem('user_id');

        onboardingData = {
                ...onboardingData,
                'address': address,
                'city': city,
                'state': state,
                'zipcode': zipcode,
                'user_id': userId,
        }

        console.log(onboardingData);
         
        for (var key in onboardingData) {
            formData.append(key, onboardingData[key]);
        }

        var response = await API.onboarding(formData);
        if (response.success){
            navigate(routes.home, {replace: true});
        }
        else {
            setError(response.error);
        }
    }

    return (
        <div className="container">
            {
                <Card>
                    <Heading text={userTypeId == "3" ? "Where is you company located?" : "Where do you live?"} fontSize={24} />
                    <Description text={userTypeId == "3" ? "Lorem Ipsum" : "Lorem Ipsum"} />
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
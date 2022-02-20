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

    function onSubmit() {
        if (!validate()) return;

        let onboardingData = JSON.parse(localStorage.getItem('onboardingData'))
        let formData = new FormData();

        if (userTypeId == "1") {

            onboardingData = {
                'first_name': onboardingData.first_name,
                'last_name': onboardingData.last_name,
                'phone': onboardingData.phone,
                'dob': onboardingData.dob,
                'gender': onboardingData.gender,
                'height': onboardingData.height,
                'weight': onboardingData.weight,
                'blood_group': onboardingData.bloodGroup,
                'smoke': onboardingData.smoke,
                'drink': onboardingData.drink,
                'address': address,
                'city': city,
                'state': state,
                'zipcode': zipcode
            }


            formData.append('email', email);
            formData.append('email', email);
            formData.append('email', email);
            formData.append('email', email);
            

        } else if (userTypeId == "2") {

            onboardingData = {
                'first_name': onboardingData.first_name,
                'last_name': onboardingData.last_name,
                'phone': onboardingData.phone,
                'specialization': onboardingData.specialization,
                'has_covid_care': onboardingData.hasCovidCare,
                'city': city,
                'state': state,
                'zipcode': zipcode
            }

        } else if (userTypeId == "3") {

            onboardingData = {
                'first_name': onboardingData.first_name,
                'last_name': onboardingData.last_name,
                'phone': onboardingData.phone,
                'company_name': onboardingData.companyName,
                'city': city,
                'state': state,
                'zipcode': zipcode
            }
        }

        axios.post('http://3.220.183.182:5000/Onboarding', formData).then(function (response) {
            if (response.data.response_code == "200") {
                navigate(routes.home, {replace: true});

            } else if (response.data.response_code == "210") {
                //user already exists
            } else if (response.data.response_code == "230") {
            }
            // navigate(routes.onboarding1);
        })
            .catch(function (error) {
                setError("Something went wrong")
                console.log(error);
            })

        //Onboard api call with onboardingData object
        //clear data and userTypeId
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
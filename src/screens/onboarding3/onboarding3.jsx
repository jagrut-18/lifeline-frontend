import './onboarding3.css';
import Card from '../../components/card/card';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Searchfield from '../../components/searchfield/searchfield';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import { useContext, useState } from 'react';
import ErrorComponent from '../../components/error/error';
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import { LoginStateContext } from '../../contexts';

export default function OnboardingScreen3(props) {
    // field hooks
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState();
    const { _, setIsLoggedIn } = useContext(LoginStateContext);
    const navigate = useNavigate();

    const isDoctor = localStorage.getItem("user_type_id") == "2";

    function validate() {
        const fields = isDoctor ? [selectedHospital] : [address, city, state, zipcode];
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

        
        if (isDoctor){
            onboardingData = {
                ...onboardingData,
                ...selectedHospital,
                'user_id': parseInt(userId),
                'user_type_id': parseInt(localStorage.getItem("user_type_id")),
                'profile_image_url': `https://placehold.jp/24/cccccc/ffffff/250x250.png?text=${onboardingData.first_name.charAt(0)}${onboardingData.last_name.charAt(0)}`,
            }
        }
        else {
            onboardingData = {
                ...onboardingData,
                'address': address,
                'city': city,
                'state': state,
                'zipcode': zipcode,
                'user_id': userId,
                'user_type_id': parseInt(localStorage.getItem("user_type_id")),
                'profile_image_url': `https://placehold.jp/24/cccccc/ffffff/250x250.png?text=${onboardingData.first_name.charAt(0)}${onboardingData.last_name.charAt(0)}`,
            }
        }

        console.log(onboardingData);

        for (var key in onboardingData) {
            formData.append(key, onboardingData[key]);
        }

        var response = await API.onboarding(formData);
        if (response.success){
            setIsLoggedIn(true);
            navigate(routes.home);
        }
        else {
            setError(response.error);
        }
    }

    async function getHospitals(query){
        const response = await API.hospitalsAutocomplete(query);
        if (response.success){
            setHospitals(response.data);
        }
    }


    return (
        <div className="container">
            {
                <Card>
                    <Heading text={"What is your address?"} fontSize={24} />
                    <Description text={"Let us know your address so that we can share important details with you in timely manner."} />
                    <Spacer height={30} />
                    <div className="form">
                        {
                            isDoctor
                            ? <Searchfield placeholder="Search your address" onChange={getHospitals} onOptionChange={setSelectedHospital} options={hospitals} parseObjectFunction={(object) => object.address} />
                            : <div>
                                <Textfield placeholder="Address" value={address} onChange={setAddress} />
                        <Spacer height={15} />
                        <div className="onboarding_row">
                            <Textfield placeholder="City" value={city} onChange={setCity} />
                            <Textfield placeholder="State" value={state} onChange={setState} />
                        </div>
                        <Spacer height={15} />
                        <Textfield type="number" placeholder="Zipcode" style={{ width: "calc(50% - 5px)" }} value={zipcode} onChange={setZipcode} />
                            </div>
                        }
                        <Spacer height={20} />
                        {error && <ErrorComponent message={error} />}
                        <Button text="Next" onClick={onSubmit} />
                    </div>
                </Card>

            }
        </div>
    )
}
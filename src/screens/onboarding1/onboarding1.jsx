import React, { useState } from 'react';
import './onboarding1.css';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';
import ErrorComponent from '../../components/error/error';

/* props:
    
*/

export default function OnboardingScreen1(props) {
    const navigate = useNavigate();
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [error, setError] = useState(null);
    const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'))

    console.log(useState(localStorage.getItem('email')))
    console.log(useState(localStorage.getItem('user_id')))
    console.log(useState(localStorage.getItem('token')))

    function validate() {
        if (first == '' || last == '' || phone == '') {
            setError("Please fill all the details");
            return false;
        }
        
        if (phone.length != 10) {
            setError("Invalid phone number");
            return false;
        }

        if (userTypeId == "3" && companyName == '') {
            setError("Please fill all the details");
            return false;
        }

        setError(null);
        return true;
    }

    function onNext() {
        if (!validate()) return;

        if (userTypeId == "3") {
            let onboardingData = {
                'first_name': first,
                'last_name': last,
                'phone_number': phone,
                'company_name': companyName
            }

            localStorage.setItem('onboardingData', JSON.stringify(onboardingData))
            navigate(routes.onboarding3);
            
        } else {
            let onboardingData = {
                'first_name': first,
                'last_name': last,
                'phone_number': phone
            }
            localStorage.setItem('user_name', first + ' ' + last);
            localStorage.setItem('onboardingData', JSON.stringify(onboardingData))
            navigate(routes.onboarding2);
        }
    }

    return (
        <div className="container">
            {
                <Card>
                    <Heading text={userTypeId == "3" ? "Enter company details" : "Enter details"} fontSize={24} />
                    <Description text={"Introduce yourself to us! Give use some information about you so that we can identify you."} />
                    <Spacer height={30} />
                    <div className="form">
                        <Textfield placeholder="First Name" value={first} onChange={setFirst} />
                        <Spacer height={15} />
                        <Textfield placeholder="Last Name" value={last} onChange={setLast} />
                        <Spacer height={15} />
                        <Textfield type="number" placeholder={userTypeId == "3" ? "Company Phone Number" : "Phone Number"} value={phone} onChange={setPhone} />
                        {
                            userTypeId == "3" ?
                            <div>
                                    <Spacer height={15} />
                                    <Textfield placeholder="Company Name" value={companyName} onChange={setCompanyName} />
                                </div>
                                :
                                null
                        }
                        <Spacer height={20} />
                        {error && <ErrorComponent message={error} />}
                        <Button text="Next" onClick={onNext} />
                    </div>
                </Card>

            }
        </div>
    )
}
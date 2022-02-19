import React, { useState, useContext } from 'react';
import { UserTypeContext } from '../../components/user_type_select/user_type_context.js';
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
    const [companyName, setCompanyName] = useState(null);
    const [error, setError] = useState(null);
    const userType = React.useContext(UserTypeContext);
    console.log(userType)

    function validate() {
        if (first == '' || last == '' || phone == '' || companyName == '') {
            setError("Please fill all the details");
            return false;
        }
        if (phone.length != 10) {
            setError("Invalid phone number");
            return false;
        }
        setError(null);
        return true;
    }

    function onNext() {
        if (!validate()) return;

        var data = {
            'first_name': first,
            'last_name': last,
            'phone': phone,
        }
        console.log(data);

        if (userType == null) {
            navigate(routes.onboarding3);
        } else {
            navigate(routes.onboarding2);
        }
    }

    return (
        <div className="container">
            {
                <Card>
                    <Heading text={userType == null ? "Enter company details" : "Enter details"} fontSize={24} />
                    <Description text={userType == null ? "Lorem Ipsum" : "Lorem Ipsum"} />
                    <Spacer height={30} />
                    <div className="form">
                        <Textfield placeholder="First Name" value={first} onChange={setFirst} />
                        <Spacer height={15} />
                        <Textfield placeholder="Last Name" value={last} onChange={setLast} />
                        <Spacer height={15} />
                        <Textfield type="number" placeholder={userType == null ? "Company Phone Number" : "Phone Number"} value={phone} onChange={setPhone} />
                        <Spacer height={15} />
                        <Textfield placeholder="Company Name" value={companyName} onChange={setCompanyName} />
                        <Spacer height={20} />
                        {error && <ErrorComponent message={error} />}
                        <Button text="Next" onClick={onNext} />
                    </div>
                </Card>

            }
        </div>
    )
}
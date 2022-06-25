import { useState } from 'react';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import DropdownSelect from '../../components/dropdown/dropdown';
import DateSelector from '../../components/datepicker/datepicker';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';
import ErrorComponent from '../../components/error/error';

export default function PatientOnboarding() {

    // navigation hook
    const navigate = useNavigate();
    // error hook
    const [error, setError] = useState(null);
    // dropdown options
    const genderOptions = ['Male', 'Female']
    const bloodGroups = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-']
    const yesNo = ['Yes', 'No']
    // field hooks
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [smoke, setSmoke] = useState(null);
    const [drink, setDrink] = useState(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    function validate() {
        const fields = [gender, bloodGroup, smoke, drink, height, weight];
        if (fields.some((field) => field == null || field == '')) {
            setError("Please fill all the fields");
            return false;
        }
        return true;
    }

    function onNext() {
        if (!validate()) return;

        let onboardingData = JSON.parse(localStorage.getItem('onboardingData'))

        onboardingData = {
            ...onboardingData,
            'birth_date': `${dob.year}-${dob.month}-${dob.day}`,
            'sex': gender.toLowerCase(),
            'height': parseInt(height),
            'weight': parseInt(weight),
            'blood_type': bloodGroup,
            'smoking_pref': smoke,
            'drinking_pref': drink
        }

        localStorage.setItem('onboardingData', JSON.stringify(onboardingData))

        navigate(routes.onboarding3);
    }

    return (
        <div className="container">
            <Card>
                <Heading text="About you" fontSize={24} />
                <Description text="Give us a little more insight about you so that we can provide you with the best possible services." />
                <Spacer height={30} />
                <div className="onboarding_row">
                    <DateSelector placeholder="Date of Birth" onChange={setDob} />
                    <DropdownSelect placeholder="Gender" options={genderOptions} onChange={setGender} />
                </div>
                <Spacer height={15} />
                <div className="onboarding_row">
                    <Textfield type="number" value={height} onChange={setHeight} placeholder="Height (cm)" />
                    <Textfield type="number" value={weight} onChange={setWeight} placeholder="Weight (lbs)"/>
                </div>
                <Spacer height={15} />
                <DropdownSelect placeholder="Blood Group" options={bloodGroups} onChange={setBloodGroup} />
                <Spacer height={15} />
                <div className="onboarding_row onboarding_row2">
                    Do you smoke?
                    <DropdownSelect options={yesNo} onChange={setSmoke} width={100} />
                </div>
                <Spacer height={15} />
                <div className="onboarding_row onboarding_row2">
                    Do you drink?
                    <DropdownSelect options={yesNo} onChange={setDrink} width={100} />
                </div>
                <Spacer height={20} />
                {error && <ErrorComponent message={error} />}
                <Button text="Next" onClick={onNext} />
            </Card>
        </div>
    )
}
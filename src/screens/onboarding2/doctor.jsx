import './onboarding2.css';
import { useState } from 'react';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import Button from '../../components/button/button';
import Card from '../../components/card/card';
import DropdownSelect from '../../components/dropdown/dropdown';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';
import ErrorComponent from '../../components/error/error';

export default function DoctorOnboarding() {
	// navigation hook
	const navigate = useNavigate();
	// error hook
	const [error, setError] = useState(null);
	// dropdown options
	const yesNo = ['Yes', 'No'];
	const specializations = JSON.parse(localStorage.getItem("specializations"));
	// field hooks
	const [specialization, setSpecialization] = useState('');
	const [hasCovidCare, setHasCovidCare] = useState('');
	const genderOptions = ['Male', 'Female']
    const [gender, setGender] = useState(null);


	function validate() {
		const fields = [specialization, hasCovidCare];

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
			'specialization': specialization,
			'has_covid_care': hasCovidCare,
			'sex': gender.toLowerCase()
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
				<DropdownSelect placeholder="Gender" options={genderOptions} onChange={setGender} />
				<Spacer height={15} />
				<DropdownSelect placeholder="Specialization" options={specializations} onChange={setSpecialization} />
				<Spacer height={15} />
				<div className="onboarding_row onboarding_row2">
					Do you provide Covid Care?
					<DropdownSelect options={yesNo} onChange={setHasCovidCare} width={100} />
				</div>
				<Spacer height={20} />
				{error && <ErrorComponent message={error} />}
				<Button text="Next" onClick={onNext} />
			</Card>
		</div>
	)

}
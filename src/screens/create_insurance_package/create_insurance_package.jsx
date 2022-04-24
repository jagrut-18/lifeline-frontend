import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../components/heading/heading';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import './create_insurance_package.css';
import Card from '../../components/card/card';
import Description from '../../components/description/description';
import Button from '../../components/button/button';
import Multiselect from '../../components/multiselect/multiselect';
import ErrorComponent from '../../components/error/error';
import DropdownSelect from '../../components/dropdown/dropdown';
import { API } from '../../api/api';
import OutlineButton from '../../components/outline_button/outline_button';
import { createUUID } from '../../utilities/create_uuid';

function CreateInsurancePackage() {
	const navigate = useNavigate()
	const [packageName, setPackageName] = useState("")
	const [policyNumber, setPolicyNumber] = useState("")
	const [premium, setPremium] = useState("")
	const [deductible, setDeductible] = useState("")
	const [benefits, setBenefits] = useState({})
	const [timePeriod, setTimePeriod] = useState("")
	const [isPlanDisabled, setIsPlanDisabled] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		console.log(benefits)
	}, [])

	const setBenefitsFunc = (benefits) => {
		console.log(benefits)
		setBenefits(benefits)
	}

	const createPackage = async () => {
		//Validations
		//Object.keys(benefits).length == 0 or all values in the object have "No" value then throw error
		//Api call to create a package
		let benefitsCount = 0
		for (var benefit in benefits) {
			if (benefits[benefit] == "No") {
				benefitsCount += 1
			}
		}

		console.log(premium, typeof premium)
		console.log(deductible, typeof deductible)
		console.log(timePeriod, typeof timePeriod)

		if (packageName == "" || policyNumber == "" || premium == "" || deductible == "" || Object.keys(benefits).length == 0 || benefitsCount == 3 || timePeriod == "" || isPlanDisabled == "") {
			setError("Please check if all the fields are filled!")
			return;
		}
		setError("");

		const formData = new FormData();
		formData.append("plan_name", packageName);
		formData.append("premium", parseInt(premium));
		formData.append("policy_number", policyNumber);
		formData.append("deductible", parseInt(deductible));
		formData.append("time_period", parseFloat(timePeriod));
		formData.append("is_disabled", isPlanDisabled == "Yes" ? 1 : 0);
		formData.append("includes_medical", benefits["Dental"]);
		formData.append("includes_dental", benefits["Medical"]);
		formData.append("includes_vision", benefits["Vision"]);
		formData.append("insurance_provider_id", parseInt(localStorage.getItem("user_id")));
		console.log({ packageName })
		console.log({ premium })
		console.log({ policyNumber })
		console.log({ deductible })
		console.log({ timePeriod })
		console.log({ isPlanDisabled })
		console.log({ benefits })
		console.log(localStorage.getItem("user_id"))

		const response = await API.createPackage(formData);
		if (response.responseFlag == 1) {
			alert("Your Package has been created");
			navigate(-1);
		} else if (response.responseFlag == 2) {
			setError(response.message);
		} else if (response.responseFlag == 3) {
			setError(response.error);
		}
	}

	return (
		<div className="container">
			<Card width="40%" height="inherit" style={{ margin: "40px 0" }}>
				<Heading text="Create a package" fontSize={24} />
				<Description text="Create a profile for yourself and have all your details and requirments at one place!" />
				<Spacer height={15} />
				<Textfield placeholder="Package Name" value={packageName} onChange={setPackageName} />
				<Spacer height={10} />
				<div className="policy_no_container">
					<Textfield placeholder="Policy Number" value={policyNumber} onChange={setPolicyNumber} />
					<OutlineButton text="Generate" onClick={() => setPolicyNumber(createUUID())} />
				</div>
				<Spacer height={10} />
				<div className="profile_row">
					<Textfield placeholder="Premium in $" value={premium} type={'number'} onChange={setPremium} />
					<Spacer width={15} />
					<Textfield placeholder="Deductible" value={deductible} type={'number'} onChange={setDeductible} />
				</div>
				<Spacer height={15} />
				<Description text={'What does the package cover?'} />
				<Spacer height={10} />
				<Multiselect options={['Medical', 'Dental', 'Vision']} onChange={setBenefitsFunc} />
				<Textfield placeholder="Time in years" type={"number"} step={0.5} value={timePeriod} onChange={setTimePeriod} />
				<Spacer height={15} />
				<Description text="Plan Disabled?" />
				<Spacer height={10} />
				<DropdownSelect options={["Yes", "No"]} onChange={setIsPlanDisabled} />
				<Spacer height={20} />
				<Button text={'Create'} onClick={createPackage} />
				<Spacer height={10} />
				{error && <ErrorComponent message={error} />}
			</Card>
		</div>
	)
}

export default CreateInsurancePackage
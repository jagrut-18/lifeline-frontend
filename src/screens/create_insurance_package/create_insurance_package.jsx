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

function CreateInsurancePackage() {
	const navigate = useNavigate()
	const[packageName, setPackageName] = useState("")
	const[policyNumber, setPolicyNumber] = useState("")
	const[premium, setPremium] = useState("")
	const[deductible, setDeductible] = useState("")
	const[benefits, setBenefits] = useState({})
	const[timePeriod, setTimePeriod] = useState("")

	useEffect(() => {
	  console.log(benefits)
	}, [])

	const setBenefitsFunc = (benefits) => {
		console.log(benefits)
		setBenefits(benefits)
	}

	const createPackage = () => {
		//Validations
		//Object.keys(benefits).length == 0 or all values in the object have "No" value then throw error
		//Api call to create a package
		navigate(-1)
	}
	

	return (
		<div className="container">
			<Card width="40%" height="inherit" style={{ margin: "40px 0" }}>
				<Heading text="Create a package" fontSize={24} />
                <Description text="Create a profile for yourself and have all your details and requirments at one place!" />
				<Spacer height={15} />
				<Textfield placeholder="Package Name" value={packageName} onChange={setPackageName} />
                <Spacer height={10} />
                <Textfield placeholder="Policy Number" value={policyNumber} onChange={setPolicyNumber} />
                <Spacer height={10} />
				<div className="profile_row">
                    <Textfield placeholder="Premium in $" value={premium} onChange={setPremium} />
                    <Spacer width={15} />
                    <Textfield placeholder="Deductible" value={deductible} onChange={setDeductible} />
                </div>
				<Spacer height={15} />
				<Description text={'What does the package cover?'} />
				<Spacer height={10} />
				<Multiselect options={['Medical', 'Dental', 'Vision']} onChange={setBenefitsFunc}/>
				<Textfield placeholder="Time in years" type={"number"} step={0.5} value={timePeriod} onChange={setTimePeriod} />
				<Spacer height={15} />
				<Button text={'Create'} onChange={createPackage}/>
			</Card>
		</div>
	)
}

export default CreateInsurancePackage
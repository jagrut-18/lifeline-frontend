import React from 'react'
import Package from './package'
import Spacer from '../../components/spacer'
import Description from '../../components/description/description'

// package_id: 1,
// plan_name: "Low budget package",
// premium: 100,
// policy_number: "asdAsdc33",
// deductible: 1000,
// includes_medical: "Yes",
// includes_dental: "No",
// includes_vision: "Yes",
// insurance_provider_id: 1,
// insurance_provider: "Suresh Gandhi",
// insurance_provider_contact: "7897897898",
// company_name: "Global Insurance Providers",
// company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
// time_period: "1.5",
// patient_count: "18"

function InsurancePackages(props) {
    console.log("recommendedPackage", props.recommendedPackage)
    console.log("insurancePackages", props.insurancePackages)
    return (
        <div className="section-1-wrapper">
            <div className="section-1 recommended-package-section">
                <Spacer height={10}/>
                {Object.keys(props.recommendedPackage).length != 0 && <Package insurancePackages={[props.recommendedPackage]} chooseInsurancePackage={props.chooseInsurancePackage} />}
            </div>
            <Description text={props.insurancePackages.length + " searches"}/>
            <Spacer height={10}/>
            <div className="section-1">
                <Package insurancePackages={props.insurancePackages} chooseInsurancePackage={props.chooseInsurancePackage} />
            </div>
        </div>
    )
}

export default InsurancePackages
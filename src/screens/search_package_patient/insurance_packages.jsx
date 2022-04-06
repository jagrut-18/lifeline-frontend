import React from 'react'
import Package from './package'
import Spacer from '../../components/spacer'

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
            {
                props.recommendedPackage != "" ?
                    <div>
                        <p>Recommended Package</p>
                        <div className="section-1-recommended-package-wraper">
                            <Package insurancePackages={props.recommendedPackage} chooseInsurancePackage={props.chooseInsurancePackage} />
                        </div>
                    </div>
                    :
                    null
            }
            <p>{props.insurancePackages.length} searches</p>
            <div className="section-1">
                <Package insurancePackages={props.insurancePackages} chooseInsurancePackage={props.chooseInsurancePackage} />
            </div>
        </div>
    )
}

export default InsurancePackages
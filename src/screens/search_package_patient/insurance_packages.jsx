import React from 'react'
import Heading from '../../components/heading/heading'
import Description from '../../components/description/description'
import PatientPackageDescription from './patient_package_description'
import BenefitsAllPackages from './benefits_all_packages'
import Spacer from '../../components/spacer'
import ShowHideButton from './show_hide_button'
import OutlineButton from '../../components/outline_button/outline_button'

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
    return (
        <div className="section-1">
            {
                props.insurancePackages.map((data, index) => (
                    <div key={data.package_id} className="section-box">
                        <div className="search_package_details_container">
                        <div className="row">
                            <div className="partition-1">
                                <Heading text={data.plan_name} style={{ fontSize: 16 }} />
                                <Description text={'Policy No:\xa0' + data.policy_number} style={{ fontSize: 14, color: '#757575' }} />
                            </div>
                            {
                                data.patient_count > 1 ?
                                    <div className="partition-2">
                                        <Description text={data.patient_count + ` patient${parseInt(data.patient_count) > 1 ? 's' : ''}`} style={{ color: '#FFC107' }} />
                                    </div>
                                    :
                                    null
                            }

                        </div>
                        <Spacer height={5} />
                        <div className="row row2">
                            <div className="partition-1">
                                <PatientPackageDescription text1={'Premium:\xa0'} text2={'$' + data.premium} />
                                <PatientPackageDescription text1={'Deductible:\xa0'} text2={'$' + data.deductible} />
                                <PatientPackageDescription text1={'Includes:\xa0'} text2={<BenefitsAllPackages medical={data.includes_medical} dental={data.includes_dental} vision={data.includes_vision} />} />
                                <PatientPackageDescription text1={'Time Period:\xa0'} text2={data.time_period + ' Years'} />
                            </div>
                            <OutlineButton text="Choose" onClick={() => props.chooseInsurancePackage(data)} />
                        </div>
                        </div>
                        <div className="insurance-packages-divider" />
                        <ShowHideButton insuranceProviderDetails={{
                            company_name: data.company_name, insurance_provider: data.insurance_provider,
                            insurance_provider_contact: data.insurance_provider_contact,
                            company_address: data.company_address
                        }} />

                    </div>
                ))
            }
        </div>
    )
}

export default InsurancePackages
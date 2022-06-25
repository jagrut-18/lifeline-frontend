import React, { useState, useEffect } from 'react'
import Heading from '../../components/heading/heading'
import Spacer from '../../components/spacer'
import Description from '../../components/description/description'
import PatientPackageDescription from './patient_package_description'
import BenefitsAllPackages from './benefits_all_packages'
import getDateString from '../../utilities/date_string'

function PatientPackage(props) {
    return (
        <div className="section-2">
            <Spacer height={10}/>
            <div className="section-box" style={{padding: 20}}>
                <Heading text={"Your Current Package"} style={{ fontSize: 20 }} />
                <Spacer height={5} />
                {
                    Object.keys(props.patientInsurancePackage).length != 0 ?
                        <div>

                            <Heading text={props.patientInsurancePackage.plan_name} style={{ fontSize: 16 }} />
                            <Description text={'Policy No:\xa0' + props.patientInsurancePackage.policy_number} style={{ fontSize: 14, color: '#757575' }} />
                            <Spacer height={5} />
                            <PatientPackageDescription text1={'Premium:\xa0'} text2={'$' + props.patientInsurancePackage.premium} />
                            <PatientPackageDescription text1={'Deductible:\xa0'} text2={'$' + props.patientInsurancePackage.deductible} />
                            <PatientPackageDescription text1={'Includes:\xa0'}
                                text2={<BenefitsAllPackages medical={props.patientInsurancePackage.includes_medical}
                                    dental={props.patientInsurancePackage.includes_dental} vision={props.patientInsurancePackage.includes_vision} />}
                            />
                            <PatientPackageDescription text1={'Time Period:\xa0'} text2={props.patientInsurancePackage.time_period + ' Years'} />
                            <PatientPackageDescription text1={'Start Date:\xa0'} text2={getDateString(props.patientInsurancePackage.start_date)} />
                            <PatientPackageDescription text1={'End Date:\xa0'} text2={getDateString(props.patientInsurancePackage.end_date)} />
                            <Spacer height={10} />
                            <div className="divider" />
                            <Spacer height={10} />
                            <Heading text={'Insurance Provider Details'} style={{ fontSize: 16 }} />
                            <Spacer height={5} />
                            <PatientPackageDescription text1={'Company:\xa0'} text2={props.patientInsurancePackage.company_name} />
                            <PatientPackageDescription text1={'Contact Person:\xa0'} text2={props.patientInsurancePackage.insurance_provider} />
                            <PatientPackageDescription text1={'Contact Number:\xa0'} text2={props.patientInsurancePackage.insurance_provider_contact} />
                            <PatientPackageDescription text1={'Company Address:\xa0'} text2={props.patientInsurancePackage.company_address} />
                        </div>
                        :
                        <Description text={'No pack assigned yet'} />
                }
            </div>
        </div>
    )
}

export default PatientPackage
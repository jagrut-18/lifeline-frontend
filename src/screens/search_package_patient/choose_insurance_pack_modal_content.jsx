import React from 'react'
import Close from '../../images/close.svg'
import Description from '../../components/description/description'
import PatientPackageDescription from './patient_package_description'
import Spacer from '../../components/spacer'
import Heading from '../../components/heading/heading'
import BenefitsAllPackages from './benefits_all_packages'
import Button from '../../components/button/button'

function ChooseInsurancePackModalContent(props) {
    return (
        <div>
            <div className="modal-section-1">
                <h3>Purchase Package</h3>
                <button onClick={() => props.closeInsuranceModal()}><img src={Close} alt="close" /></button>
            </div>
            <div className="main-modal-wrapper">
                <Heading text={'Upgradable Plan Details:'} style={{ fontSize: 16 }} />
                <Spacer height={5} />
                <PatientPackageDescription text1={'Plan Name:\xa0'} text2={props.modalData.plan_name} />
                <PatientPackageDescription text1={'Policy No:\xa0'} text2={props.modalData.policy_number} />
                <PatientPackageDescription text1={'Premium:\xa0'} text2={'$' + props.modalData.premium} />
                <PatientPackageDescription text1={'Deductible:\xa0'} text2={'$' + props.modalData.deductible} />
                <PatientPackageDescription text1={'Includes:\xa0'}
                    text2={<BenefitsAllPackages medical={props.modalData.includes_medical}
                        dental={props.modalData.includes_dental} vision={props.modalData.includes_vision} />}
                />
                <PatientPackageDescription text1={'Time Period:\xa0'} text2={props.modalData.time_period + ' Years'} />
                <PatientPackageDescription text1={'Start Date:\xa0'} text2={props.modalData.start_date} />
                <PatientPackageDescription text1={'End Date:\xa0'} text2={props.modalData.end_date} />
                <Spacer height={10} />
                <div className="insurance-packages-divider" />
                <Spacer height={10} />
                <Heading text={'Insurance Provider Details:'} style={{ fontSize: 16 }} />
                <Spacer height={5} />
                <PatientPackageDescription text1={'Company:\xa0'} text2={props.modalData.company_name} />
                <PatientPackageDescription text1={'Contact Person:\xa0'} text2={props.modalData.insurance_provider} />
                <PatientPackageDescription text1={'Contact Number:\xa0'} text2={props.modalData.insurance_provider_contact} />
                <PatientPackageDescription text1={'Company Address:\xa0'} text2={props.modalData.company_address} />
                <Spacer height={30} />
                <div className="insurance-packages-divider" />
                <Spacer height={10} />
                <Description text={"Total amount payable: " + '$' + props.modalData.premium} style={{ fontSize: 20, fontWeight: 700 }} />
                <Spacer height={10} />
                <div className="insurance-packages-divider" />
                <Spacer height={15} />
                <Button text={'Purchase Plan'} onClick={() => { props.makePayment(props.modalData.package_id, props.modalData.time_period) }} />
            </div>
        </div>
    )
}

export default ChooseInsurancePackModalContent
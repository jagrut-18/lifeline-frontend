import React, { useState } from 'react'
import PatientPackageDescription from './patient_package_description'
import Spacer from '../../components/spacer'

function ShowHideButton(props) {
    const [showHideButtonTextFlag, setShowHideButtonTextFlag] = useState(0)
    const [showHideButtonText, setShowHideButtonText] = useState("Show Insurance Provider Details")

    const changeButtonText = () => {
        if (showHideButtonTextFlag == 0) {
            setShowHideButtonTextFlag(1)
            setShowHideButtonText("Hide Insurance Provider Details")
        } else if (showHideButtonTextFlag == 1) {
            setShowHideButtonTextFlag(0)
            setShowHideButtonText("Show Insurance Provider Details")
        }
    }

    return (
        <div>
            {
                showHideButtonTextFlag == 1 ?
                    <div className="insurance-provider-details-wrapper">
                        <Spacer height={15}/>
                        <div className="search_package_company_details">
                            <PatientPackageDescription text1={'Company:\xa0'} text2={props.insuranceProviderDetails.company_name} />
                            <PatientPackageDescription text1={'Contact Person:\xa0'} text2={props.insuranceProviderDetails.insurance_provider} />
                            <PatientPackageDescription text1={'Contact Number:\xa0'} text2={props.insuranceProviderDetails.insurance_provider_contact} />
                            <PatientPackageDescription text1={'Company Address:\xa0'} text2={props.insuranceProviderDetails.company_address} />
                        </div>
                        <Spacer height={15}/>
                        <div className="insurance-packages-divider" />
                    </div>
                    :
                    null
            }
            <button className="show-hide-button" onClick={changeButtonText}>{showHideButtonText}</button>
        </div>
    )
}

export default ShowHideButton
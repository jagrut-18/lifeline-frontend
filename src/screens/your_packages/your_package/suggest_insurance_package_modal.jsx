import React, { useEffect, useState } from 'react'
import Close from '../../../images/close.svg'
import Description from '../../../components/description/description'
import ButtonSimple from '../../../components/buttonsimple/buttonsimple'
import Spacer from '../../../components/spacer'
import Doctor from '../../../images/doctor.png';
import Dropdown from './dropdown'

function SuggestInsurancePackageModal(props) {
    console.log(props.patientsData)

    const [selectedPackage, setSelectedPackage] = useState("")

    const suggestPackage = (patientId) => {
        if (selectedPackage == "") {
            alert("Please select a plan")
        } else {
            let packageId = selectedPackage.split(" - ")[1]

            //Api call with  packageId and patientId
            console.log(patientId)
            // props.suggestPackage(parseInt(packageId), props.patient_id)
        }
    }


    return (
        <div className="suggest-ins-modal">
            <div className="suggest-ins-modal-section-1">
                <h3>Suggest Packages</h3>
                <button onClick={() => props.changeSuggestionModalFlag()}><img src={Close} alt="close" /></button>
            </div>
            <div className="suggest-insurance-packages-divider" />
            {
                props.patientsData.map((data, index) => (
                    <div key={data.patient_id}>
                        <Spacer height={10} />
                        <div className="partition-1">
                            <div className="profile-description">
                                <div className="profile-description-wrapper">
                                    <img src={Doctor} alt="avatar" className="profile-img" />
                                    <Description text={data.patient_name} style={{ fontSize: 16, fontWeight: 700 }} />
                                </div>
                            </div>
                            <div className="dropdown-wrapper">
                                <Dropdown allPackages={data.all_packages} setSelectedPackage={setSelectedPackage} />
                            </div>
                            <ButtonSimple text={'Suggest'} style={{ justifyContent: 'center', fontWeight: 500, width: '20%' }} onClick={() => suggestPackage(data.patient_id)} />
                        </div>
                        <div className="general-description-wrapper">
                            <Description text={"Amount spent:\xa0\ "} style={{fontSize: 15}}/>
                            <Description style={{ color: '#000000', fontSize: 15 }} text={"$" + data.amount_spent} />
                        </div>
                        <div className="general-description-wrapper">
                            <Description text={"Packages opted:\xa0\ "} style={{fontSize: 15}}/>
                            <Description style={{ color: '#000000', fontSize: 15 }} text={data.packages_opted} />
                        </div>
                        <Spacer height={10} />
                        <div className="suggest-insurance-packages-divider" />
                    </div>
                ))
            }
        </div>
    )
}

export default SuggestInsurancePackageModal
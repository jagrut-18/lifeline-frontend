import React, { useEffect, useState } from 'react'
import Close from '../../../images/close.svg'
import Description from '../../../components/description/description'
import ButtonSimple from '../../../components/buttonsimple/buttonsimple'
import Spacer from '../../../components/spacer'
import Doctor from '../../../images/doctor.png';
import Dropdown from './dropdown'
import { API } from '../../../api/api';
import DropdownSelect from '../../../components/dropdown/dropdown'

function SuggestInsurancePackageModal(props) {

    const [selectedPackage, setSelectedPackage] = useState("")

    const suggestPackage = async (patientId) => {
        if (selectedPackage == "") {
            alert("Please select a plan")
        } else {
            let packageId = selectedPackage.split(" - ")[1]
            //Api call with  packageId and patientId
            console.log(patientId)
            // props.suggestPackage(parseInt(packageId), props.patient_id)

            const formData = new FormData();
            formData.append('patient_id', patientId);
            formData.append('package_id', packageId);
            const response = await API.suggestPackage(formData);
            console.log(response.data.data)

            if (response.success) {
                alert("Package suggested!")
            }
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
                                    <img src={data.patient_url == null ? Doctor : data.patient_url} alt="avatar" className="your_package_profile_img" />
                                    <Description text={data.patient_name} style={{ fontSize: 16, fontWeight: 700 }} />
                                </div>
                            </div>
                            <div className="dropdown-wrapper">
                                <Dropdown allPackages={data.all_packages} setSelectedPackage={setSelectedPackage} default={props.defaultSelectedValue} />
                            </div>
                            <ButtonSimple text={'Suggest'} style={{ justifyContent: 'center', fontWeight: 500, width: '20%' }} onClick={() => suggestPackage(data.patient_id)} />
                        </div>
                        {/* <div className="general-description-wrapper">
                            <Description text={"Amount spent:\xa0\ "} style={{fontSize: 15}}/>
                            <Description style={{ color: '#000000', fontSize: 15 }} text={"$" + data.amount_spent} />
                        </div> */}
                        <div className="general-description-wrapper">
                            <Description text={"Packages opted:\xa0\ "} style={{ fontSize: 15 }} />
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
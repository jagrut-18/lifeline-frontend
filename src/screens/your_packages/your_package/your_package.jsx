import { useState } from 'react';
import { API } from '../../../api/api';
import Description from '../../../components/description/description';
import Heading from '../../../components/heading/heading';
import OutlineButton from '../../../components/outline_button/outline_button';
import Spacer from '../../../components/spacer';
import Modal from 'react-modal';
import Loader from '../../../components/loader/loader';
import SuggestInsurancePackModalContent from './suggest_insurance_package_modal';
import './your_package.css';

export default function YourPackage(props) {
    const { package_id, plan_name, patient_count, policy_number, premium, deductible, includes_medical, includes_dental, includes_vision, time_period, is_disabled } = props.data;
    const [isDisabled, setIsDisabled] = useState(is_disabled == 1);
    const [suggestionModalFlag, setSuggestionModalFlag] = useState(false)
    const [modalData, setModalData] = useState(false);
    const [loading, setLoading] = useState(false);

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxHeight: '80%',
            minHeight: '50%',
            backgroundColor: 'var(--background-secondary)'
        }
    }

    const includes = {
        Medical: includes_medical,
        Dental: includes_dental,
        Vision: includes_vision
    };

    async function togglePackage() {
        const formData = new FormData();
        formData.append('package_id', package_id);
        const response = await API.togglePackage(formData);
        console.log({ response })

        if (response.success) {
            setIsDisabled(!isDisabled);
        }
    }

    const changeSuggestionModalFlag = async () => {
        if (suggestionModalFlag) {
            setSuggestionModalFlag(false)
        } else {
            setSuggestionModalFlag(true)
            setLoading(true)
            //send package_id and user_id from local storage
            const formData = new FormData();
            formData.append('insurance_provider_id', localStorage.getItem("user_id"));
            const response = await API.getEnrolledPatients(formData);
            console.log(response.data.data)

            if (response.success) {
                setIsDisabled(!isDisabled)
                setModalData(response.data.data)
                setLoading(false)
            }

        }
    }

    const suggestPackage = () => {


    }

    return (
        <div className="your_package_container">
            <Modal
                isOpen={suggestionModalFlag}
                onRequestClose={changeSuggestionModalFlag}
                style={customModalStyles}
            >
                {
                    loading ?
                        <Loader />
                        :
                        <SuggestInsurancePackModalContent patientsData={modalData} changeSuggestionModalFlag={changeSuggestionModalFlag} defaultSelectedValue={plan_name} />

                }
            </Modal>
            <div className="package_name_row insurance-card-padding">
                <Heading text={plan_name} style={{ fontSize: 18 }} />
                <div className="patients_count">{patient_count} Patient{parseInt(patient_count) != 1 && <>s</>}</div>
            </div>
            <div className="insurance-card-padding">
                <Description text={`Policy No.: ${policy_number}`} />
                <Spacer height={10} />
            </div>
            <div className="package_details_container">
                <div>
                    <div className="package_details">
                        <div className="package_detail_title">
                            Premium:
                        </div>
                        <div className="package_detail_value">
                            ${premium}
                        </div>
                    </div>
                    <div className="package_details">
                        <div className="package_detail_title">
                            Deductible:
                        </div>
                        <div className="package_detail_value">
                            ${deductible}
                        </div>
                    </div>
                    <div className="package_details">
                        <div className="package_detail_title">
                            Includes:
                        </div>
                        <div className="package_detail_value">
                            {
                                Object.keys(includes).filter((element) => includes[element] == "Yes").join(', ')
                            }
                        </div>
                    </div>
                    <div className="package_details">
                        <div className="package_detail_title">
                            Time Period:
                        </div>
                        <div className="package_detail_value">
                            {time_period} Years
                        </div>
                    </div>
                </div>
                <OutlineButton text={isDisabled ? "Enable" : "Disable"} onClick={() => togglePackage()} />
            </div>
            <Spacer height={15} />
            <div className="insurance_packages_divider" />
            <button className="show_hide_button" onClick={() => changeSuggestionModalFlag()}>Suggest this package</button>
        </div>
    );
}
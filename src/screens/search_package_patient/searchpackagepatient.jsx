import React, { useState, useEffect } from 'react'
import './searchpackagepatient.css'
import SearchPatientFilter from './search_patient_filter'
import Spacer from '../../components/spacer'
import PatientPackage from './patient_package'
import InsurancePackages from './insurance_packages'
import Loader from '../../components/loader/loader'
import Modal from 'react-modal';
import ChooseInsurancePackModalContent from './choose_insurance_pack_modal_content'

function SearchPackagePatient() {
    const [totalSearches, setTotalSearches] = useState(0)
    const [patientInsurancePackage, setPatientInsurancePackage] = useState({})
    const [insurancePackages, setInsurancePackages] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState(false);

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxHeight: '80%'
        },
    }

    useEffect(() => {
        //Api call to get my insurace package
        let respose = {
            response_code: "200",
            response_message: "Success",
            data: {
                my_package: {},
                all_packages: [
                    {
                        package_id: 1,
                        plan_name: "Low budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: "18"
                    },
                    {
                        package_id: 2,
                        plan_name: "Middle budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: ""
                    },
                    {
                        package_id: 3,
                        plan_name: "High budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: ""
                    }
                ]
            }
        }

        setPatientInsurancePackage(respose.data.my_package)
        setInsurancePackages(respose.data.all_packages)
        setTotalSearches(respose.data.all_packages.length)

        setLoading(false);
    }, [])


    const searchInsurances = (packageTypeVal, insuranceProvider, premiumRangeStart, premiumRangeEnd) => {
        //call API to get Insurance Details
        console.log(packageTypeVal, insuranceProvider, premiumRangeStart, premiumRangeEnd)

        let respose = {
            response_code: "200",
            response_message: "Success",
            data: {
                packages: [
                    {
                        package_id: 1,
                        plan_name: "Middle budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: "18"
                    },
                    {
                        package_id: 2,
                        plan_name: "High budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: ""
                    }
                ]
            }
        }

        setInsurancePackages(respose.data.packages)
        console.log(insurancePackages)
    }

    const chooseInsurancePackage = (data) => {
        console.log({ data })
        setModalData(data)
        setModalStatus(true)
        console.log('In chooseInsurancePackage')
    }

    const closeInsuranceModal = () => {
        setModalStatus(false)
    }

    const makePayment = () => {
        closeInsuranceModal(false)
        setLoading(true)
        //Api call to get my insurace package
        let respose = {
            response_code: "200",
            response_message: "Success",
            data: {
                my_package: {
                    package_id: 1,
                    plan_name: "Low budget package",
                    premium: 100,
                    policy_number: "asdAsdc33",
                    deductible: 1000,
                    includes_medical: "Yes",
                    includes_dental: "No",
                    includes_vision: "Yes",
                    insurance_provider_id: 1,
                    insurance_provider: "Suresh Gandhi",
                    insurance_provider_contact: "7897897898",
                    company_name: "Global Insurance Providers",
                    company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                    time_period: "1.5",
                    patient_count: "18"
                },
                all_packages: [
                    {
                        package_id: 2,
                        plan_name: "Middle budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "Global Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: "18"
                    },
                    {
                        package_id: 2,
                        plan_name: "High budget package",
                        premium: 100,
                        policy_number: "asdAsdc33",
                        deductible: 1000,
                        includes_medical: "Yes",
                        includes_dental: "No",
                        includes_vision: "Yes",
                        insurance_provider_id: 1,
                        insurance_provider: "Suresh Gandhi",
                        insurance_provider_contact: "7897897898",
                        company_name: "International Insurance Providers",
                        company_address: "3209E 10th Street, Apt-R19, Indiana, Bloommington",
                        time_period: "1.5",
                        patient_count: ""
                    }
                ]
            }
        }

        setPatientInsurancePackage(respose.data.my_package)
        setInsurancePackages(respose.data.all_packages)
        setTotalSearches(respose.data.all_packages.length)

        setLoading(false);
        console.log('In makePayment')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container-home">
            <Modal
                isOpen={modalStatus}
                onRequestClose={closeInsuranceModal}
                style={customModalStyles}

            >
                <ChooseInsurancePackModalContent closeInsuranceModal={closeInsuranceModal} modalData={modalData} makePayment={makePayment} />
            </Modal>
            <div className="main-div">
                <SearchPatientFilter searchInsurances={searchInsurances} />
                <p>{totalSearches} searches</p>
                <Spacer height={5} />
                <div className="main-data-wrapper">
                    {/* Section 1 start */}
                    <InsurancePackages insurancePackages={insurancePackages} chooseInsurancePackage={chooseInsurancePackage} />
                    {/* Section 1 end */}
                    {/* section 2 start */}
                    <PatientPackage patientInsurancePackage={patientInsurancePackage} />
                    {/* section 2 end */}
                </div>
            </div>
        </div>
    )
}

export default SearchPackagePatient
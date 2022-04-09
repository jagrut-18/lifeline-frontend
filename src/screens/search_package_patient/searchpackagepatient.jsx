import React, { useState, useEffect } from 'react'
import './searchpackagepatient.css'
import SearchPatientFilter from './search_patient_filter'
import Spacer from '../../components/spacer'
import PatientPackage from './patient_package'
import InsurancePackages from './insurance_packages'
import Description from '../../components/description/description'
import Loader from '../../components/loader/loader'
import Modal from 'react-modal';
import ChooseInsurancePackModalContent from './choose_insurance_pack_modal_content'
import { API } from '../../api/api';
import changeDateFormat from '../../utilities/change_date_format'

function SearchPackagePatient() {
    const [totalSearches, setTotalSearches] = useState(0)
    const [patientInsurancePackage, setPatientInsurancePackage] = useState({})
    const [insurancePackages, setInsurancePackages] = useState([])
    const [loading, setLoading] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState(false);
    const [recommendedPackage, setRecommendedPackage] = useState([])

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
        fetchInsuranceDetails(-1, -1, "", "")
    }, [])

    const fetchInsuranceDetails = async (premiumStart, premiumEnd, insuranceProvider, packageType) => {
        setLoading(true);

        let userId = localStorage.getItem("user_id")
        console.log({ userId })
        console.log('s', premiumStart === '' ? -1 : premiumStart)
        console.log('e', premiumEnd === '' ? -1 : premiumEnd)
        console.log({ packageType })
        console.log({ insuranceProvider })

        const formData = new FormData();
        formData.append("premium_start", premiumStart === '' ? -1 : premiumStart);
        formData.append("premium_end", premiumEnd === '' ? -1 : premiumEnd);
        formData.append("insurance_provider", insuranceProvider);
        formData.append("package_type", packageType);
        formData.append("user_id", userId);

        const response = await API.filterPackages(formData);
        console.log({ response })

        if (response.success) {
            let recommendedPackage = [{
                company_address: "5000 E, 16th Street",
                company_name: "United Health Care",
                deductible: 300,
                includes_dental: "Yes",
                includes_medical: "No",
                includes_vision: "No",
                insurance_provider: "Kella Johnson",
                insurance_provider_contact: "8786546589",
                insurance_provider_id: 58,
                package_id: 20,
                patient_count: "0",
                plan_name: "UHC1",
                policy_number: "3a9e5136-9b5c-4e6a-a0a9-c3655efc6af2",
                premium: 90,
                time_period: 1
            }]

            // console.log(response.data)
            // alert("Data fetched");
            setRecommendedPackage(recommendedPackage)
            setPatientInsurancePackage(response.data.data.my_package)
            setInsurancePackages(response.data.data.filtered_packages.filter((filtered) => filtered.package_id != response.data.data.my_package.package_id))
            setTotalSearches(response.data.data.filtered_packages.length)
            setLoading(false);
        }
        else {
            alert("something went wrong!");
        }
    }


    const searchInsurances = (premiumStart, premiumEnd, insuranceProvider, packageType) => {
        //call API to get Insurance Details
        fetchInsuranceDetails(premiumStart, premiumEnd, insuranceProvider, packageType)
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

    const makePayment = async (packageId, timePeriod) => {
        closeInsuranceModal()
        setLoading(true)

        let currentDate = new Date();
        let finalCurrentDate = changeDateFormat(currentDate)
        currentDate.setMonth(currentDate.getMonth() + 12 * parseFloat(timePeriod))
        let finalExpiryDate = changeDateFormat(currentDate)
        console.log({ packageId })
        const formData = new FormData();
        formData.append("package_id", parseInt(packageId));
        formData.append("payment_receipt", "dummy receipt"); //change later on
        formData.append("purchase_date", finalCurrentDate);
        formData.append("expiry_date", finalExpiryDate);
        formData.append("user_id", parseInt(localStorage.getItem("user_id")));

        const response = await API.makeInsurancePackagePayment(formData);
        console.log(response.success)
        if (response.success) {
            alert("payment successful")
            fetchInsuranceDetails(-1, -1, "", "")
        }
        else {
            alert("something went wrong!");
        }

        setLoading(false);
        console.log('In makePayment')
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
                <Spacer height={5} />
                {
                    loading ?
                        <Loader />
                        :
                        <div>
                            {
                                recommendedPackage != "" ?
                                    <Description text={"Recommended Package"} />
                                    :
                                    null
                            }
                            <div className="main-data-wrapper">
                                {/* Section 1 start */}
                                <InsurancePackages recommendedPackage={recommendedPackage} insurancePackages={insurancePackages} chooseInsurancePackage={chooseInsurancePackage} />
                                {/* Section 1 end */}
                                {/* section 2 start */}
                                <PatientPackage patientInsurancePackage={patientInsurancePackage} />
                                {/* section 2 end */}
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchPackagePatient
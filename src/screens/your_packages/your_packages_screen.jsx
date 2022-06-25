import './your_packages_screen.css';
import Heading from '../../components/heading/heading';
import YourPackage from './your_package/your_package';
import { API } from '../../api/api';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import OutlineButton from '../../components/outline_button/outline_button';
import { useNavigate } from 'react-router-dom';
import routes from '../../routing/routes';

export default function YourPackagesScreen() {
    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([]);
    const [patientCount, setPatientCount] = useState(0);
    const [disabledPackageCount, setDisabledPackageCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchYourPackages();
    }, []);

    async function fetchYourPackages() {
        setLoading(true);
        const formData = new FormData();
        formData.append("user_id", parseInt(localStorage.getItem("user_id")))
        const response = await API.fetchInsurancePackages(formData);
        console.log(response);
        if (response.success) {
            setPackages(response.data.packages);
            setPatientCount(packages.reduce((prev, curr) => prev + parseInt(curr.patient_count), 0))
            setDisabledPackageCount(packages.reduce((prev, curr) => prev + curr.is_disabled, 0))
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div className="heading_container">
                <Heading text="Your Packages" />
                <OutlineButton text="Create Package" onClick={() => navigate(routes.create_insurance_package)} />
            </div>
            <div className="your_packages_container">
                {
                    packages.length > 0
                        ?
                        <>
                            <div className="your_packages_left">
                                {
                                    packages.map((data, index) => <YourPackage key={index} data={data} setLoading={setLoading} />)
                                }
                            </div>
                            <div className="your_packages_right">
                                <div className="statistics_card">
                                    <Heading text="Statistics" style={{ fontSize: 18 }} />
                                    <div key={0} className="package_details">
                                        <div className="package_detail_title">Total Packages:</div>
                                        <div className="package_detail_value">{packages.length}</div>
                                    </div>
                                    <div key={1} className="package_details">
                                        <div className="package_detail_title">Total Patients:</div>
                                        <div className="package_detail_value">{patientCount}</div>
                                    </div>
                                    <div key={2} className="package_details">
                                        <div className="package_detail_title">Disabled Packages:</div>
                                        <div className="package_detail_value">{disabledPackageCount}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <>No packages created yet.</>
                }
            </div>
        </div>
    );
}
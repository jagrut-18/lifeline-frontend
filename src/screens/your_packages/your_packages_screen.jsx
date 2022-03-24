import './your_packages_screen.css';
import Heading from '../../components/heading/heading';
import YourPackage from './your_package/your_package';
import { API } from '../../api/api';
import { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';

export default function YourPackagesScreen() {
    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetchYourPackages();
    }, []);

    async function fetchYourPackages() {
        setLoading(true);
        const formData = new FormData();
        formData.append("user_id", 37)
        const response = await API.fetchInsurancePackages(formData);
        console.log(response);
        if (response.success) {
            setPackages(response.data.packages);
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
        <>
            <div className="heading_container">
                <Heading text="Your Packages" />
            </div>
            <div className="your_packages_container">
                {
                    packages
                        ?
                        <>
                            <div className="your_packages_left">
                                {
                                    packages.map((data) => <YourPackage data={data} />)
                                }
                            </div>
                            <div className="your_packages_right">
                                <div className="statistics_card">
                                    <Heading text="Statistics" style={{ fontSize: 18 }} />
                                    <div key={0} className="package_details">
                                        <div className="package_detail_title">Total Packages:</div>
                                        <div className="package_detail_value">20</div>
                                    </div>
                                    <div key={1} className="package_details">
                                        <div className="package_detail_title">Total Patients:</div>
                                        <div className="package_detail_value">50</div>
                                    </div>
                                    <div key={2} className="package_details">
                                        <div className="package_detail_title">Disabled Packages:</div>
                                        <div className="package_detail_value">1</div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <>No packages created yet.</>
                }
            </div>
        </>
    );
}
import './your_packages_screen.css';
import Heading from '../../components/heading/heading';
import YourPackage from './your_package/your_package';

export default function YourPackagesScreen() {
    return (
        <>
        <div className="heading_container">
                <Heading text="Your Packages" />
            </div>
        <div className="your_packages_container">
            
            <div className="your_packages_left">
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
                <YourPackage />
            </div>
            <div className="your_packages_right">
                <div className="statistics_card">
                    <Heading text="Statistics" style={{fontSize: 18}}/>
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
        </div>
        </>
    );
}
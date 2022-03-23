import Description from '../../../components/description/description';
import Heading from '../../../components/heading/heading';
import OutlineButton from '../../../components/outline_button/outline_button';
import Spacer from '../../../components/spacer';
import './your_package.css';

export default function YourPackage(props) {
    const packageDetails = {
        'Premium': '$200',
        'Deductible': '$500',
        'Includes': 'Medical, Dental',
        'Time Period': '2 Years',
    };
    return (
        <div className="your_package_container">
            <div className="package_name_row">
                <Heading text={'Package Name'} style={{ fontSize: 18 }} />
                <div className="patients_count">18 Patients</div>
            </div>
            <Description text="Policy No.: 453NG230MFSASKFV" />
            <Spacer height={10} />
            <div className="package_details_container">
                <div>
                    {
                        Object.entries(packageDetails).map((value, index) => {
                            return <div key={index} className="package_details">
                                <div className="package_detail_title">
                                    {value[0]}:
                                </div>
                                <div className="package_detail_value">
                                    {value[1]}
                                </div>
                            </div>
                        })
                    }
                </div>
                <OutlineButton text="Enable" />
            </div>
        </div>
    );
}
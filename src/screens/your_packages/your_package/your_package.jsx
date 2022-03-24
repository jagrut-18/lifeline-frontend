import Description from '../../../components/description/description';
import Heading from '../../../components/heading/heading';
import OutlineButton from '../../../components/outline_button/outline_button';
import Spacer from '../../../components/spacer';
import './your_package.css';

export default function YourPackage(props) {
    const {plan_name, patient_count, policy_number, premium, deductible, includes_medical, includes_dental, includes_vision, time_period} = props.data;
    const includes = {
        Medical: includes_medical, 
        Dental: includes_dental, 
        Vision: includes_vision
    };
    return (
        <div className="your_package_container">
            <div className="package_name_row">
                <Heading text={plan_name} style={{ fontSize: 18 }} />
                <div className="patients_count">{patient_count} Patients</div>
            </div>
            <Description text={`Policy No.: ${policy_number}`} />
            <Spacer height={10} />
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
                                    {Object.keys(includes).map((element, index) => <>{includes[element] == "Yes" && element},</> )}
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
                <OutlineButton text="Enable" />
            </div>
        </div>
    );
}
import './doctor.css';
import Heading from '../../../components/heading/heading';
import Description from '../../../components/description/description';
import Doctor from '../../../images/doctor.png';
import Spacer from '../../../components/spacer';
import DocumentComponent from '../../../components/document/document';

export default function DoctorAppointmentView(props) {
    const data = [
        {
            name: "Insurance Provider",
            value: "Anthem"
        },
        {
            name: "Policy Number",
            value: "239582JS8348NS3"
        },
        {
            name: "Age",
            value: "22 Years"
        },
        {
            name: "Gender",
            value: "Male"
        },
        {
            name: "Height",
            value: "146 cm"
        },
        {
            name: "Weight",
            value: "140 lb"
        },
        {
            name: "Blood Group",
            value: "B+"
        },
        {
            name: "Smoking Preference",
            value: "Yes"
        },
        {
            name: "Drinking Preference",
            value: "Yes"
        },
    ]
    return (
        <div>
            <Heading text="Appointment: Feb 26th, 2020 - 10:30 AM to 11:00 AM" />
            <Spacer height={10}/>
            <div className="app_details_wrapper">
            <div className="app_details">
                <Description text={`Comments: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`} style={{fontSize: 16, fontWeight: "bold"}}/>
                <Spacer height={10}/>
                <div className="patient_details_container">
                    <div className="patient_avatar">
                        <img src={Doctor} alt="Patient" className="patient_img" />
                        <Heading text="John Doe" style={{fontSize: 16}} />
                    </div>
                    {data.map((value) => {
                        return (
                            <div className="patient_details">
                        <div className="patient_detail_title">
                            {value.name}:
                        </div>
                        <div className="patient_detail_value">
                            {value.value}
                        </div>
                    </div>
                        );
                    })}
                </div>
                <Spacer height={10}/>
                <Heading text="Patient Details" />
                <Spacer height={5}/>
                <div className="app_documents_container">
                    <DocumentComponent documentName="Covid Report" />
                </div>
            </div>
            <div className="chat_container"></div>
            </div>
        </div>
    );
}
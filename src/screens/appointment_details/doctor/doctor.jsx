import './doctor.css';
import Heading from '../../../components/heading/heading';
import Description from '../../../components/description/description';
import Doctor from '../../../images/doctor.png';
import Spacer from '../../../components/spacer';
import DocumentComponent from '../../../components/document/document';
import { useEffect, useState } from 'react';
import { API } from '../../../api/api';
import getDateString from '../../../utilities/date_string';
import { useParams } from 'react-router-dom';
import Chat from '../../../components/chat/chat';

export default function DoctorAppointmentView(props) {
    const [details, setDetails] = useState();
    const [patientDetails, setPatientDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const { appointment_id } = useParams();
    const patNames = ['Insurance Provider', 'Policy No.', 'Age', 'Gender', 'Height', 'Weight', 'Blood Group', 'Smoking Preferences', 'Drinking Preferences'];

    useEffect(() => {
        getDoctorAppointmentDetails();
    }, []);

    async function getDoctorAppointmentDetails() {
        setLoading(true);
        const formData = new FormData();
        formData.append("appointment_id", appointment_id);
        const response = await API.getDoctorAppointmentDetails(formData);
        if (response.success) {
            const data = response.data;
            console.log(data);
            setDetails(data);
            setPatientDetails([
                data.insurance_Provider,
                data.policy_no,
                data.age,
                data.gender,
                data.height,
                data.weight,
                data.blood_group,
                data.smoking_preference,
                data.drinking_preference,
            ]);
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }


    if (loading) {
        return <div>Loading .....</div>
    }

    return (
        <div>
            <Heading text={`Appointment: ${getDateString(details.date)} ${details.time}`} />
            <Spacer height={10}/>
            <div className="app_details_wrapper">
            <div className="app_details">
                {details.comments && <Description text={`Comments: ${details.comments}`} style={{fontSize: 16, fontWeight: "bold"}}/> }
                <div className="patient_details_container">
                    <div className="patient_avatar">
                        <img src={Doctor} alt="Patient" className="patient_img" />
                        <Heading text={details.patient_name} style={{fontSize: 16}} />
                    </div>
                    {
                        patientDetails.map((value, index) => {
                            return <div key={index} className="patient_details">
                            <div className="patient_detail_title">
                                {patNames[index]}:
                            </div>
                            <div className="patient_detail_value">
                                {value}
                            </div>
                        </div>
                        })
                    }
                </div>
                <Spacer height={10}/>
                <Heading text="Patient Details" />
                <Spacer height={5}/>
                <div className="app_documents_container">
                    <DocumentComponent documentUrl={details.document_url} />
                </div>
            </div>
            <div className="chat_wrapper">

                <Chat receiverDetails={{id: details.patient_id.toString(), name: details.patient_name}} />
            </div>
            </div>
        </div>
    );
}
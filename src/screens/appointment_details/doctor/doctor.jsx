import './doctor.css';
import Heading from '../../../components/heading/heading';
import Description from '../../../components/description/description';
import Doctor from '../../../images/doctor.png';
import Spacer from '../../../components/spacer';
import Button from '../../../components/button/button';
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
    const [appointmentDoneFlag, setAppointmentDoneFlag] = useState();
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
            setAppointmentDoneFlag(data.appointment_done_flag)
            setPatientDetails([
                data.insurance_Provider,
                data.policy_no,
                data.age,
                data.gender,
                data.height,
                data.weight,
                data.blood_group,
                data.smoking_preference,
                data.drinking_preference
            ]);
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }

    const markAppointmentDone = async () => {
        console.log("In markAppointmentDone")
        const formData = new FormData();
        formData.append("appointment_id", appointment_id);
        const response = await API.updateAppointmentDoneFlag(formData);
        if (response.success) {
            getDoctorAppointmentDetails()
            console.log(appointmentDoneFlag)
        }
    }


    if (loading) {
        return <div>Loading .....</div>
    }

    return (
        <div>
            <Heading text={`Appointment: ${getDateString(details.date)} ${details.time}`} />
            <Spacer height={20} />
            <div className="app_details_wrapper">
                <div className="app_details">
                    {details.comments && <Description text={`Comments: ${details.comments}`} style={{ fontSize: 16, fontWeight: "bold" }} />}
                    <Spacer height={10} />
                    <div className="patient_details_container">
                        <div className="patient_avatar">
                            <img src={Doctor} alt="Patient" className="patient_img" />
                            <Heading text={details.patient_name} style={{ fontSize: 16 }} />
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
                    <Spacer height={10} />
                    {details.document_url && <Heading text="Patient Details" />}
                    <Spacer height={5} />
                    <div className="app_documents_container">
                        {details.document_url && <DocumentComponent documentUrl={details.document_url} />}
                    </div>
                    <Spacer height={5} />
                    {
                        appointmentDoneFlag == 0 ?
                            <Button text={"Mark Done"} onClick={markAppointmentDone} />
                            :
                            null

                    }
                </div>
                <div className="chat_wrapper">
                    <Chat receiverDetails={{ id: details.patient_id.toString(), name: details.patient_name }} />
                </div>
            </div>
        </div>
    );
}
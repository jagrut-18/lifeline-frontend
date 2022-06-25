import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './patient.css';
import DocumentComponent from '../../../components/document/document'
import Heading from '../../../components/heading/heading';
import Description from '../../../components/description/description';
import Doctor from '../../../images/doctor.png';
import Spacer from '../../../components/spacer';
import Star from '../../../images/star.svg'
import AddBox from '../../../images/add_box.svg'
import HighlightedContent from '../../../components/highlighted_content/highlighted_content';
import { API } from '../../../api/api';
import getDateString from '../../../utilities/date_string';
import Loader from '../../../components/loader/loader'
import Chat from '../../../components/chat/chat';
import ReviewsRatingsModal from './reviews_ratings_modal'

// import AWS from 'aws-sdk'
var AWS = require('aws-sdk/global');

const S3_BUCKET = 'lifeline-se';
const REGION = 'us-east-1';

var AWS = require('aws-sdk/dist/aws-sdk-react-native');

AWS.config.update({
    accessKeyId: 'AKIAXYHGI3AG67EAWOHP',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export default function PatientAppointmentView(props) {
    const [documentUrl, setDocumentUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [doctorDetails, setDoctorDetails] = useState({});
    const [userId, setUserId] = useState(localStorage.getItem('user_id'))
    const { appointment_id } = useParams();
    const [loading, setLoading] = useState(true)
    const [reviewsRatingsModalFlag, setReviewsRatingsModalFlag] = useState(0)
    const [appointmentDoneFlag, setAppointmentDoneFlag] = useState(0)

    const uploadFile = async () => {
        // openFileSelector()
        document.getElementById("select-file").click();
    }

    useEffect(async () => {
        setLoading(true)

        const formData = new FormData();
        formData.append("appointment_id", appointment_id);
        const response = await API.getPatientAppointmentDetails(formData);

        if (response.success) {
            const data = response.data;

            let date = new Date(data.date)
            date.setHours(date.getHours() + (date.getTimezoneOffset() / 60));


            console.log("res: ", data.date)
            // setDetails(data);

            //open modal only if whether_reviews_ratings_given_flag is set to 1
            setReviewsRatingsModalFlag(data.whether_reviews_ratings_given_flag)

            setDoctorDetails({
                time: data.time,
                date: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`,
                doctorId: data.doctor_id,
                doctorName: data.doctor_name,
                specialization: data.specialization,
                hospitalName: data.hospital_name,
                hospitalAddress: data.hospital_address,
                providesCovidCare: data.provides_covid_care,
                rating: "", //yet to get from the api
                comments: data.comments
            });

            setAppointmentDoneFlag(data.appointment_done_flag)

            setDocumentUrl(data.document_url)
        } else {
            alert(response.error);
        }
        setLoading(false);
    }, [])


    const uploadToS3 = () => {

        if (document.getElementById("select-file").files[0]) {
            setDocumentUrl(userId + document.getElementById("select-file").files[0].name)

            const params = {
                ACL: 'public-read',
                Body: document.getElementById("select-file").files[0],
                Bucket: S3_BUCKET,
                Key: userId + document.getElementById("select-file").files[0].name,
            };

            myBucket.putObject(params)
                .on('httpUploadProgress', (evt) => {
                    if (Math.round((evt.loaded / evt.total) * 100) == 100) {
                        setProgress(0)
                        //API call to update the Img URL
                        return
                    }
                    setProgress(Math.round((evt.loaded / evt.total) * 100))
                })
                .send((err) => {
                    if (err) console.log(err)
                })
        }

    }

    const uploadDocument = () => {

        if (documentUrl != "" && document.getElementById("select-file").files[0]) {
            const params = {
                Bucket: S3_BUCKET,
                Key: documentUrl,
            };

            myBucket.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack)  // error
                } else {
                    uploadToS3() // deleted
                }
            });
        } else {
            uploadToS3()
        }
    }
    // time: data.time,
    // date: data.date,
    // doctorName: data.doctor_name,
    // specialization: data.specialization,
    // hospitalName: data.hospital_name,
    // hospitalAddress: data.hospital_address,
    // rating: "", //yet to get from the api
    // comments: data.comments
    if (loading) {
        return <Loader />
    }

    return (
        <div>
            {reviewsRatingsModalFlag == 0 && appointmentDoneFlag == 1 ? <ReviewsRatingsModal doctorName={doctorDetails.doctorName}
                appointmentId={appointment_id} doctorId={doctorDetails.doctorId}
            /> : null}
            <Heading text={`Appointment: ${doctorDetails.date} ${doctorDetails.time}`} />
            <Spacer height={10} />
            <div className="app_details_wrapper">
                <div className="app_details">
                    <div className="patient_details_container">
                        <Heading text="Doctor Details" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)' }} />
                        <div className="patient_avatar">
                            <img src={Doctor} alt="Patient" className="patient_img" />
                            <div className="heading_wraper">
                                <Heading text={doctorDetails.doctorName} style={{ fontSize: 16 }} />
                            </div>
                            {
                                doctorDetails.rating != "" ?
                                    <div className="ratings">
                                        <span>{doctorDetails.rating}</span>
                                        <img src={Star} alt="rating" />
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        <div className="doctor_info_section_1">
                            <HighlightedContent backgroundColor={"rgba(184, 64, 94, 0.13)"} textColor={"#B8405E"} text={doctorDetails.specialization} />
                            <div className="seperator" />
                            {
                                doctorDetails.providesCovidCare == "Yes" ?
                                    <HighlightedContent backgroundColor={"rgba(76, 175, 80, 0.13)"} textColor={"#4CAF50"} text={'Covid Care'} />
                                    :
                                    null
                            }
                            {/* <div className="display_info"><span>Dentist</span></div>
                            <div className="display_info_2"><span>Covid Care</span></div> */}
                        </div>
                        <div className="doctor_info_section_1">
                            <div className="section_3_description">
                                <h3>{doctorDetails.hospitalName}</h3>
                                <p>{doctorDetails.hospitalAddress}</p>
                            </div>
                        </div>
                    </div>
                    <Spacer height={10} />
                    {
                        doctorDetails.rating != "" ?
                            <Description text={`Comments: ${doctorDetails.comments}`} style={{ fontSize: 16, fontWeight: "bold", marginTop: 40 }} />
                            :
                            null
                    }
                    <Spacer height={10} />
                    {
                        documentUrl &&
                        <Heading text="Document" />
                    }
                    <Spacer height={5} />
                    <div className="document_section">
                        {
                            documentUrl ?
                                <div className="document_wrapper">
                                    <DocumentComponent documentUrl={documentUrl} />
                                </div>
                                :
                                null
                        }
                        {/* <input type="file" className="select_document" id="select-file" onChange={() => uploadDocument()} /> */}
                        {/* <button className="file_picker" onClick={() => uploadFile()}>
                            {
                                progress != 0 ?
                                    <div className="loader"></div>
                                    :
                                    <img src={AddBox} alt="add" />
                            }
                            <span>
                                {
                                    documentUrl != "" ?
                                        'Replace Document'
                                        :
                                        'Add Document'
                                }
                            </span>
                        </button> */}
                        {/* <div>Native SDK File Upload Progress is {progress}%</div> */}
                    </div>
                    {/* <div className="app_documents_container">
                        <DocumentComponent documentName="Covid Report" />
                    </div> */}
                </div>
                <div className="chat_wrapper">
                    <Chat receiverDetails={{ id: doctorDetails.doctorId, name: doctorDetails.doctorName }} />
                </div>
            </div>
        </div>
    );
}
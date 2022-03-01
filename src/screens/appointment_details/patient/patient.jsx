import React from 'react';
import { useEffect, useState } from 'react';
import './patient.css';
import DocumentComponent from '../../../components/document/document'
import Heading from '../../../components/heading/heading';
import Description from '../../../components/description/description';
import Doctor from '../../../images/doctor.png';
import Spacer from '../../../components/spacer';
import Star from '../../../images/star.svg'
import AddBox from '../../../images/add_box.svg'
import HighlightedContent from '../../../components/highlighted_content/highlighted_content';

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
    const [documentName, setdocumentName] = useState("");
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('user_id'))
    const uploadFile = async () => {
        // openFileSelector()
        document.getElementById("select-file").click();
    }

    const uploadToS3 = () => {

        if (document.getElementById("select-file").files[0]) {
            setdocumentName(userId + document.getElementById("select-file").files[0].name)

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

        if (documentName != "" && document.getElementById("select-file").files[0]) {
            const params = {
                Bucket: S3_BUCKET,
                Key: documentName,
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

    return (
        <div>
            <Heading text="Appointment: Feb 26th, 2020 - 10:30 AM to 11:00 AM" />
            <Spacer height={10} />
            <div className="app_details_wrapper">
                <div className="app_details">
                    <div className="patient_details_container">
                        <Heading text="Doctor Details" style={{ fontSize: 18, fontWeight: 700, color: '#000' }} />
                        <div className="patient_avatar">
                            <img src={Doctor} alt="Patient" className="patient_img" />
                            <Heading text="Dr. John Doe" style={{ fontSize: 16 }} />
                            <div className="ratings">
                                <span>5</span>
                                <img src={Star} alt="rating" />
                            </div>
                        </div>
                        <div className="doctor_info_section_1">
                            <HighlightedContent backgroundColor={"rgba(184, 64, 94, 0.13)"} textColor={"#B8405E"} text={"Dentist"} />
                            <div className="seperator"/>
                            <HighlightedContent backgroundColor={"rgba(76, 175, 80, 0.13)"} textColor={"#4CAF50"} text={"Covid Care"} />
                            {/* <div className="display_info"><span>Dentist</span></div>
                            <div className="display_info_2"><span>Covid Care</span></div> */}
                        </div>
                        <div className="doctor_info_section_1">
                            <div className="section_3_description">
                                <h3>Monroe hospital</h3>
                                <p>4011 S Monroe Medical Park Blvd, Bloomington, IN 47403</p>
                            </div>
                        </div>
                    </div>
                    <Spacer height={10} />
                    <Description text={`Comments: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`} style={{ fontSize: 16, fontWeight: "bold", marginTop: 40 }} />
                    <Spacer height={10} />
                    <Heading text="Patient Details" />
                    <Spacer height={5} />
                    <div className="document_section">
                        {
                            documentName != "" ?
                                <div className="document_wrapper">
                                    <DocumentComponent documentName={
                                        documentName.length > 20 ?
                                            documentName.substring(0, 20) + '...'
                                            :
                                            documentName
                                    }
                                    />
                                </div>
                                :
                                null
                        }
                        <input type="file" className="select_document" id="select-file" onChange={() => uploadDocument()} />
                        <button className="file_picker" onClick={() => uploadFile()}>
                            {
                                progress != 0 ?
                                    <div className="loader"></div>
                                    :
                                    <img src={AddBox} alt="add" />
                            }
                            <span>
                                {
                                    documentName != "" ?
                                        'Replace Document'
                                        :
                                        'Add Document'
                                }
                            </span>
                        </button>
                        {/* <div>Native SDK File Upload Progress is {progress}%</div> */}
                    </div>
                    {/* <div className="app_documents_container">
                        <DocumentComponent documentName="Covid Report" />
                    </div> */}
                </div>
                <div className="chat_container"></div>
            </div>
        </div>
    );
}
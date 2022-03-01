
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './patbookappointments.css'
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/homepatient/homepatient';
import Textfield from '../../components/textfield/textfield';
import DropdownSelect from '../../components/dropdown/dropdown';
import ButtonSimple from '../../components/buttonsimple/buttonsimple';
import Doctor from '../../images/doctor.svg'
import Star from '../../images/star.svg'
import Close from '../../images/close.svg'
import CheckCircle from '../../images/check_circle.svg'
import AddBox from '../../images/add_box.svg'
import DocumentComponent from '../../components/document/document';
import Button from '../../components/button/button'
import Searchfield from '../../components/searchfield/searchfield'
import PatientBookAppointmentCard from '../../components/patient_book_appointment_card/patient_book_appointment_card'

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

const PatientBookAppointment = () => {
    const [modalStatus, setModalStatus] = useState(false);
    // const timings = ["10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM", "11:30 AM - 12:00 PM", "12:00 PM - 12:30 PM",
    //     "12:30 PM - 01:00 PM", "01:30 PM - 02:00 PM", "02:30 PM - 03:00 PM", "03:00 PM - 03:30 PM",
    //     "03:30 PM - 04:00 PM", "04:00 PM - 04:30 PM", "04:30 PM - 05:00 PM"]
    const [dates, setDates] = useState([]);
    const [currentSelectedDate, setCurrentSelectedDate] = useState([]);
    const yesNo = ['Yes', 'No']
    const navigate = useNavigate();

    //document upload vars
    const [documentName, setdocumentName] = useState("");
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('user_id'))


    //filter vars
    const [specialization, setSpecialization] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [location, setLocation] = useState("");
    const [providesHealthCare, setProvidesHealthCare] = useState("");

    //res vars
    const [doctorSearchData, setDoctorSearchData] = useState("");

    //req vars
    const [currentSelectedTime, setCurrentSelectedTime] = useState("");
    const [allAppointments, setAllAppointments] = useState([]);
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const [ratingsReviews, setRatingsReviews] = useState([]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%'
        },
    }

    // Modal.setAppElement('.container-home');

    // const style = {
    //     backgroundColor: props.isLoading ? "var(--loading-background" : "var(--primary)",
    //     width: props.width ? props.width : '180px',
    //     ...props.style,
    // }

    useEffect(() => {
        //Api call
        function GetDates(startDate, daysToAdd) {
            var aryDates = [];

            for (var i = 0; i <= daysToAdd; i++) {
                var temp_arr = []
                var currentDate = new Date();
                currentDate.setDate(startDate.getDate() + i + 1);
                temp_arr.push(DayAsString(currentDate.getDay()))
                temp_arr.push(currentDate.getDate())
                temp_arr.push(MonthAsString(currentDate.getMonth()))
                aryDates.push(temp_arr)
                // aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
            }

            return aryDates;
        }

        function MonthAsString(monthIndex) {
            var d = new Date();
            var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sep";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            return month[monthIndex];
        }

        function DayAsString(dayIndex) {
            var weekdays = new Array(7);
            weekdays[0] = "Sun";
            weekdays[1] = "Mon";
            weekdays[2] = "Tue";
            weekdays[3] = "Wed";
            weekdays[4] = "Thu";
            weekdays[5] = "Fri";
            weekdays[6] = "Sat";

            return weekdays[dayIndex];
        }

        var startDate = new Date();
        var aryDates = GetDates(startDate, 4);
        setDates(aryDates)
        console.log(aryDates[0][0] + ' ' + aryDates[0][1] + ' ' + aryDates[0][2])
        setCurrentSelectedDate(aryDates[0][0] + ' ' + aryDates[0][1] + ' ' + aryDates[0][2])

    }, [])

    const closeModal = () => {
        setModalStatus(false)
    }

    const bookSlot = (userReviewsRatings, appointments) => {
        setRatingsReviews(userReviewsRatings)
        setAvailableAppointments(appointments)
        setModalStatus(true)
    }

    const uploadFile = async () => {
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

    const bookAppointment = () => {
        // {
        //     time: "8:00 AM",
        //     date: "2-21-2022",
        //     doctor_id: "1",
        //     comments: "",
        //     document_url: "abc.pdf"
        //     patient_id: "asda"(token)
        // }
    }

    const searchDoctors = () => {

        let api_res = {
            response_code: "200",
            response_message: "Success",
            data: {
                doctors: [
                    {
                        doctor_id: 1,
                        doctor_name: "John Doe",
                        hospital_address: "4011 S Monroe Medical Park Blvd,Bloomington, IN 47403",
                        hospital_name: "abc hospital",
                        covid_care: "Yes",
                        specialization: "ortho",
                        profile_image_url: "http://adssa.png",
                        total_rating: "5",
                        reviews_rating: [
                            { user_name: "John Doe", review: "good doctor", rating: "5" },
                            { user_name: "John Doe", review: "good doctor", rating: "4" }
                        ],
                        appointments: [
                            { date: "02-21-2022", booked_appointment: "10:00 AM - 10:30 AM" },
                            { date: "02-21-2022", booked_appointment: "10:30 AM - 11:00 AM" },
                            { date: "02-22-2022", booked_appointment: "10:00 AM - 10:30 AM" },
                            { date: "02-23-2022", booked_appointments: "10:00 AM - 10:30 AM" },
                            { date: "02-24-2022", booked_appointments: "10:00 AM - 10:30 AM" },
                            { date: "02-25-2022", booked_appointments: "10:00 AM - 10:30 AM" }

                        ]
                    }
                ],
                all_appointments: ["10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM", "11:30 AM - 12:00 PM", "12:00 PM - 12:30 PM",
                    "12:30 PM - 01:00 PM", "01:30 PM - 02:00 PM", "02:30 PM - 03:00 PM", "03:00 PM - 03:30 PM",
                    "03:30 PM - 04:00 PM", "04:00 PM - 04:30 PM", "04:30 PM - 05:00 PM"]
            }
        }

        setDoctorSearchData(api_res.data.doctors)
        setAllAppointments(api_res.data.all_appointments)
        setCurrentSelectedTime(api_res.data.all_appointments[0])
    }

    return (
        <div className="container-home">
            {/* Modal Start */}
            <Modal
                isOpen={modalStatus}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            // contentLabel="Example Modal"
            >
                <div className="modal-section-1">
                    <h3>Book an appointment</h3>
                    <button onClick={closeModal}><img src={Close} alt="close" /></button>
                </div>
                <div className="partition" />
                <h3 className="sub-header">Pick a date and time:</h3>
                <div className="modal-section-2">
                    {/* loop */}
                    <div className="dates-button-wrapper">
                        {/* setCurrentSelectedDate(date[0] + date[1]) */}
                        {
                            dates.map((date, index) => (
                                <button key={index} className={currentSelectedDate == (date[0] + ' ' + date[1] + ' ' + date[2]) ? "date-button-1" : "date-button"}
                                    onClick={() => { setCurrentSelectedDate(date[0] + ' ' + date[1] + ' ' + date[2]) }}>
                                    <span className="date-span-1">{date[2]}</span>
                                    <span className="date-span-1">{date[0]}</span>
                                    <span>{date[1]}</span>
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="modal-section-3">
                    {/* loop */}
                    <div className="time-button-wrapper">
                        {
                            allAppointments != [] ?
                                allAppointments.map((data, index) => (
                                    <button key={index} className={currentSelectedTime == data ? "time-button-1" : "time-button"}
                                        onClick={() => { setCurrentSelectedTime(data) }}>
                                        <span>{data}</span>
                                        {
                                            currentSelectedTime == data ?
                                                <img src={CheckCircle} alt="Tick" />
                                                :
                                                null
                                        }
                                    </button>
                                ))
                                :
                                null
                        }
                    </div>
                </div>
                <h3 className="sub-header-1">Any comments for the doctor?</h3>
                <textarea className="textfield-modal" />
                <h3 className="sub-header">Attach a Document?</h3>
                <div className="modal-section-4">
                    {
                        documentName != "" ?
                            <div className="document-wrapper">
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
                    <button className="file-picker" >
                        <img src={AddBox} alt="add" />
                        <span>
                            {
                                documentName != "" ?
                                    'Replace Document'
                                    :
                                    'Add Document'
                            }
                        </span>
                    </button>
                </div>
                <div className="aptmt-button-wrapper">
                    <Button text={"Book Appointment"} width={'50%'} onClick={bookAppointment()} />
                </div>
            </Modal>
            {/* Modal End */}
            <div className="main-div">
                <h1 className="header">Search Doctors</h1>
                <div className="search-filters">
                    <div className="filter-wrapper">
                        <Textfield placeholder="Specialization" value={specialization} onChange={setSpecialization} />
                    </div>
                    <div className="filter-wrapper">
                        <Textfield placeholder="Doctor Name" value={doctorName} onChange={setDoctorName} />
                    </div>
                    <div className="filter-wrapper">
                        <Searchfield placeholder="Location" options={["abc", "def"]} value={location} onChange={setLocation} />
                    </div>
                    <div className="filter-wrapper">
                        <DropdownSelect placeholder="Provides Covid Care" options={yesNo} onChange={setProvidesHealthCare} />
                    </div>
                </div>
                <ButtonSimple text={"Search"} onClick={searchDoctors} />
                <p>12 searches</p>
                <div className="main-data-wrapper">
                    {/* div for main scroll */}
                    <div className="doctor-view">
                        {
                            doctorSearchData != [] ?
                                doctorSearchData.map((data, index) => (
                                    <PatientBookAppointmentCard key={index} data={data} bookSlot={bookSlot} />
                                ))
                                :
                                <div>No data found</div>
                        }
                        {/* Scroll view end*/}
                    </div>
                    {/* Div for maps */}
                    <div className="maps">
                        Maps
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientBookAppointment

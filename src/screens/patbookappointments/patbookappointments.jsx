
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
import { API } from '../../api/api';
import ErrorComponent from '../../components/error/error';
import { maxHeight } from '@mui/system';
import { BsStarFill } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import axios from 'axios';

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
    const [modalState, setModalState] = useState(0);
    const [dates, setDates] = useState([]);
    const [currentSelectedDate, setCurrentSelectedDate] = useState(0);
    const yesNo = ['Yes', 'No']
    const navigate = useNavigate();
    const [error, setError] = useState();

    //document upload vars
    const [documentName, setdocumentName] = useState("");
    const [progress, setProgress] = useState(0);
    const [userId, setUserId] = useState(localStorage.getItem('user_id'))


    //filter vars
    const [specialization, setSpecialization] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [location, setLocation] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [providesHealthCare, setProvidesHealthCare] = useState("");

    //res vars
    const [doctorSearchData, setDoctorSearchData] = useState("");
    const [totalSearches, setTotalSearches] = useState(0);
    const [allAppointments, setAllAppointments] = useState([]);

    //req vars
    const [currentSelectedTime, setCurrentSelectedTime] = useState("");
    const [availableAppointments, setAvailableAppointments] = useState({});
    const [comments, setComments] = useState("");
    const [reviewsRatings, setReviewsRatings] = useState([]);
    const [doctorId, setDoctorId] = useState(0);


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxHeight: '80%'
        },
    }

    // Modal.setAppElement('.container-home');

    // const style = {
    //     backgroundColor: props.isLoading ? "var(--loading-background" : "var(--primary)",
    //     width: props.width ? props.width : '180px',
    //     ...props.style,
    // }

    useEffect(() => {
        setCurrentDate()
    }, [])

    const setCurrentDate = () => {
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
                console.log(aryDates)
                console.log(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear())
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
        //set current selected date to tomorrow's date
        setCurrentSelectedDate(aryDates[0][1])
    }

    async function getLocationSuggestions(query) {
        console.log({ query })
        const response = await API.locationAutocomplete(query);
        if (response.success) {
            setLocationSuggestions(response.data);
        }
    }

    const onLocationSelect = (location) => {
        setLocation(location)
    }

    const openReviewsRatings = (reviewsRatings) => {
        console.log(reviewsRatings)
        setReviewsRatings(reviewsRatings)
        setModalState(0)
        setModalStatus(true)
    }

    const closeModal = () => {
        setModalStatus(false)
    }


    const searchDoctors = () => {

        let formData = new FormData();
        let requestData = {}

        if (locationSuggestions != "") {
            let location = locationSuggestions[0].split(", ")
            requestData = {
                doctor_name: doctorName,
                city: location[0],
                state: location[1],
                covid_care: providesHealthCare,
                specialization: specialization
            }
        } else {
            requestData = {
                doctor_name: doctorName,
                city: "",
                state: "",
                covid_care: providesHealthCare,
                specialization: specialization
            }
        }

        console.log(requestData)

        for (var key in requestData) {
            formData.append(key, requestData[key]);
        }

        axios.post('http://3.220.183.182:5000/doctorsearch', formData).then(function (response) {
            console.log(response.data);
            if (response.data.response_code == "200") {
                setDoctorSearchData(response.data.data.doctors)
                setTotalSearches(response.data.data.doctors.length)
                setAllAppointments(response.data.data.all_appointments)
            } else if (response.data.response_code == "230") {
                // setError("Something went wrong")
                // setLoading(false);
                alert("Something went wrong")
            }
        })
            .catch(function (error) {
                // setError("Something went wrong")
                // setLoading(false);
                console.log(error);
            })
        // setAllAppointments(api_res.data.all_appointments)
    }

    function bookSlot(appointments, doctorId) {

        let dict = {}

        //filter out the book appointments according to the date
        appointments.forEach(element => {
            console.log(element)

            let key = parseInt(element.date.split("-")[1])
            // const key = element.date;
            if (key in dict) {
                dict[key].push(element.booked_appointment);
            }
            else {
                dict[key] = [element.booked_appointment];

            }
        })

        console.log({dict})

        //assign blank array where no appointments are booked
        //we need this beacause we need to populate all the available appointments, and by setting the array to blank,
        //in the next for loop, we would be able to populate all the available appointments
        dates.forEach(element => {
            console.log(element[1])
            if (!(element[1] in dict)) {
                let arr = []
                Object.assign(dict, { [element[1]]: arr });
            }
        });


        //Fill in all the avaible appointments considering the booked appointments
        for (const key in dict) {
            const slots = allAppointments.filter((element) => !dict[key].includes(element));
            dict[key] = slots
        }

        setAvailableAppointments(dict)

        if (dict[currentSelectedDate] != "") {
            setCurrentSelectedTime(dict[currentSelectedDate][0])
        }

        setModalState(1)
        setDoctorId(doctorId)
        setModalStatus(true)
    }

    const onDateChange = (date) => {
        setCurrentSelectedDate(date)

        if (availableAppointments[date] != "") {
            setCurrentSelectedTime(availableAppointments[date][0])
        }
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

        // if (currentSelectedTime == "") {
        //     setError("sorry can't book the appointment, as no slots are available")
        // } else {
        //     setError("")
        //     //start loader
        //     if (documentName != "") {
        //         uploadDocument()
        //     }
        //     //after uploading the document - API call
        //     //end loader
        // }

        let dateObj = new Date();
        let finalDate =  dateObj.getUTCFullYear() + '-' + (parseInt(dateObj.getUTCMonth()) + 1) + '-' + currentSelectedDate
        console.log(finalDate)
        let formData = new FormData();
        let requestData = {}

        requestData = {
            time: currentSelectedTime,
            date: finalDate,
            doctor_id: doctorId,
            patient_id: localStorage.getItem("user_id"),
            document_url: documentName,
            comments: comments
        }

        for (var key in requestData) {
            formData.append(key, requestData[key]);
        }

        axios.post('http://3.220.183.182:5000/bookaptmt', formData).then(function (response) {
            
            if (response.data.response_code == "200") {
                console.log(response.data.data);
                alert("Appointment booked")
                
                setCurrentSelectedTime("")
                setComments("")
                setdocumentName("")
                
                setDoctorSearchData("")
                setTotalSearches(0)
                setAllAppointments([])

                setSpecialization("")
                setDoctorName("")
                setLocation("")
                setProvidesHealthCare("")
                
                setDoctorId(0)

                setAvailableAppointments(null)
                setModalState(0)
                setModalStatus(false)
                
                setCurrentDate()
            } else if (response.data.response_code == "230") {
                alert("Appointment already booked")
            } else if (response.data.response_code == "230") {
                alert("Appointment already booked")
                // setError("Something went wrong")
                // setLoading(false);
            }
        })
            .catch(function (error) {
                alert(error)
                // setError("Something went wrong")
                // setLoading(false);
                console.log(error);
            })
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
                    <h3>{modalState == 1 ? 'Book an appointment' : "Reviews and Ratings"}</h3>
                    <button onClick={closeModal}><img src={Close} alt="close" /></button>
                </div>
                <div className="main-modal-wrapper">
                    {
                        modalState == 1 ?
                            <div>
                                <div className="partition" />
                                {error && <ErrorComponent message={error} />}
                                <h3 className="sub-header">Pick a date and time:</h3>
                                <div className="modal-section-2">
                                    {/* loop */}
                                    <div className="dates-button-wrapper">
                                        {/* setCurrentSelectedDate(date[0] + date[1]) */}
                                        {
                                            dates.map((date, index) => (
                                                <button key={index} className={currentSelectedDate == date[1] ? "date-button-1" : "date-button"}
                                                    onClick={() => { onDateChange(date[1]) }}>
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
                                            // for the first time
                                            currentSelectedDate in availableAppointments ?
                                                availableAppointments[currentSelectedDate] != "" ?
                                                    availableAppointments[currentSelectedDate].map((data, index) => (
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
                                                    <div className="no-data-view">No slots available</div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <h3 className="sub-header-1">Any comments for the doctor?</h3>
                                <textarea className="textfield-modal" value={comments} onChange={(e) => { setComments(e.target.value) }} />
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
                                    <Button text={"Book Appointment"} width={'50%'} onClick={bookAppointment} />
                                </div>
                            </div>
                            :
                            <div>
                                <div className="reviews-ratings-header-wrapper">
                                    <div className="reviews-ratings-header-1">{'Name'}</div>
                                    <div className={"reviews-ratings-header-2"}>{'Review'}</div>
                                    <div className="reviews-ratings-header-3">{'Rating'}</div>
                                </div>
                                {
                                    reviewsRatings.map((data, index) => (
                                        <div key={index} className="reviews-ratings">
                                            <div className="reviews-ratings-1">{data.user_name}</div>
                                            <div className="reviews-ratings-2">{data.review}</div>
                                            <div className="reviews-ratings-3">
                                                {
                                                    [...Array(5)].map((e, i) =>
                                                        (i + 1) <= parseInt(data.rating) ?
                                                            // <div key={i} className="reviews-ratings-3">{data.rating}</div>
                                                            <BsStarFill color={"var(--primary)"} />
                                                            :
                                                            <BsStar />
                                                        // <div key={i} className="reviews-ratings-3">{data.rating}</div>
                                                    )
                                                }
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                    }
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
                        <Searchfield placeholder="Location" onChange={getLocationSuggestions} onOptionChange={onLocationSelect} options={locationSuggestions} />
                        {/* <Searchfield placeholder="Location" options={["abc", "def"]} value={location} onChange={setLocation} /> */}
                    </div>
                    <div className="filter-wrapper">
                        <DropdownSelect placeholder="Provides Covid Care" options={yesNo} onChange={setProvidesHealthCare} />
                    </div>
                </div>
                <ButtonSimple text={"Search"} onClick={searchDoctors} />
                <p>{totalSearches} searches</p>
                <div className="main-data-wrapper">
                    {/* div for main scroll */}
                    <div className="doctor-view">
                        {
                            doctorSearchData != "" ?
                                doctorSearchData.map((data, index) => (
                                    <PatientBookAppointmentCard key={index} data={data} bookSlot={bookSlot} openReviewsRatings={openReviewsRatings} />
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

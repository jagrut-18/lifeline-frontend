
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
import { FlashAuto, SecurityUpdateSharp } from '@mui/icons-material';

const PatientBookAppointment = () => {
    const navigate = useNavigate();
    localStorage.setItem('user_type_id', "1")
    // let user_type = JSON.parse(localStorage.getItem('user_type_id'))
    const [modalStatus, setModalStatus] = useState(true);
    const timings = ["10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM", "11:30 AM - 12:00 PM", "12:00 PM - 12:30 PM",
        "12:30 PM - 01:00 PM", "01:30 PM - 02:00 PM", "02:30 PM - 03:00 PM", "03:00 PM - 03:30 PM",
        "03:30 PM - 04:00 PM", "04:00 PM - 04:30 PM", "04:30 PM - 05:00 PM"]
    const [dates, setDates] = useState([]);
    const [currentSelectedDate, setCurrentSelectedDate] = useState([]);
    const [currentSelectedTime, setCurrentSelectedTime] = useState(timings[0]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '60%'
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



    return (
        <div className="container-home">
            <Modal
                isOpen={modalStatus}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            // contentLabel="Example Modal"
            >
                <div className="modal-section-1">
                    <h3>Hello</h3>
                    <button onClick={closeModal}><img src={Close} alt="close" /></button>
                </div>
                <div className="partition" />
                <h3 className="date-time-header">Pick a date and time:</h3>
                <div className="modal-section-2">
                    {/* loop */}
                    <div className="dates-button-wrapper">
                        {/* setCurrentSelectedDate(date[0] + date[1]) */}
                        {
                            dates.map((date, index) => (
                                <button key={index} className={currentSelectedDate == (date[0] + ' ' + date[1] + ' ' + date[2]) ? "date-button-1" : "date-button"}
                                    onClick={() => { setCurrentSelectedDate(date[0] + ' ' + date[1] + ' ' + date[2]) }}>
                                    <span>{date[2]}</span>
                                    <span>{date[0]}</span>
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
                            timings.map((data, index) => (
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
                        }
                    </div>
                </div>
                <span></span>

                <input type="text" />
                <div className="modal-section-4">
                    <h1></h1>
                    <button />
                    <button />
                    <button />
                </div>


            </Modal>
            <div className="main-div">
                <h1 className="header">Search Doctors</h1>
                <div className="search-filters">
                    <div className="filter-wrapper">
                        <Textfield />
                    </div>
                    <div className="filter-wrapper">
                        <Textfield />
                    </div>
                    <div className="filter-wrapper">
                        <Textfield />
                    </div>
                    <div className="filter-wrapper">
                        <DropdownSelect />
                    </div>
                </div>
                <ButtonSimple text={"Search"} />
                <p>12 searches</p>
                <div className="main-data-wrapper">
                    {/* div for main scroll */}
                    <div className="doctor-view">
                        <div className="search-box">
                            {/* image div */}
                            <div style={{ backgroundImage: `url(${Doctor})` }} className="doctor-image" />
                            {/* <img src={Doctor} alt="Doctor Image" /> */}
                            {/* info div */}
                            <div className="doctor-info">
                                <div className="doctor-info-section-1">
                                    <div className="doctor-title">
                                        <h3>John Doe</h3>
                                    </div>
                                    <div className="ratings">
                                        <span>5</span>
                                        <img src={Star} alt="rating" />
                                    </div>
                                </div>
                                <div className="doctor-info-section-2">
                                    <div className="display-info"><span>Dentist</span></div>
                                    <div className="display-info-2"><span>Covid Care</span></div>
                                </div>
                                <div className="doctor-info-section-3">
                                    <div className="section-3-description">
                                        <h3>Monroe hospital</h3>
                                        <p>4011 S Monroe Medical Park Blvd, Bloomington, IN 47403</p>
                                    </div>
                                    <div className="section-3-button">
                                        <div className="button-wrapper">
                                            <button className="button">
                                                {/* <button className='button' style={style} onClick={props.onClick}> */}
                                                View Slots
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Scroll view end*/}
                        <div className="search-box">
                            {/* image div */}
                            <div style={{ backgroundImage: `url(${Doctor})` }} className="doctor-image" />
                            {/* <img src={Doctor} alt="Doctor Image" /> */}
                            {/* info div */}
                            <div className="doctor-info">
                                <div className="doctor-info-section-1">
                                    <div className="doctor-title">
                                        <h3>John Doe</h3>
                                    </div>
                                    <div className="ratings">
                                        <span>5</span>
                                        <img src={Star} alt="rating" />
                                    </div>
                                </div>
                                <div className="doctor-info-section-2">
                                    <div className="display-info"><span>Dentist</span></div>
                                    <div className="display-info-2"><span>Covid Care</span></div>
                                </div>
                                <div className="doctor-info-section-3">
                                    <div className="section-3-description">
                                        <h3>Monroe hospital</h3>
                                        <p>4011 S Monroe Medical Park Blvd, Bloomington, IN 47403</p>
                                    </div>
                                    <div className="section-3-button">
                                        <div className="button-wrapper">
                                            <button className="button">
                                                {/* <button className='button' style={style} onClick={props.onClick}> */}
                                                View Slots
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-box">
                            {/* image div */}
                            <div style={{ backgroundImage: `url(${Doctor})` }} className="doctor-image" />
                            {/* <img src={Doctor} alt="Doctor Image" /> */}
                            {/* info div */}
                            <div className="doctor-info">
                                <div className="doctor-info-section-1">
                                    <div className="doctor-title">
                                        <h3>John Doe</h3>
                                    </div>
                                    <div className="ratings">
                                        <span>5</span>
                                        <img src={Star} alt="rating" />
                                    </div>
                                </div>
                                <div className="doctor-info-section-2">
                                    <div className="display-info"><span>Dentist</span></div>
                                    <div className="display-info-2"><span>Covid Care</span></div>
                                </div>
                                <div className="doctor-info-section-3">
                                    <div className="section-3-description">
                                        <h3>Monroe hospital</h3>
                                        <p>4011 S Monroe Medical Park Blvd, Bloomington, IN 47403</p>
                                    </div>
                                    <div className="section-3-button">
                                        <div className="button-wrapper">
                                            <button className="button">
                                                {/* <button className='button' style={style} onClick={props.onClick}> */}
                                                View Slots
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

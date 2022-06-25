import './book_appointment.css';
import { useEffect, useState } from 'react';
import { API } from '../../api/api';
import ButtonSimple from '../../components/buttonsimple/buttonsimple';
import Description from '../../components/description/description';
import DropdownSelect from '../../components/dropdown/dropdown';
import Heading from '../../components/heading/heading';
import Searchfield from '../../components/searchfield/searchfield';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import PatientBookAppointmentCard from './patient_book_appointment_card/patient_book_appointment_card';
import DoctorsMap from '../../components/map/map';
import Loader from '../../components/loader/loader';

export default function BookAppointmentScreen(props) {

    const [doctors, setDoctors] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const [currentInsuranceDetails, setCurrentInsuranceDetails] = useState(null);

    // filter vars
    const [specialization, setSpecialization] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [location, setLocation] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [covidCare, setCovidCare] = useState("");

    // dropdown vars
    const yesNo = ['Yes', 'No']

    const [loading, setLoading] = useState(true);

    async function getLocationSuggestions(query) {
        const response = await API.locationAutocomplete(query);
        if (response.success) {
            setLocationSuggestions(response.data);
        }
    }

    async function searchDoctors() {
        setLoading(true);
        var splits = location ? location.split(", ") : [];
        const formData = new FormData();
        formData.append("doctor_name", doctorName);
        formData.append("city", splits[0] ?? "");
        formData.append("state", splits[1] ?? "");
        formData.append("covid_care", covidCare);
        formData.append("specialization", specialization);
        formData.append("patient_id", parseInt(localStorage.getItem('user_id')));


        const response = await API.doctorSearch(formData);
        if (response.success) {
            setDoctors(response.data.doctors);
            setAllAppointments(response.data.all_appointments);
            setCurrentInsuranceDetails(response.data.current_patient_insurance_details);
            setLoading(false);
        }
        else {
            alert(response.error);
            setLoading(false);
        }
    }

    function onAppointmentBooked(doctorId, bookedDate, bookedSlot) {
        const index = doctors.findIndex(doctor => doctor.doctor_id == doctorId);
        let doctorsCopy = [...doctors];
        console.log(doctors);
        doctorsCopy[index].appointments.push({date: bookedDate, booked_appointment: bookedSlot});
        setDoctors(doctorsCopy);
    }

    useEffect(() => {
        searchDoctors();
    }, []);

    return (
        <div className="book_appointment_container">
            <div className="book_appointment_header_bar">
                <Spacer height={5} />
                <Heading text='Search Doctors' />
                <div className="search_filters">
                    <Textfield placeholder="Specialization" value={specialization} onChange={setSpecialization} />
                    <Textfield placeholder="Doctor Name" value={doctorName} onChange={setDoctorName} />
                    <Searchfield placeholder="Location" onChange={getLocationSuggestions} onOptionChange={setLocation} options={locationSuggestions} />
                    <DropdownSelect placeholder="Provides Covid Care" options={yesNo} onChange={setCovidCare} />
                </div>
                <ButtonSimple text={"Search"} onClick={searchDoctors} />
                <Description text={`${doctors.length} searches`} />
            </div>
            {
                loading
                    ? <Loader />
                    : <>
                        <div className="book_appointment_content">
                            <div>
                                {
                                    doctors.map((doctor, index) => <PatientBookAppointmentCard key={index} data={doctor} allAppointments={allAppointments} onAppointmentBooked={onAppointmentBooked} currentInsuranceDetails={currentInsuranceDetails} />)
                                }
                            </div>
                            {doctors &&
                                <div className="book_appointment_maps">
                                    {doctors.length > 0 && <DoctorsMap latlongs={doctors.map((doctor) => [parseFloat(doctor.location_lat), parseFloat(doctor.location_long)])} />}
                                </div>
                            }
                        </div>
                        {!doctors && <Heading text="No data found!" />}
                    </>
            }
        </div>
    );
}

import { useEffect, useState } from 'react';
import './patbookappointments.css'
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';
import HomePatient from '../../components/homepatient/homepatient';
import Textfield from '../../components/textfield/textfield';
import DropdownSelect from '../../components/dropdown/dropdown';
import ButtonSimple from '../../components/buttonsimple/buttonsimple';
import Doctor from '../../images/doctor.svg'
import Star from '../../images/star.svg'
import Searchfield from '../../components/searchfield/searchfield';
import { API } from '../../api/api';

const PatientBookAppointment = () => {
    const navigate = useNavigate();
    localStorage.setItem('user_type_id', "1")
    let user_type = JSON.parse(localStorage.getItem('user_type_id'))
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    // const style = {
    //     backgroundColor: props.isLoading ? "var(--loading-background" : "var(--primary)",
    //     width: props.width ? props.width : '180px',
    //     ...props.style,
    // }

    useEffect(() => {
        //Api call 
    }, [])

    async function getLocationSuggestions(query){
        const response = await API.locationAutocomplete(query);
        if (response.success){
            setLocationSuggestions(response.data);
        }
    }


    return (
        <div className="container-home">
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
                        <Searchfield placeholder="Location" onChange={getLocationSuggestions} options={locationSuggestions}/>
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
                            <img src={Doctor} alt="Doctor Image" />
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
                                </div>
                                <div className="doctor-info-section-3">
                                    <div className="section-3-description">
                                        <h3>Monroe hospital</h3>
                                        <p>4011 S Monroe Medical Park Blvd, Bloomington, IN 47403</p>
                                    </div>
                                    <div className="section-3-button">
                                        <button className="button">
                                        {/* <button className='button' style={style} onClick={props.onClick}> */}
                                            Hello
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-box">
                            {/* image div */}
                            <img src={Doctor} alt="Doctor Image" />
                            {/* info div */}
                            <div className="doctor-info">
                                <div></div>
                            </div>
                        </div>
                        <div className="search-box">
                            {/* image div */}
                            <img src={Doctor} alt="Doctor Image" />
                            {/* info div */}
                            <div className="">
                                <div></div>
                            </div>
                        </div>
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

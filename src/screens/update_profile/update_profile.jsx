import Heading from '../../components/heading/heading';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import DropdownSelect from '../../components/dropdown/dropdown';
import DateSelector from '../../components/datepicker/datepicker';
import { useEffect, useState } from 'react';
import './styles.css';
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import axios from 'axios';
import getDateString from '../../utilities/date_string';
import Loader from '../../components/loader/loader';


export default function UpdateProfileScreen(props) {
    // dropdown options
    const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'))
    const genderOptions = ['Male', 'Female']
    const bloodGroups = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-']
    const yesNo = ['Yes', 'No']
    // field hooks
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState(null);
    const [bloodGroup, setBloodGroup] = useState(null);
    const [smoke, setSmoke] = useState(null);
    const [drink, setDrink] = useState(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [hasCovidCare, setHasCovidCare] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [companyName, setCompanyName] = useState('');
    // loading
    const [isLoading, setIsLoading] = useState(true);

    function getData() {
        setIsLoading(true)
        let formData = new FormData();
        formData.append("user_id", localStorage.getItem('user_id'));

        axios.post('http://3.220.183.182:5000/fetch_data', formData).then(function (response) {
            console.log("res", response.data);
            if (response.data.response_code == "200") {
                if (userTypeId == "1") {
                    setWeight(response.data.data.Weight)
                    setAddress(response.data.data.address)
                    setDob(response.data.data.birth_date)
                    setBloodGroup(response.data.data.blood_type)
                    setCity(response.data.data.city)
                    setDrink(response.data.data.drinking_preference)
                    setFirst(response.data.data.first_name)
                    setHeight(response.data.data.height)
                    setLast(response.data.data.last_name)
                    setPhone(response.data.data.phone_number)
                    setGender(response.data.data.sex.toLowerCase() == genderOptions[0].toLowerCase() ? genderOptions[0] : genderOptions[1])
                    setSmoke(response.data.data.smoking_preference)
                    setState(response.data.data.state)
                    setZipcode(response.data.data.zipcode)
                } else if (userTypeId == "2") {
                    // first_name: "Abc",
                    // last_name: "Def",
                    // phone_number: "987987987",
                    // address: "Street, apt num",
                    // city: "Bloomington",
                    // state: "Indiana",
                    // zipcode: "47489",
                    // sex: "Male/Female",
                    // has_covid_care - “Yes/No”
                    // specialization: ""
                    // hospital_name: "abc hospital"

                    setFirst(response.data.data.first_name)
                    setLast(response.data.data.last_name)
                    setPhone(response.data.data.phone_number)
                    setAddress(response.data.data.address)
                    setCity(response.data.data.city)
                    setState(response.data.data.state)
                    setZipcode(response.data.data.zipcode)
                    setGender(response.data.data.sex.toLowerCase() == genderOptions[0].toLowerCase() ? genderOptions[0] : genderOptions[1])
                    setDob(response.data.data.birth_date)
                    setHasCovidCare(response.data.data.has_covid_care)
                    setSpecialization(response.data.data.specialization)
                    setHospitalName(response.data.data.hospital_name)

                } else if (userTypeId == "3") {
                    // first_name: "Abc",
                    // last_name: "Def",
                    // phone_number: "987987987",
                    // address: "Street, apt num",
                    // city: "Bloomington",
                    // state: "Indiana",
                    // zipcode: "47489"
                    // company_name: "abc"

                    setFirst(response.data.data.first_name)
                    setLast(response.data.data.last_name)
                    setPhone(response.data.data.phone_number)
                    setAddress(response.data.data.address)
                    setCity(response.data.data.city)
                    setState(response.data.data.state)
                    setZipcode(response.data.data.zipcode)
                    setCompanyName(response.data.data.company_name)
                }

            } else if (response.data.response_code == "230") {
                // setError("Something went wrong")
                // setLoading(false);
                alert("Something went wrong")
            }
            else {
                alert("Something went wrong")

            }
            setIsLoading(false)
        })
            .catch(function (error) {
                // setError("Something went wrong")
                setIsLoading(false)
                console.log(error);
            })
    }

    useEffect(() => {
        getData()
    }, [])

    function updateUserProfile() {
        let formData = new FormData()
        // const [last, setLast] = useState('');
        // const [phone, setPhone] = useState('');
        // const [dob, setDob] = useState(null);
        // const [gender, setGender] = useState(null);
        // const [bloodGroup, setBloodGroup] = useState(null);
        // const [smoke, setSmoke] = useState(null);
        // const [drink, setDrink] = useState(null);
        // const [height, setHeight] = useState('');
        // const [weight, setWeight] = useState('');
        // const [address, setAddress] = useState('');
        // const [city, setCity] = useState('');
        // const [state, setState] = useState('');
        // const [zipcode, setZipcode] = useState('');
        // const [specialization, setSpecialization] = useState('');
        // const [hasCovidCare, setHasCovidCare] = useState('');
        // const [companyName, setCompanyName] = useState('');

        let requestData = {}

        if (userTypeId == "1") {
            //year month date
            let date

            console.log(typeof (dob))

            if (typeof (dob) == "string") {
                date = new Date(getDateString(dob))
            }

            requestData = {
                first_name: first,
                last_name: last,
                phone_number: phone,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                sex: gender,
                height: height,
                weight: weight,
                birth_date: typeof (dob) == "string" ? (date.getFullYear() + 1 + '-' + (date.getMonth() + 1) + '-' + date.getDate()) : (dob.year + '-' + dob.month + '-' + dob.day),
                blood_type: bloodGroup,
                smoking_pref: smoke,
                drinking_pref: drink,
                user_id: localStorage.getItem('user_id'),
                user_type_id: userTypeId
            }
        } else if (userTypeId == "2") {

            requestData = {
                first_name: first,
                last_name: last,
                phone_number: phone,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                sex: gender,
                has_covid_care: hasCovidCare,
                specialization,
                hospital_name: hospitalName,
                drinking_pref: drink,
                user_id: localStorage.getItem('user_id'),
                user_type_id: userTypeId
            }
        } else if (userTypeId == "3") {

            requestData = {
                first_name: first,
                last_name: last,
                phone_number: phone,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                company_name: companyName,
                user_id: localStorage.getItem('user_id'),
                user_type_id: userTypeId
            }
        }

        console.log({ requestData })

        for (var key in requestData) {
            formData.append(key, requestData[key]);
        }

        axios.post('http://3.220.183.182:5000/updating', formData).then(function (response) {
            console.log("res", response.data);

            if (response.data.response_code == "200") {
                alert("Record successfully updated")
                getData()
            } else if (response.data.response_code == "230") {
                alert("Something went wrong")
            }
        })
    }

    function getProfile2() {

        return (
            <div>
                {
                    userTypeId == "1" ?
                        <div className='profile_wrapper'>
                            {/* 05-02-200 */}
                            <div className="profile_row">
                                {
                                    dob != null ?
                                        <DateSelector placeholder="Date of Birth" onChange={setDob} default={new Date(getDateString(dob))} />
                                        :
                                        null
                                }
                                <Spacer width={15} />
                                <DropdownSelect placeholder="Gender" options={genderOptions} onChange={setGender} default={gender} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                <Textfield type="number" value={height} onChange={setHeight} placeholder="Height" style={{ width: 100 }} />
                                <Spacer width={15} />
                                <Textfield type="number" value={weight} onChange={setWeight} placeholder="Weight" style={{ width: 100 }} />
                                <Spacer width={15} />
                                <DropdownSelect placeholder="Blood Group" options={bloodGroups} onChange={setBloodGroup} default={bloodGroup} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you smoke?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setSmoke} width={100} default={smoke} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you drink?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setDrink} width={100} default={drink} />
                            </div>
                        </div>
                        :
                        null
                }

                {
                    userTypeId == "2" ?
                        <div className='profile_wrapper'>
                            <Textfield value={specialization} onChange={setSpecialization} placeholder="Specialization" disabled={true}/>
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you provide Covid Care?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setHasCovidCare} width={100} default={hasCovidCare} />
                            </div>
                            <Spacer height={10} />
                            <DropdownSelect placeholder="Gender" options={genderOptions} onChange={setGender} default={gender} />
                        </div>
                        :
                        null
                }

                {
                    userTypeId == "3" ?
                        <div className='profile_wrapper'>
                            <Textfield placeholder="Company Name" value={companyName} onChange={setCompanyName} />
                        </div>
                        :
                        null
                }
            </div>
        );
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="container">
            <Card width="40%" height="inherit" style={{ margin: "40px 0" }}>
                {/* ------------------------------------ */}
                <Heading text="General details" />
                <Spacer height={15} />
                <Textfield placeholder="First Name" value={first} onChange={setFirst} />
                <Spacer height={10} />
                <Textfield placeholder="Last Name" value={last} onChange={setLast} />
                <Spacer height={10} />
                <Textfield type="number" placeholder="Phone Number" value={phone} onChange={setPhone} />
                {/* ------------------------------------ */}
                <Spacer height={20} />
                <Heading text="More details" />
                <Spacer height={15} />
                {getProfile2()}
                <Spacer height={20} />
                {/* ------------------------------------ */}
                <Heading text="Address Details" />
                <Spacer height={20} />
                <Textfield placeholder="Address" value={address} onChange={setAddress} />
                <Spacer height={10} />
                <div className="profile_row">
                    <Textfield placeholder="City" value={city} onChange={setCity} />

                    <Spacer width={15} />
                    <Textfield placeholder="State" value={state} onChange={setState} />
                </div>
                <Spacer height={10} />
                <Textfield type="number" placeholder="Zipcode" style={{ width: "calc(50% - 5px)" }} value={zipcode} onChange={setZipcode} />
                {/* ------------------------------------ */}
                <Spacer height={20} />
                <Button text="Update" isLoading={isLoading} style={{ width: "30%" }} onClick={updateUserProfile} />
            </Card>
        </div>
    );
}
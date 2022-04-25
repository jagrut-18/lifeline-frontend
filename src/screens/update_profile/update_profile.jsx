import Heading from '../../components/heading/heading';
import Spacer from '../../components/spacer';
import Textfield from '../../components/textfield/textfield';
import DropdownSelect from '../../components/dropdown/dropdown';
import DateSelector from '../../components/datepicker/datepicker';
import { useContext, useEffect, useState } from 'react';
import './styles.css';
import Card from '../../components/card/card';
import Button from '../../components/button/button';
import axios from 'axios';
import getDateString from '../../utilities/date_string';
import Loader from '../../components/loader/loader';
import OutlineButton from '../../components/outline_button/outline_button';
import { API } from '../../api/api';
import { ProfileImageContext } from '../../contexts';


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
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const {_, setGlobalProfileImage} = useContext(ProfileImageContext);
    // loading
    const [isLoading, setIsLoading] = useState(true);
    

    function selectProfileImage() {
        const inputElement = document.getElementById('update_profile_image_input');
        inputElement.click();
    }

    async function onProfileImageUpdate(file) {
        const uploadResponse = await API.uploadFile(file);
            console.log(uploadResponse);
            if (uploadResponse.success) {
                setProfileImageUrl('https://lifeline-se.s3.amazonaws.com/' + uploadResponse.fileName);
            }
            else {
                alert(uploadResponse.error);
                return;
            }
    }

    async function getData() {
        setIsLoading(true)
        let formData = new FormData();
        formData.append("user_id", localStorage.getItem('user_id'));

        const response = await API.fetchData(formData);
        if (response.success) {
            setFirst(response.data.first_name)
            setLast(response.data.last_name)
            setPhone(response.data.phone_number)
            setAddress(response.data.address)
            setCity(response.data.city)
            setState(response.data.state)
            setZipcode(response.data.zipcode)
            setProfileImageUrl(response.data.profile_image_url)
            setGlobalProfileImage(response.data.profile_image_url)
            if (userTypeId == "1") {
                setWeight(response.data.Weight)
                setDob(response.data.birth_date)
                setBloodGroup(response.data.blood_type)
                setDrink(response.data.drinking_preference)
                setHeight(response.data.height)
                setGender(response.data.sex.toLowerCase() == genderOptions[0].toLowerCase() ? genderOptions[0] : genderOptions[1])
                setSmoke(response.data.smoking_preference)
            } else if (userTypeId == "2") {
                setGender(response.data.sex.toLowerCase() == genderOptions[0].toLowerCase() ? genderOptions[0] : genderOptions[1])
                setDob(response.data.birth_date)
                setHasCovidCare(response.data.has_covid_care)
                setSpecialization(response.data.specialization)
                setHospitalName(response.data.hospital_name)

            } else if (userTypeId == "3") {
                setCompanyName(response.data.company_name)
            }
        }
        else {
            alert(response.error);
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])

    async function updateUserProfile() {
        let formData = new FormData()

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
                user_type_id: userTypeId,
                profile_image_url: profileImageUrl,
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
                user_type_id: userTypeId,
                profile_image_url: profileImageUrl,
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
                user_type_id: userTypeId,
                profile_image_url: profileImageUrl,
            }
        }

        console.log({ requestData })

        for (var key in requestData) {
            formData.append(key, requestData[key]);
        }

        const response = await API.updating(formData);
        if (response.success) {
            alert("Record successfully updated")
            localStorage.setItem('user_name', first + ' ' + last);
            localStorage.setItem('profile_image', profileImageUrl);
            getData()
        }
        else {
            alert(response.error);
        }
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
                <div className="profile_row_between">
                    <img className='update_profile_image' src={profileImageUrl == null ? `https://placehold.jp/84/cccccc/ffffff/250x250.png?text=${localStorage.getItem("email").toUpperCase().charAt(0)}` : profileImageUrl} alt="Profile Image" />
                    <OutlineButton text='Change Profile Picture' onClick={selectProfileImage} />
                    <input id='update_profile_image_input' type="file" accept="image/*" onChange={(e) => onProfileImageUpdate(e.target.files[0])} />
                </div>
                <Spacer height={10} />
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
                <Textfield placeholder="Address" value={address} onChange={setAddress} disabled={userTypeId == "2"}/>
                <Spacer height={10} />
                <div className="profile_row">
                    <Textfield placeholder="City" value={city} onChange={setCity} disabled={userTypeId == "2"}/>

                    <Spacer width={15} />
                    <Textfield placeholder="State" value={state} onChange={setState} disabled={userTypeId == "2"}/>
                </div>
                <Spacer height={10} />
                <Textfield type="number" placeholder="Zipcode" style={{ width: "calc(50% - 5px)" }} value={zipcode} onChange={setZipcode} disabled={userTypeId == "2"}/>
                {/* ------------------------------------ */}
                <Spacer height={20} />
                <Button text="Update" isLoading={isLoading} style={{ width: "30%" }} onClick={updateUserProfile} />
            </Card>
        </div>
    );
}
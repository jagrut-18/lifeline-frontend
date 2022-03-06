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


export default function UpdateProfileScreen(props) {
    // dropdown options
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
    const [companyName, setCompanyName] = useState('');
    // loading
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        let formData = new FormData();
        formData.append("user_id", localStorage.getItem('user_id'));

        axios.post('http://3.220.183.182:5000/fetch_data', formData).then(function (response) {
            console.log(response.data);
            if (response.data.response_code == "200") {

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
    }, [])


    function getProfile2() {
        let userTypeId = localStorage.getItem('user_type_id')
        // if (false) { // Doctor
        //     return (
        //         <div className='profile_wrapper'>
        //             <Textfield value={specialization} onChange={setSpecialization} placeholder="Specialization" />
        //             <Spacer height={10} />
        //             <div className="profile_row">
        //                 Do you provide Covid Care?
        //                 <Spacer width={15} />
        //                 <DropdownSelect options={yesNo} onChange={setHasCovidCare} width={100} />
        //             </div>
        //         </div>
        //     );
        // }
        // if (true) { // Insurance
        //     return (
        //         <div className='profile_wrapper'>
        //             <Textfield placeholder="Company Name" value={companyName} onChange={setCompanyName} />
        //         </div>
        //     );
        // }
        return (
            <div>
                {
                    userTypeId == "1" ?
                        <div className='profile_wrapper'>
                            <div className="profile_row">
                                <DateSelector placeholder="Date of Birth" onChange={setDob} />
                                <Spacer width={15} />
                                <DropdownSelect placeholder="Gender" options={genderOptions} onChange={setGender} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                <Textfield type="number" value={height} onChange={setHeight} placeholder="Height" style={{ width: 100 }} />
                                <Spacer width={15} />
                                <Textfield type="number" value={weight} onChange={setWeight} placeholder="Weight" style={{ width: 100 }} />
                                <Spacer width={15} />
                                <DropdownSelect placeholder="Blood Group" options={bloodGroups} onChange={setBloodGroup} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you smoke?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setSmoke} width={100} />
                            </div>
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you drink?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setDrink} width={100} />
                            </div>
                        </div>
                        :
                        null
                }

                {
                    userTypeId == "2" ?
                        <div className='profile_wrapper'>
                            <Textfield value={specialization} onChange={setSpecialization} placeholder="Specialization" />
                            <Spacer height={10} />
                            <div className="profile_row">
                                Do you provide Covid Care?
                                <Spacer width={15} />
                                <DropdownSelect options={yesNo} onChange={setHasCovidCare} width={100} />
                            </div>
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
                <Button text="Update" isLoading={isLoading} style={{ width: "30%" }} />
            </Card>
        </div>
    );
}
import './user_type_select.css';
import Card from '../../components/card/card';
import Heading from '../heading/heading';
import Description from '../description/description';
import Spacer from '../spacer';
import Doctor from '../../images/doctor.png';
import Patient from '../../images/patient.png';
import Insurance from '../../images/insurance.png';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useState } from 'react';
import Button from '../button/button';
import ErrorComponent from '../../components/error/error';
import { UserTypeContext } from './user_type_context';
/* props:
    - onNext(selected_user_type)
*/

export default function UserTypeSelect(props) {
    const userTypes = [
        {
            user_type_id: '1',
            user_type: 'patient',
            name: 'Patient',
            asset: Patient,
        },
        {
            user_type_id: '2',
            user_type: 'doctor',
            name: 'Doctor',
            asset: Doctor,
        },
        {
            user_type_id: '3',
            user_type: 'insurance',
            name: 'Insurance Provider',
            asset: Insurance,
        },
    ];

    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState();

    function onNext(){
        if (selectedUser == null){
            setError("Please select the user type");
            return;
        }
        setError(null);
        localStorage.setItem('user_type_id', selectedUser);
        props.onNext();
    }

    return (
        <UserTypeContext.Provider value={selectedUser}>
            <Card>
                <Heading text="Who are you?" fontSize={24} />
                <Description text="Click on one of the options and let’s get started with our quick signup process!" />
                <Spacer height={30}/>
                {userTypes.map(function (value) {
                    var isSelected = selectedUser === value.user_type_id;
                    return (
                        <div key={value.user_type} className={`user_container ${isSelected ? "selected_user" : ""}`} onClick={() => setSelectedUser(value.user_type_id)}>
                            <img src={value.asset} alt="img" className="user_img" />
                            <div className="user_name">{value.name}</div>
                            {isSelected && <BsFillCheckCircleFill color='var(--secondary)' size={24}/>}
                        </div>
                    )
                })}
                {error && <ErrorComponent message={error} /> }
                <Button text="Next" onClick={onNext}/>
            </Card>
        </UserTypeContext.Provider>
    )
}
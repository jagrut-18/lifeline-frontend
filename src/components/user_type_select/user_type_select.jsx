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
            user_type: 'patient',
            name: 'Patient',
            asset: Patient,
        },
        {
            user_type: 'doctor',
            name: 'Doctor',
            asset: Doctor,
        },
        {
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
        props.onNext(selectedUser);
    }


    return (
        <UserTypeContext.Provider value={selectedUser}>
            <Card>
                <Heading text="Who are you?" fontSize={24} />
                <Description text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
                <Spacer height={30}/>
                {userTypes.map(function (value) {
                    var isSelected = selectedUser === value.user_type;
                    return (
                        <div key={value.user_type} className={`user_container ${isSelected ? "selected_user" : ""}`} onClick={() => setSelectedUser(value.user_type)}>
                            <img src={value.asset} alt="img" className="user_img" />
                            <div className="user_name">{value.name}</div>
                            {isSelected && <BsFillCheckCircleFill color='var(--primary)' size={24}/>}
                        </div>
                    )
                })}
                {error && <ErrorComponent message={error} /> }
                <Button text="Next" onClick={onNext}/>
            </Card>
        </UserTypeContext.Provider>
    )
}
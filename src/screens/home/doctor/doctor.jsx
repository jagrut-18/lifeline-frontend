import { useEffect, useState } from 'react';
import { API } from '../../../api/api';
import DoctorAppointment from '../../../components/doctor_appointment/doctor_appointment';
import Heading from '../../../components/heading/heading';
import './doctor.css';
import Loader from '../../../components/loader/loader';
import NoData from '../../../images/no_data.svg';
import Description from '../../../components/description/description';

export default function DoctorHome() {
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState({});
    
    useEffect(() => {
        console.log("useEffect");
        getAppointments();
    }, []);

    async function getAppointments(){
        setLoading(true);
        const response = await API.getDoctorAppointments();
        if (response.success) {
            setDays(response.data);
        }
        else {
            alert(response.error);
        }
        setLoading(false);
    }

    function getDateString(date){
        const date1 = new Date();
        date1.setHours(0, 0, 0, 0);
        const date2 = new Date(date);
        date2.setHours(date2.getHours()+(date2.getTimezoneOffset()/60));
        date1.setHours(0, 0, 0, 0);
        const oneDay = 1000 * 60 * 60 * 24;
        const diffInTime = date2.getTime() - date1.getTime();
        const diffInDays = Math.round(diffInTime / oneDay);
        
        if (diffInDays == 0){
            return 'Today';
        }
        else if (diffInDays == 1) {
            return 'Tomorrow';
        }
        return `${date2.toLocaleString('default', { month: 'short' })} ${date2.getDate()}, ${date2.getFullYear()}`;
    }

    if (loading) {
        return (
            <Loader />
        );
    } 

    return (
        <div className="doctor_home_container">
            {Object.keys(days).length === 0 && <div className='no_data_container'>
                <img className='no_data_img' src={NoData} alt="No Data" />
                <Description text='No upcoming appointments!' />
            </div> }
            {
                Object.keys(days).map((day, index)=>{
                    return (
                        <div key={index}>
                            <Heading text={getDateString(day)} />
                            <div className="doctor_appointments_container">
                            {days[day].map((appointment, i) => {
                                return <DoctorAppointment key={i} appointment={appointment} />
                            })}
                            </div>
                        </div>
                    );
                })
            }
            
        </div>
    );
}
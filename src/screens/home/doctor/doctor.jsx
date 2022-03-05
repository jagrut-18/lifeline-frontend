import { useEffect, useState } from 'react';
import { API } from '../../../api/api';
import DoctorAppointment from '../../../components/doctor_appointment/doctor_appointment';
import Heading from '../../../components/heading/heading';
import './doctor.css';

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
        console.log(loading);
    }

    function getDateString(date){
        const date1 = new Date();
        date1.setHours(0, 0, 0, 0);
        const date2 = new Date(date);
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

    return (
        <div className="doctor_home_container">
            {loading
            ? <div>
                Loading...
            </div>
            : Object.keys(days).map((day, index)=>{
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
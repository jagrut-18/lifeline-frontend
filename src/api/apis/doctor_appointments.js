import { AX } from '../axios';


export async function getDoctorAppointments(){

    await new Promise(res => setTimeout(res, 2000));
    const appointments = [
        {
            appointment_id: "abcd",
            time: "10:30 AM - 11:00 AM",
            date: "2-27-2022",
            patient_name: "John Doe",
            patient_age: "22 Years"
        },
        {
            appointment_id: "abcd",
            time: "1:30 PM - 2:00 PM",
            date: "2-27-2022",
            patient_name: "Lionel Messi",
            patient_age: "34 Years"
        },
        {
            appointment_id: "abcd",
            time: "10:30 AM - 11:00 AM",
            date: "2-28-2022",
            patient_name: "Cristiano Ronaldo",
            patient_age: "35 Years"
        },
        {
            appointment_id: "abcd",
            time: "10:30 AM - 11:00 AM",
            date: "3-1-2022",
            patient_name: "Cristiano Ronaldo",
            patient_age: "35 Years"
        },
    ];

    var data = {};

    appointments.forEach(appointment => {
        if (appointment.date in data){
            data[appointment.date].push(appointment);
        }
        else {
            data[appointment.date] = [appointment];
        }
    });

    return {
        success: true,
        data: data,
    }
}
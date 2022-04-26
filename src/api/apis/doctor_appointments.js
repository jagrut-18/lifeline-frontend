import { AX } from '../axios';


export async function getDoctorAppointments(){
    var formData = new FormData();
    formData.append("doctor_id", localStorage.getItem("user_id"));
    return AX.post('/doct_aptmts', formData)
    .then((response) => {
        const resCode = response.data.response_code;
        console.log(response.data);
        if (resCode == "200"){ // success
            const appointments = response.data.data.appointments;
            const sortedAppointments = appointments.sort((b, a) => (new Date(b.date)) - (new Date(a.date)))
            
            var data = {};
            sortedAppointments.forEach(appointment => {
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
        else {
            return {
                success: false,
                error: response.data.data.response_message
            }
        }
    })
    .catch((error) => {
        return {
            success: false,
            error: error.toString()
        }
    });
}
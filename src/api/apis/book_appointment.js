import { AX } from '../axios';


export async function bookAppointment(formData){
    return AX.post('/bookaptmt', formData)
    .then((response) => {
        const resCode = response.data.response_code;
        console.log(response.data);
        if (resCode == "200"){ // success
            return {
                success: true,
            }
        }
        if (response.data.response_code == "230"){
            return {
                success: false,
                error: "Appointment already booked",
            }
        }
        else {
            return {
                success: false,
                error: response.data.error
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
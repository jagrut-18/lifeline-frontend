import { AX } from "../axios";


export default async function getDoctorAppointmentDetails(formData){
    return AX.post('/doct_apt_details', formData)
    .then((response) => {
        const data = response.data;
        const resCode = data.response_code;
        if (resCode == "200") {
            return {
                success: true,
                data: data.data,
            }
        }
        else {
            return {
                success: false,
                error: data.response_message,
            }
        }
    })
}
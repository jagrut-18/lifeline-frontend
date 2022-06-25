import { AX } from "../axios";

export default async function getPatientAppointmentDetails(formData) {
    return AX.post('/pat_apt_details', formData)
        .then((response) => {
            console.log(response.data)
            const data = response.data;
            const resCode = data.response_code;

            if (resCode == "200") {
                return {
                    success: true,
                    data: data.data,
                }
            } else {
                return {
                    success: false,
                    error: data.response_message,
                }
            }
        })
}
import { AX } from "../axios";

export async function updateAppointmentDoneFlag(formData) {
    return AX.post('/update_appointment_done_flag', formData)
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
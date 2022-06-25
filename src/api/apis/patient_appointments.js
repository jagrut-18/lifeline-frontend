import { AX } from "../axios";


export default async function getPatientAppointments() {
    var formData = new FormData();
    formData.append("patient_id", localStorage.getItem("user_id"));
    return AX.post('/allaptmts', formData)
        .then((response) => {
            console.log(response.data)
            const data = response.data;
            const resCode = data.response_code;
            if (resCode == "200") { // success
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
        .catch((error) => {
            return {
                success: false,
                error: error.toString(),
            }
        })

}
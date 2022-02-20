import { AX } from "../axios";

export async function onboarding(formData) {
    return AX.post('/onboarding', formData)
        .then((response) => {
            console.log(response);
            const data = response.data;
            const resCode = data.response_code;
            if (resCode == "200") { // success
                return {
                    success: true,
                    data: data,
                }
            } else if (resCode == "210") {
                return {
                    success: false,
                    error: "User already exits.",
                }
            } else if (resCode == "230") {
                return {
                    success: false,
                    error: "Whoops! Our server encountered some error. Please try after some time.",
                }
            }
        })
}
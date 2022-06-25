import { AX } from "../axios";

export async function login(formData) {
    return AX.post('/login', formData)
    .then((response) => {
        const data = response.data;
        const response_code = data.response_code;
        if (response_code == "200") {
            //for successful login
            return {
                success: true,
                data: data.data,
            }
        } else if (response_code == "220") {
            //for incorrect password or email
            return {
                success: false,
                error: "Incorrect password or email",
            }
        } else if (response_code == "230") {
            //for error
            return {
                success: false,
                error: "Someting went wrong",
            }
        }
    })
    .catch((error) => {
        return {
            success: false,
            error: "Someting went wrong",
        }
    });
}
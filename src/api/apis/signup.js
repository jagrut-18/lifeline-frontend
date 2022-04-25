import { AX } from "../axios";

export async function signup(formData) {
    return AX.post('/signup', formData)
    .then((response) => {
        const data = response.data;
        const response_code = data.response_code;
        if (response_code == "200") {
            return {
                success: true,
                data: data.data,
            }
        } else if (response_code == "210") {
            return {
                success: false,
                error: "This user already exists",
            }
        } else if (response_code == "230") {
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
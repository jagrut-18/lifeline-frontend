import { AX } from '../axios';


export async function createPackage(formData) {
    return AX.post('/create_package', formData)
        .then((response) => {
            const resCode = response.data.response_code;
            console.log(response.data);
            if (resCode == "200") { // success
                return {
                    responseFlag: 1
                }
            } else if (resCode == "250") {
                return {
                    responseFlag: 2,
                    message: response.data.response_message
                }
            } else {
                return {
                    responseFlag: 3,
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
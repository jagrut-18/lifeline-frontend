import { AX } from '../axios';


export async function togglePackage(formData){
    return AX.post('/toggle_package', formData)
    .then((response) => {
        const resCode = response.data.response_code;
        console.log(response.data);
        if (resCode == "200"){ // success
            return {
                success: true,
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
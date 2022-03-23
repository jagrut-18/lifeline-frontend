import { AX } from '../axios';


export async function filterPackages(formData){
    return AX.post('/filter_packages', formData)
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
import { AX } from '../axios';


export async function doctorSearch(formData){
    return AX.post('/doctorsearch', formData)
    .then((response) => {
        const resCode = response.data.response_code;
        console.log(response.data);
        if (resCode == "200"){ // success
            const data = response.data.data;
            return {
                success: true,
                data: data,
            }
        }
        else {
            return {
                success: false,
                error: response.data.data.response_message
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
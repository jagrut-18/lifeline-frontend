import { AX } from "../axios";

export async function updateReviewsRatings(formData) {
    return AX.post('/update_reviews_ratings', formData)
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
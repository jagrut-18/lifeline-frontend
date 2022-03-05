import axios from "axios";



export async function locationAutoComplete(query) {
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=us&types=place%2Cregion&access_token=pk.eyJ1IjoibGlmZWxpbmUxMSIsImEiOiJjbDAzOWRtYTAwd3c4M3FyczRxZzAzaGhvIn0.u5hxM5iqDG2Wm-Ce6OP11Q`)
        .then((response) => {
            console.log(response)
            const data = response.data;
            const features = data.features;
            var result = [];
            features.forEach(feature => {
                result.push(feature.place_name);
            });
            return {
                success: true,
                data: result,
            };
        })
        .catch((error) => {
            return {
                success: false,
                error: error,
            }
        })
}
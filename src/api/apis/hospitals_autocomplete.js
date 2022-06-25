import axios from "axios";

export async function hospitalsAutoComplete(query){
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=us&types=poi&access_token=pk.eyJ1IjoibGlmZWxpbmUxMSIsImEiOiJjbDAzOWRtYTAwd3c4M3FyczRxZzAzaGhvIn0.u5hxM5iqDG2Wm-Ce6OP11Q`)
    .then((response) => {
        const data = response.data;
        const features = data.features;
        var result = [];
        features.forEach(feature => {
            result.push({
                address: feature.place_name,
                hospital_name: feature.text,
                coordinates_lat: feature.center[0].toString(),
                coordinates_long: feature.center[1].toString(),
                map_box_id: feature.id,
                city: feature.context[1].text,
                state: feature.context[3].text,
                zipcode: feature.context[0].text,
            });
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

import Button from '@mui/material/Button';
import Styles from './styles'
import { useEffect } from 'react';

function LandingScreen() {
    const axios = require('axios');

    useEffect(() => {
        axios.get('https://data.cityofnewyork.us/api/views/kk4q-3rt2/rows.json')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    })


    return (
        <div style={Styles.container}>
            <Button variant="contained">Hello World</Button>
        </div>
    )
}

export default LandingScreen
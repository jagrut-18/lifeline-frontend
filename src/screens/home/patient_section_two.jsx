import React from 'react'
import './patient_section_two.css'
import Heading from '../../components/heading/heading'
import Description from '../../components/description/description'

function PatientSectionTwo(props) {
    return (
        <div className="home-section-2-box">
                <a className="home-section-2-heading-wrapper" onClick={() => window.open(props.url).focus()}>
                    <Heading text={props.title} style={{ fontSize: 20 }} />
                </a>
                <Description text={props.description} />
        </div>
    )
}

export default PatientSectionTwo
import React from 'react'
import Description from '../../components/description/description'

function PatientPackageDescription(props) {
  return (
    <div className="description-wrapper">
        <Description text={props.text1} style={{ fontSize: 16, fontWeight: 600, color: '#757575' }} />
        <Description text={props.text2} style={{ fontSize: 17, fontWeight: 700, color: '#535461' }} />
    </div>
  )
}

export default PatientPackageDescription
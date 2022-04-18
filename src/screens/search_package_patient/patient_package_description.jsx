import React from 'react'
import Description from '../../components/description/description'
import Spacer from '../../components/spacer'

function PatientPackageDescription(props) {
  return (
    <div className="description-wrapper">
        <Description text={props.text1} style={{ fontSize: 16, fontWeight: 600}} />
        <Spacer width={5} />
        <Description text={props.text2} style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }} />
    </div>
  )
}

export default PatientPackageDescription
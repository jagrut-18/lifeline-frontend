import React, { useState, useEffect } from 'react'

function BenefitsAllPackages(props) {
    console.log(props.medical)
    const [allBenefits, setAllBenefits] = useState("")

    useEffect(() => {
        let benefits = []
        
        if (props.medical == "Yes") {
            benefits.push("Medical")
        }

        if (props.dental == "Yes") {
            benefits.push("Dental")
        }

        if (props.vision == "Yes") {
            benefits.push("Vision")
        }

        setAllBenefits(benefits.join())

    }, [])

    return (
        <div>{allBenefits}</div>
    )
}

export default BenefitsAllPackages
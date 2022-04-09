import React, {useEffect, useState} from 'react'
import DropdownSelect from '../../../components/dropdown/dropdown'

function Dropdown(props) {
    const [packages, setPackages] = useState([])
    
    useEffect(() => {
        let tempPackages = []

        props.allPackages.forEach(element => {
            tempPackages.push(element.plan_name + " - " + element.package_id)
        });

        setPackages(tempPackages)
    }, [])

    return (
        <DropdownSelect options={packages} onChange={(option) => props.setSelectedPackage(option)}/>
    )
}

export default Dropdown
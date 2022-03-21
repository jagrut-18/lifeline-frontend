import React, { useState, useEffect } from 'react'
import './multiselect.css'
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Description from '../description/description';
import Spacer from '../spacer';

function Multiselect(props) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [benefitsObj, setBenefitsObj] = useState({})

    useEffect(() => {
        let tempBenefits = {}

        props.options.map((data) => {
            tempBenefits[data] = "No"
        })

        setBenefitsObj(tempBenefits)
    }, [])

    const selectOption = (selectedOption) => {
        let tempBenefits = benefitsObj

        if (benefitsObj[selectedOption] == "No") {
            tempBenefits[selectedOption] = "Yes"
        } else {
            tempBenefits[selectedOption] = "No"
        }

        setBenefitsObj(tempBenefits)

        props.onChange(tempBenefits)
    }


    return (
        <div className="main-multiselect-wrapper">
            <div className="options-wrapper">
                {
                    props.options.map((data, index) => (
                        <Multiselectoption key={data} data={data} selectOption={selectOption} />
                    ))
                }
            </div>
            {/* {error && <ErrorComponent message={error} />} */}
        </div>
    )
}

function Multiselectoption(props) {
    const [changeClassFlag, setChangeClassFlag] = useState(false)

    const changeClass = () => {
        if (changeClassFlag) {
            setChangeClassFlag(false)
        } else {
            setChangeClassFlag(true)
        }
    }

    return (
        <div className={`user-container ${changeClassFlag ? "selected-user" : ""}`} onClick={() => { props.selectOption(props.data); changeClass() }}>
            <div className="user-name">{props.data}</div>
            {changeClassFlag && <BsFillCheckCircleFill color='var(--primary)' size={24} />}
        </div>
    )
}

export default Multiselect
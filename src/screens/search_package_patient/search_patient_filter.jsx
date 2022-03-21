import React, { useState } from 'react'
import DropdownSelect from '../../components/dropdown/dropdown'
import Heading from '../../components/heading/heading'
import Spacer from '../../components/spacer'
import Textfield from '../../components/textfield/textfield'
import ButtonSimple from '../../components/buttonsimple/buttonsimple'

function SearchPatientFilter(props) {
    const packageType = ['Medical', 'Dental', 'Vision']
    const [packageTypeVal, setPackageType] = useState("")
    const [insuranceProvider, setInsuranceProvider] = useState("")
    const [premiumRangeStart, setPremiumRangeStart] = useState("")
    const [premiumRangeEnd, setPremiumRangeEnd] = useState("")

    //function to manage if premium end range is always greater than premium start range (if set)
    const setMinPremiumRange = (minPremiumRange) => {
        if (!isNaN(parseInt(premiumRangeEnd)) && parseInt(minPremiumRange) >= parseInt(premiumRangeEnd)) {
            setPremiumRangeStart(minPremiumRange)
            setPremiumRangeEnd((parseInt(minPremiumRange) + 100) + "")
        } else {
            setPremiumRangeStart(minPremiumRange)
        }
    }

    return (
        <div>
            <Heading text="Search doctors" />
            <Spacer height={10} />
            <div className="search-filters">
                <div className="filter-wrapper">
                    <DropdownSelect placeholder="Package Type" options={packageType} onChange={setPackageType} />
                </div>
                <div className="filter-wrapper">
                    <Textfield placeholder="Insurance Provider" value={insuranceProvider} onChange={setInsuranceProvider} />
                </div>
                <div className="filter-wrapper">
                    <Textfield placeholder="Premium Range Start" type={"number"} value={premiumRangeStart} onChange={setMinPremiumRange}  min={"0"}  step="100" />
                </div>
                <div className="filter-wrapper">
                    <Textfield placeholder="Premium Range End" type={"number"} value={premiumRangeEnd} onChange={setPremiumRangeEnd} step="100" min={(parseInt(premiumRangeStart) + 100) + ""} />
                </div>
            </div>
            <ButtonSimple text={"Search"} onClick={() => props.searchInsurances(packageTypeVal, insuranceProvider, premiumRangeStart, premiumRangeEnd)} />
            <Spacer height={20} />
        </div>
    )
}

export default SearchPatientFilter
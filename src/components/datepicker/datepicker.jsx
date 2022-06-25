import './datepicker.css';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import { useState, useEffect } from 'react';

export default function DateSelector(props) {

  const [selectedDay, setSelectedDay] = useState(null);
  let valueChange = false

  useEffect(() => {
    console.log()
    if (props.default && !valueChange) {
      setSelectedDay({
        day: props.default.getDate(),
        month: props.default.getMonth() + 1,
        year: props.default.getFullYear()
      })
    }

  }, [])


  function onChange(value) {
    // let tempValue = value.split("-")
    valueChange = true
    console.log("valuee:", value)
    setSelectedDay(value);
    props.onChange(value);
  }

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder={props.placeholder}
      value={selectedDay ? `${selectedDay.month.toString().padStart(2, '0')}-${selectedDay.day.toString().padStart(2, '0')}-${selectedDay.year}` : ''}
      style={{
        textAlign: 'left',
        paddingLeft: '15px',
        fontSize: '16px',
        border: props.errorMsg == null ? 'var(--textfield-unfocused)' : 'var(--textfield-error)',
        borderRadius: '12px',
        outline: 'none',
        height: "50px",
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)'
      }}
      className="my-custom-input-class"
    />
  )

  return (
    <div>
      <DatePicker
        value={selectedDay}
        onChange={onChange}
        renderInput={renderCustomInput}
        maximumDate={utils().getToday()}
        shouldHighlightWeekends
      />
      {props.errorMsg && <div className="error_msg">{props.errorMsg}</div>}
    </div>

  )
}
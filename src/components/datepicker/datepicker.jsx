import './datepicker.css';

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import { useState } from 'react';

export default function DateSelector(props) {
    
  const [selectedDay, setSelectedDay] = useState(null);

  function onChange(value){
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
        border: 'var(--textfield-unfocused)',
        borderRadius: '12px',
        outline: 'none',
      }}
      className="my-custom-input-class"
    />
  )

    return (
        <DatePicker
                    value={selectedDay}
                    onChange={onChange}
                    renderInput={renderCustomInput}
                    shouldHighlightWeekends
                    />
    )
}
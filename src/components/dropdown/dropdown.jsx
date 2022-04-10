import './dropdown.css';
import { MdArrowDropDown } from 'react-icons/md';
import { useState, useRef, useEffect } from 'react';

/* props:
  - options - List of strings
  - onChange - callback function after value is changed
  - placeholder
  - width
*/

export default function DropdownSelect(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (props.default) {
            setValue(props.default)
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const [optionsVisible, setOptionVisibility] = useState(false);
    const [selectedValue, setValue] = useState(null);

    const style = {
        width: props.width ?? "100%",
        ...props.styles,
    }

    function onOptionClick(option) {
        setOptionVisibility(false);
        setValue(option);
        props.onChange(option);
    }

    function onClickOutside() {
        setOptionVisibility(false);
    }

    return (
        <div ref={ref} className="dropdown_wrapper" style={style} onClick={() => setOptionVisibility(!optionsVisible)}>
            <div className={`dropdown_menu ${selectedValue == null ? '' : 'selected'}`} >
                {selectedValue == null ? (props.placeholder ?? "Select") : selectedValue}
                <MdArrowDropDown size={22} />
            </div>
            {optionsVisible &&
                <div className="dropdown_options">
                    {props.options.map(function (option, index) {
                        return <div key={index} className="option" onClick={() => onOptionClick(option)}>{option}</div>
                    })}
                </div>
            }
        </div>
    )
}

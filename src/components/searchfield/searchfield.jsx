import './searchfield.css';
import Textfield from '../textfield/textfield';
import { useEffect, useRef, useState } from 'react';

export default function Searchfield(props){
    const [optionsVisible, setOptionVisibility] = useState(false);
    const [selectedValue, setValue] = useState('');
    const ref = useRef(null);

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
      }, [ onClickOutside ]);

    function onClickOutside(){
        setOptionVisibility(false);
    }

    function onOptionClick(option){
        setValue(option);
        setOptionVisibility(false);
    }

    function onTextfieldChange(value){
        setOptionVisibility(value != '');
        setValue(value);
        if (value) {
            props.onChange(value);
        }
    }

    return (
        <div ref={ref} className="dropdown_wrapper">
            <Textfield placeholder={props.placeholder} value={selectedValue} onChange={onTextfieldChange} />
            {optionsVisible && 
                <div className="dropdown_options">
                {props.options.map(function(option) {
                   return <div key={option} className="option" onClick={() => onOptionClick(option)}>{option}</div>
                })}
            </div>
            }
        </div>
    );
}
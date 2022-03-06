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
        setValue(props.parseObjectFunction ? props.parseObjectFunction(option) : option);
        props.onOptionChange(option);
        props.onChange(props.parseObjectFunction ? props.parseObjectFunction(option) : option);
        setOptionVisibility(false);
    }

    function onTextfieldChange(value){
        setOptionVisibility(value != '');
        setValue(value);
        if (value) {
            props.onChange(value);
        }
    }

    const style = {
        ...props.style,
    }

    return (
        <div ref={ref} className="dropdown_wrapper">
            <Textfield placeholder={props.placeholder} value={selectedValue} onChange={onTextfieldChange} style={style}/>
            {optionsVisible && 
                <div className="dropdown_options">
                {props.options.map(function(option) {
                   return <div key={props.parseObjectFunction ? props.parseObjectFunction(option) : option} className="option" onClick={() => onOptionClick(option)}>{props.parseObjectFunction ? props.parseObjectFunction(option) : option}</div>
                })}
            </div>
            }
        </div>
    );
}
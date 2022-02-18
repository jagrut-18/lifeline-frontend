import './button2.css';
import LongArrow from '../../images/long_arrow.svg';


function Button2(props) {
    return (
        <button className="button">
            <span className="button-text">{props.text}</span>
            <img src={LongArrow} alt="arrow" className="long_arrow" />
        </button>
    )
}

export default Button2
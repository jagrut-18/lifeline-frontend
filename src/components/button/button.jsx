import './button.css';
import LongArrow from '../../images/long_arrow.svg';

export default function Button(props) {
    const style = {
        ...props.style,
    }
    return (
        <button className='button' style={style} onClick={props.onClick}>
            {props.text}
            <img src={LongArrow} alt="arrow" className="long_arrow" />
        </button>
    )
}
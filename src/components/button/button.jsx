import './button.css';
import LongArrow from '../../images/long_arrow.svg';

export default function Button(props) {
    const style = {
        backgroundColor: props.isLoading ? "var(--loading-background" : "var(--primary)",
        width: props.width ? props.width : '180px',
        ...props.style,
    }
    return (
        <button className='button' style={style} onClick={props.onClick}>
            {props.text}
            {
                props.isLoading
                ? <div className="loader"></div>
                : <img src={LongArrow} alt="arrow" className="long_arrow" />
            }
        </button>
    )
}
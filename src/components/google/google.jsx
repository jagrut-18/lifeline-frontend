import './google.css';
import GoogleIcon from '../../images/google.svg';

export default function Google(props) {
    const style = {
        ...props.style,
    }
    return (
        <button className="google" style={style} onClick={props.onClick}>
            <img src={GoogleIcon} alt="G" className="google_icon" />
            Google
        </button>
    )
}
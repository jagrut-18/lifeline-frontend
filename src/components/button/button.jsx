import './button.css';

export default function Button(props) {
    const style = {
        ...props.style,
    }
    return (
        <button className='button' style={style} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
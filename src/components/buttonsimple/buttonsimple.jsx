import './buttonsimple.css';

export default function ButtonSimple(props) {
    const style = {
        backgroundColor: props.isLoading ? "var(--loading-background" : "var(--primary)",
        width: props.width ? props.width : '180px',
        ...props.style,
    }

    return (
        <button className='button-simple' style={style} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
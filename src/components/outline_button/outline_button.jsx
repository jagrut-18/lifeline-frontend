
export default function OutlineButton(props) {
    const style = {
        border: "1px solid var(--primary)",
        backgroundColor: "transparent",
        color: "var(--primary)",
        borderRadius: 8,
        width: props.width ?? 150,
        height: props.height ?? 40,
        cursor: 'pointer',
        ...props.style,
    }

    return (
        <button style={style} onClick={props.onClick}>
            {props.text}
        </button>
    )
}
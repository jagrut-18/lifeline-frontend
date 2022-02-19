export default function Spacer(props) {
    const style = {
        height: props.height,
        width: props.width,
    }
    return (
        <div style={style}></div>
    )
}
export default function Spacer(props) {
    const style = {
        height: props.height,
        weight: props.weight,
    }
    return (
        <div style={style}></div>
    )
}
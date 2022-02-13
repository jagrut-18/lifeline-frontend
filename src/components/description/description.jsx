import './description.css';

export default function Description(props) {
    const style = {
        ...props.style,
    };
    return (
        <div className="description" style={style}>{props.text}</div>
    )
}
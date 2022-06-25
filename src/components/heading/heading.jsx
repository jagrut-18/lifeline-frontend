import './heading.css';

export default function Heading(props) {
    const style = {
        ...props.style,
    };

    return (
        <div className="heading" style={style}>{props.text}</div>
    )
}
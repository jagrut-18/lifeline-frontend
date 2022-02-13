import './textfield.css';

export default function Textfield(props) {
    const style = {
        ...props.style,
    }
    return (
        <input type={props.type ?? "text"} style={style} value={props.value} onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder}/>
    )
}
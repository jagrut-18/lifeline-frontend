import './textarea.css';

/* props
    - style: style object to override default style
    - value: input value
    - onChange: call function for onChange
    - placeholder
*/

export default function Textarea(props) {
    const style = {
        ...props.style,
    }
    return (
            <textarea className={`textarea ${props.errorMsg == null ? '' : 'error'}`} {...props.register} type={props.type ?? "text"} style={style} value={props.value} onChange={e => props.onChange(e.target.value)} placeholder={props.placeholder} disabled={props.disabled ?? false}/>
    )
}
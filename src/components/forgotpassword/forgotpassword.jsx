import './forgotpassword.css'

export default function ForgotPassword(props) {
    const style = {
        ...props.style,
    }
    return (
        <button className='forgot_password' style={style} onClick={props.onClick}>Forgot Password?</button>
    )
}
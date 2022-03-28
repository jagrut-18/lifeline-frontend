import './google.css';
import GoogleIcon from '../../images/google.svg';
import { useGoogleLogin } from 'react-google-login'

const clientId = '407141934996-je0jp1h451prtf8klb6pj8l11amn3jpc.apps.googleusercontent.com'
const cookiePolicy = 'single_host_origin'

export default function Google(props) {
    const style = {
        ...props.style,
    }


    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        cookiePolicy,
      })

    function onSuccess(res) {
        console.log(res.profileObj);
    }

    function onFailure(res) {
        console.log(res);
        alert(res);
    }

    return (
        <button className="google" style={style} onClick={signIn}>
            <img src={GoogleIcon} alt="G" className="google_icon" />
            Google
        </button>
    )
}
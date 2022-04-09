import './google.css';
import GoogleIcon from '../../images/google.svg';
import { useGoogleLogin } from 'react-google-login'
import saveLoginDetails from '../../auth/login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../../routing/routes';
import { API } from '../../api/api';
import { useContext } from 'react';
import { LoginStateContext } from '../../contexts';

const clientId = '407141934996-je0jp1h451prtf8klb6pj8l11amn3jpc.apps.googleusercontent.com'
const cookiePolicy = 'single_host_origin'

export default function Google(props) {
    
    const {_, setIsLoggedIn} = useContext(LoginStateContext);
    const navigate = useNavigate();
    
    const style = {
        ...props.style,
    }

    function signup(googleData) {
        if (localStorage.getItem('user_type_id') == ''){
            props.setError("Please go back and select a user type");
            return;
        };
        props.setLoading(true);
        var formData = new FormData();
        
        formData.append('email', googleData.email);
        formData.append('password', googleData.googleId);
        formData.append('user_type_id', localStorage.getItem('user_type_id'));
        
        axios.post('http://3.220.183.182:5000/signup', formData).then(function (response) {
          console.log(response.data);
          if (response.data.response_code == "200") {
            saveLoginDetails(googleData.email, response.data.data.user_id, response.data.data.token);
            localStorage.setItem("specializations", JSON.stringify(response.data.data.specialization));
            navigate(routes.onboarding1);
            props.setLoading(false);
          } else if (response.data.response_code == "210") {
            //user already exists
            props.setError("This user already exists")
            props.setLoading(false);
          } else if (response.data.response_code == "230") {
            props.setError("Something went wrong")
            props.setLoading(false);
          }
        })
        .catch(function (error) {
            props.setError("Something went wrong")
            props.setLoading(false);
            console.log(error);
        })
      }

      async function login(googleData) {
        props.setLoading(true);
        var formData = new FormData();
        formData.append('email', googleData.email);
        formData.append('password', googleData.googleId);
        
        const response = await API.login(formData);
        if (response.success) {
            saveLoginDetails(googleData.email, response.data.user_id, response.data.token);
            localStorage.setItem("user_type_id", response.data.user_type_id);
            setIsLoggedIn(true);
            navigate(routes.home);
            props.setLoading(false);
        }
        else {
            props.setLoading(false);
            props.setError(response.error);
        }
    }


    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        cookiePolicy,
      })

    function onSuccess(res) {
        console.log(res.profileObj);
        if (res.profileObj == ''){
            props.setError('Oops! Something went wrong with Google Auth.')
        }
        props.isSignup ? signup(res.profileObj) : login(res.profileObj);
    }

    function onFailure(res) {
        console.log(res);
    }

    return (
        <button className="google" style={style} onClick={signIn}>
            <img src={GoogleIcon} alt="G" className="google_icon" />
            Google
        </button>
    )
}
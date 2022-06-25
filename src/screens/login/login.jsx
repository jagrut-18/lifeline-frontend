import './login.css';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Card from '../../components/card/card';
import Textfield from '../../components/textfield/textfield';
import Spacer from '../../components/spacer';
import { useContext, useState } from 'react';
import ForgotPassword from '../../components/forgotpassword/forgotpassword';
import Button from '../../components/button/button';
import Google from '../../components/google/google';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../components/error/error';
import routes from '../../routing/routes';
import saveLoginDetails from '../../auth/login';
import { LoginStateContext } from '../../contexts';
import { regexEmail, regexPassword } from '../../utilities/regex.js';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { API } from '../../api/api';
import ReCAPTCHA from 'react-google-recaptcha';



const SITEKEY = '';
const SECRETKEY = '';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verficationCode, setVerificationCode] = useState("")
    const [validatedVerificationCode, setValidatedVerificationCode] = useState("")
    const [userDetails, setUserDetails] = useState({})
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const { _, setIsLoggedIn } = useContext(LoginStateContext);
    const navigate = useNavigate();
  
    function onChange(value) {
      setCaptchaVerified(value ? true : false);
    }

    //validate input
    function validate() {
        if (!regexEmail.test(email)) {
            setError("Invalid Email")
            return false
        }

        //password validation
        if (!regexPassword.test(password)) {
            setError("Password should have:\n· 8 or more characters required\n· Upper and lower letters required\n· At least one number required\n· At least one special character required")
            return false
        }

        //code to execute if all validations satisfy
        setError("")
        return true
    }

    async function onNext() {
        if (!captchaVerified) {
            setError('Please verify captcha first');
            return;
        }
        if (verficationCode == "") {
            if (!validate()) return;
            setLoading(true);
            var formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await API.login(formData);
            console.log(response.data);
            if (response.success) {
                const date = new Date();
                // date.setSeconds(date.getSeconds() + 60);
                date.setDate(date.getDate() + 7);
                console.log(date.getTime().toString());
                localStorage.setItem('session', date.getTime().toString())
                console.log(response)
                setVerificationCode(response.data.verification_code)
                setUserDetails({
                    user_id: response.data.user_id,
                    token: response.data.token,
                    user_type_id: response.data.user_type_id
                })
                setLoading(false);
            }
            else {
                setLoading(false);
                setError(response.error);
            }
        } else {
            if (verficationCode == validatedVerificationCode) {
                saveLoginDetails(email, userDetails.user_id, userDetails.token);
                localStorage.setItem("user_type_id", userDetails.user_type_id);
                setIsLoggedIn(true);
                navigate(routes.home);
            } else {
                setError("Verification code does not match!")
            }
        }
    }

    return (
        <div className="container">
            <Card>
                <Heading text="Login to your Account" fontSize={24} />
                <Description text="Enter your credentials here and get access to all the services we provide." />
                <Spacer height={30} />
                <div className="form">
                    <Textfield placeholder="Email address" value={email} onChange={setEmail} />
                    <Spacer height={15} />
                    <div className="password_container">
                        <Textfield type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={setPassword} />
                        <div className="password_icon" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword
                                    ? <AiFillEyeInvisible color='var(--text-secondary)' size={20} />
                                    : <AiFillEye color='var(--text-secondary)' size={20} />
                            }
                        </div>
                    </div>
                    <Spacer height={7} />
                    <ForgotPassword onClick={() => navigate(routes.forgot_password)} />
                    <Spacer height={20} />

                    {
                        verficationCode != "" ?
                            <div>
                                <Description text="Enter the code that we sent you on your email" />
                                <Spacer height={10} />
                                <Textfield type="text" placeholder="Verification Code" value={validatedVerificationCode} onChange={setValidatedVerificationCode} />
                                <Spacer height={10} />
                            </div>
                            :
                            null
                        }
                    {!captchaVerified && <ReCAPTCHA sitekey={SITEKEY} onChange={onChange} />}
                    <Spacer height={20} />
                    <Button text={verficationCode == "" ? "Next" : "Verify"} onClick={onNext} isLoading={loading} />
                </div>
                <div className="error-wrapper">
                    {error && <ErrorComponent message={error} />}
                </div>
                <Spacer height={70} />
                <Description text="Or continue with" style={{ alignSelf: "center" }} />
                <Spacer height={30} />
                <Google isSignup={false} setLoading={setLoading} setError={setError} />
            </Card>
        </div>
    )
}

export default LoginScreen

import './forgot_password.css';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Card from '../../components/card/card';
import Textfield from '../../components/textfield/textfield';
import Spacer from '../../components/spacer';
import { useState } from 'react';
import Button from '../../components/button/button';
import ErrorComponent from '../../components/error/error';
import { regexEmail, regexPassword } from '../../utilities/regex';
import { API } from '../../api/api';
import routes from '../../routing/routes';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showVerifyCode, setShowVerifyCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [showPasswordCode, setShowPasswordCode] = useState(false);
    const [reenterPassword, setReenterPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function onVerify() {
        console.log({verificationCode})
        console.log({code})
        if (verificationCode == code) {
            console.log("mai idhar hu")
            setShowPasswordCode(true)
        } else {
            setError("Verification code doesn't match")
        }
    }

    async function onSubmit() {
        if (!regexEmail.test(email)) {
            setError("Invalid Email");
            return;
        }
        setError(null);

        const formData = new FormData();
        formData.append('user_email_id', email);
        const response = await API.forgotPassword(formData);
        console.log({ response })

        if (response.success) {
            setShowVerifyCode(true);
            setVerificationCode(response.data.data.verification_code)
        }
    }

    const changePassword = async () => {
        //password validation
        if (!regexPassword.test(password)) {
            setError("Password should have:\n· 8 or more characters required\n· Upper and lower letters required\n· At least one number required\n· At least one special character required")
            return false
        }

        //code to execute if all validations satisfy
        setError("")

        const formData = new FormData();
        formData.append('user_email_id', email);
        formData.append('password', password);
        const response = await API.updatePassword(formData);
        console.log({ response })

        if (response.success) {
            alert("Password reset successfully")
            navigate(routes.login)
        }

    }

    return (
        <div className="container">
            <Card>
                <Heading text="Forgot your password?" fontSize={24} />
                <Description text={showPasswordCode ? "Enter your new password" :"Enter your email here and we will send you a code to change your password"} />
                <Spacer height={10} />
                <div className="form">
                    {
                        !showPasswordCode ?
                            <div>
                                <Textfield placeholder="Email address" value={email} onChange={setEmail} />
                                <Spacer height={10} />
                                <Button text="Submit" onClick={onSubmit} isLoading={loading} />
                                {
                                    showVerifyCode && <div>
                                        <Spacer height={30} />
                                        <Heading text="Verify your code here" fontSize={24} />
                                        <Description text="Enter the code that we sent you on the email specified above" />
                                        <Spacer height={10} />
                                        <Textfield type="text" placeholder="Verification Code" value={code} onChange={setCode} />
                                        <Spacer height={10} />
                                        <Button text="Verify" onClick={onVerify} isLoading={loading} />
                                    </div>
                                }
                            </div>
                            :
                            <div>
                                <Textfield type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={setPassword} />
                                <Spacer height={15} />
                                <Button text="Change Password" style={{width: 250}} onClick={changePassword} isLoading={loading} />
                            </div>
                    }
                </div>
                <Spacer height={10} />
                <div classme="error-wrapper">
                    {error && <ErrorComponent message={error} />}
                </div>
            </Card>
        </div>
    );
}
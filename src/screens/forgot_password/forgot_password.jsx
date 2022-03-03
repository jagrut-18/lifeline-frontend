import './forgot_password.css';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Card from '../../components/card/card';
import Textfield from '../../components/textfield/textfield';
import Spacer from '../../components/spacer';
import { useState } from 'react';
import Button from '../../components/button/button';
import ErrorComponent from '../../components/error/error';
import { regexEmail } from '../../utilities/regex';

export default function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showVerifyCode, setShowVerifyCode] = useState(false);

    function onVerify(){

    }

    function onSubmit(){
        if (!regexEmail.test(email)) {
            setError("Invalid Email");
            return;
        }
        setError(null);
        setShowVerifyCode(true);
    }

    return (
        <div className="container">
            <Card>
                <Heading text="Forgot your password?" fontSize={24} />
                <Description text="Enter your email here and we will send you a code to change your password" />
                <Spacer height={10} />
                <div className="form">
                    <Textfield placeholder="Email address" value={email} onChange={setEmail} />
                    <Spacer height={10} />
                    <Button text="Submit" onClick={onSubmit} isLoading={loading}/>
                    {
                        showVerifyCode && <div>
                            <Spacer height={30} />
                            <Heading text="Verify your code here" fontSize={24} />
                            <Description text="Enter the code that we sent you on the email specified above" />
                            <Spacer height={10} />
                            <Textfield type="text" placeholder="Verification Code" value={code} onChange={setCode} />
                            <Spacer height={10} />
                            <Button text="Verify" onClick={onVerify} isLoading={loading}/>
                        </div>
                    }
                </div>
                <div className="error-wrapper">
                    {error && <ErrorComponent message={error} />}
                </div>
            </Card>
        </div>
    );
}
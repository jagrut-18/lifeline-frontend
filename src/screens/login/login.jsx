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
import axios from 'axios';
import saveLoginDetails from '../../auth/login';
import { LoginStateContext } from '../../contexts';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginStateContext);
    const navigate = useNavigate();

    //validate input
    function validate() {
        let errorString = ""
        let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

        if (email == "" || !regexEmail.test(email)) {
            setError("Invalid Email")
            return false
        }

        let validationCount1 = 0//for 8 or more characters
        let validationCount2 = 0//lowercase letters
        let validationCount3 = 0//upper letters
        let validationCount4 = 0//At least one number
        let validationCount5 = 0//At least one specal character

        for (let i = 0; i < password.length; i++) {

            validationCount1++//for 8 characters

            if ((password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) || (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)) {
                //for uppercase
                if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                    validationCount2++
                }

                //for lowercase
                if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                    validationCount3++
                }
            }

            if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {//for numbers
                validationCount4++
            }

            if ((password.charCodeAt(i) >= 33 && password.charCodeAt(i) <= 38) || password.charAt(i) == '@') {//for special characters

                validationCount5++
            }
        }

        //Upper and lower letters, At least one number, At least one special character

        //for 8 characters
        if (validationCount1 < 8) {
            errorString += "8 or more characters required. "
        }

        //for lower case and uppercase
        if (validationCount2 == 0 || validationCount3 == 0) {
            errorString += "Upper and lower letters required.  "
        }

        //for numbers
        if (validationCount4 == 0) {
            errorString += "At least one number required.  "
        }

        //for special characters
        if (validationCount5 == 0) {
            errorString += "At least one special character required.  "
        }

        //password validation
        if (password == "" || !regexPassword.test(password)) {
            setError(errorString)
            return false
        }

        //code to execute if all validations satisfy
        setError("")
        return true
    }

    function onNext() {
        if (!validate()) return;
        setLoading(true);
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://3.220.183.182:5000/login', formData).then(function (response) {

            //for successful login
            if (response.data.response_code == "200") {
                saveLoginDetails(email, response.data.data.user_id, response.data.data.token);
                setIsLoggedIn(true);
                navigate(routes.home, { replace: true });
            } else if (response.data.response_code == "220") {
                //for incorrect password or email
                setLoading(false);
                setError("Incorrect password or email")
            } else if (response.data.response_code == "230") {
                //for error
                setLoading(false);
                setError("Someting went wrong")
            }
        })
            .catch(function (error) {
                setError("Someting went wrong")
                setLoading(false);
            })
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
                    <Textfield type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={setPassword} />
                    <Spacer height={7} />
                    <ForgotPassword />
                    <Button text="Next" onClick={onNext} isLoading={loading}/>
                </div>
                <div className="error-wrapper">
                    {error && <ErrorComponent message={error} />}
                </div>
                <Spacer height={70} />
                <Description text="Or continue with" style={{ alignSelf: "center" }} />
                <Spacer height={30} />
                <Google />
            </Card>
        </div>
    )
}

export default LoginScreen
import './signup.css';
import Heading from '../../components/heading/heading';
import Description from '../../components/description/description';
import Card from '../../components/card/card';
import Textfield from '../../components/textfield/textfield';
import Spacer from '../../components/spacer';
import { useState } from 'react';
import ForgotPassword from '../../components/forgotpassword/forgotpassword';
import Button from '../../components/button/button';
import Google from '../../components/google/google';

function SignupScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function onNext(){
      console.log(email, password);
    }

    return (
        <div className="container">
          <Card>
            <Heading text="Create your Account" fontSize={24} />
            <Description text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" />
            <Spacer height={30}/>
            <div className="form">
              <Textfield placeholder="Email address" value={email} onChange={setEmail}/>
              <Spacer height={15}/>
              <Textfield type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={setPassword}/>
            <Spacer height={7}/>
              <ForgotPassword />
              <Button text="Next" onClick={onNext}/>
            </div>
            <Spacer height={70}/>
            <Description text="Or continue with" style={{alignSelf: "center"}}/>
            <Spacer height={30}/>
            <Google />
          </Card>
        </div>
    )
}

export default SignupScreen
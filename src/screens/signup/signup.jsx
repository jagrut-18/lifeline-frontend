import { TextField, Box, Button, InputAdornment, IconButton } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from '../../themes/light_theme';
import Styles from './styles';
import { useState } from 'react';
import { ArrowForward, Visibility, VisibilityOff } from '@mui/icons-material';

function SignupScreen(){
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };

    return (
        <ThemeProvider theme={lightTheme}>
            <div style={Styles.container}>
                <Box sx={Styles.heading}>Register Your Account</Box>
                <Box sx={Styles.description}>Nostrud non sit commodo voluptate id excepteur nisi. Reprehenderit aliquip nostrud cillum reprehenderit ipsum dolore excepteur ullamco quis cupidatat irure.</Box>
                <TextField id="email_field" label="Email" variant="filled" sx={Styles.textfield} />
                <TextField id="password_field" label="Password" variant="filled" sx={Styles.textfield}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
                )
              }}
            />
                <Button variant="contained" size='large' endIcon={<ArrowForward />}>Get Started</Button>
            </div>
        </ThemeProvider>
    )
}

export default SignupScreen
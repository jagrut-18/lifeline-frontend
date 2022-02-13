import { TextField, Box } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from '../../themes/light_theme';

function SignupScreen(){
    return (
        <ThemeProvider theme={lightTheme}>
            <Box sx={{color: 'text.primary', fontSize: 36}}>Register Your Account</Box>
            <Box sx={{color: 'text.secondary'}}>Nostrud non sit commodo voluptate id excepteur nisi. Reprehenderit aliquip nostrud cillum reprehenderit ipsum dolore excepteur ullamco quis cupidatat irure.</Box>
            <TextField id="email_field" label="Email" variant="filled" />
        </ThemeProvider>
    )
}

export default SignupScreen
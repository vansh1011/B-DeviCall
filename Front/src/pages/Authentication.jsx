import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../Context/AuthContext';
import { Snackbar, Typography } from '@mui/material';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000000',
        },
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                let result = await handleRegister(name, username, password);
                setUsername('');
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
                setPassword('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', px: 2, overflowX:'hidden' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 400,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%', mb: 2 , xs:{mr:5}  }} >
                            <Button onClick={() => setFormState(0)} variant={formState === 0 ? 'contained' : 'outlined'} >
                                Sign In
                            </Button>
                            <Button onClick={() => setFormState(1)} variant={formState === 1 ? 'contained' : 'outlined'}>
                                Sign Up
                            </Button>
                        </Box>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' , xs:{mr:8} }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant="h5" color="textPrimary" sx={{xs:{mr:6}}} >
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 2, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{
                                        maxWidth: { xs: '85%', sm: '80%', md: '100%' }, // Responsive maxWidth
                                        mx: 'auto', // Centers the input field
                                    }}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    maxWidth: { xs: '85%', sm: '80%', md: '100%' }, // Responsive maxWidth
                                    mx: 'auto', // Centers the input field
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    maxWidth: { xs: '85%', sm: '80%', md: '100%' }, // Responsive maxWidth
                                    mx: 'auto', // Centers the input field
                                }}
                            />

                            {error && <Typography color="error">{error}</Typography>}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    maxWidth: { xs: '80%', sm: '80%', md: '100%' }, // Responsive maxWidth
                                    mx: 'auto', // Centers the button
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={4000} message={message} />
        </ThemeProvider>
    );
}
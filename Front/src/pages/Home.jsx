import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Paper, Container, Box, Grid } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../Context/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            {/* Navbar */}
            <AppBar position="static" color="primary">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>B-DeviCall</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="inherit" onClick={() => navigate("/history")}>
                            <RestoreIcon />
                        </IconButton>
                        <Typography variant="body1">History</Typography>
                        <Button color="inherit" onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    {/* Left Section - Join Meeting */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={6} sx={{ padding: 4, textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Join a Meeting Instantly
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                                <TextField fullWidth onChange={e => setMeetingCode(e.target.value)} label="Meeting Code" variant="outlined" />
                                <Button onClick={handleJoinVideoCall} variant='contained' color='primary'>Join</Button>
                            </Box>
                            <Typography variant="body2" color="textSecondary">Enter a meeting code to join a call</Typography>
                        </Paper>
                    </Grid>
                    
                    {/* Right Section - Start Meeting */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={6} sx={{ padding: 4, textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Start a New Meeting
                            </Typography>
                            <Button onClick={() => navigate(`/new`)} variant='contained' color='success' startIcon={<VideoCallIcon />}>
                                New Meeting
                            </Button>
                            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>Create a new meeting and share the link with others</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default withAuth(HomeComponent);

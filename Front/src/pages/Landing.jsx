import React from 'react';
import "../App.css";
import mobile from '../assets/mobile.png';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            {/* Navbar */}
            <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
        <Typography 
            variant="h6"
            sx={{ 
                fontWeight: 'bold', 
                color: '#FF8969', 
                fontSize: { xs: '1rem', md: '1.25rem' },  // Small on mobile, larger on laptops
                whiteSpace: 'nowrap', 
                mr: { xs: 2, md: 4 }  // Increase space on laptop screens
            }} 
        >
            B-DeviCall
        </Typography>
        <Box 
            sx={{ 
                display: 'flex', 
                gap: { xs: 0.5, md: 2 },  // Small gap on mobile, larger on laptops
                alignItems: 'center' 
            }}
        >
            <Button 
                variant="outlined" 
                onClick={() => router("/aljk23")}
                sx={{ 
                    fontSize: { xs: '0.7rem', md: '0.9rem' },  // Bigger on laptops
                    padding: { xs: '2px 6px', md: '6px 12px' },  // More padding on laptops
                    minWidth: { xs: '70px', md: '100px' }  // Wider buttons on laptops
                }} 
            >
                Guest
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => router("/auth")}
                sx={{ 
                    fontSize: { xs: '0.7rem', md: '0.9rem' }, 
                    padding: { xs: '2px 6px', md: '6px 12px' }, 
                    minWidth: { xs: '70px', md: '100px' }  
                }} 
            >
                Register
            </Button>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => router("/auth")}
                sx={{ 
                    fontSize: { xs: '0.7rem', md: '0.9rem' }, 
                    padding: { xs: '2px 6px', md: '6px 12px' }, 
                    minWidth: { xs: '70px', md: '100px' }  
                }} 
            >
                Login
            </Button>
        </Box>
    </Toolbar>
</AppBar>






            {/* Main Content */}
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', height: '80vh', padding: 3 }}>
                {/* Left Section */}
                <Box sx={{ textAlign: 'center', maxWidth: 500 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                        <span style={{ color: "#FF8969" }}>Connect</span> with your loved Ones
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>Cover a distance by B-DeviCall</Typography>
                    <Button variant="contained" color="primary" component={Link} to="/auth">
                        Get Started
                    </Button>
                </Box>

                {/* Right Section - Image */}
                <Box>
                    <img src={mobile} alt="Mobile UI"  className='lg:max-w-[100%] max-w-[84%] h-auto' />
                </Box>
            </Container>
        </div>
    );
}

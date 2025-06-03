import React, { useEffect, useState } from 'react';
import {
    AppBar, Box, Button, Divider, Badge, IconButton, Stack, Toolbar, Typography, useTheme, Avatar, Menu, MenuItem, Tooltip, Chip
} from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { AccountCircleOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';

const PublicAppBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const theme = useTheme();
    const [open, setOpen] = useState(false);  // Left drawer state
    const [scrolling, setScrolling] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.pageYOffset > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const loggedIn = Boolean(localStorage.getItem('token'));
        setIsLoggedIn(loggedIn);
    }, []);

    const handleDrawerToggle = () => setOpen(!open);  // Toggle left drawer
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const navLinks = [
        { to: '/jobs', label: 'Jobs' },
        { to: '/companies', label: 'Companies' },
        { to: '/services', label: 'Services' },
        
         
    ];

    const appBarStyles = {
        backdropFilter: scrolling ? 'blur(10px)' : 'blur(0px)',
        backgroundColor: '#fff',
    };

    const buttonStyle = (selected) => ({
        color: selected ? '#FF0343' : theme.palette.primary.main,
        textDecoration: 'none',
    });

    const CombinedAvatarIcon = () => (
        <Stack direction="row" alignItems="center" sx={{ ml: 2 }} spacing={1}>
            <SortIcon style={{ fontSize: '20px' }} />
            <Avatar alt="User" src="" sx={{ width: 24, height: 24 }} />
        </Stack>
    );

    return (
        <>
            <AppBar elevation={0} position="sticky" sx={appBarStyles}>
                {/* Top Toolbar */}
                <Box
                    sx={{
                        px: { md: theme.spacing(1), lg: theme.spacing(17), xs: theme.spacing(2) },
                        height: '40px',
                        pt: 0.3,
                        background: theme.palette.primary.main
                    }}
                    disableGutters
                >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} textAlign={'center'}>
                        <Typography variant='body2' sx={{ color: theme.palette.info.light, display: 'flex', alignItems: 'center',fontSize:'15px',margin:'8px' }}>
                            <CallIcon sx={{ fontSize: '23px' }} /> +916393351817
                        </Typography>
                        <Typography component={Link} to='/employeelogin' variant='body2' style={{ textDecoration: 'none', color: theme.palette.info.light,fontSize:'15px' }}>Recruiter's Login</Typography>
                    </Stack>
                </Box>
                <Divider />

                {/* Main Navigation Toolbar */}
                <Toolbar sx={{ py: '2',height:'50px' }} disableGutters>
                    <IconButton edge="start" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
                        <MenuRoundedIcon sx={{ color: theme.palette.info.dark, fontSize: '30px', fontWeight: 'bold', ml: 2 }} />
                    </IconButton>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', px: { md: theme.spacing(1), lg: theme.spacing(17), xs: theme.spacing(2) } }}>
                        <Typography variant='h7' sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                            <Link to={'/'} style={{ textDecoration: 'none', }}>
                                Smart<Typography component={'span'} sx={{ color: '#FF0343' }}>Job</Typography>
                            </Link>
                        </Typography>
                        <Stack direction={'row'} sx={{ gap: theme.spacing(2), display: { xs: 'none', md: 'block', lg: 'flex' } }}>
                            {navLinks.map(link => (
                                <Typography
                                    key={link.to}
                                    component={Link}
                                    to={link.to}
                                    fontSize={{ xs: '14px', sm: '16px', md: '20px' }}
                                    
                            
                                    sx={buttonStyle(pathname === link.to)}
                                >
                                    {link.label}
                                </Typography>
                            ))}
                        </Stack>
                        <Stack direction={'row'} gap={theme.spacing(2)}>
                            <IconButton size="small" aria-label="show 4 new mails" color="primary">
                                <Badge size="small" badgeContent={4} color="error">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="primary"
                            >
                                <Badge size="small" badgeContent={17} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            {isLoggedIn ? (
                                <Stack direction={'row'} spacing={1}>
                                    <Button variant='none' size='small' sx={{ fontSize: '10px', '&:hover': { backgroundColor: '#FF0343' }, backgroundColor: '#FF0343' }} onClick={() => navigate('/condidateregister')}>
                                        Register
                                    </Button>
                                    <Button variant='none' size='small' sx={{ fontSize: '10px', '&:hover': { color: '#FF0343' }, border: '1px solid #FF0343', color: '#FF0343' }} onClick={() => navigate('/condidatelogin')}>
                                        Login
                                    </Button>
                                </Stack>
                            ) : (
                                <Chip 
                                    avatar={<CombinedAvatarIcon />}
                                    onClick={handleMenuOpen}
                                    variant="outlined"
                                />
                            )}
                        </Stack>
                    </Box>
                </Toolbar>
                <Divider />

                {/* User Menu */}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Stack sx={{ width: 300, height: '83vh' }}>
                        <Stack direction={'row'} justifyContent={'center'} sx={{ py: 2 }} spacing={2}>
                            <Tooltip>
                                <Avatar
                                    variant='circular'
                                    style={{ height: '70px', width: '70px', border: '3px solid #dd5' }}
                                />
                            </Tooltip>
                            <Box>
                                <Typography variant='body2' sx={{ fontWeight: 'bold', mt: theme.spacing(1) }}>
                                    Amit Kumar
                                </Typography>
                                <Typography variant='body1' sx={{ mt: theme.spacing(1) }}>
                                    Full Stack Web Developer
                                </Typography>
                                <Typography variant='body1' sx={{ mt: 1 }}>
                                    amitk221003@gmail.com
                                </Typography>
                            </Box>
                        </Stack>
                        <Divider />

                        <Box sx={{ my: 1 }}>
                            <MenuItem onClick={handleClose}>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <AccountCircleOutlined sx={{ fontSize: '20px', color: '#afafaf' }} />
                                    <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>
                                        Profile
                                    </Link>
                                </Stack>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <SettingsOutlined sx={{ fontSize: '20px', color: '#afafaf' }} />
                                    <Link to="/setting" style={{ textDecoration: 'none', color: '#333' }}>
                                        Setting
                                    </Link>
                                </Stack>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    <LogoutOutlined sx={{ fontSize: '20px', color: '#afafaf' }} />
                                    <Box fullWidth color="error" variant="none" onClick={handleLogout}>
                                        Logout
                                    </Box>
                                </Stack>
                            </MenuItem>
                        </Box>
                    </Stack>
                </Menu>
            </AppBar>
        </>
    );
};

export default PublicAppBar;

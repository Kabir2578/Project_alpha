import React, { useState, useMemo } from 'react';
import { Box, Button, Grid, Typography, TextField, Stack, Card, CardContent, IconButton, InputAdornment, Divider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = useMemo(() => yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(6, 'Password should be at least 6 characters').max(8, 'Password should not exceed 8 characters').required('Password is required'),
    }), []);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const resultAction = await dispatch((values));
                const result = unwrapResult(resultAction);

                toast[result?.Status ? 'success' : 'error'](result?.message);
                if (result?.Status) {
                    navigate('/');
                    resetForm();
                }
            } catch (error) {
                toast.error(error.message || "Login failed. Please try again.");
            }
        },
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <>
            <ToastContainer position='top-right' />
            <Box sx={{
                position: 'relative',
                background: 'pink',
                height: { md: '89vh', xs: '80vh' },
                width: '100%',
                backgroundAttachment: 'fixed'
            }}>
                <Box sx={{
                    position: 'absolute', backdropFilter: 'blur(5px)', width: '100%', height: '100%'
                }}>
                    <Grid container spacing={1} justifyContent={'space-between'} sx={{ px: { md: 17, xs: 1 }, mt: { md: 15, xs: 2 } }}>
                        <Grid item xs={12} md={8} sx={{ display: { md: "block", xs: 'none' } }}>
                            {/* Add your custom design here */}
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Card elevation={0} sx={{ p: 1, m: { md: 0, xs: 1 }, backdropFilter: 'blur(10px)', }}>
                                <CardContent component="form" onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" sx={{ px: 3 }}>
                                        <Typography variant='h6' fontWeight={'bold'} textAlign={'center'}>Employer's Login</Typography>
                                        <Divider sx={{
                                            my: 1,
                                            backgroundColor: '#b71c1c'
                                        }} />
                                        <Stack direction={'column'}>
                                            <Typography variant='body2' sx={{ my: 1, textAlign: 'left' }}>Email:</Typography>
                                            <TextField
                                                sx={{ border: '1px solid #9e9e9e' }}
                                                {...formik.getFieldProps('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                size="small"
                                                fullWidth
                                                placeholder="Email Address"
                                                autoComplete='off'
                                            />
                                        </Stack>
                                        <Stack direction={'column'}>
                                            <Typography variant='body2' sx={{ my: 1, textAlign: 'left' }}>Password:</Typography>
                                            <TextField
                                                sx={{ border: '1px solid #9e9e9e' }}
                                                {...formik.getFieldProps('password')}
                                                error={formik.touched.password && Boolean(formik.errors.password)}
                                                helperText={formik.touched.password && formik.errors.password}
                                                size="small"
                                                placeholder="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                size="small"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Stack>
                                        <Stack direction={'column'} sx={{ mt: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Button
                                                type="submit"
                                                size="small"
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    my: 1,
                                                    p: 1,
                                                    transition: '0.5s ease-out',
                                                    background: 'secondary.main',
                                                    '&:hover': {
                                                        background: 'secondary.main',
                                                    }
                                                }}
                                            >
                                                Login
                                            </Button>
                                            <Typography><Link to='/forgetpassword' style={{ textDecoration: 'none', fontSize: '12px', color: '#000', }}>
                                                Forget Password?
                                            </Link></Typography>
                                        </Stack>
                                        <Typography sx={{ color: '#000', mt: 1 }}>
                                            Are you a new client? <Link to='/employeeregister' style={{ color: 'secondary.dark', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>- Register Now!</Link>
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default EmployeeLogin;

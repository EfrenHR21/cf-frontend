/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { FC, useContext, useEffect, useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

import { useToasts } from 'react-toast-notifications';
import { responsePayload } from '../../services/api';
import validator from 'validator';
import Router, { useRouter } from 'next/router';
import { Context } from '../../context';
import { User } from '@/services/User.service';

interface IRegisterLoginProps {
    isRegisterForm?: boolean;
}

const initalForm = {
	email: '',
	password: '',
	confirmPassword: '',
	name: '',
};


const RegisterLogin: FC<IRegisterLoginProps> = ({ isRegisterForm = false}) => {
    const { addToast } = useToasts();
	const [authForm, setAuthForm] = React.useState(initalForm);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isLoadingForgotPwd, setIsLoadingForgotPwd] = React.useState(false);
	const [otpTime, setOtpTime] = React.useState(true);
	const [otpForm, setOtpForm] = React.useState({ email: '', otp: '' });

    const router = useRouter();

    const {
		state: { user },
		dispatch,
	} = useContext(Context);

    useEffect(() => {
		if (user && user.email) {
			Router.push('/my-account'); 
		}
	}, [router, user]);

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
		try {
			const { email, name, password, confirmPassword } = authForm;
			if (!name) {
				throw new Error('Invalid name');
			}
			if (!validator.isEmail(email)) {
				throw new Error('Invalid email');
			}
			if (password !== confirmPassword) {
				console.error('Invalid password', password, confirmPassword);
				throw new Error('Password does not match');
			}
			if (password.length < 6) {
				throw new Error('Password is too short. Minimum 6 characters');
			}
			
			const payload = {
				email,
                name,
                password,
                type: 'customer',
			};

			const { success, message } = await User.createUsers(payload);
			if (success) {
            setAuthForm(initalForm); 
			setOtpForm({ otp:'', email: payload.email });
			setOtpTime(true);
			return addToast(message, { appearance: 'success'});
            }
            throw new Error(message || 'Algo salio mal');
            
		} catch (error: any) {
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			return addToast(error.message, { 
                appearance: 'error', 
                autoDismiss: true,
            });
		} finally {
			setIsLoading(false);
		}
    };

    const handleLogin =  async (e: any) => {
        e.preventDefault();
		try {
            setIsLoading(true);
			const { email, password } = authForm;
			if (!email || !password) {
				throw new Error('Invalid email or password');
			}
			if (!validator.isEmail(email)) {
				throw new Error('Invalid email');
			}
			if (password.length < 6) {
				throw new Error('Password is too short. Minimum 6 characters');
			}
			
			const payload = {
				email,
				password,
			};

			const { success, result } = await User.loginUser(payload);

            if (success)  {
                setAuthForm(initalForm);
                localStorage.setItem('_cf_user', JSON.stringify(result?.user));
                dispatch({
                    type: 'LOGIN',
                    payload: result?.user,
                });
                router.push('/my-account');
                return addToast(message, {appearance: 'success'});
            }
            throw new Error(message || 'Algo salio mal');

		} catch (error: any) {
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			return addToast(error.message, { 
                appearance: 'error', 
                autoDismiss: true 
            });
        }finally {
			setIsLoading(false);
		}
    };

    const resendOtp = async (e: any) => {
        try {
            e.preventDefault();
            setIsLoading(true);
			const { email } = otpForm;
			if (!email) {
				throw new Error('Ingrese su email');
			}
			if (!validator.isEmail(email)){
                throw new Error('Ingrese un email valido');
            }
			const { success, message } = await User.resendOtp( email );
            if (success)  {
                setOtpTime(true);
                return addToast(message, {appearance: 'success'});
            }
            throw new Error(message || 'Algo salio mal');
		} catch (error: any) {
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			return addToast(error.message, { 
                appearance: 'error', 
                autoDismiss: true 
            });
		} finally {
			setIsLoading(false);
		}
    }

    const verifyOtp = async (e: any) => {
		try {
            e.preventDefault();
            setIsLoading(true);
            const {otp, email } = otpForm;
			if (!otp || !email) {
				throw new Error('Por favor ingresa tu email y otp');
			}
			const data = await User.verifyOtp(otp,email);
			if (data?.success){
                setOtpTime(false);
                setOtpForm({otp: '', email: ''});
                return addToast(data?.message, { appearance: 'success' });
            }
            throw new Error(data?.message || 'Algo salio mal');
		} catch (error: any) {
            console.error(error);
			if (error.response) {
				return addToast(error.response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}
			addToast(error.message, { appearance: 'error', autoDismiss: true });
		} finally {
			setIsLoading(false);
		}
    }

    return (
     <Card>
        <Card.Header> {isRegisterForm ? 'Register' : 'Login'}</Card.Header>
        <Card.Body>
            {isRegisterForm && (
                <Form.Group className='mb-3'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder='Enter Full Name' 
                    value={authForm.name}
                    onChange={(e) => 
                        setAuthForm ({ ...authForm, name: e.target.value })
                    }
                    />
                </Form.Group>
                )}
                <Form.Group className='mb-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    value={authForm.email || otpForm.email}
                    onChange={(e) => 
                        setAuthForm ({ ...authForm, email: e.target.value })
                    }
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Enter password' 
                    value={authForm.password}
                    onChange={(e) => 
                        setAuthForm ({ ...authForm, password: e.target.value })
                    }
                    />
                </Form.Group>
                { isRegisterForm && (
                <Form.Group className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Confirm password' 
                    value={authForm.confirmPassword}
                    onChange={(e) => 
                        setAuthForm ({ ...authForm, confirmPassword: e.target.value })
                    }
                    />
                </Form.Group>
                )}
                {otpTime && (
                    <Form.Group className='mb-3'>
                        <Form.Label>OTP</Form.Label>
                        <Form.Control 
                        type='text'
                        placeholder='Enter OTP'
                        value={otpForm.otp}
                        onChange={(e) => setOtpForm({ ...otpForm, otp: e.target.value})}
                        />
                        <Button variant='link' className='resendOtpBtn' onClick={(e) => resendOtp(e)}>
                            Resend OTP
                            </Button>
                    </Form.Group>
                )}
                { otpTime ? (
                    <Button className='btnAuth' variant='info' onClick={(e) => verifyOtp(e)}>
                    Verificar
                </Button>
            ) : (
            <Button 
            className='btnAuth' 
            variant='info' 
            onClick={(e) => (isRegisterForm ? handleRegister(e) : handleLogin(e))}>
                {isRegisterForm ? 'Register' : 'Login'}
                </Button>
                ) }
                
                {!isRegisterForm && (
                    <a style={{textDecoration: 'none'}} href='/forgot-password'>
                        Olvide Contaseña 
                    </a>
                )}
        </Card.Body>
    </Card> 
    );
            };   

export default RegisterLogin;
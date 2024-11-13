/* eslint-disable @typescript-eslint/no-explicit-any */
import Api, { responsePayload } from './api';

// create user service
export const User = {
	getUser: async (): Promise<responsePayload> => await Api.get('/users'),
    createUsers: async (user: Record<string, any>): Promise<responsePayload> => 
		await Api.post('/users', user),
	updateUsers: async (
        id: string, 
        user: Record<string, any>
    ): Promise<responsePayload> => await Api.put('/users/' + id, user),
	loginUser: async (user: Record<string, any>): Promise<responsePayload> => 
        await Api.post('/users/login', user),
    logoutUser: async (user: Record<string, any>): Promise<responsePayload> => 
        await Api.put('/users/logout', user),
    forgotPassword: async (email: string): Promise<responsePayload> => 
        await Api.get('/users/forgot-password/' + email),
    resendOtp: async (email: string): Promise<responsePayload> => 
        await Api.get('/users/send-otp-email/' + email),
    verifyOtp: async (otp: string, email: string): Promise<responsePayload> => 
        await Api.get('/users/verify-email' + otp + '/' + email),
};
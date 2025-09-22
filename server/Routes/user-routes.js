import express from 'express';
import {Signup, Login, requestForOTP, verifyOTP, resetPassword} from '../Controllers/user-controller.js'


const app = express.Router();
app.post('/register', Signup)
app.post('/login', Login)
app.post('/request-for-otp', requestForOTP)
app.post('/verify-otp', verifyOTP)
app.post('/reset-password', resetPassword)

export default app
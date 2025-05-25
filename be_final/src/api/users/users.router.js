import express from 'express';
import {registerUser, loginUser, getInforUser, updateProfile} from './users.controller.js'
const userRoute = express.Router();
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/me',getInforUser);
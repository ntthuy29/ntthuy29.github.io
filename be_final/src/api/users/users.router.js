import express from 'express';
import {registerUser, loginUser, getInforUser, updateProfile} from './users.controller.js'
import { authToken } from '../../middlewares/users.middlewares.js';
const userRoute = express.Router();
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/me',authToken,getInforUser);
userRoute.patch('/me',authToken,updateProfile);
export default userRoute;
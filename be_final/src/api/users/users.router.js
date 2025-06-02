import express from 'express';
import {registerUser, loginUser, getInforUser, updateProfile,getAllUser, deleteUser, getTaskofUser, updateStatusTask} from './users.controller.js'
import { authToken } from '../../middlewares/users.middlewares.js';
const userRoute = express.Router();
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/me',authToken,getInforUser);
userRoute.patch('/me',authToken,updateProfile);
userRoute.get('/', getAllUser);
userRoute.delete('/:id', authToken, deleteUser);
userRoute.get('/tasks', authToken, getTaskofUser); 
userRoute.patch('/tasks/:subboardId',authToken,  updateStatusTask); 
export default userRoute;
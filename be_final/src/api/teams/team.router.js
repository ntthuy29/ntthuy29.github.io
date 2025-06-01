import express from 'express';
import { addUser, deleteUser,addTeam } from './team.controller.js';
import userRoute from '../users/users.router.js';
import { authToken } from '../../middlewares/users.middlewares.js';
import isAdmin from '../../middlewares/isAdmin.js';
const teamRoute = express.Router();
teamRoute.post('/', isAdmin,addUser);
teamRoute.post('/:id',isAdmin, deleteUser);
teamRoute.post('/addTeam',isAdmin, authToken, addTeam);

export default userRoute;
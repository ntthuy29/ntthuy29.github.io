import express from 'express';
import { addUser, deleteTeam,createTeam, removeUser, membersOfTeam, getAllTeams } from './team.controller.js';
import userRoute from '../users/users.router.js';
import { authToken } from '../../middlewares/users.middlewares.js';
import {isAdmin} from '../../middlewares/admin.middlewares.js';
const teamRoute = express.Router();
teamRoute.post('/', isAdmin,createTeam);
teamRoute.get('/', getAllTeams);
teamRoute.get('/:teamId', membersOfTeam);
teamRoute.post('/removeUser/:teamId', isAdmin, removeUser);
teamRoute.post('/:id',isAdmin, deleteTeam);
teamRoute.post('/addUser/:teamId', isAdmin, addUser);
// teamRoute.post('/addTeam',isAdmin, authToken,createTeam);

export default teamRoute;
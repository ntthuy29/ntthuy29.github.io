import express from 'express'
const taskRoute = express.Router();
import {createTask, getTask, getTaskById, updateTask, deleteTask, addTasktoTeam} from './tasks.controller.js'
import { isAdmin } from '../../middlewares/admin.middlewares.js';
import subboardRoute from '../subboards/subboards.router.js';
import commentRoute from '../comments/comment.routers.js';
taskRoute.post('/',isAdmin,createTask);
taskRoute.get('/',getTask);
taskRoute.get('/:id',getTaskById);
taskRoute.patch('/:id',isAdmin,updateTask);
taskRoute.delete('/:id',isAdmin,deleteTask);
// taskRoute.use('/:taskId/subboards', subboardRoute);
taskRoute.use('/:taskId/comments', commentRoute);
taskRoute.post('/:taskId/addTaskToTeam', isAdmin, addTasktoTeam);
export default taskRoute;

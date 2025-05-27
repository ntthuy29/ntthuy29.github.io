import express from 'express';
const commentRoute = express.Router({ mergeParams: true });
import {createComment} from './comment.controller.js';
import { authToken } from '../../middlewares/users.middlewares.js';
import { isAdmin } from '../../middlewares/admin.middlewares.js';
commentRoute.post('/', isAdmin, createComment);


commentRoute.use(express.json());
export default commentRoute;
import express from 'express';
import { isAdmin } from '../../middlewares/admin.middlewares.js';
const subboardRoute = express.Router({ mergeParams: true });
subboardRoute.use(express.json());
import {addBoard, updateSubBoard, deleteSubBoard} from './subboard.controller.js';
subboardRoute.post("/",isAdmin, addBoard);
subboardRoute.patch("/:idSB", isAdmin, updateSubBoard);
subboardRoute.delete("/:idSB", isAdmin, deleteSubBoard);
export default subboardRoute;
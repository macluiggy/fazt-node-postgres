import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller";
const router = Router();

router.route('/').post(createTask).get(getTasks)
router.route('/:id').delete(deleteTask).put(updateTask)

export default router;
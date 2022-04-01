import { Router } from "express";
import { createTask, deleteTask, getOneTask, getTaskByProject, getTasks, updateTask } from "../controllers/task.controller";
const router = Router();

router.route('/').post(createTask).get(getTasks)
router.route('/:id').delete(deleteTask).put(updateTask).get(getOneTask)
router.route('/project/:projectid').get(getTaskByProject)

export default router;
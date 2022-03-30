import { Router } from "express";
import { createTask } from "../controllers/task.controller";
const router = Router();

router.route('/').post(createTask)

export default router;
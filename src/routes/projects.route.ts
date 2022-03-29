import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller";
const router = Router();

// /api/projects
router.route("/").post(createProject).get(getProjects)

export default router;
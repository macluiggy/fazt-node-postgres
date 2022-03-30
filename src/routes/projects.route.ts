import { Router } from "express";
import {
  createProject,
  deleteProject,
  getOneProject,
  getProjects,
  projectById,
  updateProject,
} from "../controllers/project.controller";
const router = Router();

// /api/projects
router.route("/").post(createProject).get(getProjects);
router
  .route("/:projectId")
  .get(getOneProject)
  .delete(deleteProject)
  .put(updateProject);

router.param("projectId", projectById);

export default router;

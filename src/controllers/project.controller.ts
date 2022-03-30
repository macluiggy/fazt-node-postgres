import { RequestWithProjectId, TProject } from "./types";
import Project from "../models/Project";
import { Model } from "sequelize/types";
import {
  NextFunction,
  RequestHandler,
  RequestParamHandler,
  Response,
} from "express";

const createProject: RequestHandler = async (req, res) => {
  try {
    console.log(req.body);
    const { name, priority, deliverydate, description, id } = req.body;
    let newProject = await Project.create(
      {
        name,
        priority,
        deliverydate,
        description,
      },
      {
        fields: ["name", "priority", "deliverydate", "description"],
      }
    );

    if (!newProject) {
      res.status(400).json({
        ok: false,
        message: "Error creating project",
      });
    }
    res.send({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error creating project",
    });
  }
};

const getProjects: RequestHandler = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "priority", "deliverydate", "description"],
    });
    if (!projects) {
      res.status(400).json({
        ok: false,
        message: "Error getting projects",
      });
    }
    return res.send({
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting projects",
    });
  }
};

const deleteProject = async (req: RequestWithProjectId, res: Response) => {
  try {
    const project = req.project!;
    if (!project) {
      res.status(400).json({
        ok: false,
        message: "Error deleting project",
      });
    }
    const rowCount = await project.destroy();
    // const rowCount =  await Project.destroy({where: {id: project.id}});
    return res.json({
      message: "Project deleted successfully",
      dataDeleted: project,
      rowCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error deleting project",
    });
  }
};

const getOneProject = async (req: RequestWithProjectId, res: Response) => {
  try {
    const project = req.project;
    if (!project) {
      return res.status(400).json({
        ok: false,
        message: "Error getting project",
      });
    }
    return res.send({
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting project",
    });
  }
};

const updateProject = async (req: RequestWithProjectId, res: Response) => {
  try {
    const project = req.project!;
    if (!project) {
      res.status(400).json({
        ok: false,
        message: "Error updating project, project not found",
      });
    }
    const { name, priority, deliverydate, description } = req.body;
    await project.update({
      name,
      priority,
      deliverydate,
      description,
    });
    return res.json({
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error updating project",
    });
  }
};

const projectById = async (
  req: RequestWithProjectId,
  res: Response,
  next: NextFunction,
  id: number
) => {
  try {
    const project = await Project.findOne<Model<TProject>>({
      where: { id },
      // attributes: ["id", "name", "priority", "deliverydate", "description"],
    });
    if (!project) {
      return res.status(400).json({
        ok: false,
        message: `Error getting project, project with id ${id} not found`,
      });
    }
    req.project = project!;
    // return res.json({
    //   msg: req.project
    // })
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting project",
    });
  }
};
export {
  createProject,
  getProjects,
  projectById,
  getOneProject,
  deleteProject,
  updateProject,
};

import { Handler } from "./types";
import Project from "../models/Project";

const createProject: Handler = async (req, res) => {
  try {
    console.log(req.body);
    const { name, priority, deliverydate, description, id } = req.body;
    let newProject = await Project.create({
      name,
      priority,
      deliverydate,
      description,
    }, {
      fields: ["name", "priority", "deliverydate", "description"],
    });

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
      
    })
  }
};
const getProjects: Handler = async (req, res) => {
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
    })
  }
}

export { createProject, getProjects };

import { RequestHandler } from "express";
import Task from "../models/Tasks";

const createTask: RequestHandler = async (req, res) => {
  try {
    const { name, done, projectid } = req.body;
    let newTask = await Task.create(
      {
        name,
        done,
        projectid,
      },
      {
        fields: ["name", "done", "projectid"],
      }
    );

    return res.json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error creating task",
    });
  }
};

const getTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "done", "projectid"],
      order: [["id", "ASC"]],
    });
    return res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting tasks",
    });
  }
};

const getOneTask: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
      attributes: ["id", "name", "done", "projectid"],
    });
    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Task not found",
      });
    }
    return res.json({
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting task",
    });
  }
};

const updateTask: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done, projectid } = req.body;
    const updatedTask = await Task.update(
      {
        name,
        done,
        projectid,
      },
      {
        where: { id },
        fields: ["name", "done", "projectid"],
      }
    );
    if ( !updatedTask[0] ) {
      return res.status(404).json({
        ok: false,
        message: "Task not found",
      });
    }

    return res.json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error updating task",
    });
  }
};

const deleteTask: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id,
      },
    });
    return res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error deleting task",
    });
  }
};

const getTaskByProject: RequestHandler = async (req, res) => {
  try {
    const { projectid } = req.params;
    const tasks = await Task.findAll({
      where: { projectid },
      attributes: ["id", "name", "done", "projectid"],
      order: [["id", "ASC"]],
    });
    if (!tasks) {
      return res.status(404).json({
        ok: false,
        message: `No tasks found for project with id: ${projectid}`,
      });
      
    }
    return res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting tasks",
    });
  }
};

export {
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
  getTaskByProject,
  getTasks,
};

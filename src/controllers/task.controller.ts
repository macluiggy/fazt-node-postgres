import { RequestHandler } from "express";
import Task from "../models/Tasks";

const createTask: RequestHandler = async (req, res) => {
  try {
    const { name, done, projectid } = req.body;
    let newTask = await Task.create({
      name,
      done,
      projectid,
    }, {
      fields: ["name", "done", "projectid"],
    })

    return res.json({
      message: "Task created successfully",
      data: newTask,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error creating task",
    })
    
  }
}

const getTasks: RequestHandler = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "done", "projectid"],
      
    })
    return res.json({
      message: "Tasks retrieved successfully",
      data: tasks,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting tasks",
    })
  }
}

const  getOneTask: RequestHandler = async (req, res) => {

}

const updateTask: RequestHandler = async (req, res) => {

}

const deleteTask: RequestHandler = async (req, res) => {

}

const getTaskByProject: RequestHandler = async (req, res) => {

}

export { createTask, getOneTask, updateTask, deleteTask, getTaskByProject };
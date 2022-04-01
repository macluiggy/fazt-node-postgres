"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var express = require("express");
var morgan = require("morgan");
var Sequelize = require("sequelize");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var morgan__default = /* @__PURE__ */ _interopDefaultLegacy(morgan);
var Sequelize__default = /* @__PURE__ */ _interopDefaultLegacy(Sequelize);
const sequelize = new Sequelize.Sequelize("postgres", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 3e4
  },
  logging: false
});
const Task = sequelize.define("tasks", {
  id: {
    type: Sequelize__default["default"].INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize__default["default"].TEXT
  },
  done: {
    type: Sequelize__default["default"].BOOLEAN
  },
  projectid: {
    type: Sequelize__default["default"].INTEGER
  }
}, {
  timestamps: false
});
const Project = sequelize.define("project", {
  id: {
    type: Sequelize__default["default"].INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize__default["default"].TEXT
  },
  priority: {
    type: Sequelize__default["default"].INTEGER
  },
  description: {
    type: Sequelize__default["default"].TEXT
  },
  deliverydate: {
    type: Sequelize__default["default"].DATE
  }
}, {
  timestamps: false
});
Project.hasMany(Task, { foreignKey: "projectid", sourceKey: "id" });
Task.belongsTo(Project, { foreignKey: "projectid", targetKey: "id" });
const createProject = async (req, res) => {
  try {
    console.log(req.body);
    const { name, priority, deliverydate, description, id } = req.body;
    let newProject = await Project.create({
      name,
      priority,
      deliverydate,
      description
    }, {
      fields: ["name", "priority", "deliverydate", "description"]
    });
    if (!newProject) {
      res.status(400).json({
        ok: false,
        message: "Error creating project"
      });
    }
    res.send({
      message: "Project created successfully",
      data: newProject
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error creating project"
    });
  }
};
const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      attributes: ["id", "name", "priority", "deliverydate", "description"]
    });
    if (!projects) {
      res.status(400).json({
        ok: false,
        message: "Error getting projects"
      });
    }
    return res.send({
      message: "Projects retrieved successfully",
      data: projects
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting projects"
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const project = req.project;
    if (!project) {
      res.status(400).json({
        ok: false,
        message: "Error deleting project"
      });
    }
    const rowCount = await project.destroy();
    return res.json({
      message: "Project deleted successfully",
      dataDeleted: project,
      rowCount
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error deleting project"
    });
  }
};
const getOneProject = async (req, res) => {
  try {
    const project = req.project;
    if (!project) {
      return res.status(400).json({
        ok: false,
        message: "Error getting project"
      });
    }
    return res.send({
      message: "Project retrieved successfully",
      data: project
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting project"
    });
  }
};
const updateProject = async (req, res) => {
  try {
    const project = req.project;
    if (!project) {
      res.status(400).json({
        ok: false,
        message: "Error updating project, project not found"
      });
    }
    const { name, priority, deliverydate, description } = req.body;
    await project.update({
      name,
      priority,
      deliverydate,
      description
    });
    return res.json({
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error updating project"
    });
  }
};
const projectById = async (req, res, next, id) => {
  try {
    const project = await Project.findOne({
      where: { id }
    });
    if (!project) {
      return res.status(400).json({
        ok: false,
        message: `Error getting project, project with id ${id} not found`
      });
    }
    req.project = project;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting project"
    });
  }
};
const router$1 = express.Router();
router$1.route("/").post(createProject).get(getProjects);
router$1.route("/:projectId").get(getOneProject).delete(deleteProject).put(updateProject);
router$1.param("projectId", projectById);
const createTask = async (req, res) => {
  try {
    const { name, done, projectid } = req.body;
    let newTask = await Task.create({
      name,
      done,
      projectid
    }, {
      fields: ["name", "done", "projectid"]
    });
    return res.json({
      message: "Task created successfully",
      data: newTask
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error creating task"
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "name", "done", "projectid"],
      order: [["id", "ASC"]]
    });
    return res.json({
      message: "Tasks retrieved successfully",
      data: tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting tasks"
    });
  }
};
const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      where: { id },
      attributes: ["id", "name", "done", "projectid"]
    });
    if (!task) {
      return res.status(404).json({
        ok: false,
        message: "Task not found"
      });
    }
    return res.json({
      message: "Task retrieved successfully",
      data: task
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting task"
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, done, projectid } = req.body;
    const updatedTask = await Task.update({
      name,
      done,
      projectid
    }, {
      where: { id },
      fields: ["name", "done", "projectid"]
    });
    if (!updatedTask[0]) {
      return res.status(404).json({
        ok: false,
        message: "Task not found"
      });
    }
    return res.json({
      message: "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error updating task"
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({
      where: {
        id
      }
    });
    return res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error deleting task"
    });
  }
};
const getTaskByProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const tasks = await Task.findAll({
      where: { projectid },
      attributes: ["id", "name", "done", "projectid"],
      order: [["id", "ASC"]]
    });
    if (!tasks) {
      return res.status(404).json({
        ok: false,
        message: `No tasks found for project with id: ${projectid}`
      });
    }
    return res.json({
      message: "Tasks retrieved successfully",
      data: tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error getting tasks"
    });
  }
};
const router = express.Router();
router.route("/").post(createTask).get(getTasks);
router.route("/:id").delete(deleteTask).put(updateTask).get(getOneTask);
router.route("/project/:projectid").get(getTaskByProject);
const app = express__default["default"]();
app.use(morgan__default["default"]("dev"));
app.use(express__default["default"].json());
app.use("/api/projects", router$1);
app.use("/api/tasks", router);
async function main() {
  let port = process.env.PORT || 3e3;
  if (process.env.NODE_ENV !== "dev") {
    await app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}
main().catch((err) => console.log(err));
const viteNodeApp = app;
exports.viteNodeApp = viteNodeApp;

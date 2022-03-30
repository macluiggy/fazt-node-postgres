import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Task from "./Tasks";

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.TEXT,
  },
  priority: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  deliverydate: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});

Project.hasMany(Task, { foreignKey: "projectid", sourceKey: "id" }); // foreignKey es en donde se pone el valor de la columna de la tabla Tasks y sourceKey es de donde se pone ese valor en la columna de Task proveniente de Project.id
Task.belongsTo(Project, { foreignKey: "projectid", targetKey: "id" });

export default Project;
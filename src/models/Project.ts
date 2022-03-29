import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import Tasks from "./Tasks";

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

Project.hasMany(Tasks, { foreignKey: "projectId" });

export default Project;
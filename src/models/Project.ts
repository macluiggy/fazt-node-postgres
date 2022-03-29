import Sequilize from "sequelize";
import { sequelize } from "../database/database";

const project = sequelize.define("project", {
  id: {
    type: Sequilize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequilize.TEXT,
  },
  priority: {
    type: Sequilize.INTEGER,
  },
  description: {
    type: Sequilize.TEXT,
  },
  deliverydate: {
    type: Sequilize.DATE,
  },
});

export default project;
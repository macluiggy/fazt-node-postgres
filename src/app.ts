import express from "express";
import morgan from "morgan";

// routes
import projectsRouter from "./routes/projects.route";
import tasksRouter from "./routes/tasks.route";

// initialize express app
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);

export default app;
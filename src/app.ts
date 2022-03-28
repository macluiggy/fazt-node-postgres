import express from 'express';
import morgan from 'morgan';

// routes
import projectsRouter from './routes/projects.route';
import tasksRouter from './routes/tasks.route';

// initialize express app
const app = express();

app.use(morgan('dev'));
app.use(express.json())

app.use(projectsRouter)
app.use(tasksRouter)
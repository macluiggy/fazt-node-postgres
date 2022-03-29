import { Express, NextFunction, Request, Response } from "express";

type Project = {
  id: string;
  name: string;
  priority: number;
  description: string;
  deliverydate: string;
}
// type RequestWithProject = Request & {body: Project};
interface RequestWithProject extends Request {
  body: Project;
}


export type Handler = (req: RequestWithProject, res: Response, next?: NextFunction) => void;
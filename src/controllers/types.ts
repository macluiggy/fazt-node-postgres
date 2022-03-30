import { NextFunction, Request, RequestParamHandler, Response } from "express";
import { Model } from "sequelize/types";

type TProject = {
  id: string;
  name: string;
  priority: number;
  description: string;
  deliverydate: string;
};
// type RequestWithProject = Request & {body: Project};
interface RequestWithProject extends Request {
  body: TProject;
}

interface RequestWithProjectId extends Request {
  project?: Model<TProject>
}
// type ResponseWithProjectId = Response & {project?: Model<TProject>}

// type Handler = (
//   req: RequestWithProject,
//   res: Response,
//   next?: NextFunction
// ) => void;

// type THandlerWithId = (
//   request: RequestWithProjectId,
//   response: Response,
//   next: NextFunction,
//   id: number
// ) => void
// type HandlerWithId = THandlerWithId & RequestParamHandler

// interface HandlerWithId extends RequestParamHandler {
//   (req: Request & {project?:Model<TProject>}, res: Response, next: NextFunction, id: number): void;
// }

export { /**Handler,  */ TProject,  RequestWithProjectId};

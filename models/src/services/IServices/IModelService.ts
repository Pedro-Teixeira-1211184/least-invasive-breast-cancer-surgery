import {NextFunction, Request, Response} from "express";

export default interface IModelService {
    uploadModel(req: Request, res: Response, next: NextFunction);

    downloadModel(req: Request, res: Response, next: NextFunction);
}

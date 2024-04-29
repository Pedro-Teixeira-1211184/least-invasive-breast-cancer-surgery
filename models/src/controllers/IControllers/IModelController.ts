import {Request, Response, NextFunction} from 'express';

export default interface IModelController {
    uploadModel(req: Request, res: Response, next: NextFunction);

    downloadModel(req: Request, res: Response, next: NextFunction);
}
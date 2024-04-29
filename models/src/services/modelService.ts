import {Service, Inject} from 'typedi';
import config from "../../config";
import IModelService from "./IServices/IModelService";
import {Request, Response, NextFunction} from 'express';
import IModelRepo from "./IRepos/IModelRepo";

@Service()
export default class ModelService implements IModelService {
    constructor(
        @Inject(config.repos.model.name) private modelRepo: IModelRepo
    ) {
    }

    public async uploadModel(req: Request, res: Response, next: NextFunction) {
        throw new Error('Method not implemented.');
    }

    public async downloadModel(req: Request, res: Response, next: NextFunction) {
        throw new Error('Method not implemented.');
    }

}

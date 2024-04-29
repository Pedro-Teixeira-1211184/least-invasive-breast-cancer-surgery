import {Request, Response, NextFunction} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
import {Inject, Service} from 'typedi';
import config from "../../config";


import IModelController from "./IControllers/IModelController";
import IModelService from "../services/IServices/IModelService";


@Service()
export default class ModelController implements IModelController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.model.name) private modelServiceInstance: IModelService
    ) {
    }

    public async uploadModel(req: Request, res: Response, next: NextFunction) {
        console.log('Uploading model...');
        //TODO: implement the upload model logic
        return res.status(200).json({message: 'Model uploaded successfully'});
    }

    public async downloadModel(req: Request, res: Response, next: NextFunction) {
        console.log('Downloading model...');
        const {id} = req.params as ParamsDictionary;
        console.log('Model id:', id);
        //TODO: implement the download model logic
        return res.status(200).json({message: 'Model downloaded successfully'});
    }


}
import {Request, Response, NextFunction} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {Inject, Service} from 'typedi';
import config from "../../config";


import IModelController from "./IControllers/IModelController";
import IModelService from "../services/IServices/IModelService";
import IModelDTO from "../dto/IModelDTO";
import {ParsedQs} from 'qs';


@Service()
export default class ModelController implements IModelController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.model.name) private modelServiceInstance: IModelService
    ) {
    }

    public async getModelByPatientId(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Getting model by patient id...');
            const patientId = req.params.id;

            const model = await this.modelServiceInstance.findByPatientId(patientId);

            if (model.isFailure) {
                return res.status(404).json(model.errorValue());
            }

            return res.status(200).json(model.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getAllModels(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log('Getting all models...');
            const models = await this.modelServiceInstance.getAllModels();
            if (models.isFailure) {
                return res.status(404).json(models.errorValue())
            }

            return res.status(200).json(models.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async uploadModel(req: Request, res: Response, next: NextFunction) {
        try {

            console.log('Uploading model...');

            const {patientId, description} = req.body;
            // @ts-ignore
            const path = req.file.path;

            const modelDTO = {
                patientId,
                description,
                path
            };

            const modelOrError = await this.modelServiceInstance.uploadModel(modelDTO as IModelDTO);

            if (modelOrError.isFailure) {
                return res.status(403).json(modelOrError.errorValue());
            }

            return res.status(200).json(modelOrError.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async downloadModel(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Downloading model...');
            const id = req.params.id;

            //get model by id
            const model = await this.modelServiceInstance.findById(id);

            if (model.isFailure) {
                return res.status(404).json(model.errorValue());
            }

            const modelDTO = model.getValue();

            //send model file
            return res.download(modelDTO.path);

        } catch (e) {
            next(e);
        }
    }


}
import {Request, Response, NextFunction} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {Inject, Service} from 'typedi';
import config from "../../config";


import IModelController from "./IControllers/IModelController";
import IModelService from "../services/IServices/IModelService";
import IModelDTO from "../dto/IModelDTO";
import {ParsedQs} from 'qs';
import IUserServiceOnion from "../services/IServices/IUserServiceOnion";
import IModelPermissionService from "../services/IServices/IModelPermissionService";


@Service()
export default class ModelController implements IModelController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
        @Inject(config.services.model.name) private modelServiceInstance: IModelService,
        @Inject(config.services.user.name) private userServiceInstance: IUserServiceOnion,
        @Inject(config.services.modelPermission.name) private modelPermissionServiceInstance: IModelPermissionService
    ) {
    }

    public async deleteModelPermissionByModelId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log('Deleting model permission by model id...');
            const modelId = req.params.id;

            const result = await this.modelPermissionServiceInstance.deleteModelPermissionByModelId(modelId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getModelsByDoctorId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log('Getting model by doctor id...');
            const doctorId = req.params.id;

            const model = await this.modelPermissionServiceInstance.getModelPermissionByDoctorId(doctorId);

            if (model.isFailure) {
                return res.status(404).json(model.errorValue());
            }

            // get array of models from model permission modelIds
            const modelDTOS: IModelDTO[] = [];
            for (const modelPermission of model.getValue()) {
                const model = await this.modelServiceInstance.findById(modelPermission.modelId);
                if (model.isFailure) {
                    return res.status(404).json(model.errorValue());
                }
                modelDTOS.push(model.getValue());
            }

            return res.status(200).json(modelDTOS);

        } catch (e) {
            next(e);
        }
    }

    public async createModelPermission(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log('Creating model permission...');
            const modelPermissionDTO = req.body;

            const result = await this.modelPermissionServiceInstance.createModelPermission(modelPermissionDTO);

            if (result.isFailure) {
                return res.status(403).json(result.errorValue());
            }

            return res.status(201).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async deleteModel(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            console.log('Deleting model...');
            const id = req.params.id;

            const result = await this.modelServiceInstance.deleteModel(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            //delete model file by its path
            const path = result.getValue().path;
            const fs = require('fs');
            fs.unlink(path, (err: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            return res.status(200).json(result.getValue().id + ' deleted');
        } catch (e) {
            next(e);
        }
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

            //check if patient exists
            const patient = await this.userServiceInstance.findPatientByPatientId(patientId);
            if (patient.isFailure) {
                return res.status(404).json(patient.errorValue());
            }

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
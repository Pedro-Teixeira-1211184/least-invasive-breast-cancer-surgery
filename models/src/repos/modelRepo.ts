import {Service, Inject} from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import IModelRepo from "../services/IRepos/IModelRepo";
import {IModelPersistence} from "../dataschema/IModelPersistence";
import { ObjModel } from '../domain/ObjModel';

@Service()
export default class ModelRepo implements IModelRepo {
    private models: any;

    constructor(
        @Inject('modelSchema') private modelSchema: Model<IModelPersistence & Document>,
    ) {
    }

    public async exists(model: ObjModel): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    public async save(model: ObjModel): Promise<ObjModel> {
        throw new Error('Method not implemented.');
    }
    public async findByPatientId(patientId: string): Promise<ObjModel[]> {
        throw new Error('Method not implemented.');
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }
}
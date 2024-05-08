import {Service, Inject} from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import IModelRepo from "../services/IRepos/IModelRepo";
import {IModelPersistence} from "../dataschema/IModelPersistence";
import {ObjModel} from '../domain/ObjModel';
import {ModelMap} from "../mappers/ModelMap";
import {Identifier} from "../core/domain/Identifier";

@Service()
export default class ModelRepo implements IModelRepo {
    private models: any;

    constructor(
        @Inject('modelSchema') private modelSchema: Model<IModelPersistence & Document>,
    ) {
    }

    public async findById(modelId: string): Promise<ObjModel> {
        try {
            const query = {domainId: modelId};
            const modelDocument = await this.modelSchema.findOne(query as FilterQuery<IModelPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            return ModelMap.toDomain(modelDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<ObjModel[]> {
        try {
            const modelDocuments = await this.modelSchema.find();
            return modelDocuments.map((modelDocument) => ModelMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    public async exists(model: ObjModel): Promise<boolean> {
        try {
            const query = {path: model.path};
            const modelDocument = await this.modelSchema.findOne(query as FilterQuery<IModelPersistence & Document>);
            return modelDocument != null;
        } catch (error) {
            throw error;
        }
    }

    public async save(model: ObjModel): Promise<ObjModel> {
        try {
            if (!await this.exists(model)) {
                const pers = ModelMap.toPersistence(model);
                const modelDocument = await this.modelSchema.create(pers);
                return ModelMap.toDomain(modelDocument);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async findByPatientId(patientId: string): Promise<ObjModel[]> {
        try {
            const query = {patientId};
            const modelDocuments = await this.modelSchema.find(query as FilterQuery<IModelPersistence & Document>);
            return modelDocuments.map((modelDocument) => ModelMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }
}
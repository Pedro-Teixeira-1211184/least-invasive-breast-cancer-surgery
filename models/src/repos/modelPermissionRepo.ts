import {Service, Inject} from 'typedi';

import {Document, FilterQuery, Model} from 'mongoose';
import {IModelPermissionPersistence} from "../dataschema/IModelPermissionPersistence";
import IModelPermissionRepo from "../services/IRepos/IModelPermissionRepo";
import {ModelPermission} from '../domain/modelPermission';
import {ModelPermissionMap} from "../mappers/ModelPermissionMap";

@Service()
export default class ModelPermissionRepo implements IModelPermissionRepo {
    private models: any;

    constructor(
        @Inject('modelPermissionSchema') private modelPermissionSchema: Model<IModelPermissionPersistence & Document>,
    ) {
    }

    public async findByImagiologistId(imagiologistId: string): Promise<ModelPermission[]> {
        try {
            const query = {imagiologistId: imagiologistId};
            const modelDocument = await this.modelPermissionSchema.find(query as FilterQuery<IModelPermissionPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            return modelDocument.map((modelDocument) => ModelPermissionMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    public async deleteByModelId(modelId: string): Promise<ModelPermission[]> {
        try {
            const query = {modelId: modelId};
            const modelDocument = await this.modelPermissionSchema.find(query as FilterQuery<IModelPermissionPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            await this.modelPermissionSchema.deleteMany(query as FilterQuery<IModelPermissionPersistence & Document>);
            return modelDocument.map((modelDocument) => ModelPermissionMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    public async exists(model: ModelPermission): Promise<boolean> {
        try {
            const query = {modelId: model.modelId, doctorId: model.doctorId};
            const modelDocument = await this.modelPermissionSchema.findOne(query as FilterQuery<IModelPermissionPersistence & Document>);
            return modelDocument != null;
        } catch (error) {
            throw error;
        }
    }

    public async save(model: ModelPermission): Promise<ModelPermission> {
        try {
            if (!await this.exists(model)) {
                const pers = ModelPermissionMap.toPersistence(model);
                const modelDocument = await this.modelPermissionSchema.create(pers);
                return ModelPermissionMap.toDomain(modelDocument);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<ModelPermission[]> {
        try {
            const modelDocuments = await this.modelPermissionSchema.find();
            if (modelDocuments == null) {
                return null;
            }
            return modelDocuments.map((modelDocument) => ModelPermissionMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    public async findById(modelId: string): Promise<ModelPermission> {
        try {
            const query = {domainId: modelId};
            const modelDocument = await this.modelPermissionSchema.findOne(query as FilterQuery<IModelPermissionPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            return ModelPermissionMap.toDomain(modelDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByDoctorId(doctorId: string): Promise<ModelPermission[]> {
        const query = {doctorId: doctorId};
        const modelDocument = await this.modelPermissionSchema.find(query as FilterQuery<IModelPermissionPersistence & Document>);
        if (modelDocument == null) {
            return null;
        }
        return modelDocument.map((modelDocument) => ModelPermissionMap.toDomain(modelDocument));
    }

    public async findByModelId(modelId: string): Promise<ModelPermission[]> {
        try {
            const query = {modelId: modelId};
            const modelDocument = await this.modelPermissionSchema.find(query as FilterQuery<IModelPermissionPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            return modelDocument.map((modelDocument) => ModelPermissionMap.toDomain(modelDocument));
        } catch (error) {
            throw error;
        }
    }

    public async delete(modelId: string): Promise<ModelPermission> {
        try {
            const query = {domainId: modelId};
            const modelDocument = await this.modelPermissionSchema.findOneAndDelete(query as FilterQuery<IModelPermissionPersistence & Document>);
            if (modelDocument == null) {
                return null;
            }
            return ModelPermissionMap.toDomain(modelDocument);
        } catch (error) {
            throw error;
        }
    }


}
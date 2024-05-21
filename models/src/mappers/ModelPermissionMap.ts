import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {ModelPermission} from "../domain/modelPermission";
import IModelPermissionDTO from "../dto/IModelPermissionDTO";
import {IModelPermissionPersistence} from "../dataschema/IModelPermissionPersistence";

export class ModelPermissionMap extends Mapper<ModelPermission> {

    public static toDTO(model: ModelPermission): IModelPermissionDTO {
        return {
            id: model.id.toString(),
            modelId: model.modelId,
            imagiologistId: model.imagiologistId,
            doctorId: model.doctorId,
        } as IModelPermissionDTO;
    }

    public static toDomain(model: any | Model<IModelPermissionPersistence & Document>): ModelPermission {
        const modelOrError = ModelPermission.create(
            model,
            new UniqueEntityID(model.domainId)
        );

        modelOrError.isFailure ? console.log(modelOrError.error) : '';

        return modelOrError.isSuccess ? modelOrError.getValue() : null;
    }

    public static toPersistence(model: ModelPermission): any {
        return {
            domainId: model.id.toString(),
            modelId: model.modelId,
            doctorId: model.doctorId,
            imagiologistId: model.imagiologistId
        }
    }
}
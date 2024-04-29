import {Mapper} from "../core/infra/Mapper";

import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {ObjModel} from "../domain/ObjModel";
import {IModelPersistence} from "../dataschema/IModelPersistence";
import IModelDTO from "../dto/IModelDTO";

export class ModelMap extends Mapper<ObjModel> {

    public static toDTO(model: ObjModel): IModelDTO {
        return {
            id: model.id.toString(),
            patientId: model.patientId,
            modelId: model.modelId,
            description: model.description,
        } as IModelDTO;
    }

    public static toDomain(model: any | Model<IModelPersistence & Document>): ObjModel {
        const modelOrError = ObjModel.create(
            model,
            new UniqueEntityID(model.domainId)
        );

        modelOrError.isFailure ? console.log(modelOrError.error) : '';

        return modelOrError.isSuccess ? modelOrError.getValue() : null;
    }

    public static toPersistence(model: ObjModel): any {
        return {
            domainId: model.id.toString(),
            patientId: model.patientId,
            modelId: model.modelId,
            description: model.description,
        }
    }
}
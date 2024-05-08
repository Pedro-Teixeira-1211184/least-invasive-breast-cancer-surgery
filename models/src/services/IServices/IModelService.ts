import {NextFunction, Request, Response} from "express";
import IModelDTO from "../../dto/IModelDTO";
import {Result} from "../../core/logic/Result";

export default interface IModelService {
    uploadModel(modelDTO: IModelDTO): Promise<Result<IModelDTO>>;

    findById(modelId: string): Promise<Result<IModelDTO>>;

    findByPatientId(patientId: string): Promise<Result<IModelDTO[]>>;

    getAllModels(): Promise<Result<IModelDTO[]>>;

    deleteModel(modelId: string): Promise<Result<IModelDTO>>;
}

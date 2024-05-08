import { Repo } from "../../core/infra/Repo";
import {ObjModel} from "../../domain/ObjModel";

export default interface IModelRepo extends Repo<ObjModel> {
    exists(model: ObjModel): Promise<boolean>;
    save(model: ObjModel): Promise<ObjModel>;
    findByPatientId(patientId: string): Promise<ObjModel[]>;
    findAll(): Promise<ObjModel[]>;
    findById(modelId: string): Promise<ObjModel>;
    delete(modelId: string): Promise<ObjModel>;
}
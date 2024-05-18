import { Repo } from "../../core/infra/Repo";
import {ModelPermission} from "../../domain/modelPermission";

export default interface IModelPermissionRepo extends Repo<ModelPermission> {
    exists(model: ModelPermission): Promise<boolean>;
    save(model: ModelPermission): Promise<ModelPermission>;
    findAll(): Promise<ModelPermission[]>;
    findById(modelId: string): Promise<ModelPermission>;
    findByDoctorId(doctorId: string): Promise<ModelPermission[]>;
    findByModelId(modelId: string): Promise<ModelPermission[]>;
    delete(id: string): Promise<ModelPermission>;
    deleteByModelId(modelId: string): Promise<ModelPermission[]>;
}
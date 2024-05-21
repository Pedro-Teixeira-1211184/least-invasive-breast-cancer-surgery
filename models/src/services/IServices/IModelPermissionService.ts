import {Result} from "../../core/logic/Result";
import IModelPermissionDTO from "../../dto/IModelPermissionDTO";

export default interface IModelPermissionService {
    createModelPermission(modelPermission: IModelPermissionDTO): Promise<Result<IModelPermissionDTO>>;
    getAllModelPermissions(): Promise<Result<IModelPermissionDTO[]>>;
    getModelPermissionById(modelPermissionId: string): Promise<Result<IModelPermissionDTO>>;
    getModelPermissionByDoctorId(doctorId: string): Promise<Result<IModelPermissionDTO[]>>;
    getModelPermissionByModelId(modelId: string): Promise<Result<IModelPermissionDTO[]>>;
    getModelPermissionByPatientId(patientId: string): Promise<Result<IModelPermissionDTO[]>>;
    getModelPermissionByImagiologistId(imagiologistId: string): Promise<Result<IModelPermissionDTO[]>>;
    deleteModelPermission(modelPermissionId: string): Promise<Result<IModelPermissionDTO>>;
    deleteModelPermissionByModelId(modelId: string): Promise<Result<IModelPermissionDTO[]>>;
}

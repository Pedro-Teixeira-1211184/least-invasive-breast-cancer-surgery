import {Service, Inject} from 'typedi';
import config from "../../config";
import IModelPermissionService from "./IServices/IModelPermissionService";
import IModelPermissionRepo from "./IRepos/IModelPermissionRepo";
import {Result} from "../core/logic/Result";
import IModelPermissionDTO from '../dto/IModelPermissionDTO';
import IUserRepo from "./IRepos/IUserRepo";
import {ModelPermission} from "../domain/modelPermission";
import IModelRepo from "./IRepos/IModelRepo";
import {ModelPermissionMap} from "../mappers/ModelPermissionMap";

@Service()
export default class ModelPermissionService implements IModelPermissionService {
    constructor(
        @Inject(config.repos.modelPermission.name) private modelPermissionRepo: IModelPermissionRepo,
        @Inject(config.repos.user.name) private userRepo: IUserRepo,
        @Inject(config.repos.model.name) private modelRepo: IModelRepo
    ) {
    }

    public async deleteModelPermissionByModelId(modelId: string): Promise<Result<IModelPermissionDTO[]>> {
        try {
            const modelPermissions = await this.modelPermissionRepo.findByModelId(modelId);
            if (modelPermissions.length === 0) {
                return Result.fail<IModelPermissionDTO[]>("Model permissions not found");
            }
            const deleteResult = await this.modelPermissionRepo.deleteByModelId(modelId);
            if (deleteResult.length === 0) {
                return Result.fail<IModelPermissionDTO[]>("Model permissions not deleted");
            }
            return Result.ok<IModelPermissionDTO[]>(modelPermissions.map((modelPermission) => ModelPermissionMap.toDTO(modelPermission)));
        } catch (error) {
            return Result.fail<IModelPermissionDTO[]>(error);
        }
    }

    public async createModelPermission(modelPermission: IModelPermissionDTO): Promise<Result<IModelPermissionDTO>> {
        try {
            //find doctor
            const doctor = await this.userRepo.existDoctorById(modelPermission.doctorId);
            if (!doctor) {
                return Result.fail<IModelPermissionDTO>("Doctor not found");
            }
            // find model
            const model = await this.modelRepo.findById(modelPermission.modelId);
            if (!model) {
                return Result.fail<IModelPermissionDTO>("Model not found");
            }
            // save model permission
            const modelPermissionOrError = await ModelPermission.create(modelPermission);
            if (modelPermissionOrError.isFailure) {
                return Result.fail<IModelPermissionDTO>(modelPermissionOrError.error);
            }
            const modelPermissionResult = modelPermissionOrError.getValue();
            const modelPermissionInstance = await this.modelPermissionRepo.save(modelPermissionResult);

            if (!modelPermissionInstance) {
                return Result.fail<IModelPermissionDTO>("Model permission not saved");
            }
            return Result.ok<IModelPermissionDTO>(ModelPermissionMap.toDTO(modelPermissionInstance));
        } catch (error) {
            return Result.fail<IModelPermissionDTO>(error);
        }
    }

    getAllModelPermissions(): Promise<Result<IModelPermissionDTO[]>> {
        throw new Error('Method not implemented.');
    }

    getModelPermissionById(modelPermissionId: string): Promise<Result<IModelPermissionDTO>> {
        throw new Error('Method not implemented.');
    }

    public async getModelPermissionByDoctorId(doctorId: string): Promise<Result<IModelPermissionDTO[]>> {
        try {
            const modelPermissions = await this.modelPermissionRepo.findByDoctorId(doctorId);
            if (!modelPermissions) {
                return Result.fail<IModelPermissionDTO[]>("Model permissions not found");
            }
            return Result.ok<IModelPermissionDTO[]>(modelPermissions.map((modelPermission) => ModelPermissionMap.toDTO(modelPermission)));
        } catch (error) {
            return Result.fail<IModelPermissionDTO[]>(error);
        }
    }

    getModelPermissionByModelId(modelId: string): Promise<Result<IModelPermissionDTO[]>> {
        throw new Error('Method not implemented.');
    }

    getModelPermissionByPatientId(patientId: string): Promise<Result<IModelPermissionDTO[]>> {
        throw new Error('Method not implemented.');
    }

    deleteModelPermission(modelPermissionId: string): Promise<Result<IModelPermissionDTO>> {
        throw new Error('Method not implemented.');
    }


}

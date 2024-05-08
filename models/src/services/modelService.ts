import {Service, Inject} from 'typedi';
import config from "../../config";
import IModelService from "./IServices/IModelService";
import IModelRepo from "./IRepos/IModelRepo";
import {Result} from '../core/logic/Result';
import IModelDTO from '../dto/IModelDTO';
import {ObjModel} from "../domain/ObjModel";
import {ModelMap} from "../mappers/ModelMap";

@Service()
export default class ModelService implements IModelService {
    constructor(
        @Inject(config.repos.model.name) private modelRepo: IModelRepo
    ) {
    }

    public async deleteModel(modelId: string): Promise<Result<IModelDTO>> {
        try {
            const model = await this.modelRepo.delete(modelId);
            if (model == null) {
                return Result.fail<IModelDTO>("Model not found");
            }
            return Result.ok<IModelDTO>(ModelMap.toDTO(model));
        } catch (e) {
            return Result.fail<IModelDTO>(e);
        }
    }

    public async findByPatientId(patientId: string): Promise<Result<IModelDTO[]>> {
        try {
            const models = await this.modelRepo.findByPatientId(patientId);
            return Result.ok<IModelDTO[]>(models.map((model) => ModelMap.toDTO(model)));
        } catch (e) {
            return Result.fail<IModelDTO[]>(e);
        }
    }

    public async findById(modelId: string): Promise<Result<IModelDTO>> {
        try {
            const model = await this.modelRepo.findById(modelId);
            if (model == null) {
                return Result.fail<IModelDTO>("Model not found");
            }
            return Result.ok<IModelDTO>(ModelMap.toDTO(model));
        } catch (e) {
            return Result.fail<IModelDTO>(e);
        }
    }

    public async getAllModels(): Promise<Result<IModelDTO[]>> {
        try {
            const models = await this.modelRepo.findAll();
            return Result.ok<IModelDTO[]>(models.map((model) => ModelMap.toDTO(model)));
        } catch (e) {
            return Result.fail<IModelDTO[]>(e);
        }
    }

    public async uploadModel(modelDTO: IModelDTO): Promise<Result<IModelDTO>> {
        try {
            const modelOrError = await ObjModel.create(modelDTO);

            if (modelOrError.isFailure) {
                return Result.fail<IModelDTO>(modelOrError.errorValue());
            }

            const model = modelOrError.getValue();

            const save = await this.modelRepo.save(model);

            if (save == null) {
                return Result.fail<IModelDTO>("Model could not be saved");
            }

            return Result.ok<IModelDTO>(modelDTO);
        } catch (e) {
            return Result.fail<IModelDTO>(e);
        }
    }
}

import {Service, Inject} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";
import IUserServiceOnion from "./IServices/IUserServiceOnion";
import IUserRepo from "./IRepos/IUserRepo";
import {IPatientDTO} from '../dto/IPatientDTO';
import {PatientMap} from "../mappers/PatientMap";

@Service()
export default class UserServiceOnion implements IUserServiceOnion {
    constructor(
        @Inject(config.repos.user.name) private userRepo: IUserRepo,
        @Inject('logger') private logger,
    ) {
    }

    public async findPatientByPatientId(patientId: string): Promise<Result<IPatientDTO>> {
        try {
            const patient = await this.userRepo.findPatientByPatientId(patientId);
            if (patient == null) {
                return Result.fail<IPatientDTO>("Patient not found");
            }

            const patientDTO = PatientMap.toDTO(patient);
            return Result.ok<IPatientDTO>(patientDTO);
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

}
